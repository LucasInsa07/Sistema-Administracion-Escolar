package com.demo.sistema_gestion_escolar.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.sistema_gestion_escolar.model.Administrador;
import com.demo.sistema_gestion_escolar.repository.AdministradorRepository;
import com.demo.sistema_gestion_escolar.security.JwtService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AdministradorRepository administradorRepository;
    private final JwtService jwtService;

    public AuthController(AdministradorRepository administradorRepository, JwtService jwtService) {
        this.administradorRepository = administradorRepository;
        this.jwtService = jwtService;
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
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        Optional<Administrador> opt = administradorRepository.findByUsuario(req.usuario);
        if (opt.isEmpty()) {
            return ResponseEntity.status(401).build();
        }
        Administrador admin = opt.get();
        // Nota: para demo, comparación directa. Reemplazar por password hashing (BCrypt) luego.
        if (!admin.getContrasena().equals(req.contrasena)) {
            return ResponseEntity.status(401).build();
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", admin.getRol());
        String token = jwtService.generateToken(admin.getUsuario(), claims);
        LoginResponse res = new LoginResponse();
        res.token = token;
        res.rol = admin.getRol();
        res.usuario = admin.getUsuario();
        return ResponseEntity.ok(res);
    }
}


