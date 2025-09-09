import type { Enrollment, CreateEnrollmentRequest } from "@/lib/types"
import { apiFetch } from "@/lib/api/client"

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

export async function deleteEnrollment(id: number): Promise<void> {
  await apiFetch(`/inscripciones/${id}`, { method: "DELETE" })
}
