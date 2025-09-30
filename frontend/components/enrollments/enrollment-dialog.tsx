"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createEnrollment, updateEnrollment } from "@/lib/api/enrollments"
import { getStudents } from "@/lib/api/students"
import { getCourses } from "@/lib/api/courses"
import type { Enrollment, CreateEnrollmentRequest, Student, Course } from "@/lib/types"

interface EnrollmentDialogProps {
  open: boolean
  onClose: () => void
  enrollment?: Enrollment | null
}

const ENROLLMENT_STATES = [
  { value: "ACTIVO", label: "Activo" },
  { value: "INACTIVO", label: "Inactivo" },
  { value: "SUSPENDIDO", label: "Suspendido" },
]

export function EnrollmentDialog({ open, onClose, enrollment }: EnrollmentDialogProps) {
  const [formData, setFormData] = useState<CreateEnrollmentRequest>({
    alumnoId: 0,
    cursoId: 0,
    estado: "ACTIVO",
    fechaInscripcion: new Date().toISOString().split("T")[0],
  })
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (open) {
      loadData()
    }
  }, [open])

  useEffect(() => {
    if (enrollment) {
      setFormData({
        alumnoId: enrollment.alumno.id,
        cursoId: enrollment.curso.id,
        estado: enrollment.estado,
        fechaInscripcion: enrollment.fechaInscripcion.split("T")[0],
      })
    } else {
      setFormData({
        alumnoId: 0,
        cursoId: 0,
        estado: "ACTIVO",
        fechaInscripcion: new Date().toISOString().split("T")[0],
      })
    }
  }, [enrollment, open])

  const loadData = async () => {
    try {
      setLoadingData(true)
      const [studentsData, coursesData] = await Promise.all([getStudents(), getCourses()])
      setStudents(studentsData)
      setCourses(coursesData.filter((course) => course.activo))
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.alumnoId === 0 || formData.cursoId === 0) {
      alert("Por favor seleccione un alumno y un curso")
      return
    }

    setLoading(true)

    try {
      if (enrollment) {
        await updateEnrollment(enrollment.id, formData)
      } else {
        await createEnrollment(formData)
      }
      onClose()
    } catch (error) {
      console.error("Error saving enrollment:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateEnrollmentRequest, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{enrollment ? "Editar Inscripción" : "Nueva Inscripción"}</DialogTitle>
          <DialogDescription>
            {enrollment
              ? "Modifica la información de la inscripción"
              : "Completa los datos para registrar una nueva inscripción"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="alumno">Alumno</Label>
              {loadingData ? (
                <div className="text-sm text-muted-foreground">Cargando alumnos...</div>
              ) : (
                <Select
                  value={formData.alumnoId.toString()}
                  onValueChange={(value) => handleInputChange("alumnoId", Number.parseInt(value))}
                  disabled={!!enrollment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar alumno" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.nombre} {student.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="curso">Curso</Label>
              {loadingData ? (
                <div className="text-sm text-muted-foreground">Cargando cursos...</div>
              ) : (
                <Select
                  value={formData.cursoId.toString()}
                  onValueChange={(value) => handleInputChange("cursoId", Number.parseInt(value))}
                  disabled={!!enrollment}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.nombre} - {course.descripcion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estado">Estado</Label>
              <Select value={formData.estado} onValueChange={(value) => handleInputChange("estado", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {ENROLLMENT_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fechaInscripcion">Fecha de Inscripción</Label>
              <Input
                id="fechaInscripcion"
                type="date"
                value={formData.fechaInscripcion}
                onChange={(e) => handleInputChange("fechaInscripcion", e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || loadingData}>
              {loading ? "Guardando..." : enrollment ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
