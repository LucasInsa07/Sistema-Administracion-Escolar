package com.demo.sistema_gestion_escolar.service;

import com.demo.sistema_gestion_escolar.model.Materia;
import com.demo.sistema_gestion_escolar.repository.MateriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository materiaRepository;

    public Materia crear(Materia materia) {
        return materiaRepository.save(materia);
    }

    public List<Materia> obtenerTodas() {
        return materiaRepository.findAll();
    }

    public Optional<Materia> obtenerPorId(Long id) {
        return materiaRepository.findById(id);
    }

    public Materia actualizar(Long id, Materia datos) {
        return materiaRepository.findById(id).map(m -> {
            m.setNombre(datos.getNombre());
            m.setProfesor(datos.getProfesor());
            return materiaRepository.save(m);
        }).orElseThrow(() -> new RuntimeException("Materia no encontrada"));
    }

    public void eliminar(Long id) {
        materiaRepository.deleteById(id);
    }
}
