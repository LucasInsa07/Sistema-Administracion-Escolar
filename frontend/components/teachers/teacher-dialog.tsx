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
import { createTeacher, updateTeacher } from "@/lib/api/teachers"
import type { Teacher, CreateTeacherRequest } from "@/lib/types"

interface TeacherDialogProps {
  open: boolean
  onClose: () => void
  teacher?: Teacher | null
}

export function TeacherDialog({ open, onClose, teacher }: TeacherDialogProps) {
  const [formData, setFormData] = useState<CreateTeacherRequest>({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    especialidad: "",
    activo: true,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (teacher) {
      setFormData({
        nombre: teacher.nombre,
        apellido: teacher.apellido,
        dni: teacher.dni,
        email: teacher.email,
        telefono: teacher.telefono,
        especialidad: teacher.especialidad,
        activo: teacher.activo,
      })
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        telefono: "",
        especialidad: "",
        activo: true,
      })
    }
  }, [teacher, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (teacher) {
        await updateTeacher(teacher.id, formData)
      } else {
        await createTeacher(formData)
      }
      onClose()
    } catch (error) {
      console.error("Error saving teacher:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateTeacherRequest, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{teacher ? "Editar Profesor" : "Nuevo Profesor"}</DialogTitle>
          <DialogDescription>
            {teacher ? "Modifica la información del profesor" : "Completa los datos para registrar un nuevo profesor"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) => handleInputChange("apellido", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dni">DNI</Label>
              <Input
                id="dni"
                value={formData.dni}
                onChange={(e) => handleInputChange("dni", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="especialidad">Especialidad</Label>
              <Input
                id="especialidad"
                value={formData.especialidad}
                onChange={(e) => handleInputChange("especialidad", e.target.value)}
                placeholder="ej: Matemática, Historia, Lengua..."
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) => handleInputChange("activo", checked)}
              />
              <Label htmlFor="activo">Profesor activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : teacher ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
