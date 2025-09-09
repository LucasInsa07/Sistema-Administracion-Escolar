"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { EnrollmentDialog } from "./enrollment-dialog"
import { getEnrollments, deleteEnrollment } from "@/lib/api/enrollments"
import type { Enrollment } from "@/lib/types"

const getStatusVariant = (status: string) => {
  switch (status) {
    case "ACTIVO":
      return "default"
    case "SUSPENDIDO":
      return "destructive"
    case "INACTIVO":
      return "secondary"
    default:
      return "secondary"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "ACTIVO":
      return "Activo"
    case "SUSPENDIDO":
      return "Suspendido"
    case "INACTIVO":
      return "Inactivo"
    default:
      return status
  }
}

export function EnrollmentsTable() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEnrollments()
  }, [])

  useEffect(() => {
    const filtered = enrollments.filter(
      (enrollment) =>
        `${enrollment.alumno.nombre} ${enrollment.alumno.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.alumno.dni.includes(searchTerm) ||
        enrollment.curso.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.estado.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredEnrollments(filtered)
  }, [enrollments, searchTerm])

  const loadEnrollments = async () => {
    try {
      setLoading(true)
      const data = await getEnrollments()
      setEnrollments(data)
    } catch (error) {
      console.error("Error loading enrollments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (enrollment: Enrollment) => {
    setSelectedEnrollment(enrollment)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar esta inscripción?")) {
      try {
        await deleteEnrollment(id)
        await loadEnrollments()
      } catch (error) {
        console.error("Error deleting enrollment:", error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedEnrollment(null)
    loadEnrollments()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestión de Inscripciones</CardTitle>
            <CardDescription>Administra las inscripciones de alumnos a cursos</CardDescription>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Inscripción
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por alumno, DNI, curso o estado..."
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
            <div className="text-muted-foreground">Cargando inscripciones...</div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Alumno</TableHead>
                <TableHead>DNI</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Inscripción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    {searchTerm ? "No se encontraron inscripciones" : "No hay inscripciones registradas"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-mono text-sm text-muted-foreground">#{enrollment.id}</TableCell>
                    <TableCell className="font-medium">
                      {enrollment.alumno.nombre} {enrollment.alumno.apellido}
                    </TableCell>
                    <TableCell>{enrollment.alumno.dni}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{enrollment.curso.nombre}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(enrollment.estado)}>{getStatusLabel(enrollment.estado)}</Badge>
                    </TableCell>
                    <TableCell>{new Date(enrollment.fechaInscripcion).toLocaleDateString("es-AR")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(enrollment)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(enrollment.id)}>
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

      <EnrollmentDialog open={isDialogOpen} onClose={handleDialogClose} enrollment={selectedEnrollment} />
    </Card>
  )
}
