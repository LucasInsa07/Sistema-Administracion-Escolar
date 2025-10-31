package com.demo.sistema_gestion_escolar.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class AlumnoRequestDTO {
    @NotBlank(message = "El nombre no puede estar vacío")
    public String nombre;

    @NotBlank(message = "El apellido no puede estar vacío")
    public String apellido;

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe tener un formato válido")
    public String email;

    @NotNull(message = "La fecha de nacimiento no puede estar vacía")
    public LocalDate fechaNacimiento;
}


