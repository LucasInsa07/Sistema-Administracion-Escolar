package com.demo.sistema_gestion_escolar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MateriaRequestDTO {
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    @NotNull(message = "El profesor es obligatorio")
    private Long profesorId;

    // Constructores
    public MateriaRequestDTO() {}

    public MateriaRequestDTO(String nombre, Long profesorId) {
        this.nombre = nombre;
        this.profesorId = profesorId;
    }

    // Getters y setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getProfesorId() {
        return profesorId;
    }

    public void setProfesorId(Long profesorId) {
        this.profesorId = profesorId;
    }
}