"use client"

import { useState, useEffect } from "react"
import type { Dictado } from "@/lib/types"
import { dictadosApi } from "@/lib/api/dictados"
import { DictadosHeader } from "@/components/dictados/dictados-header"
import { DictadosTable } from "@/components/dictados/dictados-table"
import { DictadoDialog } from "@/components/dictados/dictado-dialog"

export default function DictadosPage() {
  const [dictados, setDictados] = useState<Dictado[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDictado, setEditingDictado] = useState<Dictado | null>(null)

  useEffect(() => {
    loadDictados()
  }, [])

  const loadDictados = async () => {
    try {
      setLoading(true)
      const data = await dictadosApi.getAll()
      setDictados(data)
    } catch (error) {
      console.error("Error loading dictados:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingDictado(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (dictado: Dictado) => {
    setEditingDictado(dictado)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este dictado?")) {
      try {
        await dictadosApi.delete(id)
        await loadDictados()
      } catch (error) {
        console.error("Error deleting dictado:", error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingDictado(null)
    loadDictados()
  }

  const filteredDictados = dictados.filter(
    (dictado) =>
      dictado.materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dictado.curso.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dictado.materia.profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dictado.materia.profesor.apellido.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DictadosHeader onCreateClick={handleCreate} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <DictadosTable dictados={filteredDictados} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />

      <DictadoDialog open={isDialogOpen} onClose={handleDialogClose} dictado={editingDictado} />
    </div>
  )
}
