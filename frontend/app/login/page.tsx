"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(usuario, contrasena)
      toast({ title: "Inicio de sesión exitoso" })
      router.push("/")
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "No se pudo iniciar sesión" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Ingresar</CardTitle>
          <CardDescription>Accede con tu usuario de administrador</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="usuario" className="text-sm font-medium">Usuario</label>
              <Input id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <label htmlFor="contrasena" className="text-sm font-medium">Contraseña</label>
              <Input id="contrasena" type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
