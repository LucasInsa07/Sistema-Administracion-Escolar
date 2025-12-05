package com.demo.sistema_gestion_escolar.exception;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {
        super("Usuario o contraseña inválidos");
    }
    
    public InvalidCredentialsException(String message) {
        super(message);
    }
}