package com.demo.sistema_gestion_escolar.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class DictadoRequestDTO {
    
    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDate fechaInicio;
    
    @NotNull(message = "La fecha de fin es obligatoria")
    private LocalDate fechaFin;
    
    @NotNull(message = "El estado activo es obligatorio")
    private Boolean activo;
    
    @NotNull(message = "El ID del curso es obligatorio")
    private Long cursoId;
    
    @NotNull(message = "El ID de la materia es obligatorio")
    private Long materiaId;

    // Constructores
    public DictadoRequestDTO() {}

    public DictadoRequestDTO(LocalDate fechaInicio, LocalDate fechaFin, Boolean activo, Long cursoId, Long materiaId) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.activo = activo;
        this.cursoId = cursoId;
        this.materiaId = materiaId;
    }

    // Getters y setters
    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public Long getMateriaId() {
        return materiaId;
    }

    public void setMateriaId(Long materiaId) {
        this.materiaId = materiaId;
    }
}