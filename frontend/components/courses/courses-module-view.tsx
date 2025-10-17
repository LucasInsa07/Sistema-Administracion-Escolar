"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Users } from "lucide-react"
import type { Course } from "@/lib/types"

interface CoursesModuleViewProps {
  courses: Course[]
  onEdit: (course: Course) => void
  onDelete: (id: number) => void
}

// Colores pasteles para cada año
const yearColors = {
  1: "bg-red-100 border-red-200 hover:bg-red-50",
  2: "bg-orange-100 border-orange-200 hover:bg-orange-50", 
  3: "bg-yellow-100 border-yellow-200 hover:bg-yellow-50",
  4: "bg-green-100 border-green-200 hover:bg-green-50",
  5: "bg-blue-100 border-blue-200 hover:bg-blue-50",
  6: "bg-purple-100 border-purple-200 hover:bg-purple-50"
}

const yearTextColors = {
  1: "text-red-700",
  2: "text-orange-700",
  3: "text-yellow-700", 
  4: "text-green-700",
  5: "text-blue-700",
  6: "text-purple-700"
}

// Función para obtener el nombre completo del año
const getYearName = (year: number): string => {
  const yearNames = {
    1: "1er Año",
    2: "2do Año", 
    3: "3er Año",
    4: "4to Año",
    5: "5to Año",
    6: "6to Año"
  }
  return yearNames[year as keyof typeof yearNames] || `${year}° Año`
}

// Función para agrupar cursos por año
const groupCoursesByYear = (courses: Course[]) => {
  return courses.reduce((acc, course) => {
    const year = course.anio
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(course)
    return acc
  }, {} as Record<number, Course[]>)
}

export function CoursesModuleView({ courses, onEdit, onDelete }: CoursesModuleViewProps) {
  const groupedCourses = groupCoursesByYear(courses.filter(course => course.activo))
  const years = [1, 2, 3, 4, 5, 6] // Años de secundaria

  return (
    <div className="space-y-8">
      {years.map(year => {
        const yearCourses = groupedCourses[year] || []
        const yearColor = yearColors[year as keyof typeof yearColors]
        const textColor = yearTextColors[year as keyof typeof yearTextColors]
        
        return (
          <div key={year} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className={`text-2xl font-bold ${textColor}`}>
                {getYearName(year)}
              </h2>
              <Badge variant="secondary" className="text-sm">
                {yearCourses.length} {yearCourses.length === 1 ? 'curso' : 'cursos'}
              </Badge>
            </div>
            
            {yearCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {yearCourses
                  .sort((a, b) => a.division.localeCompare(b.division)) // Ordenar por división (A, B, C)
                  .map(course => (
                    <Card 
                      key={course.id} 
                      className={`transition-all duration-200 ${yearColor} border-2`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className={`text-lg ${textColor}`}>
                              {course.nombre}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={`${textColor} border-current`}>
                                {getYearName(course.anio)} {course.division}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(course)}
                              className={`h-8 w-8 p-0 ${textColor} hover:bg-white/50`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(course.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          {course.descripcion && (
                            <p className={`text-sm ${textColor.replace('700', '600')} line-clamp-2`}>
                              {course.descripcion}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className={`flex items-center gap-1 ${textColor.replace('700', '600')}`}>
                              <Users className="h-4 w-4" />
                              <span>Ver alumnos</span>
                            </div>
                            <Badge 
                              variant={course.activo ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {course.activo ? "Activo" : "Inactivo"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card className={`${yearColor} border-2 border-dashed`}>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="text-center space-y-2">
                    <p className={`${textColor.replace('700', '600')} font-medium`}>
                      No hay cursos para {getYearName(year)}
                    </p>
                    <p className={`text-sm ${textColor.replace('700', '500')}`}>
                      Los cursos se mostrarán aquí cuando sean creados
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )
      })}
      
      {/* Sección para años fuera del rango normal (si los hay) */}
      {Object.keys(groupedCourses)
        .map(Number)
        .filter(year => !years.includes(year))
        .length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700">Otros Años</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.keys(groupedCourses)
              .map(Number)
              .filter(year => !years.includes(year))
              .sort((a, b) => a - b)
              .map(year => (
                groupedCourses[year].map(course => (
                  <Card key={course.id} className="bg-gray-100 border-gray-200 hover:bg-gray-50 transition-all duration-200 border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-gray-700">
                            {course.nombre}
                          </CardTitle>
                          <Badge variant="outline" className="text-gray-700 border-current">
                            {course.anio}° {course.division}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(course)}
                            className="h-8 w-8 p-0 text-gray-700 hover:bg-white/50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(course.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {course.descripcion && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {course.descripcion}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="h-4 w-4" />
                            <span>Ver alumnos</span>
                          </div>
                          <Badge 
                            variant={course.activo ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {course.activo ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
