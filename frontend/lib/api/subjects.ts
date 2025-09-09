import type { Subject, CreateSubjectRequest } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function getSubjects(): Promise<Subject[]> {
  const response = await fetch(`${API_BASE_URL}/materias`)
  if (!response.ok) {
    throw new Error("Failed to fetch subjects")
  }
  return response.json()
}

export async function getSubject(id: number): Promise<Subject> {
  const response = await fetch(`${API_BASE_URL}/materias/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch subject")
  }
  return response.json()
}

export async function createSubject(subject: CreateSubjectRequest): Promise<Subject> {
  const response = await fetch(`${API_BASE_URL}/materias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subject),
  })
  if (!response.ok) {
    throw new Error("Failed to create subject")
  }
  return response.json()
}

export async function updateSubject(id: number, subject: CreateSubjectRequest): Promise<Subject> {
  const response = await fetch(`${API_BASE_URL}/materias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subject),
  })
  if (!response.ok) {
    throw new Error("Failed to update subject")
  }
  return response.json()
}

export async function deleteSubject(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/materias/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete subject")
  }
}

export const subjectsApi = {
  getAll: getSubjects,
  getById: getSubject,
  create: createSubject,
  update: updateSubject,
  delete: deleteSubject,
}
