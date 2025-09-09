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

import com.demo.sistema_gestion_escolar.dto.InscripcionRequestDTO;
import com.demo.sistema_gestion_escolar.dto.InscripcionResponseDTO;
import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.model.Curso;
import com.demo.sistema_gestion_escolar.model.Inscripcion;
import com.demo.sistema_gestion_escolar.repository.AlumnoRepository;
import com.demo.sistema_gestion_escolar.repository.CursoRepository;
import com.demo.sistema_gestion_escolar.service.InscripcionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/inscripciones")
public class InscripcionController {

    @Autowired
    private InscripcionService inscripcionService;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InscripcionResponseDTO> crear(@Valid @RequestBody InscripcionRequestDTO dto) {
        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setFechaInscripcion(dto.fechaInscripcion);
        inscripcion.setEstado(Inscripcion.EstadoInscripcion.valueOf(dto.estado));
        Alumno alumno = alumnoRepository.findById(dto.alumnoId).orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
        Curso curso = cursoRepository.findById(dto.cursoId).orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        inscripcion.setAlumno(alumno);
        inscripcion.setCurso(curso);
        Inscripcion creada = inscripcionService.crear(inscripcion);
        InscripcionResponseDTO res = new InscripcionResponseDTO();
        res.id = creada.getId();
        res.fechaInscripcion = creada.getFechaInscripcion();
        res.estado = creada.getEstado().name();
        res.alumnoId = creada.getAlumno() != null ? creada.getAlumno().getId() : null;
        res.cursoId = creada.getCurso() != null ? creada.getCurso().getId() : null;
        return ResponseEntity.ok(res);
    }

    @GetMapping
    public List<InscripcionResponseDTO> obtenerTodas() {
        return inscripcionService.obtenerTodas().stream().map(i -> {
            InscripcionResponseDTO r = new InscripcionResponseDTO();
            r.id = i.getId();
            r.fechaInscripcion = i.getFechaInscripcion();
            r.estado = i.getEstado().name();
            r.alumnoId = i.getAlumno() != null ? i.getAlumno().getId() : null;
            r.cursoId = i.getCurso() != null ? i.getCurso().getId() : null;
            return r;
        }).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscripcionResponseDTO> obtenerPorId(@PathVariable Long id) {
        return inscripcionService.obtenerPorId(id)
                .map(i -> {
                    InscripcionResponseDTO r = new InscripcionResponseDTO();
                    r.id = i.getId();
                    r.fechaInscripcion = i.getFechaInscripcion();
                    r.estado = i.getEstado().name();
                    r.alumnoId = i.getAlumno() != null ? i.getAlumno().getId() : null;
                    r.cursoId = i.getCurso() != null ? i.getCurso().getId() : null;
                    return ResponseEntity.ok(r);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InscripcionResponseDTO> actualizar(@PathVariable Long id, @Valid @RequestBody InscripcionRequestDTO dto) {
        try {
            Inscripcion datos = new Inscripcion();
            datos.setFechaInscripcion(dto.fechaInscripcion);
            datos.setEstado(Inscripcion.EstadoInscripcion.valueOf(dto.estado));
            Alumno alumno = alumnoRepository.findById(dto.alumnoId).orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
            Curso curso = cursoRepository.findById(dto.cursoId).orElseThrow(() -> new RuntimeException("Curso no encontrado"));
            datos.setAlumno(alumno);
            datos.setCurso(curso);
            Inscripcion actualizada = inscripcionService.actualizar(id, datos);
            InscripcionResponseDTO r = new InscripcionResponseDTO();
            r.id = actualizada.getId();
            r.fechaInscripcion = actualizada.getFechaInscripcion();
            r.estado = actualizada.getEstado().name();
            r.alumnoId = actualizada.getAlumno() != null ? actualizada.getAlumno().getId() : null;
            r.cursoId = actualizada.getCurso() != null ? actualizada.getCurso().getId() : null;
            return ResponseEntity.ok(r);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        inscripcionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
