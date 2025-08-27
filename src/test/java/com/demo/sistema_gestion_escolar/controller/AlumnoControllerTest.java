package com.demo.sistema_gestion_escolar.controller;

import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.service.AlumnoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AlumnoController.class)
class AlumnoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AlumnoService alumnoService;

    @Test
    void obtenerTodosRetornaLista() throws Exception {
        List<Alumno> alumnos = List.of(new Alumno("Juan", "Pérez", "juan@example.com"));
        when(alumnoService.obtenerTodos()).thenReturn(alumnos);

        mockMvc.perform(get("/api/alumnos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].nombre").value("Juan"));
    }

    @Test
    void obtenerPorIdExistenteRetornaOk() throws Exception {
        Alumno alumno = new Alumno("Juan", "Pérez", "juan@example.com");
        alumno.setId(1L);
        when(alumnoService.obtenerPorId(1L)).thenReturn(Optional.of(alumno));

        mockMvc.perform(get("/api/alumnos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void obtenerPorIdInexistenteRetornaNotFound() throws Exception {
        when(alumnoService.obtenerPorId(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/alumnos/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void crearAlumnoRetornaAlumno() throws Exception {
        Alumno alumno = new Alumno("Juan", "Pérez", "juan@example.com");
        when(alumnoService.crearAlumno(any(Alumno.class))).thenReturn(alumno);

        mockMvc.perform(post("/api/alumnos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nombre\":\"Juan\",\"apellido\":\"Pérez\",\"email\":\"juan@example.com\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Juan"));
    }
}

