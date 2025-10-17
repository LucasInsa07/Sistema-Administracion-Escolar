import type { Enrollment, CreateEnrollmentRequest } from "@/lib/types"
import { apiFetch } from "@/lib/api/client"

export interface BatchEnrollmentRequest {
  cursoId: number
  alumnosIds: number[]
  fechaInscripcion: string
  estado: string
}

export interface BatchEnrollmentResult {
  totalProcesados: number
  totalExitosas: number
  totalErrores: number
  exitosas: Array<{
    id: number
    alumnoNombre: string
    alumnoApellido: string
    cursoNombre: string
  }>
  errores: Array<{
    alumnoId: number
    alumnoNombre: string
    alumnoApellido: string
    mensaje: string
  }>
  cursoId: number
  cursoNombre: string
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const data = await apiFetch(`/inscripciones`)
  return data as Enrollment[]
}

export async function getEnrollment(id: number): Promise<Enrollment> {
  const data = await apiFetch(`/inscripciones/${id}`)
  return data as Enrollment
}

export async function createEnrollment(enrollment: CreateEnrollmentRequest): Promise<Enrollment> {
  const data = await apiFetch(`/inscripciones`, {
    method: "POST",
    body: JSON.stringify(enrollment),
  })
  return data as Enrollment
}

export async function updateEnrollment(id: number, enrollment: CreateEnrollmentRequest): Promise<Enrollment> {
  const data = await apiFetch(`/inscripciones/${id}`, {
    method: "PUT",
    body: JSON.stringify(enrollment),
  })
  return data as Enrollment
}

export async function createEnrollmentsBatch(request: BatchEnrollmentRequest): Promise<BatchEnrollmentResult> {
  const data = await apiFetch(`/inscripciones/batch`, {
    method: "POST",
    body: JSON.stringify(request),
  })
  return data as BatchEnrollmentResult
}

export async function deleteEnrollment(id: number): Promise<void> {
  await apiFetch(`/inscripciones/${id}`, { method: "DELETE" })
}

// Objeto con todas las funciones para compatibilidad
export const enrollmentsApi = {
  getAll: getEnrollments,
  getById: getEnrollment,
  create: createEnrollment,
  createBatch: createEnrollmentsBatch,
  update: updateEnrollment,
  delete: deleteEnrollment,
}
