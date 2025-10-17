package com.demo.sistema_gestion_escolar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class MateriaRequestDTO {
    
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    
    @NotNull(message = "El profesor es obligatorio")
    private Long profesorId;

    // Horario (opcionales)
    @Size(max = 15, message = "diaSemana inválido")
    private String diaSemana;

    @Pattern(regexp = "^$|^([01]\\d|2[0-3]):([0-5]\\d)$", message = "horaInicio debe tener formato HH:mm")
    private String horaInicio;

    @Pattern(regexp = "^$|^([01]\\d|2[0-3]):([0-5]\\d)$", message = "horaFin debe tener formato HH:mm")
    private String horaFin;

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

    public String getDiaSemana() {
        return diaSemana;
    }

    public void setDiaSemana(String diaSemana) {
        this.diaSemana = diaSemana;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }
}