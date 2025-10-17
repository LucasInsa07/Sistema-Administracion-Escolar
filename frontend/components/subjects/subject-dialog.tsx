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
import { createSubject, updateSubject } from "@/lib/api/subjects"
import { getTeachers } from "@/lib/api/teachers"
import type { Subject, CreateSubjectRequest, Teacher } from "@/lib/types"

interface SubjectDialogProps {
  open: boolean
  onClose: () => void
  subject?: Subject | null
}

export function SubjectDialog({ open, onClose, subject }: SubjectDialogProps) {
  const [formData, setFormData] = useState<CreateSubjectRequest>({
    nombre: "",
    profesorId: 0,
  })
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingTeachers, setLoadingTeachers] = useState(false)

  useEffect(() => {
    if (open) {
      loadTeachers()
    }
  }, [open])

  useEffect(() => {
    if (subject) {
      setFormData({
        nombre: subject.nombre,
        profesorId: subject.profesorId || 0,
        diaSemana: (subject as any).diaSemana || "",
        horaInicio: (subject as any).horaInicio || "",
        horaFin: (subject as any).horaFin || "",
      })
    } else {
      setFormData({
        nombre: "",
        profesorId: 0,
        diaSemana: "",
        horaInicio: "",
        horaFin: "",
      })
    }
  }, [subject, open])

  const loadTeachers = async () => {
    try {
      setLoadingTeachers(true)
      const data = await getTeachers()
      setTeachers(data)
    } catch (error) {
      console.error("Error loading teachers:", error)
    } finally {
      setLoadingTeachers(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.profesorId === 0) {
      alert("Por favor seleccione un profesor")
      return
    }

    setLoading(true)

    try {
      if (subject) {
        await updateSubject(subject.id, formData)
      } else {
        await createSubject(formData)
      }
      onClose()
    } catch (error) {
      console.error("Error saving subject:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateSubjectRequest, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{subject ? "Editar Materia" : "Nueva Materia"}</DialogTitle>
          <DialogDescription>
            {subject ? "Modifica la información de la materia" : "Completa los datos para registrar una nueva materia"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre de la Materia</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="ej: Matemática, Historia, Lengua..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profesor">Profesor Asignado</Label>
              {loadingTeachers ? (
                <div className="text-sm text-muted-foreground">Cargando profesores...</div>
              ) : (
                <Select
                  value={formData.profesorId.toString()}
                  onValueChange={(teacherId) => {
                    handleInputChange("profesorId", Number(teacherId))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar profesor" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.nombre} {teacher.apellido}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          
            {/* Horario */}
            <div className="grid gap-2">
              <Label htmlFor="diaSemana">Día de la semana</Label>
              <Select
                value={formData.diaSemana}
                onValueChange={(v) => handleInputChange("diaSemana", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar día (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lunes">Lunes</SelectItem>
                  <SelectItem value="Martes">Martes</SelectItem>
                  <SelectItem value="Miércoles">Miércoles</SelectItem>
                  <SelectItem value="Jueves">Jueves</SelectItem>
                  <SelectItem value="Viernes">Viernes</SelectItem>
                  <SelectItem value="Sábado">Sábado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="horaInicio">Hora de inicio</Label>
                <Input id="horaInicio" type="time" value={formData.horaInicio as string | undefined} onChange={(e) => handleInputChange("horaInicio", e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="horaFin">Hora de fin</Label>
                <Input id="horaFin" type="time" value={formData.horaFin as string | undefined} onChange={(e) => handleInputChange("horaFin", e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || loadingTeachers}>
              {loading ? "Guardando..." : subject ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
