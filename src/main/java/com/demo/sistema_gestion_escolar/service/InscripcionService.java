package com.demo.sistema_gestion_escolar.service;

import com.demo.sistema_gestion_escolar.model.Inscripcion;
import com.demo.sistema_gestion_escolar.repository.InscripcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InscripcionService {

    @Autowired
    private InscripcionRepository inscripcionRepository;

    public Inscripcion crear(Inscripcion inscripcion) {
        return inscripcionRepository.save(inscripcion);
    }

    public List<Inscripcion> obtenerTodas() {
        return inscripcionRepository.findAll();
    }

    public Optional<Inscripcion> obtenerPorId(Long id) {
        return inscripcionRepository.findById(id);
    }

    public Inscripcion actualizar(Long id, Inscripcion datos) {
        return inscripcionRepository.findById(id).map(i -> {
            i.setFechaInscripcion(datos.getFechaInscripcion());
            i.setEstado(datos.getEstado());
            i.setAlumno(datos.getAlumno());
            i.setCurso(datos.getCurso());
            return inscripcionRepository.save(i);
        }).orElseThrow(() -> new RuntimeException("Inscripción no encontrada"));
    }

    public void eliminar(Long id) {
        inscripcionRepository.deleteById(id);
    }
}
