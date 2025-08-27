package com.demo.sistema_gestion_escolar.controller;

import com.demo.sistema_gestion_escolar.model.Administrador;
import com.demo.sistema_gestion_escolar.service.AdministradorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping
    public ResponseEntity<Administrador> crear(@Valid @RequestBody Administrador administrador) {
        Administrador nuevo = administradorService.crear(administrador);
        return ResponseEntity.ok(nuevo);
    }

    @GetMapping
    public List<Administrador> obtenerTodos() {
        return administradorService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrador> obtenerPorId(@PathVariable Long id) {
        return administradorService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrador> actualizar(@PathVariable Long id, @Valid @RequestBody Administrador administrador) {
        try {
            Administrador actualizado = administradorService.actualizar(id, administrador);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        administradorService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

