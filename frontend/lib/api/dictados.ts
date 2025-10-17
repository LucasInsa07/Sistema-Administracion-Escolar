import type { Dictado, CreateDictadoRequest } from "../types"
import { apiFetch } from "./client"

export const dictadosApi = {
  getAll: async (): Promise<Dictado[]> => {
    return apiFetch("/dictados") as Promise<Dictado[]>
  },

  getById: async (id: number): Promise<Dictado> => {
    return apiFetch(`/dictados/${id}`) as Promise<Dictado>
  },

  create: async (dictado: CreateDictadoRequest): Promise<Dictado> => {
    return apiFetch("/dictados", {
      method: "POST",
      body: JSON.stringify(dictado),
    }) as Promise<Dictado>
  },

  update: async (id: number, dictado: CreateDictadoRequest): Promise<Dictado> => {
    return apiFetch(`/dictados/${id}`, {
      method: "PUT",
      body: JSON.stringify(dictado),
    }) as Promise<Dictado>
  },

  delete: async (id: number): Promise<void> => {
    await apiFetch(`/dictados/${id}`, {
      method: "DELETE",
    })
  },
}
