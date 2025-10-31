package com.demo.sistema_gestion_escolar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class PasswordService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Genera una contraseña automática para un alumno basada en su fecha de nacimiento
     * Formato: AL + DD + MM + YY
     * Ejemplo: Nacido 23/03/2005 -> AL230305
     * 
     * @param fechaNacimiento La fecha de nacimiento del alumno
     * @return La contraseña hasheada con BCrypt
     */
    public String generarContrasenaAlumno(LocalDate fechaNacimiento) {
        // Formato: AL + DD + MM + YY
        String passwordPlano = String.format("AL%02d%02d%02d", 
            fechaNacimiento.getDayOfMonth(),
            fechaNacimiento.getMonthValue(), 
            fechaNacimiento.getYear() % 100);
        
        // Retornar la contraseña hasheada
        return passwordEncoder.encode(passwordPlano);
    }

    /**
     * Valida si una contraseña en texto plano coincide con el hash almacenado
     * 
     * @param passwordPlano La contraseña en texto plano
     * @param passwordHash El hash almacenado en la base de datos
     * @return true si coinciden, false en caso contrario
     */
    public boolean validarContrasena(String passwordPlano, String passwordHash) {
        return passwordEncoder.matches(passwordPlano, passwordHash);
    }

    /**
     * Genera la contraseña en texto plano para mostrar al usuario (solo para propósitos administrativos)
     * NO almacenar este valor, solo usar el hash
     * 
     * @param fechaNacimiento La fecha de nacimiento del alumno
     * @return La contraseña en texto plano
     */
    public String generarContrasenaTextoPlano(LocalDate fechaNacimiento) {
        return String.format("AL%02d%02d%02d", 
            fechaNacimiento.getDayOfMonth(),
            fechaNacimiento.getMonthValue(), 
            fechaNacimiento.getYear() % 100);
    }
}