package com.demo.sistema_gestion_escolar.repository;

import com.demo.sistema_gestion_escolar.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}
