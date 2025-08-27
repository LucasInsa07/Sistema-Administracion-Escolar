package com.demo.sistema_gestion_escolar.repository;

import com.demo.sistema_gestion_escolar.model.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    Long id(long id);
}
