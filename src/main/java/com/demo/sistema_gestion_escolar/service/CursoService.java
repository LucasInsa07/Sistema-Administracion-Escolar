package com.demo.sistema_gestion_escolar.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.sistema_gestion_escolar.dto.CursoRequestDTO;
import com.demo.sistema_gestion_escolar.dto.CursoResponseDTO;
import com.demo.sistema_gestion_escolar.model.Curso;
import com.demo.sistema_gestion_escolar.repository.CursoRepository;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public CursoResponseDTO crear(CursoRequestDTO cursoDto) {
        Curso curso = new Curso();
        curso.setNombre(cursoDto.getNombre());
        curso.setDescripcion(cursoDto.getDescripcion());
        curso.setAnio(cursoDto.getAnio());
        curso.setDivision(cursoDto.getDivision());
        curso.setActivo(cursoDto.getActivo());
        
        Curso savedCurso = cursoRepository.save(curso);
        return convertirADTO(savedCurso);
    }

    public List<CursoResponseDTO> obtenerTodos() {
        return cursoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public Optional<CursoResponseDTO> obtenerPorId(Long id) {
        return cursoRepository.findById(id)
                .map(this::convertirADTO);
    }

    public CursoResponseDTO actualizar(Long id, CursoRequestDTO cursoDto) {
        return cursoRepository.findById(id).map(c -> {
            c.setNombre(cursoDto.getNombre());
            c.setDescripcion(cursoDto.getDescripcion());
            c.setAnio(cursoDto.getAnio());
            c.setDivision(cursoDto.getDivision());
            c.setActivo(cursoDto.getActivo());
            return convertirADTO(cursoRepository.save(c));
        }).orElseThrow(() -> new RuntimeException("Curso no encontrado"));
    }

    public void eliminar(Long id) {
        cursoRepository.deleteById(id);
    }

    private CursoResponseDTO convertirADTO(Curso curso) {
        return new CursoResponseDTO(
                curso.getId(),
                curso.getNombre(),
                curso.getDescripcion(),
                curso.getAnio(),
                curso.getDivision(),
                curso.getActivo(),
                null, // fechaCreacion - no disponible en BaseEntity actual
                null  // fechaActualizacion - no disponible en BaseEntity actual
        );
    }

    public Optional<Curso> obtenerEntidadPorId(Long id) {
        return cursoRepository.findById(id);
    }
}
