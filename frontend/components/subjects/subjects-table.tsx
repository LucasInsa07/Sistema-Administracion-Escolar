"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { SubjectDialog } from "./subject-dialog"
import { getSubjects, deleteSubject } from "@/lib/api/subjects"
import { getTeachers } from "@/lib/api/teachers"
import type { Subject, Teacher } from "@/lib/types"

export function SubjectsTable() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const filtered = subjects.filter((subject) => {
      const teacherName = `${subject.profesorNombre} ${subject.profesorApellido}`
      
      return (
        subject.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacherName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    setFilteredSubjects(filtered)
  }, [subjects, searchTerm])

  const loadData = async () => {
    try {
      setLoading(true)
      const [subjectsData, teachersData] = await Promise.all([
        getSubjects(),
        getTeachers()
      ])
      setSubjects(subjectsData)
      setTeachers(teachersData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTeacherById = (teacherId?: number): Teacher | undefined => {
    return teacherId ? teachers.find(t => t.id === teacherId) : undefined
  }

  const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar esta materia?")) {
      try {
        await deleteSubject(id)
        await loadData()
      } catch (error) {
        console.error("Error deleting subject:", error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedSubject(null)
    loadData()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestión de Materias</CardTitle>
            <CardDescription>Administra las materias y sus profesores asignados</CardDescription>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Materia
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre de materia o profesor..."
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
            <div className="text-muted-foreground">Cargando materias...</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Profesor</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    {searchTerm ? "No se encontraron materias" : "No hay materias registradas"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-mono text-sm text-muted-foreground">#{subject.id}</TableCell>
                    <TableCell className="font-medium">{subject.nombre}</TableCell>
                    <TableCell>
                      {subject.profesorNombre} {subject.profesorApellido}
                    </TableCell>
                    <TableCell>
                      {subject.diaSemana ? (
                        <div className="text-sm">
                          <div className="font-medium">{subject.diaSemana}</div>
                          <div className="text-muted-foreground text-xs">
                            {subject.horaInicio ? subject.horaInicio : ""}{subject.horaInicio && subject.horaFin ? ` - ${subject.horaFin}` : subject.horaFin ? subject.horaFin : ""}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(subject)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(subject.id)}>
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

      <SubjectDialog open={isDialogOpen} onClose={handleDialogClose} subject={selectedSubject} />
    </Card>
  )
}
