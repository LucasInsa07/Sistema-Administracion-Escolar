package com.demo.sistema_gestion_escolar.service;

import java.util.ArrayList; //Entidad que representa un alumno en la base de datos
import java.util.List; //Interfaz que maneja operaciones con la base de datos.
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.sistema_gestion_escolar.dto.AlumnoRequestDTO;
import com.demo.sistema_gestion_escolar.dto.AlumnoResponseDTO;
import com.demo.sistema_gestion_escolar.dto.AlumnosBatchRequestDTO; //SB inyecta automaticamente dependencias configuradas y funcionales.
import com.demo.sistema_gestion_escolar.dto.AlumnosBatchResponseDTO;
import com.demo.sistema_gestion_escolar.dto.AlumnosBatchResponseDTO.AlumnoBatchErrorDTO;
import com.demo.sistema_gestion_escolar.model.Alumno;
import com.demo.sistema_gestion_escolar.repository.AlumnoRepository;


@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;
    
    @Autowired
    private PasswordService passwordService;

    public Alumno crearAlumno(Alumno alumno){
        // Generar contraseña automática basada en fecha de nacimiento
        if (alumno.getFechaNacimiento() != null && alumno.getContrasena() == null) {
            String contrasenaHash = passwordService.generarContrasenaAlumno(alumno.getFechaNacimiento());
            alumno.setContrasena(contrasenaHash);
        }
        return alumnoRepository.save(alumno);
    }
    public List<Alumno> crearAlumnosEnLote(List<Alumno> alumnos) {
        return alumnoRepository.saveAll(alumnos);
    }
    
    public AlumnosBatchResponseDTO crearAlumnosEnLote(AlumnosBatchRequestDTO batchRequest) {
        List<AlumnoResponseDTO> exitosos = new ArrayList<>();
        List<AlumnoBatchErrorDTO> errores = new ArrayList<>();
        
        for (int i = 0; i < batchRequest.getAlumnos().size(); i++) {
            try {
                AlumnoRequestDTO alumnoRequest = batchRequest.getAlumnos().get(i);
                
                // Validar que no exista un alumno con el mismo email
                if (alumnoRepository.findByEmail(alumnoRequest.email).isPresent()) {
                    errores.add(new AlumnoBatchErrorDTO(i, alumnoRequest, 
                        "Ya existe un alumno con el email: " + alumnoRequest.email));
                    continue;
                }
                
                // Crear y guardar el alumno
                Alumno alumno = new Alumno(alumnoRequest.nombre, 
                                         alumnoRequest.apellido, 
                                         alumnoRequest.email, 
                                         alumnoRequest.fechaNacimiento);
                
                // Generar contraseña automática
                if (alumno.getFechaNacimiento() != null) {
                    String contrasenaHash = passwordService.generarContrasenaAlumno(alumno.getFechaNacimiento());
                    alumno.setContrasena(contrasenaHash);
                }
                
                Alumno alumnoGuardado = alumnoRepository.save(alumno);
                
                // Convertir a DTO de respuesta
                AlumnoResponseDTO responseDTO = new AlumnoResponseDTO();
                responseDTO.id = alumnoGuardado.getId();
                responseDTO.nombre = alumnoGuardado.getNombre();
                responseDTO.apellido = alumnoGuardado.getApellido();
                responseDTO.email = alumnoGuardado.getEmail();
                
                exitosos.add(responseDTO);
                
            } catch (Exception e) {
                errores.add(new AlumnoBatchErrorDTO(i, batchRequest.getAlumnos().get(i), 
                    "Error al crear alumno: " + e.getMessage()));
            }
        }
        
        return new AlumnosBatchResponseDTO(exitosos, errores);
    }
    public List<Alumno> obtenerTodos(){
        return alumnoRepository.findAll();
    }
    public Optional<Alumno> obtenerPorId(Long id){
        return alumnoRepository.findById(id);
    }
    public Alumno actualizarAlumno(Long id, Alumno alumnoNuevo) {
        return alumnoRepository.findById(id)
                .map(alumno -> {
                    alumno.setNombre(alumnoNuevo.getNombre());
                    alumno.setApellido(alumnoNuevo.getApellido());
                    alumno.setEmail(alumnoNuevo.getEmail());
                    return alumnoRepository.save(alumno);
                })
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado"));
    }
    public void eliminarAlumno(Long id) {
        alumnoRepository.deleteById(id);
    }

    /**
     * Método para migrar alumnos existentes - generar contraseñas para alumnos que ya tienen fecha de nacimiento
     * @return número de alumnos migrados
     */
    public int migrarContrasenaAlumnosExistentes() {
        List<Alumno> alumnosSinContrasena = alumnoRepository.findAll().stream()
            .filter(alumno -> alumno.getFechaNacimiento() != null && 
                             (alumno.getContrasena() == null || alumno.getContrasena().isEmpty()))
            .toList();
        
        for (Alumno alumno : alumnosSinContrasena) {
            String contrasenaHash = passwordService.generarContrasenaAlumno(alumno.getFechaNacimiento());
            alumno.setContrasena(contrasenaHash);
            alumnoRepository.save(alumno);
        }
        
        return alumnosSinContrasena.size();
    }

}
