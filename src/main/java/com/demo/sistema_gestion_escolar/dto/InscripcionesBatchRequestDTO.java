package com.demo.sistema_gestion_escolar.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class InscripcionesBatchRequestDTO {
    
    @NotNull(message = "El ID del curso es obligatorio")
    private Long cursoId;
    
    @NotEmpty(message = "La lista de alumnos no puede estar vacía")
    @Size(max = 50, message = "No se pueden inscribir más de 50 alumnos a la vez")
    private List<Long> alumnosIds;
    
    @NotNull(message = "La fecha de inscripción es obligatoria")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInscripcion;
    
    private String estado = "ACTIVO"; // Por defecto ACTIVO

    // Constructores
    public InscripcionesBatchRequestDTO() {}

    public InscripcionesBatchRequestDTO(Long cursoId, List<Long> alumnosIds, LocalDate fechaInscripcion, String estado) {
        this.cursoId = cursoId;
        this.alumnosIds = alumnosIds;
        this.fechaInscripcion = fechaInscripcion;
        this.estado = estado;
    }

    // Getters y setters
    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public List<Long> getAlumnosIds() {
        return alumnosIds;
    }

    public void setAlumnosIds(List<Long> alumnosIds) {
        this.alumnosIds = alumnosIds;
    }

    public LocalDate getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(LocalDate fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "InscripcionesBatchRequestDTO{" +
                "cursoId=" + cursoId +
                ", alumnosIds=" + (alumnosIds != null ? alumnosIds.size() + " alumnos" : "null") +
                ", fechaInscripcion=" + fechaInscripcion +
                ", estado='" + estado + '\'' +
                '}';
    }
}