package com.demo.sistema_gestion_escolar.controller;

import com.demo.sistema_gestion_escolar.model.Materia;
import com.demo.sistema_gestion_escolar.service.MateriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    @PostMapping
    public ResponseEntity<Materia> crear(@Valid @RequestBody Materia materia) {
        return ResponseEntity.ok(materiaService.crear(materia));
    }

    @GetMapping
    public List<Materia> obtenerTodas() {
        return materiaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> obtenerPorId(@PathVariable Long id) {
        return materiaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> actualizar(@PathVariable Long id, @Valid @RequestBody Materia materia) {
        try {
            return ResponseEntity.ok(materiaService.actualizar(id, materia));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        materiaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
