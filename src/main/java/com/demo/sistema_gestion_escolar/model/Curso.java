package com.demo.sistema_gestion_escolar.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "curso")
public class Curso extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String nombre;

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Inscripcion> inscripciones;


    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "curso-dictado")
    private List<Dictado> dictados;

    // Getters y setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Inscripcion> getInscripciones() {
        return inscripciones;
    }

    public void setInscripciones(List<Inscripcion> inscripciones) {
        this.inscripciones = inscripciones;
    }

    public List<Dictado> getDictados() {
        return dictados;
    }

    public void setDictados(List<Dictado> dictados) {
        this.dictados = dictados;
    }
}
