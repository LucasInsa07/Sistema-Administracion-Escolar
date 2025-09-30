package com.demo.sistema_gestion_escolar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.sistema_gestion_escolar.dto.MateriaRequestDTO;
import com.demo.sistema_gestion_escolar.dto.MateriaResponseDTO;
import com.demo.sistema_gestion_escolar.model.Materia;
import com.demo.sistema_gestion_escolar.model.Profesor;
import com.demo.sistema_gestion_escolar.repository.MateriaRepository;
import com.demo.sistema_gestion_escolar.repository.ProfesorRepository;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository materiaRepository;
    
    @Autowired
    private ProfesorRepository profesorRepository;

    public Materia crear(MateriaRequestDTO materiaDto) {
        // Buscar el profesor por ID
        Profesor profesor = profesorRepository.findById(materiaDto.getProfesorId())
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
        
        // Crear la materia
        Materia materia = new Materia();
        materia.setNombre(materiaDto.getNombre());
        materia.setProfesor(profesor);
        
        return materiaRepository.save(materia);
    }

    public List<Materia> obtenerTodas() {
        return materiaRepository.findAll();
    }

    public List<MateriaResponseDTO> obtenerTodasDTO() {
        return materiaRepository.findAll().stream()
                .map(this::convertirADTO)
                .toList();
    }

    private MateriaResponseDTO convertirADTO(Materia materia) {
        return new MateriaResponseDTO(
                materia.getId(),
                materia.getNombre(),
                materia.getProfesor().getId(),
                materia.getProfesor().getNombre(),
                materia.getProfesor().getApellido()
        );
    }

    public Optional<Materia> obtenerPorId(Long id) {
        return materiaRepository.findById(id);
    }

    public Materia actualizar(Long id, MateriaRequestDTO materiaDto) {
        return materiaRepository.findById(id).map(m -> {
            // Buscar el nuevo profesor
            Profesor profesor = profesorRepository.findById(materiaDto.getProfesorId())
                    .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
            
            m.setNombre(materiaDto.getNombre());
            m.setProfesor(profesor);
            return materiaRepository.save(m);
        }).orElseThrow(() -> new RuntimeException("Materia no encontrada"));
    }

    public void eliminar(Long id) {
        materiaRepository.deleteById(id);
    }
}
