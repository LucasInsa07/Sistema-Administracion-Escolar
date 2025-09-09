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
import { createCourse, updateCourse } from "@/lib/api/courses"
import type { Course, CreateCourseRequest } from "@/lib/types"

interface CourseDialogProps {
  open: boolean
  onClose: () => void
  course?: Course | null
}

const YEARS = [1, 2, 3, 4, 5, 6]
const DIVISIONS = ["A", "B", "C", "D", "E", "F"]

export function CourseDialog({ open, onClose, course }: CourseDialogProps) {
  const [formData, setFormData] = useState<CreateCourseRequest>({
    nombre: "",
    descripcion: "",
    anio: 1,
    division: "A",
    activo: true,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course) {
      setFormData({
        nombre: course.nombre,
        descripcion: course.descripcion,
        anio: course.anio,
        division: course.division,
        activo: course.activo,
      })
    } else {
      setFormData({
        nombre: "",
        descripcion: "",
        anio: 1,
        division: "A",
        activo: true,
      })
    }
  }, [course, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (course) {
        await updateCourse(course.id, formData)
      } else {
        await createCourse(formData)
      }
      onClose()
    } catch (error) {
      console.error("Error saving course:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof CreateCourseRequest, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Auto-generate course name when year or division changes
  useEffect(() => {
    if (formData.anio && formData.division) {
      const generatedName = `${formData.anio}° ${formData.division}`
      if (!course || formData.nombre === `${course.anio}° ${course.division}`) {
        setFormData((prev) => ({ ...prev, nombre: generatedName }))
      }
    }
  }, [formData.anio, formData.division, course])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{course ? "Editar Curso" : "Nuevo Curso"}</DialogTitle>
          <DialogDescription>
            {course ? "Modifica la información del curso" : "Completa los datos para registrar un nuevo curso"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="anio">Año</Label>
                <Select
                  value={formData.anio.toString()}
                  onValueChange={(value) => handleInputChange("anio", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar año" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}°
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="division">División</Label>
                <Select value={formData.division} onValueChange={(value) => handleInputChange("division", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar división" />
                  </SelectTrigger>
                  <SelectContent>
                    {DIVISIONS.map((division) => (
                      <SelectItem key={division} value={division}>
                        {division}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nombre">Nombre del Curso</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="ej: 1° A, 2° B..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                placeholder="Descripción del curso, turno, características especiales..."
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="activo"
                checked={formData.activo}
                onCheckedChange={(checked) => handleInputChange("activo", checked)}
              />
              <Label htmlFor="activo">Curso activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : course ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
