package com.demo.sistema_gestion_escolar.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class InscripcionRequestDTO {
    
    @NotNull(message = "El ID del alumno es obligatorio")
    private Long alumnoId;
    
    @NotNull(message = "El ID del curso es obligatorio")
    private Long cursoId;
    
    @NotBlank(message = "El estado es obligatorio")
    private String estado; // ACTIVO, FINALIZADO, ANULADO
    
    @NotNull(message = "La fecha de inscripción es obligatoria")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInscripcion;

    // Constructores
    public InscripcionRequestDTO() {}

    public InscripcionRequestDTO(Long alumnoId, Long cursoId, String estado, LocalDate fechaInscripcion) {
        this.alumnoId = alumnoId;
        this.cursoId = cursoId;
        this.estado = estado;
        this.fechaInscripcion = fechaInscripcion;
    }

    // Getters y setters
    public Long getAlumnoId() {
        return alumnoId;
    }

    public void setAlumnoId(Long alumnoId) {
        this.alumnoId = alumnoId;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDate getFechaInscripcion() {
        return fechaInscripcion;
    }

    public void setFechaInscripcion(LocalDate fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }
    
    @Override
    public String toString() {
        return "InscripcionRequestDTO{" +
                "alumnoId=" + alumnoId +
                ", cursoId=" + cursoId +
                ", estado='" + estado + '\'' +
                ", fechaInscripcion=" + fechaInscripcion +
                '}';
    }
}


