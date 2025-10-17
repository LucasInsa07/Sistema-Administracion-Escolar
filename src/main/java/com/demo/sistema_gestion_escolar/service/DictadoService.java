package com.demo.sistema_gestion_escolar.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.sistema_gestion_escolar.dto.DictadoRequestDTO;
import com.demo.sistema_gestion_escolar.dto.DictadoResponseDTO;
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

    public DictadoResponseDTO crear(DictadoRequestDTO dictadoDto) {
        // Verificar si el curso existe
        Optional<Curso> cursoExistente = cursoRepository.findById(dictadoDto.getCursoId());
        if (!cursoExistente.isPresent()) {
            throw new IllegalArgumentException("El curso con ID " + dictadoDto.getCursoId() + " no existe");
        }
        
        // Verificar si la materia existe
        Optional<Materia> materiaExistente = materiaRepository.findById(dictadoDto.getMateriaId());
        if (!materiaExistente.isPresent()) {
            throw new IllegalArgumentException("La materia con ID " + dictadoDto.getMateriaId() + " no existe");
        }
        
        // Crear nueva entidad
        Dictado dictado = new Dictado();
        dictado.setFechaInicio(dictadoDto.getFechaInicio());
        dictado.setFechaFin(dictadoDto.getFechaFin());
        dictado.setActivo(dictadoDto.getActivo());
        dictado.setCurso(cursoExistente.get());
        dictado.setMateria(materiaExistente.get());
        
        Dictado savedDictado = dictadoRepository.save(dictado);
        return convertirADTO(savedDictado);
    }

    public List<DictadoResponseDTO> obtenerTodos() {
        return dictadoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public Optional<DictadoResponseDTO> obtenerPorId(Long id) {
        return dictadoRepository.findById(id)
                .map(this::convertirADTO);
    }

    public DictadoResponseDTO actualizar(Long id, DictadoRequestDTO dictadoDto) {
        return dictadoRepository.findById(id).map(d -> {
            // Verificar si el curso existe
            Optional<Curso> cursoExistente = cursoRepository.findById(dictadoDto.getCursoId());
            if (!cursoExistente.isPresent()) {
                throw new IllegalArgumentException("El curso con ID " + dictadoDto.getCursoId() + " no existe");
            }
            
            // Verificar si la materia existe
            Optional<Materia> materiaExistente = materiaRepository.findById(dictadoDto.getMateriaId());
            if (!materiaExistente.isPresent()) {
                throw new IllegalArgumentException("La materia con ID " + dictadoDto.getMateriaId() + " no existe");
            }
            
            // Actualizar campos
            d.setFechaInicio(dictadoDto.getFechaInicio());
            d.setFechaFin(dictadoDto.getFechaFin());
            d.setActivo(dictadoDto.getActivo());
            d.setCurso(cursoExistente.get());
            d.setMateria(materiaExistente.get());
            
            return convertirADTO(dictadoRepository.save(d));
        }).orElseThrow(() -> new RuntimeException("Dictado no encontrado"));
    }

    public void eliminar(Long id) {
        dictadoRepository.deleteById(id);
    }
    
    private DictadoResponseDTO convertirADTO(Dictado dictado) {
        return new DictadoResponseDTO(
                dictado.getId(),
                dictado.getFechaInicio(),
                dictado.getFechaFin(),
                dictado.getActivo(),
                dictado.getCurso().getId(),
                dictado.getCurso().getNombre(),
                dictado.getCurso().getDescripcion(),
                dictado.getCurso().getAnio(),
                dictado.getCurso().getDivision(),
                dictado.getMateria().getId(),
                dictado.getMateria().getNombre(),
                dictado.getMateria().getProfesor().getId(),
                dictado.getMateria().getProfesor().getNombre(),
                dictado.getMateria().getProfesor().getApellido()
        );
    }

    public Optional<Dictado> obtenerEntidadPorId(Long id) {
        return dictadoRepository.findById(id);
    }
}
// Este servicio permite manejar la lógica de negocio relacionada con los dictados.
// Proporciona métodos para crear, obtener, actualizar y eliminar dictados, interactuando con el repositorio correspondiente.