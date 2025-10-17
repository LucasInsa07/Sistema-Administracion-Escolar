"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Calendar } from "lucide-react"
import { getStudents } from "@/lib/api/students"
import { getTeachers } from "@/lib/api/teachers"
import { getSubjects } from "@/lib/api/subjects"
import { getCourses } from "@/lib/api/courses"

export function DashboardStats() {
  // Estados para los datos funcionales
  const [totalAlumnos, setTotalAlumnos] = useState(0)
  const [loadingAlumnos, setLoadingAlumnos] = useState(true)
  
  const [totalProfesores, setTotalProfesores] = useState(0)
  const [loadingProfesores, setLoadingProfesores] = useState(true)
  
  const [totalMaterias, setTotalMaterias] = useState(0)
  const [loadingMaterias, setLoadingMaterias] = useState(true)
  
  const [totalCursosActivos, setTotalCursosActivos] = useState(0)
  const [loadingCursosActivos, setLoadingCursosActivos] = useState(true)

  // Cargar datos de alumnos
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        setLoadingAlumnos(true)
        const alumnos = await getStudents()
        setTotalAlumnos(alumnos.length)
      } catch (error) {
        console.error("Error cargando alumnos:", error)
        setTotalAlumnos(0)
      } finally {
        setLoadingAlumnos(false)
      }
    }

    fetchAlumnos()
  }, [])

  // Cargar datos de profesores
  useEffect(() => {
    const fetchProfesores = async () => {
      try {
        setLoadingProfesores(true)
        const profesores = await getTeachers()
        // Por ahora contamos todos los profesores (todos se consideran activos)
        setTotalProfesores(profesores.length)
      } catch (error) {
        console.error("Error cargando profesores:", error)
        setTotalProfesores(0)
      } finally {
        setLoadingProfesores(false)
      }
    }

    fetchProfesores()
  }, [])

  // Cargar datos de materias
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        setLoadingMaterias(true)
        const materias = await getSubjects()
        setTotalMaterias(materias.length)
      } catch (error) {
        console.error("Error cargando materias:", error)
        setTotalMaterias(0)
      } finally {
        setLoadingMaterias(false)
      }
    }

    fetchMaterias()
  }, [])

  // Cargar datos de cursos activos
  useEffect(() => {
    const fetchCursosActivos = async () => {
      try {
        setLoadingCursosActivos(true)
        const cursos = await getCourses()
        // Filtrar solo los cursos que están activos
        const cursosActivos = cursos.filter(curso => curso.activo)
        setTotalCursosActivos(cursosActivos.length)
      } catch (error) {
        console.error("Error cargando cursos activos:", error)
        setTotalCursosActivos(0)
      } finally {
        setLoadingCursosActivos(false)
      }
    }

    fetchCursosActivos()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* BLOQUE 1: Total Alumnos - FUNCIONAL */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Alumnos</CardTitle>
          <div className="p-2 bg-primary/10 rounded-lg">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {loadingAlumnos ? (
              <div className="animate-pulse bg-muted h-8 w-16 rounded"></div>
            ) : (
              totalAlumnos.toLocaleString()
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* BLOQUE 2: Profesores Activos - FUNCIONAL */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Profesores Activos</CardTitle>
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Users className="h-4 w-4 text-secondary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {loadingProfesores ? (
              <div className="animate-pulse bg-muted h-8 w-16 rounded"></div>
            ) : (
              totalProfesores.toLocaleString()
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* BLOQUE 3: Materias - FUNCIONAL */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Materias</CardTitle>
          <div className="p-2 bg-accent/10 rounded-lg">
            <BookOpen className="h-4 w-4 text-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {loadingMaterias ? (
              <div className="animate-pulse bg-muted h-8 w-16 rounded"></div>
            ) : (
              totalMaterias.toLocaleString()
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* BLOQUE 4: Cursos Activos - FUNCIONAL */}
      <Card className="border-border hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Cursos Activos</CardTitle>
          <div className="p-2 bg-chart-4/20 rounded-lg">
            <Calendar className="h-4 w-4 text-chart-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {loadingCursosActivos ? (
              <div className="animate-pulse bg-muted h-8 w-16 rounded"></div>
            ) : (
              totalCursosActivos.toLocaleString()
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
