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

import com.demo.sistema_gestion_escolar.dto.MateriaRequestDTO;
import com.demo.sistema_gestion_escolar.dto.MateriaResponseDTO;
import com.demo.sistema_gestion_escolar.model.Materia;
import com.demo.sistema_gestion_escolar.service.MateriaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/materias")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MateriaResponseDTO> crear(@Valid @RequestBody MateriaRequestDTO materiaDto) {
        Materia created = materiaService.crear(materiaDto);
        return ResponseEntity.ok(materiaService.convertirADTO(created));
    }

    @GetMapping
    public List<MateriaResponseDTO> obtenerTodas() {
        return materiaService.obtenerTodasDTO();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MateriaResponseDTO> obtenerPorId(@PathVariable Long id) {
        return materiaService.obtenerPorId(id)
                .map(m -> ResponseEntity.ok(materiaService.convertirADTO(m)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MateriaResponseDTO> actualizar(@PathVariable Long id, @Valid @RequestBody MateriaRequestDTO materiaDto) {
        try {
            Materia updated = materiaService.actualizar(id, materiaDto);
            return ResponseEntity.ok(materiaService.convertirADTO(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        materiaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
