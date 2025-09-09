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
          materiaId: dictado.materia.id,
          cursoId: dictado.curso.id,
          activo: dictado.activo,
        })
      } else {
        setFormData({
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
      setSubjects(data.filter((subject) => subject.activo))
    } catch (error) {
      console.error("Error loading subjects:", error)
    }
  }

  const loadCourses = async () => {
    try {
      const data = await coursesApi.getAll()
      setCourses(data.filter((course) => course.activo))
    } catch (error) {
      console.error("Error loading courses:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.materiaId === 0 || formData.cursoId === 0) return

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
            <Label htmlFor="materia">Materia</Label>
            <Select
              value={formData.materiaId.toString()}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, materiaId: Number.parseInt(value) }))}
              disabled={!!dictado}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar materia" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id.toString()}>
                    {subject.nombre} - {subject.profesor.nombre} {subject.profesor.apellido}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="curso">Curso</Label>
            <Select
              value={formData.cursoId.toString()}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, cursoId: Number.parseInt(value) }))}
              disabled={!!dictado}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.nombre}
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
            <Button type="submit" disabled={loading || formData.materiaId === 0 || formData.cursoId === 0}>
              {loading ? "Guardando..." : dictado ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
