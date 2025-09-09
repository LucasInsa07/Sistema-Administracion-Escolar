"use client"

import type { Dictado } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DictadosTableProps {
  dictados: Dictado[]
  loading: boolean
  onEdit: (dictado: Dictado) => void
  onDelete: (id: number) => void
}

export function DictadosTable({ dictados, loading, onEdit, onDelete }: DictadosTableProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Cargando dictados...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Dictados ({dictados.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Materia</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Profesor</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dictados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No se encontraron dictados
                </TableCell>
              </TableRow>
            ) : (
              dictados.map((dictado) => (
                <TableRow key={dictado.id}>
                  <TableCell className="font-medium">#{dictado.id}</TableCell>
                  <TableCell>{dictado.materia.nombre}</TableCell>
                  <TableCell>{dictado.curso.nombre}</TableCell>
                  <TableCell>
                    {dictado.materia.profesor.nombre} {dictado.materia.profesor.apellido}
                  </TableCell>
                  <TableCell>
                    <Badge variant={dictado.activo ? "default" : "secondary"}>
                      {dictado.activo ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => onEdit(dictado)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onDelete(dictado.id)}>
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
