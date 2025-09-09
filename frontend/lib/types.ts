export interface Student {
  id: number
  nombre: string
  apellido: string
  dni: string
  email: string
  telefono: string
  direccion: string
  fechaNacimiento: string
  activo: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateStudentRequest {
  nombre: string
  apellido: string
  dni: string
  email: string
  telefono: string
  direccion: string
  fechaNacimiento: string
  activo: boolean
}

export interface Teacher {
  id: number
  nombre: string
  apellido: string
  dni: string
  email: string
  telefono: string
  especialidad: string
  activo: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateTeacherRequest {
  nombre: string
  apellido: string
  dni: string
  email: string
  telefono: string
  especialidad: string
  activo: boolean
}

export interface Subject {
  id: number
  nombre: string
  descripcion: string
  profesor: Teacher
  activo: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateSubjectRequest {
  nombre: string
  descripcion: string
  profesorId: number
  activo: boolean
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
  alumno: Student
  curso: Course
  estado: "ACTIVO" | "INACTIVO" | "SUSPENDIDO"
  fechaInscripcion: string
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateEnrollmentRequest {
  alumnoId: number
  cursoId: number
  estado: "ACTIVO" | "INACTIVO" | "SUSPENDIDO"
  fechaInscripcion: string
}

export interface Dictado {
  id: number
  materia: Subject
  curso: Course
  activo: boolean
  fechaCreacion?: string
  fechaActualizacion?: string
}

export interface CreateDictadoRequest {
  materiaId: number
  cursoId: number
  activo: boolean
}
