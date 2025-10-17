package com.demo.sistema_gestion_escolar.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

public class InscripcionResponseDTO {
    
    private Long id;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInscripcion;
    
    private String estado;
    
    // Datos del alumno aplastados
    private Long alumnoId;
    private String alumnoNombre;
    private String alumnoApellido;
    private String alumnoEmail;
    
    // Datos del curso aplastados
    private Long cursoId;
    private String cursoNombre;
    private String cursoDescripcion;
    private Integer cursoAnio;
    private String cursoDivision;
    private Boolean cursoActivo;

    // Constructores
    public InscripcionResponseDTO() {}

    public InscripcionResponseDTO(Long id, LocalDate fechaInscripcion, String estado,
                                 Long alumnoId, String alumnoNombre, String alumnoApellido, String alumnoEmail,
                                 Long cursoId, String cursoNombre, String cursoDescripcion, 
                                 Integer cursoAnio, String cursoDivision, Boolean cursoActivo) {
        this.id = id;
        this.fechaInscripcion = fechaInscripcion;
        this.estado = estado;
        this.alumnoId = alumnoId;
        this.alumnoNombre = alumnoNombre;
        this.alumnoApellido = alumnoApellido;
        this.alumnoEmail = alumnoEmail;
        this.cursoId = cursoId;
        this.cursoNombre = cursoNombre;
        this.cursoDescripcion = cursoDescripcion;
        this.cursoAnio = cursoAnio;
        this.cursoDivision = cursoDivision;
        this.cursoActivo = cursoActivo;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getAlumnoId() {
        return alumnoId;
    }

    public void setAlumnoId(Long alumnoId) {
        this.alumnoId = alumnoId;
    }

    public String getAlumnoNombre() {
        return alumnoNombre;
    }

    public void setAlumnoNombre(String alumnoNombre) {
        this.alumnoNombre = alumnoNombre;
    }

    public String getAlumnoApellido() {
        return alumnoApellido;
    }

    public void setAlumnoApellido(String alumnoApellido) {
        this.alumnoApellido = alumnoApellido;
    }

    public String getAlumnoEmail() {
        return alumnoEmail;
    }

    public void setAlumnoEmail(String alumnoEmail) {
        this.alumnoEmail = alumnoEmail;
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

    public Boolean getCursoActivo() {
        return cursoActivo;
    }

    public void setCursoActivo(Boolean cursoActivo) {
        this.cursoActivo = cursoActivo;
    }
}


