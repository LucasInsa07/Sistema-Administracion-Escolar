package com.demo.sistema_gestion_escolar.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.model.Curso;
import com.demo.sistema_gestion_escolar.model.Inscripcion;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
    
    Optional<Inscripcion> findByAlumnoAndCurso(Alumno alumno, Curso curso);
    
    // OPTIMIZACIÓN: Consulta con JOIN FETCH para evitar N+1 queries
    @Query("SELECT i FROM Inscripcion i " +
           "JOIN FETCH i.alumno " +
           "JOIN FETCH i.curso " +
           "WHERE i.id = :id")
    Optional<Inscripcion> findByIdWithAlumnoAndCurso(Long id);
    
    // OPTIMIZACIÓN: Traer todas las inscripciones con alumno y curso en una sola query
    @Query("SELECT i FROM Inscripcion i " +
           "JOIN FETCH i.alumno " +
           "JOIN FETCH i.curso")
    List<Inscripcion> findAllWithAlumnoAndCurso();
}
