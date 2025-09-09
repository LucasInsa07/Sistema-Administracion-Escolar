import { SubjectsHeader } from "@/components/subjects/subjects-header"
import { SubjectsTable } from "@/components/subjects/subjects-table"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function SubjectsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SubjectsHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <SubjectsTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
