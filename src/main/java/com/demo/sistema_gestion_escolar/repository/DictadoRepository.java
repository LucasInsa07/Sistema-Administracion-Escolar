package com.demo.sistema_gestion_escolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.sistema_gestion_escolar.model.Dictado;

public interface DictadoRepository extends JpaRepository<Dictado, Long> {
}
// Este repositorio permite realizar operaciones CRUD sobre la entidad Dictado.
// Extiende JpaRepository, lo que proporciona métodos predefinidos para manejar la persistencia