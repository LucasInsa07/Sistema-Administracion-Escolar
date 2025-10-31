package com.demo.sistema_gestion_escolar.dto;

import java.time.LocalDate;

public class AlumnoResponseDTO {
    public Long id;
    public String nombre;
    public String apellido;
    public String email;
    public LocalDate fechaNacimiento;
    // Nota: La contraseña NUNCA se expone en las respuestas por seguridad
}


