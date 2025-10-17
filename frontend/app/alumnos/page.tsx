"use client"

import { useState } from "react"
import type { CreateStudentRequest } from "@/lib/types"
import { studentsApi, type BatchStudentResult } from "@/lib/api/students"
import { StudentsHeader } from "@/components/students/students-header"
import { StudentsTable } from "@/components/students/students-table"
import { StudentDialog } from "@/components/students/student-dialog"
import { BatchStudentDialog } from "@/components/students/batch-student-dialog"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AuthGuard from "@/components/auth-guard"

export default function StudentsPage() {
  const [isStudentDialogOpen, setIsStudentDialogOpen] = useState(false)
  const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleCreateStudent = () => {
    setIsStudentDialogOpen(true)
  }

  const handleCreateBatch = () => {
    setIsBatchDialogOpen(true)
  }

  const handleStudentDialogClose = () => {
    setIsStudentDialogOpen(false)
    setRefreshKey(prev => prev + 1) // Trigger refresh
  }

  const handleBatchDialogClose = () => {
    setIsBatchDialogOpen(false)
    setRefreshKey(prev => prev + 1) // Trigger refresh
  }

  const handleBatchSubmit = async (students: CreateStudentRequest[]): Promise<BatchStudentResult> => {
    console.log("🚀 Enviando estudiantes al API:", students)
    try {
      const result = await studentsApi.createBatch(students)
      console.log("✅ Resultado del batch:", result)
      return result
    } catch (error) {
      console.error("❌ Error en batch:", error)
      throw error
    }
  }

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <StudentsHeader 
            onCreateBatch={handleCreateBatch}
          />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <StudentsTable key={refreshKey} />
          </div>
        </SidebarInset>
        
        <StudentDialog 
          open={isStudentDialogOpen}
          onClose={handleStudentDialogClose}
        />
        
        <BatchStudentDialog
          isOpen={isBatchDialogOpen}
          onClose={handleBatchDialogClose}
          onSubmit={handleBatchSubmit}
        />
      </SidebarProvider>
    </AuthGuard>
  )
}
