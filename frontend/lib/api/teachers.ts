import type { Teacher, CreateTeacherRequest } from "@/lib/types"
import { apiFetch } from "@/lib/api/client"

export async function getTeachers(): Promise<Teacher[]> {
  const data = await apiFetch(`/profesores`)
  return data as Teacher[]
}

export async function getTeacher(id: number): Promise<Teacher> {
  const data = await apiFetch(`/profesores/${id}`)
  return data as Teacher
}

export async function createTeacher(teacher: CreateTeacherRequest): Promise<Teacher> {
  const data = await apiFetch(`/profesores`, {
    method: "POST",
    body: JSON.stringify(teacher),
  })
  return data as Teacher
}

export async function updateTeacher(id: number, teacher: CreateTeacherRequest): Promise<Teacher> {
  const data = await apiFetch(`/profesores/${id}`, {
    method: "PUT",
    body: JSON.stringify(teacher),
  })
  return data as Teacher
}

export async function deleteTeacher(id: number): Promise<void> {
  await apiFetch(`/profesores/${id}`, { method: "DELETE" })
}
