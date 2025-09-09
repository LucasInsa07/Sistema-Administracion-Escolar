import { EnrollmentsHeader } from "@/components/enrollments/enrollments-header"
import { EnrollmentsTable } from "@/components/enrollments/enrollments-table"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function EnrollmentsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <EnrollmentsHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <EnrollmentsTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
