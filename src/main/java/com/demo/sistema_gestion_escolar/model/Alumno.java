package com.demo.sistema_gestion_escolar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity //La entidad marca la tabla
@Table(name="alumnos") //Nombre de la tabla
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(nullable = false)
    private String nombre;

    @NotBlank(message = "El apellido no puede estar vacío")
    @Column(nullable = false)
    private String apellido;

    @NotBlank(message = "El email no puede estar vacío")
    @Email(message = "El email debe tener un formato válido")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull(message = "La fecha de nacimiento no puede estar vacía")
    @Column(name = "fecha_nacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    public Alumno(){}

    public Alumno(String nombre, String apellido, String email, LocalDate fechaNacimiento){
        this.nombre= nombre;
        this.apellido= apellido;
        this.email= email;
        this.fechaNacimiento= fechaNacimiento;
    }

    public Alumno(String nombre, String apellido, String email, LocalDate fechaNacimiento, String contrasena){
        this.nombre= nombre;
        this.apellido= apellido;
        this.email= email;
        this.fechaNacimiento= fechaNacimiento;
        this.contrasena= contrasena;
    }

    //Getters y setters NECESARIOS PARA JPA
    public Long getId(){
        return Id;
    }
    public void setId(Long Id){
        this.Id=Id;
    }
    public String getNombre(){
        return nombre;
    }
    public void setNombre(String Nombre){
        this.nombre=Nombre;
    }
    public String getApellido(){
        return apellido;
    }
    public void setApellido(String Apellido){
        this.apellido=Apellido;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String Email){
        this.email=Email;
    }
    public LocalDate getFechaNacimiento(){
        return fechaNacimiento;
    }
    public void setFechaNacimiento(LocalDate fechaNacimiento){
        this.fechaNacimiento=fechaNacimiento;
    }
    public String getContrasena(){
        return contrasena;
    }
    public void setContrasena(String contrasena){
        this.contrasena=contrasena;
    }
}
