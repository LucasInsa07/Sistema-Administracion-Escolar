"use client"

import { BookOpen, GraduationCap, Home, Users, UserCheck, Calendar, Settings, BookMarked, BarChart } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Alumnos",
    url: "/alumnos",
    icon: GraduationCap,
  },
  {
    title: "Profesores",
    url: "/profesores",
    icon: Users,
  },
  {
    title: "Materias",
    url: "/materias",
    icon: BookOpen,
  },
  {
    title: "Cursos",
    url: "/cursos",
    icon: Calendar,
  },
  {
    title: "Dictados",
    url: "/dictados",
    icon: BookMarked,
  },
  {
    title: "Inscripciones",
    url: "/inscripciones",
    icon: UserCheck,
  },
  {
    title: "Reportes",
    url: "/reportes",
    icon: BarChart,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border">
        <SidebarHeader>
          <div className="flex items-center gap-3 px-4 py-4 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="font-bold text-sidebar-foreground text-lg">AAES</span>
              <span className="text-xs text-muted-foreground">Sistema Académico</span>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Gestión
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => {
                  const isActive = pathname === item.url
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuButton 
                            asChild 
                            className={`
                              w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                              transition-all duration-200 ease-in-out
                              group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2
                              ${isActive 
                                ? 'bg-primary/15 text-primary border-r-2 border-primary shadow-sm' 
                                : 'text-sidebar-foreground hover:bg-primary/10 hover:text-primary hover:shadow-sm'
                              }
                            `}
                          >
                            <a href={item.url} className="flex items-center gap-3 w-full">
                              <item.icon className="h-5 w-5 shrink-0" />
                              <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="group-data-[collapsible=icon]:flex hidden">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="px-2 pb-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton className="
                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200 ease-in-out
                    group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2
                    text-sidebar-foreground hover:bg-primary/10 hover:text-primary hover:shadow-sm
                  " asChild>
                    <a href="/configuracion" className="flex items-center gap-3 w-full">
                      <Settings className="h-5 w-5 shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden">Configuración</span>
                    </a>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className="group-data-[collapsible=icon]:flex hidden">
                  <p>Configuración</p>
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  )
}
