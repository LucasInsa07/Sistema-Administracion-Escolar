import type { Course, CreateCourseRequest } from "@/lib/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export async function getCourses(): Promise<Course[]> {
  const response = await fetch(`${API_BASE_URL}/cursos`)
  if (!response.ok) {
    throw new Error("Failed to fetch courses")
  }
  return response.json()
}

export async function getCourse(id: number): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/cursos/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch course")
  }
  return response.json()
}

export async function createCourse(course: CreateCourseRequest): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/cursos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  })
  if (!response.ok) {
    throw new Error("Failed to create course")
  }
  return response.json()
}

export async function updateCourse(id: number, course: CreateCourseRequest): Promise<Course> {
  const response = await fetch(`${API_BASE_URL}/cursos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  })
  if (!response.ok) {
    throw new Error("Failed to update course")
  }
  return response.json()
}

export async function deleteCourse(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/cursos/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete course")
  }
}

export const coursesApi = {
  getAll: getCourses,
  getById: getCourse,
  create: createCourse,
  update: updateCourse,
  delete: deleteCourse,
}
