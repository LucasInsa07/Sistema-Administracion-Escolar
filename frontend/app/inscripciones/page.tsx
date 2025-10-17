"use client"

import { useState, useEffect } from "react"
import type { Enrollment } from "@/lib/types"
import { enrollmentsApi, type BatchEnrollmentRequest, type BatchEnrollmentResult } from "@/lib/api/enrollments"
import { EnrollmentsHeader } from "@/components/enrollments/enrollments-header"
import { EnrollmentsTable } from "@/components/enrollments/enrollments-table"
import { EnrollmentDialog } from "@/components/enrollments/enrollment-dialog"
import { BatchEnrollmentDialog } from "@/components/enrollments/batch-enrollment-dialog"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AuthGuard from "@/components/auth-guard"

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false)
  const [editingEnrollment, setEditingEnrollment] = useState<Enrollment | null>(null)

  useEffect(() => {
    loadEnrollments()
  }, [])

  const loadEnrollments = async () => {
    try {
      setLoading(true)
      const data = await enrollmentsApi.getAll()
      setEnrollments(data)
    } catch (error) {
      console.error("Error loading enrollments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingEnrollment(null)
    setIsDialogOpen(true)
  }

  const handleCreateBatch = () => {
    setIsBatchDialogOpen(true)
  }

  const handleBatchSubmit = async (request: BatchEnrollmentRequest): Promise<BatchEnrollmentResult> => {
    console.log("🚀 Enviando inscripciones en lote:", request)
    try {
      const result = await enrollmentsApi.createBatch(request)
      console.log("✅ Resultado del batch:", result)
      return result
    } catch (error) {
      console.error("❌ Error en batch inscripciones:", error)
      throw error
    }
  }

  const handleBatchDialogClose = () => {
    setIsBatchDialogOpen(false)
    loadEnrollments() // Refresh the list
  }

  const handleEdit = (enrollment: Enrollment) => {
    setEditingEnrollment(enrollment)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar esta inscripción?")) {
      try {
        await enrollmentsApi.delete(id)
        await loadEnrollments()
      } catch (error) {
        console.error("Error deleting enrollment:", error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingEnrollment(null)
    loadEnrollments()
  }

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      `${enrollment.alumnoNombre} ${enrollment.alumnoApellido}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.alumnoEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.cursoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.estado.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <EnrollmentsHeader 
              onCreateClick={handleCreate} 
              onCreateBatchClick={handleCreateBatch}
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />

            <EnrollmentsTable enrollments={filteredEnrollments} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />

            <EnrollmentDialog open={isDialogOpen} onClose={handleDialogClose} enrollment={editingEnrollment} />
            
            <BatchEnrollmentDialog 
              isOpen={isBatchDialogOpen}
              onClose={handleBatchDialogClose}
              onSubmit={handleBatchSubmit}
            />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
