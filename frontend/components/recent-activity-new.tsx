import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Activity className="h-5 w-5" />
          Actividad Reciente
        </CardTitle>
        <p className="text-sm text-muted-foreground">Últimas acciones realizadas en el sistema</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Activity className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <p className="text-sm text-muted-foreground">No hay actividades recientes para mostrar</p>
          <p className="text-xs text-muted-foreground mt-1">Las actividades aparecerán aquí cuando se realicen acciones en el sistema</p>
        </div>
      </CardContent>
    </Card>
  )
}