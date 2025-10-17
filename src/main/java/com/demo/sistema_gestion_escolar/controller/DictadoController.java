package com.demo.sistema_gestion_escolar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.demo.sistema_gestion_escolar.dto.DictadoRequestDTO;
import com.demo.sistema_gestion_escolar.dto.DictadoResponseDTO;
import com.demo.sistema_gestion_escolar.service.DictadoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/dictados")
public class DictadoController {

    @Autowired
    private DictadoService dictadoService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> crear(@Valid @RequestBody DictadoRequestDTO dictadoDto) {
        try {
            DictadoResponseDTO nuevoDictado = dictadoService.crear(dictadoDto);
            return ResponseEntity.ok(nuevoDictado);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Error al crear el dictado: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping
    public List<DictadoResponseDTO> obtenerTodos() {
        return dictadoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DictadoResponseDTO> obtenerPorId(@PathVariable Long id) {
        return dictadoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody DictadoRequestDTO dictadoDto) {
        try {
            DictadoResponseDTO actualizado = dictadoService.actualizar(id, dictadoDto);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("mensaje", "Error al actualizar el dictado: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        dictadoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
