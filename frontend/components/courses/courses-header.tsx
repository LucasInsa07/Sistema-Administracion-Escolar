import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus, Table, Grid3X3, LayoutGrid } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface CoursesHeaderProps {
  onCreateClick: () => void
  viewMode: "table" | "modules"
  onViewModeChange: (mode: "table" | "modules") => void
}

export function CoursesHeader({ onCreateClick, viewMode, onViewModeChange }: CoursesHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-muted border-b border-border">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/" className="text-secondary">AAES</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-medium">Cursos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Spacer para empujar los botones a la derecha */}
        <div className="flex-1" />
        
        {/* Botones de vista y acciones */}
        <div className="flex items-center gap-2">
          {/* Selector de vista */}
          <div className="flex items-center border border-border rounded-lg p-1 bg-card">
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("table")}
              className={`h-7 px-2 ${viewMode === "table" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-secondary hover:bg-muted"}`}
            >
              <Table className="h-4 w-4 mr-1" />
              Tabla
            </Button>
            <Button
              variant={viewMode === "modules" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("modules")}
              className={`h-7 px-2 ${viewMode === "modules" ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-secondary hover:bg-muted"}`}
            >
              <LayoutGrid className="h-4 w-4 mr-1" />
              Módulos
            </Button>
          </div>
          
          {/* Botón de crear */}
          <Button onClick={onCreateClick} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Curso
          </Button>
        </div>
      </div>
    </header>
  )
}
