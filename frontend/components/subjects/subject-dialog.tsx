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
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
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
    descripcion: "",
    profesorId: 0,
    activo: true,
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
        descripcion: subject.descripcion,
        profesorId: subject.profesor.id,
        activo: subject.activo,
      })
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        profesorId: 0,
        activo: true,
      })
    }
  }, [subject, open])

  const loadTeachers = async () => {
    try {
      setLoadingTeachers(true)
      const data = await getTeachers()
      setTeachers(data.filter((teacher) => teacher.activo))
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

  const handleInputChange = (field: keyof CreateSubjectRequest, value: string | number | boolean) => {
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
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                placeholder="Descripción de la materia y sus contenidos..."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profesor">Profesor Asignado</Label>
              {loadingTeachers ? (
                <div className="text-sm text-muted-foreground">Cargando profesores...</div>
              ) : (
                <Select
                  value={formData.profesorId.toString()}
                  onValueChange={(value) => handleInputChange("profesorId", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar profesor" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.nombre} {teacher.apellido} - {teacher.especialidad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) => handleInputChange("activo", checked)}
              />
              <Label htmlFor="activo">Materia activa</Label>
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
