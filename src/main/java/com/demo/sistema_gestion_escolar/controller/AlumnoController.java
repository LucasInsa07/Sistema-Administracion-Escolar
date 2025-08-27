package com.demo.sistema_gestion_escolar.controller;

import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.service.AlumnoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @PostMapping
    public ResponseEntity<Alumno> crearAlumno(@Valid @RequestBody Alumno alumno) {
        Alumno nuevoAlumno = alumnoService.crearAlumno(alumno);
        return ResponseEntity.ok(nuevoAlumno);
    }

    @PostMapping("/lote")
    public ResponseEntity<List<Alumno>> crearEnLote(@Valid @RequestBody List<Alumno> alumnos) {
        List<Alumno> guardados = alumnoService.crearAlumnosEnLote(alumnos);
        return ResponseEntity.ok(guardados);
    }

    @GetMapping
    public List<Alumno> obtenerTodos() {
        return alumnoService.obtenerTodos();
    }

    //por ID
    @GetMapping("/{id}")
    public ResponseEntity<Alumno> obtenerPorId(@PathVariable Long id) {
        return alumnoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(@PathVariable Long id, @Valid @RequestBody Alumno alumno) {
        try {
            Alumno actualizado = alumnoService.actualizarAlumno(id, alumno);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAlumno(@PathVariable Long id) {
        alumnoService.eliminarAlumno(id);
        return ResponseEntity.noContent().build();
    }
}
