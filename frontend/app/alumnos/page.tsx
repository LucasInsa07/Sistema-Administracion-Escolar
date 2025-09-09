import { StudentsHeader } from "@/components/students/students-header"
import { StudentsTable } from "@/components/students/students-table"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function StudentsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <StudentsHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <StudentsTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
