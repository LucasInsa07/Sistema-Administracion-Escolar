package com.demo.sistema_gestion_escolar.dto;

import java.time.LocalDate;

public class DictadoResponseDTO {
    
    private Long id;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Boolean activo;
    
    // Información del curso
    private Long cursoId;
    private String cursoNombre;
    private String cursoDescripcion;
    private Integer cursoAnio;
    private String cursoDivision;
    
    // Información de la materia
    private Long materiaId;
    private String materiaNombre;
    private Long materiaProfesorId;
    private String materiaProfesorNombre;
    private String materiaProfesorApellido;

    // Constructores
    public DictadoResponseDTO() {}

    public DictadoResponseDTO(Long id, LocalDate fechaInicio, LocalDate fechaFin, Boolean activo,
                             Long cursoId, String cursoNombre, String cursoDescripcion, Integer cursoAnio, String cursoDivision,
                             Long materiaId, String materiaNombre, Long materiaProfesorId, 
                             String materiaProfesorNombre, String materiaProfesorApellido) {
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.activo = activo;
        this.cursoId = cursoId;
        this.cursoNombre = cursoNombre;
        this.cursoDescripcion = cursoDescripcion;
        this.cursoAnio = cursoAnio;
        this.cursoDivision = cursoDivision;
        this.materiaId = materiaId;
        this.materiaNombre = materiaNombre;
        this.materiaProfesorId = materiaProfesorId;
        this.materiaProfesorNombre = materiaProfesorNombre;
        this.materiaProfesorApellido = materiaProfesorApellido;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getCursoNombre() {
        return cursoNombre;
    }

    public void setCursoNombre(String cursoNombre) {
        this.cursoNombre = cursoNombre;
    }

    public String getCursoDescripcion() {
        return cursoDescripcion;
    }

    public void setCursoDescripcion(String cursoDescripcion) {
        this.cursoDescripcion = cursoDescripcion;
    }

    public Integer getCursoAnio() {
        return cursoAnio;
    }

    public void setCursoAnio(Integer cursoAnio) {
        this.cursoAnio = cursoAnio;
    }

    public String getCursoDivision() {
        return cursoDivision;
    }

    public void setCursoDivision(String cursoDivision) {
        this.cursoDivision = cursoDivision;
    }

    public Long getMateriaId() {
        return materiaId;
    }

    public void setMateriaId(Long materiaId) {
        this.materiaId = materiaId;
    }

    public String getMateriaNombre() {
        return materiaNombre;
    }

    public void setMateriaNombre(String materiaNombre) {
        this.materiaNombre = materiaNombre;
    }

    public Long getMateriaProfesorId() {
        return materiaProfesorId;
    }

    public void setMateriaProfesorId(Long materiaProfesorId) {
        this.materiaProfesorId = materiaProfesorId;
    }

    public String getMateriaProfesorNombre() {
        return materiaProfesorNombre;
    }

    public void setMateriaProfesorNombre(String materiaProfesorNombre) {
        this.materiaProfesorNombre = materiaProfesorNombre;
    }

    public String getMateriaProfesorApellido() {
        return materiaProfesorApellido;
    }

    public void setMateriaProfesorApellido(String materiaProfesorApellido) {
        this.materiaProfesorApellido = materiaProfesorApellido;
    }
}