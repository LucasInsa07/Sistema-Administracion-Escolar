package com.demo.sistema_gestion_escolar.service;

import com.demo.sistema_gestion_escolar.model.Administrador;
import com.demo.sistema_gestion_escolar.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    public Administrador crear(Administrador administrador) {
        return administradorRepository.save(administrador);
    }

    public List<Administrador> obtenerTodos() {
        return administradorRepository.findAll();
    }

    public Optional<Administrador> obtenerPorId(Long id) {
        return administradorRepository.findById(id);
    }

    public Administrador actualizar(Long id, Administrador datos) {
        return administradorRepository.findById(id).map(a -> {
            a.setUsuario(datos.getUsuario());
            a.setContrasena(datos.getContrasena());
            a.setRol(datos.getRol());
            return administradorRepository.save(a);
        }).orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
    }

    public void eliminar(Long id) {
        administradorRepository.deleteById(id);
    }
}

