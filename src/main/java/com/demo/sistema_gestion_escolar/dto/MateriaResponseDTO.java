package com.demo.sistema_gestion_escolar.dto;

public class MateriaResponseDTO {
    
    private Long id;
    private String nombre;
    private Long profesorId;
    private String profesorNombre;
    private String profesorApellido;

    // Constructores
    public MateriaResponseDTO() {}

    public MateriaResponseDTO(Long id, String nombre, Long profesorId, String profesorNombre, String profesorApellido) {
        this.id = id;
        this.nombre = nombre;
        this.profesorId = profesorId;
        this.profesorNombre = profesorNombre;
        this.profesorApellido = profesorApellido;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getProfesorNombre() {
        return profesorNombre;
    }

    public void setProfesorNombre(String profesorNombre) {
        this.profesorNombre = profesorNombre;
    }

    public String getProfesorApellido() {
        return profesorApellido;
    }

    public void setProfesorApellido(String profesorApellido) {
        this.profesorApellido = profesorApellido;
    }
}