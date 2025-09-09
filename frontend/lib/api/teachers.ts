import type { Teacher, CreateTeacherRequest } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function getTeachers(): Promise<Teacher[]> {
  const response = await fetch(`${API_BASE_URL}/profesores`)
  if (!response.ok) {
    throw new Error("Failed to fetch teachers")
  }
  return response.json()
}

export async function getTeacher(id: number): Promise<Teacher> {
  const response = await fetch(`${API_BASE_URL}/profesores/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch teacher")
  }
  return response.json()
}

export async function createTeacher(teacher: CreateTeacherRequest): Promise<Teacher> {
  const response = await fetch(`${API_BASE_URL}/profesores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacher),
  })
  if (!response.ok) {
    throw new Error("Failed to create teacher")
  }
  return response.json()
}

export async function updateTeacher(id: number, teacher: CreateTeacherRequest): Promise<Teacher> {
  const response = await fetch(`${API_BASE_URL}/profesores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(teacher),
  })
  if (!response.ok) {
    throw new Error("Failed to update teacher")
  }
  return response.json()
}

export async function deleteTeacher(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/profesores/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete teacher")
  }
}
