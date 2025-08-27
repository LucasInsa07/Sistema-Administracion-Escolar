package com.demo.sistema_gestion_escolar.repository;

import com.demo.sistema_gestion_escolar.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long> {
}
