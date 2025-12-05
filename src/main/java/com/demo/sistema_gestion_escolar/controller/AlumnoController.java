package com.demo.sistema_gestion_escolar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.sistema_gestion_escolar.dto.AlumnoRequestDTO;
import com.demo.sistema_gestion_escolar.dto.AlumnoResponseDTO;
import com.demo.sistema_gestion_escolar.dto.AlumnosBatchRequestDTO;
import com.demo.sistema_gestion_escolar.dto.AlumnosBatchResponseDTO;
import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.service.AlumnoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlumnoResponseDTO> crearAlumno(@Valid @RequestBody AlumnoRequestDTO dto) {
        Alumno alumno = new Alumno(dto.nombre, dto.apellido, dto.email, dto.fechaNacimiento);
        Alumno nuevoAlumno = alumnoService.crearAlumno(alumno);
        AlumnoResponseDTO res = new AlumnoResponseDTO();
        res.id = nuevoAlumno.getId();
        res.nombre = nuevoAlumno.getNombre();
        res.apellido = nuevoAlumno.getApellido();
        res.email = nuevoAlumno.getEmail();
        res.fechaNacimiento = nuevoAlumno.getFechaNacimiento();
        return ResponseEntity.ok(res);
    }

    @PostMapping("/batch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlumnosBatchResponseDTO> crearEnLote(@Valid @RequestBody AlumnosBatchRequestDTO batchRequest) {
        AlumnosBatchResponseDTO response = alumnoService.crearAlumnosEnLote(batchRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<AlumnoResponseDTO> obtenerTodos() {
        return alumnoService.obtenerTodos().stream().map(a -> {
            AlumnoResponseDTO r = new AlumnoResponseDTO();
            r.id = a.getId();
            r.nombre = a.getNombre();
            r.apellido = a.getApellido();
            r.email = a.getEmail();
            r.fechaNacimiento = a.getFechaNacimiento();
            return r;
        }).toList();
    }

    //por ID
    @GetMapping("/{id}")
    public ResponseEntity<AlumnoResponseDTO> obtenerPorId(@PathVariable Long id) {
        return alumnoService.obtenerPorId(id)
                .map(a -> {
                    AlumnoResponseDTO r = new AlumnoResponseDTO();
                    r.id = a.getId();
                    r.nombre = a.getNombre();
                    r.apellido = a.getApellido();
                    r.email = a.getEmail();
                    r.fechaNacimiento = a.getFechaNacimiento();
                    return ResponseEntity.ok(r);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlumnoResponseDTO> actualizarAlumno(@PathVariable Long id, @Valid @RequestBody AlumnoRequestDTO dto) {
        try {
            Alumno datos = new Alumno(dto.nombre, dto.apellido, dto.email, dto.fechaNacimiento);
            Alumno actualizado = alumnoService.actualizarAlumno(id, datos);
            AlumnoResponseDTO r = new AlumnoResponseDTO();
            r.id = actualizado.getId();
            r.nombre = actualizado.getNombre();
            r.apellido = actualizado.getApellido();
            r.email = actualizado.getEmail();
            r.fechaNacimiento = actualizado.getFechaNacimiento();
            return ResponseEntity.ok(r);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarAlumno(@PathVariable Long id) {
        alumnoService.eliminarAlumno(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/desactivar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> desactivarAlumno(@PathVariable Long id) {
        try {
            alumnoService.desactivarAlumno(id);
            return ResponseEntity.ok("Alumno desactivado exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}/completo")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> eliminarAlumnoCompleto(@PathVariable Long id) {
        try {
            alumnoService.eliminarAlumnoCompleto(id);
            return ResponseEntity.ok("Alumno eliminado permanentemente");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error al eliminar: " + e.getMessage());
        }
    }

    @PostMapping("/admin/migrar-contrasenas")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> migrarContrasenasAlumnos() {
        int alumnosMigrados = alumnoService.migrarContrasenaAlumnosExistentes();
        return ResponseEntity.ok("Se generaron contraseñas para " + alumnosMigrados + " alumnos exitosamente");
    }
}
