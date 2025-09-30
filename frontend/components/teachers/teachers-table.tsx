"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { TeacherDialog } from "./teacher-dialog"
import { getTeachers, deleteTeacher } from "@/lib/api/teachers"
import type { Teacher } from "@/lib/types"

export function TeachersTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTeachers()
  }, [])

  useEffect(() => {
    const filtered = teachers.filter(
      (teacher) =>
        teacher.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTeachers(filtered)
  }, [teachers, searchTerm])

  const loadTeachers = async () => {
    try {
      setLoading(true)
      const data = await getTeachers()
      setTeachers(data)
    } catch (error) {
      console.error("Error loading teachers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este profesor?")) {
      try {
        await deleteTeacher(id)
        await loadTeachers()
      } catch (error) {
        console.error("Error deleting teacher:", error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedTeacher(null)
    loadTeachers()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestión de Profesores</CardTitle>
            <CardDescription>Administra la información de todos los docentes</CardDescription>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Profesor
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, apellido o email..."
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
            <div className="text-muted-foreground">Cargando profesores...</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    {searchTerm ? "No se encontraron profesores" : "No hay profesores registrados"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-mono text-sm text-muted-foreground">#{teacher.id}</TableCell>
                    <TableCell className="font-medium">
                      {teacher.nombre} {teacher.apellido}
                    </TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(teacher)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(teacher.id)}>
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

      <TeacherDialog open={isDialogOpen} onClose={handleDialogClose} teacher={selectedTeacher} />
    </Card>
  )
}
