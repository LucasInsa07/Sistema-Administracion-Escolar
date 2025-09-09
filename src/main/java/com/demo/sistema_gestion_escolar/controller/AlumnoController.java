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
        Alumno alumno = new Alumno(dto.nombre, dto.apellido, dto.email);
        Alumno nuevoAlumno = alumnoService.crearAlumno(alumno);
        AlumnoResponseDTO res = new AlumnoResponseDTO();
        res.id = nuevoAlumno.getId();
        res.nombre = nuevoAlumno.getNombre();
        res.apellido = nuevoAlumno.getApellido();
        res.email = nuevoAlumno.getEmail();
        return ResponseEntity.ok(res);
    }

    @PostMapping("/lote")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AlumnoResponseDTO>> crearEnLote(@Valid @RequestBody List<AlumnoRequestDTO> dtos) {
        List<Alumno> alumnos = dtos.stream().map(d -> new Alumno(d.nombre, d.apellido, d.email)).toList();
        List<Alumno> guardados = alumnoService.crearAlumnosEnLote(alumnos);
        List<AlumnoResponseDTO> res = guardados.stream().map(a -> {
            AlumnoResponseDTO r = new AlumnoResponseDTO();
            r.id = a.getId();
            r.nombre = a.getNombre();
            r.apellido = a.getApellido();
            r.email = a.getEmail();
            return r;
        }).toList();
        return ResponseEntity.ok(res);
    }

    @GetMapping
    public List<AlumnoResponseDTO> obtenerTodos() {
        return alumnoService.obtenerTodos().stream().map(a -> {
            AlumnoResponseDTO r = new AlumnoResponseDTO();
            r.id = a.getId();
            r.nombre = a.getNombre();
            r.apellido = a.getApellido();
            r.email = a.getEmail();
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
                    return ResponseEntity.ok(r);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlumnoResponseDTO> actualizarAlumno(@PathVariable Long id, @Valid @RequestBody AlumnoRequestDTO dto) {
        try {
            Alumno datos = new Alumno(dto.nombre, dto.apellido, dto.email);
            Alumno actualizado = alumnoService.actualizarAlumno(id, datos);
            AlumnoResponseDTO r = new AlumnoResponseDTO();
            r.id = actualizado.getId();
            r.nombre = actualizado.getNombre();
            r.apellido = actualizado.getApellido();
            r.email = actualizado.getEmail();
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
}
