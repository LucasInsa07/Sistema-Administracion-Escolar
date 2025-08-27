package com.demo.sistema_gestion_escolar.service;

import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.repository.AlumnoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AlumnoServiceTest {

    @Mock
    private AlumnoRepository alumnoRepository;

    @InjectMocks
    private AlumnoService alumnoService;

    @Test
    void crearAlumnoGuardaYDevuelveEntidad() {
        Alumno alumno = new Alumno("Juan", "Pérez", "juan@example.com");
        when(alumnoRepository.save(any(Alumno.class))).thenReturn(alumno);

        Alumno resultado = alumnoService.crearAlumno(alumno);

        assertEquals(alumno, resultado);
        verify(alumnoRepository).save(alumno);
    }

    @Test
    void obtenerTodosDevuelveLista() {
        List<Alumno> alumnos = List.of(new Alumno("Ana", "López", "ana@example.com"));
        when(alumnoRepository.findAll()).thenReturn(alumnos);

        List<Alumno> resultado = alumnoService.obtenerTodos();

        assertEquals(alumnos, resultado);
        verify(alumnoRepository).findAll();
    }

    @Test
    void obtenerPorIdDevuelveAlumnoCuandoExiste() {
        Alumno alumno = new Alumno("Ana", "López", "ana@example.com");
        alumno.setId(1L);
        when(alumnoRepository.findById(1L)).thenReturn(Optional.of(alumno));

        Optional<Alumno> resultado = alumnoService.obtenerPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals(alumno, resultado.get());
        verify(alumnoRepository).findById(1L);
    }

    @Test
    void actualizarAlumnoModificaValores() {
        Alumno existente = new Alumno("Ana", "López", "ana@example.com");
        existente.setId(1L);
        Alumno nuevo = new Alumno("Ana", "Martínez", "ana.m@example.com");
        when(alumnoRepository.findById(1L)).thenReturn(Optional.of(existente));
        when(alumnoRepository.save(any(Alumno.class))).thenAnswer(inv -> inv.getArgument(0));

        Alumno actualizado = alumnoService.actualizarAlumno(1L, nuevo);

        assertEquals("Martínez", actualizado.getApellido());
        assertEquals("ana.m@example.com", actualizado.getEmail());
        verify(alumnoRepository).save(existente);
    }

    @Test
    void actualizarAlumnoLanzaExcepcionSiNoExiste() {
        when(alumnoRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> alumnoService.actualizarAlumno(1L, new Alumno()));
    }

    @Test
    void eliminarAlumnoInvocaRepositorio() {
        alumnoService.eliminarAlumno(1L);

        verify(alumnoRepository).deleteById(1L);
    }
}

