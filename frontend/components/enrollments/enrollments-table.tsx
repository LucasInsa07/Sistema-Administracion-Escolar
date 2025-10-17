"use client"

import type { Enrollment } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const getStatusVariant = (status: string) => {
  switch (status) {
    case "ACTIVO":
      return "default"
    case "ANULADO":
      return "destructive"
    case "FINALIZADO":
      return "secondary"
    default:
      return "secondary"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "ACTIVO":
      return "Activo"
    case "ANULADO":
      return "Anulado"
    case "FINALIZADO":
      return "Finalizado"
    default:
      return status
  }
}

interface EnrollmentsTableProps {
  enrollments: Enrollment[]
  loading: boolean
  onEdit: (enrollment: Enrollment) => void
  onDelete: (id: number) => void
}

export function EnrollmentsTable({ enrollments, loading, onEdit, onDelete }: EnrollmentsTableProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Cargando inscripciones...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Inscripciones ({enrollments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Alumno</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha Inscripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No se encontraron inscripciones
                </TableCell>
              </TableRow>
            ) : (
              enrollments.map((enrollment) => (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">#{enrollment.id}</TableCell>
                  <TableCell>
                    {enrollment.alumnoNombre} {enrollment.alumnoApellido}
                  </TableCell>
                  <TableCell>{enrollment.alumnoEmail}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{enrollment.cursoNombre}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(enrollment.estado)}>{getStatusLabel(enrollment.estado)}</Badge>
                  </TableCell>
                  <TableCell>{new Date(enrollment.fechaInscripcion).toLocaleDateString("es-AR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(enrollment)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onDelete(enrollment.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}