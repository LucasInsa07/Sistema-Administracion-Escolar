import type { Dictado, CreateDictadoRequest } from "../types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export const dictadosApi = {
  getAll: async (): Promise<Dictado[]> => {
    const response = await fetch(`${API_BASE_URL}/dictados`)
    if (!response.ok) throw new Error("Error fetching dictados")
    return response.json()
  },

  getById: async (id: number): Promise<Dictado> => {
    const response = await fetch(`${API_BASE_URL}/dictados/${id}`)
    if (!response.ok) throw new Error("Error fetching dictado")
    return response.json()
  },

  create: async (dictado: CreateDictadoRequest): Promise<Dictado> => {
    const response = await fetch(`${API_BASE_URL}/dictados`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dictado),
    })
    if (!response.ok) throw new Error("Error creating dictado")
    return response.json()
  },

  update: async (id: number, dictado: CreateDictadoRequest): Promise<Dictado> => {
    const response = await fetch(`${API_BASE_URL}/dictados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dictado),
    })
    if (!response.ok) throw new Error("Error updating dictado")
    return response.json()
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/dictados/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Error deleting dictado")
  },
}
