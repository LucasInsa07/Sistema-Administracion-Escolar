"use client"

import { SubjectsHeader } from "@/components/subjects/subjects-header"
import { SubjectsTable } from "@/components/subjects/subjects-table"
import { StudentSubjectsTable } from "@/components/subjects/student-subjects-table"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import AuthGuard from "@/components/auth-guard"
import { getAuth } from "@/lib/auth"
import { useState, useEffect } from "react"

export default function SubjectsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  
  useEffect(() => {
    const { rol } = getAuth()
    setUserRole(rol)
  }, [])

  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {userRole === "ALUMNO" ? (
            <>
              <DashboardHeader />
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <StudentSubjectsTable />
              </div>
            </>
          ) : (
            <>
              <SubjectsHeader />
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <SubjectsTable />
              </div>
            </>
          )}
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
