"use client"

import { BookOpen, GraduationCap, Home, Users, UserCheck, Calendar, BookMarked, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { getAuth } from "@/lib/auth"
import { useState, useEffect } from "react"

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

const getMenuItems = (rol: string | null) => {
  const baseItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      roles: ["ADMIN", "ALUMNO"]
    },
  ]
  
  const adminItems = [
    {
      title: "Alumnos",
      url: "/alumnos",
      icon: GraduationCap,
      roles: ["ADMIN"]
    },
    {
      title: "Profesores",
      url: "/profesores",
      icon: Users,
      roles: ["ADMIN"]
    },
    {
      title: "Materias",
      url: "/materias",
      icon: BookOpen,
      roles: ["ADMIN"]
    },
    {
      title: "Cursos",
      url: "/cursos",
      icon: Calendar,
      roles: ["ADMIN"]
    },
    {
      title: "Dictados",
      url: "/dictados",
      icon: BookMarked,
      roles: ["ADMIN"]
    },
    {
      title: "Inscripciones",
      url: "/inscripciones",
      icon: UserCheck,
      roles: ["ADMIN"]
    },
  ]
  
  const studentItems = [
    {
      title: "Mis Materias",
      url: "/materias",
      icon: BookOpen,
      roles: ["ALUMNO"]
    },
    {
      title: "Mi Perfil",
      url: "/perfil",
      icon: User,
      roles: ["ALUMNO"]
    },
  ]
  
  // Si no hay rol definido, mostrar items de admin por defecto
  // Esto ayuda durante la carga inicial
  if (!rol) {
    return [...baseItems, ...adminItems]
  }
  
  const specificItems = rol === "ALUMNO" ? studentItems : adminItems
  return [...baseItems, ...specificItems]
}

export function AppSidebar() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)
  
  useEffect(() => {
    const { rol } = getAuth()
    setUserRole(rol)
  }, [])
  
  const items = getMenuItems(userRole)

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
      </Sidebar>
    </TooltipProvider>
  )
}
