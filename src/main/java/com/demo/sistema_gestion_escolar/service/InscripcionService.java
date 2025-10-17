package com.demo.sistema_gestion_escolar.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.sistema_gestion_escolar.dto.InscripcionRequestDTO;
import com.demo.sistema_gestion_escolar.dto.InscripcionResponseDTO;
import com.demo.sistema_gestion_escolar.dto.InscripcionesBatchRequestDTO;
import com.demo.sistema_gestion_escolar.dto.InscripcionesBatchResponseDTO;
import com.demo.sistema_gestion_escolar.dto.InscripcionesBatchResponseDTO.InscripcionBatchErrorDTO;
import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.model.Curso;
import com.demo.sistema_gestion_escolar.model.Inscripcion;
import com.demo.sistema_gestion_escolar.model.Inscripcion.EstadoInscripcion;
import com.demo.sistema_gestion_escolar.repository.AlumnoRepository;
import com.demo.sistema_gestion_escolar.repository.CursoRepository;
import com.demo.sistema_gestion_escolar.repository.InscripcionRepository;

@Service
public class InscripcionService {

    @Autowired
    private InscripcionRepository inscripcionRepository;
    
    @Autowired
    private AlumnoRepository alumnoRepository;
    
    @Autowired
    private CursoRepository cursoRepository;

    public InscripcionResponseDTO crear(InscripcionRequestDTO inscripcionDto) {
        // Buscar el alumno por ID
        Alumno alumno = alumnoRepository.findById(inscripcionDto.getAlumnoId())
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
        
        // Buscar el curso por ID
        Curso curso = cursoRepository.findById(inscripcionDto.getCursoId())
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
        
        // Crear la inscripción
        Inscripcion inscripcion = new Inscripcion();
        inscripcion.setFechaInscripcion(inscripcionDto.getFechaInscripcion());
        inscripcion.setEstado(Inscripcion.EstadoInscripcion.valueOf(inscripcionDto.getEstado()));
        inscripcion.setAlumno(alumno);
        inscripcion.setCurso(curso);
        
        Inscripcion savedInscripcion = inscripcionRepository.save(inscripcion);
        return convertirADTO(savedInscripcion);
    }

    public List<InscripcionResponseDTO> obtenerTodas() {
        return inscripcionRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public Optional<InscripcionResponseDTO> obtenerPorId(Long id) {
        return inscripcionRepository.findById(id)
                .map(this::convertirADTO);
    }

    public InscripcionResponseDTO actualizar(Long id, InscripcionRequestDTO inscripcionDto) {
        return inscripcionRepository.findById(id).map(i -> {
            // Buscar el nuevo alumno si se cambió
            if (!i.getAlumno().getId().equals(inscripcionDto.getAlumnoId())) {
                Alumno alumno = alumnoRepository.findById(inscripcionDto.getAlumnoId())
                        .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
                i.setAlumno(alumno);
            }
            
            // Buscar el nuevo curso si se cambió
            if (!i.getCurso().getId().equals(inscripcionDto.getCursoId())) {
                Curso curso = cursoRepository.findById(inscripcionDto.getCursoId())
                        .orElseThrow(() -> new RuntimeException("Curso no encontrado"));
                i.setCurso(curso);
            }
            
            i.setFechaInscripcion(inscripcionDto.getFechaInscripcion());
            i.setEstado(Inscripcion.EstadoInscripcion.valueOf(inscripcionDto.getEstado()));
            
            Inscripcion savedInscripcion = inscripcionRepository.save(i);
            return convertirADTO(savedInscripcion);
        }).orElseThrow(() -> new RuntimeException("Inscripción no encontrada"));
    }

    public void eliminar(Long id) {
        inscripcionRepository.deleteById(id);
    }
    
    private InscripcionResponseDTO convertirADTO(Inscripcion inscripcion) {
        return new InscripcionResponseDTO(
                inscripcion.getId(),
                inscripcion.getFechaInscripcion(),
                inscripcion.getEstado().name(),
                inscripcion.getAlumno().getId(),
                inscripcion.getAlumno().getNombre(),
                inscripcion.getAlumno().getApellido(),
                inscripcion.getAlumno().getEmail(),
                inscripcion.getCurso().getId(),
                inscripcion.getCurso().getNombre(),
                inscripcion.getCurso().getDescripcion(),
                inscripcion.getCurso().getAnio(),
                inscripcion.getCurso().getDivision(),
                inscripcion.getCurso().getActivo()
        );
    }
    
    public InscripcionesBatchResponseDTO crearInscripcionesEnLote(InscripcionesBatchRequestDTO batchRequest) {
        List<InscripcionResponseDTO> exitosas = new ArrayList<>();
        List<InscripcionBatchErrorDTO> errores = new ArrayList<>();
        
        // Verificar que el curso existe
        Optional<Curso> cursoOpt = cursoRepository.findById(batchRequest.getCursoId());
        if (cursoOpt.isEmpty()) {
            throw new RuntimeException("Curso no encontrado con ID: " + batchRequest.getCursoId());
        }
        
        Curso curso = cursoOpt.get();
        EstadoInscripcion estado = EstadoInscripcion.valueOf(batchRequest.getEstado());
        
        for (Long alumnoId : batchRequest.getAlumnosIds()) {
            try {
                // Verificar que el alumno existe
                Optional<Alumno> alumnoOpt = alumnoRepository.findById(alumnoId);
                if (alumnoOpt.isEmpty()) {
                    errores.add(new InscripcionBatchErrorDTO(alumnoId, "Desconocido", "Desconocido", 
                        "Alumno no encontrado con ID: " + alumnoId));
                    continue;
                }
                
                Alumno alumno = alumnoOpt.get();
                
                // Verificar que no existe una inscripción previa del mismo alumno al mismo curso
                if (inscripcionRepository.findByAlumnoAndCurso(alumno, curso).isPresent()) {
                    errores.add(new InscripcionBatchErrorDTO(alumnoId, alumno.getNombre(), alumno.getApellido(), 
                        "El alumno ya está inscrito en este curso"));
                    continue;
                }
                
                // Crear y guardar la inscripción
                Inscripcion inscripcion = new Inscripcion();
                inscripcion.setAlumno(alumno);
                inscripcion.setCurso(curso);
                inscripcion.setFechaInscripcion(batchRequest.getFechaInscripcion());
                inscripcion.setEstado(estado);
                
                Inscripcion inscripcionGuardada = inscripcionRepository.save(inscripcion);
                
                // Convertir a DTO de respuesta
                InscripcionResponseDTO responseDTO = convertirADTO(inscripcionGuardada);
                exitosas.add(responseDTO);
                
            } catch (Exception e) {
                Optional<Alumno> alumnoOpt = alumnoRepository.findById(alumnoId);
                String nombre = alumnoOpt.map(Alumno::getNombre).orElse("Desconocido");
                String apellido = alumnoOpt.map(Alumno::getApellido).orElse("Desconocido");
                
                errores.add(new InscripcionBatchErrorDTO(alumnoId, nombre, apellido, 
                    "Error al crear inscripción: " + e.getMessage()));
            }
        }
        
        return new InscripcionesBatchResponseDTO(exitosas, errores, curso.getId(), curso.getNombre());
    }
}
