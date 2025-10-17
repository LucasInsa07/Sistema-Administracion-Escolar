import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentActivities = [
  {
    id: 1,
    type: "inscription",
    student: "María González",
    course: "3ro A",
    time: "Hace 2 horas",
    initials: "MG",
  },
  {
    id: 2,
    type: "teacher",
    teacher: "Prof. Carlos Ruiz",
    subject: "Matemática",
    time: "Hace 4 horas",
    initials: "CR",
  },
  {
    id: 3,
    type: "course",
    course: "2do B",
    action: "Nuevo curso creado",
    time: "Hace 1 día",
    initials: "2B",
  },
  {
    id: 4,
    type: "inscription",
    student: "Juan Pérez",
    course: "1ro A",
    time: "Hace 2 días",
    initials: "JP",
  },
]

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, User, BookOpen, Calendar, GraduationCap } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    type: "inscription",
    title: "Inscripción: María González en 3ro A",
    time: "Hace 2 horas",
    icon: GraduationCap,
    color: "text-green-600",
    badge: "success"
  },
  {
    id: 2,
    type: "course",
    title: "Asignación: Prof. Carlos Ruiz - Matemática",
    time: "Hace 2 horas", 
    icon: User,
    color: "text-blue-600",
    badge: "info"
  },
  {
    id: 3,
    type: "course",
    title: "Nuevo curso creado: 2do B",
    time: "Hace 1 día",
    icon: BookOpen,
    color: "text-purple-600",
    badge: "new"
  },
  {
    id: 4,
    type: "inscription",
    title: "Inscripción: Juan Pérez en 1ro A",
    time: "Hace 2 días",
    icon: GraduationCap,
    color: "text-green-600",
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
        <CardTitle className="flex items-center gap-2 text-pink-800">
          <Activity className="h-5 w-5" />
          Actividad Reciente
        </CardTitle>
        <p className="text-sm text-gray-600">Últimas acciones realizadas en el sistema</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className={`p-2 rounded-lg bg-white ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <Badge variant={getBadgeVariant(activity.badge)} className="text-xs">
                    {activity.type === "inscription" ? "Inscripción" : "Curso"}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
