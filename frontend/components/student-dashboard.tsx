"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AcademicCalendar } from "@/components/academic-calendar"
import { BookOpen, Clock, User, GraduationCap } from "lucide-react"
import { getAuth } from "@/lib/auth"
import { useEffect, useState } from "react"
import { getEnrollments } from "@/lib/api/enrollments"
import { dictadosApi } from "@/lib/api/dictados"
import type { Enrollment, Dictado } from "@/lib/types"

interface StudentStats {
  totalSubjects: number
  activeEnrollments: number
  currentSemester: string
}

function StudentStatsCards() {
  const [stats, setStats] = useState<StudentStats>({
    totalSubjects: 0,
    activeEnrollments: 0,
    currentSemester: "2024-2"
  })
  const [loading, setLoading] = useState(true)
  const { userId } = getAuth()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        
        // 1. Obtener inscripciones del alumno
        const enrollments = await getEnrollments()
        const myEnrollments = enrollments.filter(
          (e: Enrollment) => e.alumnoId === parseInt(userId || "0") && e.estado === "ACTIVO"
        )
        
        if (myEnrollments.length === 0) {
          setStats({
            totalSubjects: 0,
            activeEnrollments: 0,
            currentSemester: "2024-2"
          })
          return
        }
        
        // 2. Obtener todos los dictados
        const dictados = await dictadosApi.getAll()
        
        // 3. Filtrar dictados de los cursos del alumno que estén activos
        const myCourseIds = new Set(myEnrollments.map(e => e.cursoId))
        const myDictados = dictados.filter(
          (d: Dictado) => myCourseIds.has(d.cursoId) && d.activo
        )
        
        // 4. Contar materias únicas
        const uniqueSubjectIds = new Set(myDictados.map(d => d.materiaId))
        
        setStats({
          totalSubjects: uniqueSubjectIds.size,
          activeEnrollments: myEnrollments.length,
          currentSemester: "2024-2"
        })
      } catch (error) {
        console.error("Error fetching student stats:", error)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchStats()
    }
  }, [userId])

  const statsCards = [
    {
      title: "Materias Cursando",
      value: loading ? "..." : stats.totalSubjects,
      description: "Materias activas",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Inscripciones",
      value: loading ? "..." : stats.activeEnrollments,
      description: "Inscripciones activas",
      icon: GraduationCap,
      color: "text-green-600"
    },
    {
      title: "Semestre Actual",
      value: stats.currentSemester,
      description: "Período académico",
      icon: Clock,
      color: "text-purple-600"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statsCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function StudentProfile() {
  const { usuario } = getAuth()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Mi Perfil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Usuario:</span>
            <span className="text-sm font-medium">{usuario}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Rol:</span>
            <span className="text-sm font-medium">Estudiante</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Estado:</span>
            <span className="text-sm font-medium text-green-600">Activo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StudentDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-background min-h-screen">
      {/* Bienvenida */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido a tu portal estudiantil</p>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <StudentStatsCards />
      
      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Academic Calendar - Takes 2 columns */}
        <div className="md:col-span-2">
          <AcademicCalendar />
        </div>
        
        {/* Student Profile */}
        <div className="md:col-span-1">
          <StudentProfile />
        </div>
      </div>
    </div>
  )
}