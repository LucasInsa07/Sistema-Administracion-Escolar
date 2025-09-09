package com.demo.sistema_gestion_escolar.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrador")
public class Administrador extends BaseEntity {

    @Column(nullable = false, length = 50, unique = true)
    private String usuario;

    @Column(nullable = false, length = 255)
    private String contrasena;

    @Column(nullable = false, length = 20)
    private String rol; // Ej: ADMIN, SUPERADMIN

    // Getters y setters

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        if (rol == null) {
            throw new IllegalArgumentException("El rol no puede ser nulo");
        }
        String upper = rol.trim().toUpperCase();
        if (!upper.equals("ADMIN") && !upper.equals("ALUMNO") && !upper.equals("PADRE")) {
            throw new IllegalArgumentException("Rol inválido. Debe ser ADMIN, ALUMNO o PADRE");
        }
        this.rol = upper;
    }

    @PrePersist
    @PreUpdate
    public void normalizeRole() {
        if (this.rol != null) {
            this.rol = this.rol.trim().toUpperCase();
        }
    }
}
