"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReportesPage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-background min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Reportes</h1>
                <p className="text-sm text-muted-foreground">Genera informes y exportaciones del sistema</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Reporte de Alumnos</CardTitle>
                  <CardDescription>Listado completo por curso y estado</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Exportar lista de estudiantes</div>
                    <Button variant="outline">Generar PDF</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reporte de Profesores</CardTitle>
                  <CardDescription>Información de docentes y materias asignadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Exportar listado de docentes</div>
                    <Button variant="outline">Generar PDF</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas por Curso</CardTitle>
                  <CardDescription>Análisis de inscripciones y rendimiento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Visualizar gráficos</div>
                    <Button variant="outline">Ver Gráficos</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Reporte de Inscripciones</CardTitle>
                  <CardDescription>Tendencias por periodo académico</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Exportar Excel</div>
                    <Button variant="outline">Generar Excel</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horarios Académicos</CardTitle>
                  <CardDescription>Cronogramas y distribución de materias por curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Ver horarios</div>
                    <Button variant="outline">Ver Horarios</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reporte Personalizado</CardTitle>
                  <CardDescription>Filtros personalizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Configurar reporte</div>
                    <Button variant="outline">Configurar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
