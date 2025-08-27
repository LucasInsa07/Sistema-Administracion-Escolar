package com.demo.sistema_gestion_escolar.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "materia")
public class Materia extends BaseEntity {

    @Column(nullable = false, length = 50)
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "profesor_id", nullable = false)
    @JsonBackReference
    private Profesor profesor;
    
    @OneToMany(mappedBy = "materia", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "materia-dictado")
    private List<Dictado> dictados;

    // Getters y setters

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public List<Dictado> getDictados() {
        return dictados;
    }

    public void setDictados(List<Dictado> dictados) {
        this.dictados = dictados;
    }
}
