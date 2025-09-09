import { CoursesHeader } from "@/components/courses/courses-header"
import { CoursesTable } from "@/components/courses/courses-table"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function CoursesPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <CoursesHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <CoursesTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
