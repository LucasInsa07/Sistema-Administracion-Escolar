import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, User, BookOpen, GraduationCap } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    type: "inscription",
    title: "Inscripción: María González en 3ro A",
    time: "Hace 2 horas",
    icon: GraduationCap,
    color: "text-primary",
    badge: "success"
  },
  {
    id: 2,
    type: "course",
    title: "Asignación: Prof. Carlos Ruiz - Matemática",
    time: "Hace 2 horas", 
    icon: User,
    color: "text-secondary",
    badge: "info"
  },
  {
    id: 3,
    type: "course",
    title: "Nuevo curso creado: 2do B",
    time: "Hace 1 día",
    icon: BookOpen,
    color: "text-accent",
    badge: "new"
  },
  {
    id: 4,
    type: "inscription",
    title: "Inscripción: Juan Pérez en 1ro A",
    time: "Hace 2 días",
    icon: GraduationCap,
    color: "text-primary",
    badge: "success"
  }
]

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "success": return "default"
    case "info": return "secondary"
    case "new": return "outline"
    default: return "secondary"
  }
}

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
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className={`p-2 rounded-lg bg-card ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <Badge variant={getBadgeVariant(activity.badge)} className="text-xs">
                    {activity.type === "inscription" ? "Inscripción" : "Curso"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}