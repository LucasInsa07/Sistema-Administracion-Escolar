package com.demo.sistema_gestion_escolar.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class InscripcionRequestDTO {
    @NotNull
    public LocalDate fechaInscripcion;
    @NotNull
    public String estado; // ACTIVO, FINALIZADO, ANULADO
    @NotNull
    public Long alumnoId;
    @NotNull
    public Long cursoId;
}


