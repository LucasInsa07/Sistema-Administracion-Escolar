package com.demo.sistema_gestion_escolar.repository;

import com.demo.sistema_gestion_escolar.model.Materia;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MateriaRepository extends JpaRepository<Materia, Long> {
}
