package com.demo.sistema_gestion_escolar.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.sistema_gestion_escolar.model.Dictado;
import com.demo.sistema_gestion_escolar.service.DictadoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/dictados")
public class DictadoController {

    @Autowired
    private DictadoService dictadoService;

    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Dictado dictado) {
        try {
            Dictado nuevoDictado = dictadoService.crear(dictado);
            return ResponseEntity.ok(dictadoService.obtenerDictadoDTO(nuevoDictado));
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
    public ResponseEntity<?> obtenerTodos() {
        List<Dictado> dictados = dictadoService.obtenerTodos();
        return ResponseEntity.ok(dictadoService.obtenerDictadosDTO(dictados));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        return dictadoService.obtenerPorId(id)
                .map(dictado -> ResponseEntity.ok(dictadoService.obtenerDictadoDTO(dictado)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @Valid @RequestBody Dictado dictado) {
        try {
            Dictado actualizado = dictadoService.actualizar(id, dictado);
            return ResponseEntity.ok(dictadoService.obtenerDictadoDTO(actualizado));
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
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        dictadoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
