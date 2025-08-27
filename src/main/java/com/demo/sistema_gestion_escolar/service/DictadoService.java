package com.demo.sistema_gestion_escolar.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.sistema_gestion_escolar.model.Curso;
import com.demo.sistema_gestion_escolar.model.Dictado;
import com.demo.sistema_gestion_escolar.model.Materia;
import com.demo.sistema_gestion_escolar.repository.CursoRepository;
import com.demo.sistema_gestion_escolar.repository.DictadoRepository;
import com.demo.sistema_gestion_escolar.repository.MateriaRepository;

@Service
public class DictadoService {

    @Autowired
    private DictadoRepository dictadoRepository;
    
    @Autowired
    private CursoRepository cursoRepository;
    
    @Autowired
    private MateriaRepository materiaRepository;

    public Dictado crear(Dictado dictado) {
        // Verificar si el curso existe
        if (dictado.getCurso() == null || dictado.getCurso().getId() == null) {
            throw new IllegalArgumentException("El curso no puede ser nulo");
        }
        
        Optional<Curso> cursoExistente = cursoRepository.findById(dictado.getCurso().getId());
        if (!cursoExistente.isPresent()) {
            throw new IllegalArgumentException("El curso con ID " + dictado.getCurso().getId() + " no existe");
        }
        
        // Verificar si la materia existe
        if (dictado.getMateria() == null || dictado.getMateria().getId() == null) {
            throw new IllegalArgumentException("La materia no puede ser nula");
        }
        
        Optional<Materia> materiaExistente = materiaRepository.findById(dictado.getMateria().getId());
        if (!materiaExistente.isPresent()) {
            throw new IllegalArgumentException("La materia con ID " + dictado.getMateria().getId() + " no existe");
        }
        
        // Asignar las entidades completas y no solo los IDs
        dictado.setCurso(cursoExistente.get());
        dictado.setMateria(materiaExistente.get());
        
        return dictadoRepository.save(dictado);
    }

    public List<Dictado> obtenerTodos() {
        return dictadoRepository.findAll();
    }

    public Optional<Dictado> obtenerPorId(Long id) {
        return dictadoRepository.findById(id);
    }

    public Dictado actualizar(Long id, Dictado datos) {
        return dictadoRepository.findById(id).map(d -> {
            // Verificar si el curso existe
            if (datos.getCurso() != null && datos.getCurso().getId() != null) {
                Optional<Curso> cursoExistente = cursoRepository.findById(datos.getCurso().getId());
                if (!cursoExistente.isPresent()) {
                    throw new IllegalArgumentException("El curso con ID " + datos.getCurso().getId() + " no existe");
                }
                d.setCurso(cursoExistente.get());
            }
            
            // Verificar si la materia existe
            if (datos.getMateria() != null && datos.getMateria().getId() != null) {
                Optional<Materia> materiaExistente = materiaRepository.findById(datos.getMateria().getId());
                if (!materiaExistente.isPresent()) {
                    throw new IllegalArgumentException("La materia con ID " + datos.getMateria().getId() + " no existe");
                }
                d.setMateria(materiaExistente.get());
            }
            
            // Actualizar fechas si se proporcionan
            if (datos.getFechaInicio() != null) {
                d.setFechaInicio(datos.getFechaInicio());
            }
            
            if (datos.getFechaFin() != null) {
                d.setFechaFin(datos.getFechaFin());
            }
            
            return dictadoRepository.save(d);
        }).orElseThrow(() -> new RuntimeException("Dictado no encontrado"));
    }

    public void eliminar(Long id) {
        dictadoRepository.deleteById(id);
    }
    
    /**
     * Convierte un Dictado a un DTO para evitar recursión infinita en la serialización JSON
     */
    public Map<String, Object> obtenerDictadoDTO(Dictado dictado) {
        Map<String, Object> dictadoDTO = new HashMap<>();
        dictadoDTO.put("id", dictado.getId());
        dictadoDTO.put("fechaInicio", dictado.getFechaInicio());
        dictadoDTO.put("fechaFin", dictado.getFechaFin());
        
        // Información resumida del curso
        Map<String, Object> cursoDTO = new HashMap<>();
        cursoDTO.put("id", dictado.getCurso().getId());
        cursoDTO.put("nombre", dictado.getCurso().getNombre());
        dictadoDTO.put("curso", cursoDTO);
        
        // Información resumida de la materia
        Map<String, Object> materiaDTO = new HashMap<>();
        materiaDTO.put("id", dictado.getMateria().getId());
        materiaDTO.put("nombre", dictado.getMateria().getNombre());
        dictadoDTO.put("materia", materiaDTO);
        
        return dictadoDTO;
    }
    
    /**
     * Convierte una lista de Dictados a DTOs
     */
    public List<Map<String, Object>> obtenerDictadosDTO(List<Dictado> dictados) {
        return dictados.stream()
            .map(this::obtenerDictadoDTO)
            .collect(Collectors.toList());
    }
}
// Este servicio permite manejar la lógica de negocio relacionada con los dictados.
// Proporciona métodos para crear, obtener, actualizar y eliminar dictados, interactuando con el repositorio correspondiente.