export interface Student {
  id: number
  nombre: string
  apellido: string
  email: string
  fechaNacimiento?: string
}

export interface CreateStudentRequest {
  nombre: string
  apellido: string
  email: string
  fechaNacimiento?: string
}

export interface Teacher {
  id: number
  nombre: string
  apellido: string
  email: string
}

export interface CreateTeacherRequest {
  nombre: string
  apellido: string
  email: string
}

export interface Subject {
  id: number
  nombre: string
  profesorId: number
  profesorNombre: string
  profesorApellido: string
  diaSemana?: string
  horaInicio?: string
  horaFin?: string
}

export interface CreateSubjectRequest {
  nombre: string
  profesorId: number
  diaSemana?: string
  horaInicio?: string
  horaFin?: string
}

export interface Course {
  id: number
  nombre: string
  descripcion: string
  anio: number
  division: string
  activo: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateCourseRequest {
  nombre: string
  descripcion: string
  anio: number
  division: string
  activo: boolean
}

export interface Enrollment {
  id: number
  fechaInscripcion: string
  estado: "ACTIVO" | "FINALIZADO" | "ANULADO"
  
  // Datos del alumno aplastados
  alumnoId: number
  alumnoNombre: string
  alumnoApellido: string
  alumnoEmail: string
  
  // Datos del curso aplastados
  cursoId: number
  cursoNombre: string
  cursoDescripcion: string
  cursoAnio: number
  cursoDivision: string
  cursoActivo: boolean
}

export interface CreateEnrollmentRequest {
  alumnoId: number
  cursoId: number
  estado: "ACTIVO" | "FINALIZADO" | "ANULADO"
  fechaInscripcion: string
}

export interface Dictado {
  id: number
  fechaInicio: string
  fechaFin: string
  activo: boolean
  cursoId: number
  cursoNombre: string
  cursoDescripcion: string
  cursoAnio: number
  cursoDivision: string
  materiaId: number
  materiaNombre: string
  materiaProfesorId: number
  materiaProfesorNombre: string
  materiaProfesorApellido: string
}

export interface CreateDictadoRequest {
  fechaInicio: string
  fechaFin: string
  activo: boolean
  cursoId: number
  materiaId: number
}
