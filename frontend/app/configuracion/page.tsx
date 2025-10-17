"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ConfiguracionPage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-background min-h-screen">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">Configuración</h1>
                <p className="text-sm text-muted-foreground">Ajustes del sistema y personalización</p>
              </div>
              <div>
                <Button variant="secondary">Guardar cambios</Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Base de Datos</CardTitle>
                  <CardDescription>Configuración de conexión y backups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Respaldo automático</div>
                        <div className="text-xs text-muted-foreground">Estado de copia de seguridad</div>
                      </div>
                      <div>
                        <Button variant="ghost">Configurar</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Logs de base de datos</div>
                        <div className="text-xs text-muted-foreground">Ver detalles</div>
                      </div>
                      <div>
                        <Button variant="ghost">Ver</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificaciones</CardTitle>
                  <CardDescription>Alertas y recordatorios del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Notificaciones por email</div>
                        <div className="text-xs text-muted-foreground">Enviar alertas al personal</div>
                      </div>
                      <div>
                        <Button variant="ghost">Configurar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Apariencia</CardTitle>
                  <CardDescription>Personaliza tema y colores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Modo oscuro</div>
                        <div className="text-xs text-muted-foreground">Activar tema oscuro</div>
                      </div>
                      <div>
                        <Button variant="ghost">Alternar</Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Paleta de colores</div>
                        <div className="text-xs text-muted-foreground">Personalizar acentos</div>
                      </div>
                      <div>
                        <Button variant="ghost">Personalizar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Regional</CardTitle>
                  <CardDescription>Idioma y zona horaria</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium">Idioma del sistema</div>
                      <div className="text-xs text-muted-foreground">Español (Argentina)</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Zona horaria</div>
                      <div className="text-xs text-muted-foreground">GMT-3 (Buenos Aires)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usuarios y Permisos</CardTitle>
                  <CardDescription>Gestión y niveles de acceso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Acceso multiusuario</div>
                        <div className="text-xs text-muted-foreground">Configurar inicio de sesión</div>
                      </div>
                      <div>
                        <Button variant="ghost">Gestionar</Button>
                      </div>
                    </div>
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
