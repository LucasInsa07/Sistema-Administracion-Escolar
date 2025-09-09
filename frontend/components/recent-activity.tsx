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

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{activity.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">
                  {activity.type === "inscription" && (
                    <>
                      Inscripción: {activity.student} en {activity.course}
                    </>
                  )}
                  {activity.type === "teacher" && (
                    <>
                      Asignación: {activity.teacher} - {activity.subject}
                    </>
                  )}
                  {activity.type === "course" && (
                    <>
                      {activity.action}: {activity.course}
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
