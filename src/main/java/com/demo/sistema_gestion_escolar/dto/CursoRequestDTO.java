package com.demo.sistema_gestion_escolar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CursoRequestDTO {
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 50, message = "El nombre no puede exceder 50 caracteres")
    private String nombre;
    
    @Size(max = 500, message = "La descripción no puede exceder 500 caracteres")
    private String descripcion;
    
    @NotNull(message = "El año es obligatorio")
    private Integer anio;
    
    @NotBlank(message = "La división es obligatoria")
    @Size(max = 1, message = "La división debe ser de 1 carácter")
    private String division;
    
    @NotNull(message = "El estado activo es obligatorio")
    private Boolean activo;

    // Constructores
    public CursoRequestDTO() {}

    public CursoRequestDTO(String nombre, String descripcion, Integer anio, String division, Boolean activo) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.anio = anio;
        this.division = division;
        this.activo = activo;
    }

    // Getters y setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}