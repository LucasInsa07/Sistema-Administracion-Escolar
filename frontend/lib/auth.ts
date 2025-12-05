import { apiFetch } from "@/lib/api/client"

export type LoginResponse = { token: string; rol: string; usuario: string; userId: number }

export async function login(usuario: string, contrasena: string) {
  const data = (await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ usuario, contrasena }),
  })) as LoginResponse
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data.token)
    localStorage.setItem("rol", data.rol)
    localStorage.setItem("usuario", data.usuario)
    localStorage.setItem("userId", data.userId.toString())
  }
  return data
}

export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem("token")
  localStorage.removeItem("rol")
  localStorage.removeItem("usuario")
  localStorage.removeItem("userId")
}

export function getAuth() {
  if (typeof window === "undefined") return { token: null, rol: null, usuario: null, userId: null }
  return {
    token: localStorage.getItem("token"),
    rol: localStorage.getItem("rol"),
    usuario: localStorage.getItem("usuario"),
    userId: localStorage.getItem("userId"),
  }
}
