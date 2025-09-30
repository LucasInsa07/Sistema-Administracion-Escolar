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
import { createStudent, updateStudent } from "@/lib/api/students"
import type { Student, CreateStudentRequest } from "@/lib/types"

interface StudentDialogProps {
  open: boolean
  onClose: () => void
  student?: Student | null
}

export function StudentDialog({ open, onClose, student }: StudentDialogProps) {
  const [formData, setFormData] = useState<CreateStudentRequest>({
    nombre: "",
    apellido: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (student) {
      setFormData({
        nombre: student.nombre,
        apellido: student.apellido,
        email: student.email,
      })
    } else {
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
      })
    }
  }, [student, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (student) {
        await updateStudent(student.id, formData)
      } else {
        await createStudent(formData)
      }
      onClose()
    } catch (error) {
      console.error("Error saving student:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateStudentRequest, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{student ? "Editar Alumno" : "Nuevo Alumno"}</DialogTitle>
          <DialogDescription>
            {student ? "Modifica la información del alumno" : "Completa los datos para registrar un nuevo alumno"}
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : student ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
