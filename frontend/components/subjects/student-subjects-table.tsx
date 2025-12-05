"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, User, Clock, GraduationCap } from "lucide-react"
import { getAuth } from "@/lib/auth"
import { getEnrollments } from "@/lib/api/enrollments"
import { dictadosApi } from "@/lib/api/dictados"
import type { Enrollment, Dictado } from "@/lib/types"

interface StudentSubjectWithEnrollment {
  id: number
  nombre: string
  profesorNombre: string
  profesorApellido: string
  cursoNombre: string
  inscripcionEstado: string
  dictadoActivo: boolean
}

export function StudentSubjectsTable() {
  const [mySubjects, setMySubjects] = useState<StudentSubjectWithEnrollment[]>([])
  const [loading, setLoading] = useState(true)
  const { userId } = getAuth()

  useEffect(() => {
    if (userId) {
      loadMySubjects()
    }
  }, [userId])

  const loadMySubjects = async () => {
    try {
      setLoading(true)
      
      // 1. Obtener inscripciones del alumno (esto me da los cursos)
      const enrollments = await getEnrollments()
      const myEnrollments = enrollments.filter(
        (e: Enrollment) => e.alumnoId === parseInt(userId || "0")
      )
      
      if (myEnrollments.length === 0) {
        setMySubjects([])
        return
      }
      
      // 2. Obtener todos los dictados
      const dictados = await dictadosApi.getAll()
      
      // 3. Filtrar dictados de los cursos donde estoy inscripto
      const myCourseIds = new Set(myEnrollments.map(e => e.cursoId))
      const myDictados = dictados.filter(
        (d: Dictado) => myCourseIds.has(d.cursoId) && d.activo
      )
      
      // 4. Crear mapa de inscripciones por curso
      const enrollmentMap = new Map(myEnrollments.map(e => [e.cursoId, e]))
      
      // 5. Convertir dictados a subjects con información de inscripción
      const studentsSubjects = myDictados.map((dictado: Dictado) => {
        const enrollment = enrollmentMap.get(dictado.cursoId)
        return {
          id: dictado.materiaId,
          nombre: dictado.materiaNombre,
          profesorNombre: dictado.materiaProfesorNombre,
          profesorApellido: dictado.materiaProfesorApellido,
          cursoNombre: dictado.cursoNombre,
          inscripcionEstado: enrollment?.estado || "ACTIVO",
          dictadoActivo: dictado.activo
        }
      })
      
      setMySubjects(studentsSubjects)
    } catch (error) {
      console.error("Error loading student subjects:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "ACTIVO": return "bg-green-100 text-green-800 border-green-200"
      case "PENDIENTE": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "COMPLETADO": return "bg-blue-100 text-blue-800 border-blue-200"
      case "FINALIZADO": return "bg-blue-100 text-blue-800 border-blue-200"
      case "ANULADO": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Mis Materias
        </CardTitle>
        <p className="text-sm text-muted-foreground">Materias en las que estás inscripto</p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Cargando materias...</div>
          </div>
        ) : mySubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="font-medium text-foreground mb-2">No hay materias</h3>
            <p className="text-sm text-muted-foreground">
              No estás inscripto en ninguna materia actualmente
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mySubjects.map((subject) => (
              <Card key={subject.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{subject.nombre}</h4>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(subject.inscripcionEstado)}
                      >
                        {subject.inscripcionEstado}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>Prof. {subject.profesorNombre} {subject.profesorApellido}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>Curso: {subject.cursoNombre}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>ID: #{subject.id}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}