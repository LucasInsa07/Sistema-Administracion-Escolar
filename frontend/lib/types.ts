export interface Student {
  id: number
  nombre: string
  apellido: string
  email: string
}

export interface CreateStudentRequest {
  nombre: string
  apellido: string
  email: string
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
}

export interface CreateSubjectRequest {
  nombre: string
  profesorId: number
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
