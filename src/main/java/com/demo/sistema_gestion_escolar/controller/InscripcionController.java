package com.demo.sistema_gestion_escolar.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.demo.sistema_gestion_escolar.dto.InscripcionesBatchRequestDTO;
import com.demo.sistema_gestion_escolar.dto.InscripcionesBatchResponseDTO;
import com.demo.sistema_gestion_escolar.service.InscripcionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/inscripciones")
public class InscripcionController {

    private static final Logger logger = LoggerFactory.getLogger(InscripcionController.class);
    
    @Autowired
    private InscripcionService inscripcionService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InscripcionResponseDTO> crear(@Valid @RequestBody InscripcionRequestDTO inscripcionDto) {
        logger.info("Recibida petición de creación de inscripción: {}", inscripcionDto);
        logger.info("Datos del DTO - AlumnoId: {}, CursoId: {}, Estado: {}, FechaInscripcion: {}", 
                   inscripcionDto.getAlumnoId(), 
                   inscripcionDto.getCursoId(), 
                   inscripcionDto.getEstado(), 
                   inscripcionDto.getFechaInscripcion());
        try {
            InscripcionResponseDTO nuevaInscripcion = inscripcionService.crear(inscripcionDto);
            logger.info("Inscripción creada exitosamente con ID: {}", nuevaInscripcion.getId());
            return ResponseEntity.ok(nuevaInscripcion);
        } catch (Exception e) {
            logger.error("Error al crear inscripción: {}", e.getMessage(), e);
            throw e;
        }
    }

    @PostMapping("/batch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InscripcionesBatchResponseDTO> crearEnLote(@Valid @RequestBody InscripcionesBatchRequestDTO batchRequest) {
        logger.info("Recibida petición de creación de inscripciones en lote: {}", batchRequest);
        try {
            InscripcionesBatchResponseDTO response = inscripcionService.crearInscripcionesEnLote(batchRequest);
            logger.info("Procesadas {} inscripciones: {} exitosas, {} errores", 
                       response.getTotalProcesados(), 
                       response.getTotalExitosas(), 
                       response.getTotalErrores());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error al crear inscripciones en lote: {}", e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping
    public List<InscripcionResponseDTO> obtenerTodas() {
        return inscripcionService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscripcionResponseDTO> obtenerPorId(@PathVariable Long id) {
        return inscripcionService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InscripcionResponseDTO> actualizar(@PathVariable Long id, @Valid @RequestBody InscripcionRequestDTO inscripcionDto) {
        try {
            return ResponseEntity.ok(inscripcionService.actualizar(id, inscripcionDto));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            inscripcionService.eliminar(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}