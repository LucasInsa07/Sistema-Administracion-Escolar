import type { Course, CreateCourseRequest } from "@/lib/types"
import { apiFetch } from "./client"

export async function getCourses(): Promise<Course[]> {
  return apiFetch("/cursos") as Promise<Course[]>
}

export async function getCourse(id: number): Promise<Course> {
  return apiFetch(`/cursos/${id}`) as Promise<Course>
}

export async function createCourse(course: CreateCourseRequest): Promise<Course> {
  return apiFetch("/cursos", {
    method: "POST",
    body: JSON.stringify(course),
  }) as Promise<Course>
}

export async function updateCourse(id: number, course: CreateCourseRequest): Promise<Course> {
  return apiFetch(`/cursos/${id}`, {
    method: "PUT",
    body: JSON.stringify(course),
  }) as Promise<Course>
}

export async function deleteCourse(id: number): Promise<void> {
  await apiFetch(`/cursos/${id}`, {
    method: "DELETE",
  })
}

export const coursesApi = {
  getAll: getCourses,
  getById: getCourse,
  create: createCourse,
  update: updateCourse,
  delete: deleteCourse,
}
