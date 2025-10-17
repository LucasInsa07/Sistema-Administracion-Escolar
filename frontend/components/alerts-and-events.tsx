import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Clock, Calendar } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Documentación Pendiente",
    description: "15 alumnos sin certificado médico",
    time: "2 horas",
    priority: "high"
  },
  {
    id: 2,
    type: "info",
    title: "Reunión de Padres",
    description: "Confirmar asistencia para el viernes",
    time: "1 día",
    priority: "medium"
  },
  {
    id: 3,
    type: "warning",
    title: "Período de Inscripciones",
    description: "Cierra en 5 días",
    time: "5 días",
    priority: "high"
  }
]

const upcomingEvents = [
  {
    id: 1,
    date: "15",
    month: "Nov",
    title: "Exámenes Finales",
    time: "08:00",
    attendees: "120 alumnos",
    type: "Académico"
  },
  {
    id: 2,
    date: "18",
    month: "Nov", 
    title: "Reunión Docentes",
    time: "14:00",
    attendees: "25 profesores",
    type: "Administrativo"
  },
  {
    id: 3,
    date: "22",
    month: "Nov",
    title: "Acto de Graduación",
    time: "19:00",
    attendees: "200 personas",
    type: "Evento"
  },
  {
    id: 4,
    date: "25",
    month: "Nov",
    title: "Inscripciones 2025",
    time: "09:00",
    attendees: "Nuevos alumnos",
    type: "Administrativo"
  }
]

export function AlertsAndEvents() {
  return (
    <div className="space-y-6">
      {/* Alertas y Recordatorios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <AlertTriangle className="h-5 w-5" />
            Alertas y Recordatorios
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.id} className="border-l-4 border-l-orange-400">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {alert.time}
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Próximos Eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Calendar className="h-5 w-5" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-primary">{event.date}</div>
                  <div className="text-xs text-muted-foreground uppercase">{event.month}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{event.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <span>👥 {event.attendees}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}