import { TeachersHeader } from "@/components/teachers/teachers-header"
import { TeachersTable } from "@/components/teachers/teachers-table"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function TeachersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TeachersHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <TeachersTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
