package com.demo.sistema_gestion_escolar.model;

import jakarta.persistence.*;

@Entity
@Table(name = "administrador")
public class Administrador extends BaseEntity {

    @Column(nullable = false, length = 50, unique = true)
    private String usuario;

    @Column(nullable = false, length = 255)
    private String contraseña;

    @Column(nullable = false, length = 20)
    private String rol; // Ej: ADMIN, SUPERADMIN

    // Getters y setters

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
