"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AdminDashboard } from "@/components/admin-dashboard"
import { StudentDashboard } from "@/components/student-dashboard"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AuthGuard from "@/components/auth-guard"
import { getAuth } from "@/lib/auth"
import { useState, useEffect } from "react"

export default function DashboardPage() {
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
          <DashboardHeader />
          {userRole === "ALUMNO" ? <StudentDashboard /> : <AdminDashboard />}
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
