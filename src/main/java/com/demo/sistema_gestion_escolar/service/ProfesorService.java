package com.demo.sistema_gestion_escolar.service;

import com.demo.sistema_gestion_escolar.model.Profesor;
import com.demo.sistema_gestion_escolar.repository.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;

    public Profesor crear(Profesor profesor) {
        return profesorRepository.save(profesor);
    }

    public List<Profesor> obtenerTodos() {
        return profesorRepository.findAll();
    }

    public Optional<Profesor> obtenerPorId(Long id) {
        return profesorRepository.findById(id);
    }

    public Profesor actualizar(Long id, Profesor datos) {
        return profesorRepository.findById(id).map(p -> {
            p.setNombre(datos.getNombre());
            p.setApellido(datos.getApellido());
            p.setEmail(datos.getEmail());
            return profesorRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
    }

    public void eliminar(Long id) {
        profesorRepository.deleteById(id);
    }
}
