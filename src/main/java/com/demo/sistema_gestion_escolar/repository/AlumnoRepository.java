package com.demo.sistema_gestion_escolar.repository;

import com.demo.sistema_gestion_escolar.model.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    Optional<Alumno> findByEmail(String email);
}
