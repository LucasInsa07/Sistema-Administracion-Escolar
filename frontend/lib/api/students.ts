import type { Student, CreateStudentRequest } from "@/lib/types"
import { apiFetch, API_BASE_URL } from "@/lib/api/client"

export interface BatchStudentRequest {
  alumnos: CreateStudentRequest[]
}

export interface BatchStudentResult {
  totalProcesados: number
  totalExitosos: number
  totalErrores: number
  exitosos: Student[]
  errores: Array<{
    indice: number
    alumno: CreateStudentRequest
    mensaje: string
  }>
}

export async function getStudents(): Promise<Student[]> {
  const data = await apiFetch(`/alumnos`)
  return data as Student[]
}

export async function getStudent(id: number): Promise<Student> {
  const data = await apiFetch(`/alumnos/${id}`)
  return data as Student
}

export async function createStudent(student: CreateStudentRequest): Promise<Student> {
  const data = await apiFetch(`/alumnos`, {
    method: "POST",
    body: JSON.stringify(student),
  })
  return data as Student
}

export async function createStudentsBatch(students: CreateStudentRequest[]): Promise<BatchStudentResult> {
  const batchRequest: BatchStudentRequest = {
    alumnos: students
  }
  
  const data = await apiFetch(`/alumnos/batch`, {
    method: "POST",
    body: JSON.stringify(batchRequest),
  })
  return data as BatchStudentResult
}

export async function updateStudent(id: number, student: CreateStudentRequest): Promise<Student> {
  const data = await apiFetch(`/alumnos/${id}`, {
    method: "PUT",
    body: JSON.stringify(student),
  })
  return data as Student
}

export async function deleteStudent(id: number): Promise<void> {
  await apiFetch(`/alumnos/${id}`, { method: "DELETE" })
}

// Objeto con todas las funciones para compatibilidad
export const studentsApi = {
  getAll: getStudents,
  getById: getStudent,
  create: createStudent,
  createBatch: createStudentsBatch,
  update: updateStudent,
  delete: deleteStudent,
}
