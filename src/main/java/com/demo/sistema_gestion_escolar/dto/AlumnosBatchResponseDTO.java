package com.demo.sistema_gestion_escolar.dto;

import java.util.List;

public class AlumnosBatchResponseDTO {
    
    private List<AlumnoResponseDTO> exitosos;
    private List<AlumnoBatchErrorDTO> errores;
    private int totalProcesados;
    private int totalExitosos;
    private int totalErrores;

    // Constructores
    public AlumnosBatchResponseDTO() {}

    public AlumnosBatchResponseDTO(List<AlumnoResponseDTO> exitosos, List<AlumnoBatchErrorDTO> errores) {
        this.exitosos = exitosos;
        this.errores = errores;
        this.totalProcesados = exitosos.size() + errores.size();
        this.totalExitosos = exitosos.size();
        this.totalErrores = errores.size();
    }

    // Getters y setters
    public List<AlumnoResponseDTO> getExitosos() {
        return exitosos;
    }

    public void setExitosos(List<AlumnoResponseDTO> exitosos) {
        this.exitosos = exitosos;
        actualizarTotales();
    }

    public List<AlumnoBatchErrorDTO> getErrores() {
        return errores;
    }

    public void setErrores(List<AlumnoBatchErrorDTO> errores) {
        this.errores = errores;
        actualizarTotales();
    }

    public int getTotalProcesados() {
        return totalProcesados;
    }

    public void setTotalProcesados(int totalProcesados) {
        this.totalProcesados = totalProcesados;
    }

    public int getTotalExitosos() {
        return totalExitosos;
    }

    public void setTotalExitosos(int totalExitosos) {
        this.totalExitosos = totalExitosos;
    }

    public int getTotalErrores() {
        return totalErrores;
    }

    public void setTotalErrores(int totalErrores) {
        this.totalErrores = totalErrores;
    }

    private void actualizarTotales() {
        if (exitosos != null && errores != null) {
            this.totalExitosos = exitosos.size();
            this.totalErrores = errores.size();
            this.totalProcesados = totalExitosos + totalErrores;
        }
    }

    // Clase interna para errores individuales
    public static class AlumnoBatchErrorDTO {
        private int indice;
        private AlumnoRequestDTO alumno;
        private String mensaje;

        public AlumnoBatchErrorDTO() {}

        public AlumnoBatchErrorDTO(int indice, AlumnoRequestDTO alumno, String mensaje) {
            this.indice = indice;
            this.alumno = alumno;
            this.mensaje = mensaje;
        }

        public int getIndice() {
            return indice;
        }

        public void setIndice(int indice) {
            this.indice = indice;
        }

        public AlumnoRequestDTO getAlumno() {
            return alumno;
        }

        public void setAlumno(AlumnoRequestDTO alumno) {
            this.alumno = alumno;
        }

        public String getMensaje() {
            return mensaje;
        }

        public void setMensaje(String mensaje) {
            this.mensaje = mensaje;
        }
    }
}