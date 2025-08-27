package com.demo.sistema_gestion_escolar.repository;

import com.demo.sistema_gestion_escolar.model.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {
}
