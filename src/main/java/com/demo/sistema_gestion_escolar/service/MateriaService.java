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
        
        // Validar horarios (si vienen)
        validarHorarios(materiaDto.getHoraInicio(), materiaDto.getHoraFin());

        // Crear la materia
        Materia materia = new Materia();
        materia.setNombre(materiaDto.getNombre());
        materia.setProfesor(profesor);
        materia.setDiaSemana(materiaDto.getDiaSemana());
        materia.setHoraInicio(materiaDto.getHoraInicio());
        materia.setHoraFin(materiaDto.getHoraFin());

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

    public MateriaResponseDTO convertirADTO(Materia materia) {
    return new MateriaResponseDTO(
        materia.getId(),
        materia.getNombre(),
        materia.getProfesor().getId(),
        materia.getProfesor().getNombre(),
        materia.getProfesor().getApellido(),
        materia.getDiaSemana(),
        materia.getHoraInicio(),
        materia.getHoraFin()
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
            // Validar horarios
            validarHorarios(materiaDto.getHoraInicio(), materiaDto.getHoraFin());

            m.setNombre(materiaDto.getNombre());
            m.setProfesor(profesor);
            m.setDiaSemana(materiaDto.getDiaSemana());
            m.setHoraInicio(materiaDto.getHoraInicio());
            m.setHoraFin(materiaDto.getHoraFin());
            return materiaRepository.save(m);
        }).orElseThrow(() -> new RuntimeException("Materia no encontrada"));
    }

    // Valida que si ambas horas están provistas, horaFin sea posterior a horaInicio
    private void validarHorarios(String horaInicio, String horaFin) {
        if (horaInicio != null && !horaInicio.isBlank() && horaFin != null && !horaFin.isBlank()) {
            try {
                int inicio = parseHoraAMinutos(horaInicio);
                int fin = parseHoraAMinutos(horaFin);
                if (fin <= inicio) {
                    throw new RuntimeException("horaFin debe ser posterior a horaInicio");
                }
            } catch (NumberFormatException e) {
                throw new RuntimeException("Formato de hora inválido, debe ser HH:mm");
            }
        }
    }

    private int parseHoraAMinutos(String hora) {
        String[] parts = hora.split(":");
        if (parts.length != 2) throw new NumberFormatException();
        int h = Integer.parseInt(parts[0]);
        int m = Integer.parseInt(parts[1]);
        return h * 60 + m;
    }

    public void eliminar(Long id) {
        materiaRepository.deleteById(id);
    }
}
