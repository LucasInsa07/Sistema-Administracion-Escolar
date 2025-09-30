import type { Subject, CreateSubjectRequest } from "@/lib/types"
import { apiFetch } from "@/lib/api/client"

export async function getSubjects(): Promise<Subject[]> {
  const data = await apiFetch(`/materias`)
  return data as Subject[]
}

export async function getSubject(id: number): Promise<Subject> {
  const data = await apiFetch(`/materias/${id}`)
  return data as Subject
}

export async function createSubject(subject: CreateSubjectRequest): Promise<Subject> {
  const data = await apiFetch(`/materias`, {
    method: "POST",
    body: JSON.stringify(subject),
  })
  return data as Subject
}

export async function updateSubject(id: number, subject: CreateSubjectRequest): Promise<Subject> {
  const data = await apiFetch(`/materias/${id}`, {
    method: "PUT",
    body: JSON.stringify(subject),
  })
  return data as Subject
}

export async function deleteSubject(id: number): Promise<void> {
  await apiFetch(`/materias/${id}`, { method: "DELETE" })
}

export const subjectsApi = {
  getAll: getSubjects,
  getById: getSubject,
  create: createSubject,
  update: updateSubject,
  delete: deleteSubject,
}
