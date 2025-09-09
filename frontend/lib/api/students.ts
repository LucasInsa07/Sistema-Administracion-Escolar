import type { Student, CreateStudentRequest } from "@/lib/types"
import { apiFetch, API_BASE_URL } from "@/lib/api/client"

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
