"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, GraduationCap } from "lucide-react"
import { getAuth } from "@/lib/auth"
import { getStudent } from "@/lib/api/students"
import { useEffect, useState } from "react"
import type { Student } from "@/lib/types"

function StudentProfile() {
  const { userId } = getAuth()
  const [profileData, setProfileData] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) return
      
      try {
        setLoading(true)
        const studentData = await getStudent(parseInt(userId))
        setProfileData(studentData)
      } catch (err) {
        console.error('Error loading profile:', err)
        setError('Error al cargar los datos del perfil')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [userId])

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No especificada'
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <p>Cargando perfil...</p>
        </div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-background min-h-screen">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{error || 'Error al cargar los datos del perfil'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">Información personal y académica</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Nombre completo:</span>
              <span className="font-medium">{profileData.nombre} {profileData.apellido}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Email:</span>
              <span className="font-medium">{profileData.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fecha de nacimiento:</span>
              <span className="font-medium">{formatDate(profileData.fechaNacimiento)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">DNI:</span>
              <span className="font-medium">{profileData.dni || 'No especificado'}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Estado Académico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Estado:</span>
              <Badge variant={profileData.estado === "ACTIVO" ? "default" : "secondary"}>
                {profileData.estado}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">ID de estudiante:</span>
              <span className="font-medium">#{profileData.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tipo de usuario:</span>
              <span className="font-medium">Estudiante</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fecha de ingreso:</span>
              <span className="font-medium">{formatDate(profileData.fechaIngreso)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Actualización de datos</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Para actualizar tu información personal, contacta con la administración del centro educativo.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PerfilPage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <StudentProfile />
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}