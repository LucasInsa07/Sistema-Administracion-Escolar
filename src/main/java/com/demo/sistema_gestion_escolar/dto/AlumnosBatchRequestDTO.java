package com.demo.sistema_gestion_escolar.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class AlumnosBatchRequestDTO {
    
    @NotEmpty(message = "La lista de alumnos no puede estar vacía")
    @Size(max = 50, message = "No se pueden crear más de 50 alumnos a la vez")
    @Valid
    private List<AlumnoRequestDTO> alumnos;

    // Constructores
    public AlumnosBatchRequestDTO() {}

    public AlumnosBatchRequestDTO(List<AlumnoRequestDTO> alumnos) {
        this.alumnos = alumnos;
    }

    // Getters y setters
    public List<AlumnoRequestDTO> getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(List<AlumnoRequestDTO> alumnos) {
        this.alumnos = alumnos;
    }

    @Override
    public String toString() {
        return "AlumnosBatchRequestDTO{" +
                "alumnos=" + (alumnos != null ? alumnos.size() + " alumnos" : "null") +
                '}';
    }
}