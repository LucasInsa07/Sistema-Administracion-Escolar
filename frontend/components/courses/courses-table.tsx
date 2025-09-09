"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { CourseDialog } from "./course-dialog"
import { getCourses, deleteCourse } from "@/lib/api/courses"
import type { Course } from "@/lib/types"

export function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.anio.toString().includes(searchTerm) ||
        course.division.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCourses(filtered)
  }, [courses, searchTerm])

  const loadCourses = async () => {
    try {
      setLoading(true)
      const data = await getCourses()
      setCourses(data)
    } catch (error) {
      console.error("Error loading courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course: Course) => {
    setSelectedCourse(course)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este curso?")) {
      try {
        await deleteCourse(id)
        await loadCourses()
      } catch (error) {
        console.error("Error deleting course:", error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedCourse(null)
    loadCourses()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestión de Cursos</CardTitle>
            <CardDescription>Administra los cursos y divisiones de la institución</CardDescription>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Curso
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, año o división..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Cargando cursos...</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Año</TableHead>
                <TableHead>División</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    {searchTerm ? "No se encontraron cursos" : "No hay cursos registrados"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-mono text-sm text-muted-foreground">#{course.id}</TableCell>
                    <TableCell className="font-medium">{course.nombre}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.anio}°</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{course.division}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{course.descripcion}</TableCell>
                    <TableCell>
                      <Badge variant={course.activo ? "default" : "secondary"}>
                        {course.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(course)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(course.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <CourseDialog open={isDialogOpen} onClose={handleDialogClose} course={selectedCourse} />
    </Card>
  )
}
