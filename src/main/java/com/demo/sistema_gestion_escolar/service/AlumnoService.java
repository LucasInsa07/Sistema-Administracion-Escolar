package com.demo.sistema_gestion_escolar.service;

import com.demo.sistema_gestion_escolar.model.Alumno; //Entidad que representa un alumno en la base de datos
import com.demo.sistema_gestion_escolar.repository.AlumnoRepository; //Interfaz que maneja operaciones con la base de datos.
import org.springframework.beans.factory.annotation.Autowired; //SB inyecta automaticamente dependencias configuradas y funcionales.
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;

    public Alumno crearAlumno(Alumno alumno){
    return alumnoRepository.save(alumno);
    }
    public List<Alumno> crearAlumnosEnLote(List<Alumno> alumnos) {
        return alumnoRepository.saveAll(alumnos);
    }
    public List<Alumno> obtenerTodos(){
        return alumnoRepository.findAll();
    }
    public Optional<Alumno> obtenerPorId(Long id){
        return alumnoRepository.findById(id);
    }
    public Alumno actualizarAlumno(Long id, Alumno alumnoNuevo) {
        return alumnoRepository.findById(id)
                .map(alumno -> {
                    alumno.setNombre(alumnoNuevo.getNombre());
                    alumno.setApellido(alumnoNuevo.getApellido());
                    alumno.setEmail(alumnoNuevo.getEmail());
                    return alumnoRepository.save(alumno);
                })
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
    }
    public void eliminarAlumno(Long id) {
        alumnoRepository.deleteById(id);
    }

}
