package com.demo.sistema_gestion_escolar.service;

import com.demo.sistema_gestion_escolar.model.Curso;
import com.demo.sistema_gestion_escolar.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public Curso crear(Curso curso) {
        return cursoRepository.save(curso);
    }

    public List<Curso> obtenerTodos() {
        return cursoRepository.findAll();
    }

    public Optional<Curso> obtenerPorId(Long id) {
        return cursoRepository.findById(id);
    }

    public Curso actualizar(Long id, Curso datos) {
        return cursoRepository.findById(id).map(c -> {
            c.setNombre(datos.getNombre());
            return cursoRepository.save(c);
        }).orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    }

    public void eliminar(Long id) {
        cursoRepository.deleteById(id);
    }
}
