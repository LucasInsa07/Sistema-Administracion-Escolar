export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1").replace(/\/$/, "")

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
  const headers = new Headers(init.headers)
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json")
  }
  const token = getToken()
  if (token) headers.set("Authorization", `Bearer ${token}`)

  const res = await fetch(url, { ...init, headers })
  if (!res.ok) {
    let errorMessage = `HTTP ${res.status} ${res.statusText}`
    try {
      const contentType = res.headers.get("content-type") || ""
      if (contentType.includes("application/json")) {
        const errorData = await res.json()
        // Extraer el mensaje del JSON de error del backend
        errorMessage = errorData.message || errorData.error || errorMessage
      } else {
        const textError = await res.text()
        if (textError) errorMessage = textError
      }
    } catch {
      // Si no se puede parsear el error, usar el mensaje por defecto
    }
    throw new Error(errorMessage)
  }
  const contentType = res.headers.get("content-type") || ""
  if (contentType.includes("application/json")) return res.json()
  return res.text()
}
