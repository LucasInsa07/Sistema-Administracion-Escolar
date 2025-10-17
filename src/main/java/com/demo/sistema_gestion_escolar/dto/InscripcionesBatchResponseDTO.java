package com.demo.sistema_gestion_escolar.dto;

import java.util.List;

public class InscripcionesBatchResponseDTO {
    
    private List<InscripcionResponseDTO> exitosas;
    private List<InscripcionBatchErrorDTO> errores;
    private int totalProcesados;
    private int totalExitosas;
    private int totalErrores;
    private Long cursoId;
    private String cursoNombre;

    // Constructores
    public InscripcionesBatchResponseDTO() {}

    public InscripcionesBatchResponseDTO(List<InscripcionResponseDTO> exitosas, List<InscripcionBatchErrorDTO> errores, Long cursoId, String cursoNombre) {
        this.exitosas = exitosas;
        this.errores = errores;
        this.cursoId = cursoId;
        this.cursoNombre = cursoNombre;
        this.totalProcesados = exitosas.size() + errores.size();
        this.totalExitosas = exitosas.size();
        this.totalErrores = errores.size();
    }

    // Getters y setters
    public List<InscripcionResponseDTO> getExitosas() {
        return exitosas;
    }

    public void setExitosas(List<InscripcionResponseDTO> exitosas) {
        this.exitosas = exitosas;
        actualizarTotales();
    }

    public List<InscripcionBatchErrorDTO> getErrores() {
        return errores;
    }

    public void setErrores(List<InscripcionBatchErrorDTO> errores) {
        this.errores = errores;
        actualizarTotales();
    }

    public int getTotalProcesados() {
        return totalProcesados;
    }

    public void setTotalProcesados(int totalProcesados) {
        this.totalProcesados = totalProcesados;
    }

    public int getTotalExitosas() {
        return totalExitosas;
    }

    public void setTotalExitosas(int totalExitosas) {
        this.totalExitosas = totalExitosas;
    }

    public int getTotalErrores() {
        return totalErrores;
    }

    public void setTotalErrores(int totalErrores) {
        this.totalErrores = totalErrores;
    }

    public Long getCursoId() {
        return cursoId;
    }

    public void setCursoId(Long cursoId) {
        this.cursoId = cursoId;
    }

    public String getCursoNombre() {
        return cursoNombre;
    }

    public void setCursoNombre(String cursoNombre) {
        this.cursoNombre = cursoNombre;
    }

    private void actualizarTotales() {
        if (exitosas != null && errores != null) {
            this.totalExitosas = exitosas.size();
            this.totalErrores = errores.size();
            this.totalProcesados = totalExitosas + totalErrores;
        }
    }

    // Clase interna para errores individuales
    public static class InscripcionBatchErrorDTO {
        private Long alumnoId;
        private String alumnoNombre;
        private String alumnoApellido;
        private String mensaje;

        public InscripcionBatchErrorDTO() {}

        public InscripcionBatchErrorDTO(Long alumnoId, String alumnoNombre, String alumnoApellido, String mensaje) {
            this.alumnoId = alumnoId;
            this.alumnoNombre = alumnoNombre;
            this.alumnoApellido = alumnoApellido;
            this.mensaje = mensaje;
        }

        public Long getAlumnoId() {
            return alumnoId;
        }

        public void setAlumnoId(Long alumnoId) {
            this.alumnoId = alumnoId;
        }

        public String getAlumnoNombre() {
            return alumnoNombre;
        }

        public void setAlumnoNombre(String alumnoNombre) {
            this.alumnoNombre = alumnoNombre;
        }

        public String getAlumnoApellido() {
            return alumnoApellido;
        }

        public void setAlumnoApellido(String alumnoApellido) {
            this.alumnoApellido = alumnoApellido;
        }

        public String getMensaje() {
            return mensaje;
        }

        public void setMensaje(String mensaje) {
            this.mensaje = mensaje;
        }
    }
}