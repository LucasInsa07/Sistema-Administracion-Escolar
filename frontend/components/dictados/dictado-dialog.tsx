"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Dictado, CreateDictadoRequest, Subject, Course } from "@/lib/types"
import { dictadosApi } from "@/lib/api/dictados"
import { subjectsApi } from "@/lib/api/subjects"
import { coursesApi } from "@/lib/api/courses"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DictadoDialogProps {
  open: boolean
  onClose: () => void
  dictado?: Dictado | null
}

export function DictadoDialog({ open, onClose, dictado }: DictadoDialogProps) {
  const [formData, setFormData] = useState<CreateDictadoRequest>({
    fechaInicio: "",
    fechaFin: "",
    materiaId: 0,
    cursoId: 0,
    activo: true,
  })
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      loadSubjects()
      loadCourses()
      if (dictado) {
        setFormData({
          fechaInicio: dictado.fechaInicio,
          fechaFin: dictado.fechaFin,
          materiaId: dictado.materiaId,
          cursoId: dictado.cursoId,
          activo: dictado.activo,
        })
      } else {
        setFormData({
          fechaInicio: "",
          fechaFin: "",
          materiaId: 0,
          cursoId: 0,
          activo: true,
        })
      }
    }
  }, [open, dictado])

  const loadSubjects = async () => {
    try {
      const data = await subjectsApi.getAll()
      console.log("All subjects from API:", data)
      setSubjects(data) // Quitar filtro por activo ya que Subject no tiene ese campo
    } catch (error) {
      console.error("Error loading subjects:", error)
    }
  }

  const loadCourses = async () => {
    try {
      const data = await coursesApi.getAll()
      console.log("All courses from API:", data)
      console.log("Active courses:", data.filter(c => c.activo))
      console.log("Inactive courses:", data.filter(c => !c.activo))
      setCourses(data) // Mostrar todos los cursos por ahora
    } catch (error) {
      console.error("Error loading courses:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.materiaId === 0 || formData.cursoId === 0 || !formData.fechaInicio || !formData.fechaFin) return

    try {
      setLoading(true)
      if (dictado) {
        await dictadosApi.update(dictado.id, formData)
      } else {
        await dictadosApi.create(formData)
      }
      onClose()
    } catch (error) {
      console.error("Error saving dictado:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dictado ? "Editar Dictado" : "Nuevo Dictado"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
            <input
              type="date"
              id="fechaInicio"
              value={formData.fechaInicio}
              onChange={(e) => setFormData((prev) => ({ ...prev, fechaInicio: e.target.value }))}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fechaFin">Fecha de Fin</Label>
            <input
              type="date"
              id="fechaFin"
              value={formData.fechaFin}
              onChange={(e) => setFormData((prev) => ({ ...prev, fechaFin: e.target.value }))}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="materia">Materia ({subjects.length} disponibles)</Label>
            <Select
              value={formData.materiaId.toString()}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, materiaId: Number.parseInt(value) }))}
              disabled={!!dictado}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar materia" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id.toString()}>
                    {subject.nombre} - {subject.profesorNombre} {subject.profesorApellido}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="curso">Curso ({courses.length} disponibles)</Label>
            <Select
              value={formData.cursoId.toString()}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, cursoId: Number.parseInt(value) }))}
              disabled={!!dictado}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.nombre} - Año {course.anio} División {course.division} {!course.activo ? "(Inactivo)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="activo"
              checked={formData.activo}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, activo: checked }))}
            />
            <Label htmlFor="activo">Activo</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || formData.materiaId === 0 || formData.cursoId === 0 || !formData.fechaInicio || !formData.fechaFin}>
              {loading ? "Guardando..." : dictado ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
