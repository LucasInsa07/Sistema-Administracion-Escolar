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
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(usuario, contrasena)
      toast({ title: "Inicio de sesión exitoso" })
      router.push("/dashboard")
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "No se pudo iniciar sesión" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-[#fffafc] to-[#fff3f6] p-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Branding */}
        <div className="hidden md:flex flex-col items-start justify-center px-8">
          {/* Logo - buscar /public/logo-aaes.png, si no existe se usa texto */}
          <div className="flex items-center gap-4 mb-6">
            <h1 className="flex items-center gap-3 text-2xl font-extrabold text-[#450920]">
              <img src="/logo-aaes.svg" alt="gorrito" className="h-12 w-12 object-contain" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
              <span>
                AAES
                <div className="text-sm font-normal text-muted-foreground">Administración Escolar</div>
              </span>
            </h1>
          </div>

          <h2 className="text-3xl font-semibold text-foreground mb-3">Bienvenido de vuelta</h2>
          <p className="text-sm text-muted-foreground max-w-md">Ingresa con tus credenciales para acceder al panel administrativo. Aquí podrás gestionar alumnos, materias, cursos y el calendario académico.</p>

          <div className="mt-8 w-full">
            <div className="rounded-lg border border-border p-4 bg-white/60">
              <p className="text-sm font-medium text-[#450920]">Consejo</p>
              <p className="text-xs text-muted-foreground mt-2">Si olvidaste tu contraseña, utiliza el enlace "Recuperar contraseña" en el formulario de ingreso.</p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center gap-3">
                <img src="/logo-aaes.svg" alt="AAES" className="h-10 w-10 object-contain" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
                <div>
                  <CardTitle>Ingresar</CardTitle>
                  <CardDescription>Accede con tu usuario</CardDescription>
                </div>
              </div>
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border" />
                    <span>Recordarme</span>
                  </label>
                  <a href="#" className="text-sm text-[#450920] hover:underline">Recuperar contraseña</a>
                </div>

                <Button type="submit" disabled={loading} className="w-full">{loading ? "Entrando..." : "Entrar"}</Button>
              </form>
            </CardContent>
            <div className="px-6 pb-6 pt-0 text-center text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} AAES — Sistema de Administración Escolar</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
