package com.demo.sistema_gestion_escolar.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.sistema_gestion_escolar.exception.InvalidCredentialsException;
import com.demo.sistema_gestion_escolar.model.Administrador;
import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.repository.AdministradorRepository;
import com.demo.sistema_gestion_escolar.repository.AlumnoRepository;
import com.demo.sistema_gestion_escolar.security.JwtService;
import com.demo.sistema_gestion_escolar.service.PasswordService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AdministradorRepository administradorRepository;
    private final AlumnoRepository alumnoRepository;
    private final JwtService jwtService;
    private final PasswordService passwordService;

    public AuthController(AdministradorRepository administradorRepository, 
                         AlumnoRepository alumnoRepository,
                         JwtService jwtService, 
                         PasswordService passwordService) {
        this.administradorRepository = administradorRepository;
        this.alumnoRepository = alumnoRepository;
        this.jwtService = jwtService;
        this.passwordService = passwordService;
    }

    public static class LoginRequest {
        @NotBlank
        public String usuario;
        @NotBlank
        public String contrasena;
    }

    public static class LoginResponse {
        public String token;
        public String rol;
        public String usuario;
        public Long userId;      // ID del usuario (admin o alumno)
        public String nombre;    // Solo para alumnos
        public String apellido;  // Solo para alumnos
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        // 1. Intentar login como ADMINISTRADOR
        Optional<Administrador> adminOpt = administradorRepository.findByUsuario(req.usuario);
        if (adminOpt.isPresent()) {
            Administrador admin = adminOpt.get();
            // Para administradores seguimos usando comparación directa (como estaba antes)
            if (admin.getContrasena().equals(req.contrasena)) {
                Map<String, Object> claims = new HashMap<>();
                claims.put("role", admin.getRol());
                claims.put("userId", admin.getId());
                claims.put("userType", "ADMIN");
                
                String token = jwtService.generateToken(admin.getUsuario(), claims);
                LoginResponse res = new LoginResponse();
                res.token = token;
                res.rol = admin.getRol();
                res.usuario = admin.getUsuario();
                res.userId = admin.getId();
                return ResponseEntity.ok(res);
            }
        }

        // 2. Intentar login como ALUMNO (usando email como usuario)
        Optional<Alumno> alumnoOpt = alumnoRepository.findByEmail(req.usuario);
        if (alumnoOpt.isPresent()) {
            Alumno alumno = alumnoOpt.get();
            // Para alumnos usamos BCrypt para validar contraseñas
            if (alumno.getContrasena() != null && 
                passwordService.validarContrasena(req.contrasena, alumno.getContrasena())) {
                
                Map<String, Object> claims = new HashMap<>();
                claims.put("role", "ALUMNO");
                claims.put("userId", alumno.getId());
                claims.put("userType", "ALUMNO");
                
                String token = jwtService.generateToken(alumno.getEmail(), claims);
                
                // IMPORTANTE: Crear response sin referenciar el objeto Alumno
                // para evitar lazy loading y serialización circular
                LoginResponse res = new LoginResponse();
                res.token = token;
                res.rol = "ALUMNO";
                res.usuario = alumno.getEmail();
                res.userId = alumno.getId();
                res.nombre = alumno.getNombre();
                res.apellido = alumno.getApellido();
                
                // Limpiar referencia para evitar retener el objeto en memoria
                alumno = null;
                
                return ResponseEntity.ok(res);
            }
        }

        // 3. Si no se encontró usuario válido o contraseña incorrecta
        throw new InvalidCredentialsException();
    }

        @GetMapping("/validate")
        public ResponseEntity<?> validateToken(org.springframework.web.context.request.WebRequest request) {
            String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).build();
            }
            String token = authHeader.substring(7);
            try {
                var claims = jwtService.parseToken(token);
                Map<String, Object> body = new HashMap<>();
                body.put("usuario", claims.getSubject());
                body.put("role", claims.get("role"));
                body.put("userId", claims.get("userId"));
                body.put("userType", claims.get("userType"));
                return ResponseEntity.ok(body);
            } catch (Exception e) {
                return ResponseEntity.status(401).build();
            }
        }
}


