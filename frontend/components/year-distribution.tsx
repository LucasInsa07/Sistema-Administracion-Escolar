"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3 } from "lucide-react"
import { getEnrollments } from "@/lib/api/enrollments"

interface YearData {
  year: string
  students: number
  percentage: number
  color: string
}

export function YearDistribution() {
  const [yearData, setYearData] = useState<YearData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Colores para cada año
  const yearColors = [
    "bg-red-500",
    "bg-orange-500", 
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500"
  ]

  useEffect(() => {
    const fetchYearDistribution = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Obtener todas las inscripciones activas
        const inscripciones = await getEnrollments()
        const inscripcionesActivas = inscripciones.filter(ins => ins.estado === "ACTIVO")
        
        // Agrupar por año del curso
        const yearCounts: { [key: number]: Set<number> } = {}
        
        inscripcionesActivas.forEach(inscripcion => {
          const anio = inscripcion.cursoAnio
          if (!yearCounts[anio]) {
            yearCounts[anio] = new Set()
          }
          // Usar Set para evitar contar el mismo alumno múltiples veces en el mismo año
          yearCounts[anio].add(inscripcion.alumnoId)
        })
        
        // Convertir a array y ordenar por año
        const yearsArray = Object.entries(yearCounts)
          .map(([year, alumnosSet]) => ({
            year: parseInt(year),
            count: alumnosSet.size
          }))
          .sort((a, b) => a.year - b.year)
        
        // Calcular el total para porcentajes
        const totalStudents = yearsArray.reduce((sum, item) => sum + item.count, 0)
        
        // Formatear datos para el componente
        const formattedData: YearData[] = yearsArray.map((item, index) => ({
          year: `${item.year}° Año`,
          students: item.count,
          percentage: totalStudents > 0 ? Math.round((item.count / totalStudents) * 100) : 0,
          color: yearColors[index % yearColors.length]
        }))
        
        setYearData(formattedData)
      } catch (error) {
        console.error("Error cargando distribución por año:", error)
        setError("Error al cargar los datos")
      } finally {
        setLoading(false)
      }
    }

    fetchYearDistribution()
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <BarChart3 className="h-5 w-5" />
          Distribución por Año
          {loading && <span className="text-sm text-muted-foreground">(Cargando...)</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          // Estado de carga
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="animate-pulse bg-muted h-4 w-16 rounded"></div>
                  <div className="animate-pulse bg-muted h-4 w-20 rounded"></div>
                </div>
                <div className="animate-pulse bg-muted h-2 w-full rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Estado de error
          <div className="text-center py-4">
            <p className="text-red-600">❌ {error}</p>
          </div>
        ) : yearData.length === 0 ? (
          // Sin datos
          <div className="text-center py-4">
            <p className="text-muted-foreground">📊 No hay inscripciones activas</p>
          </div>
        ) : (
          // Datos reales
          yearData.map((item) => (
            <div key={item.year} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{item.year}</span>
                <span className="text-gray-600">
                  {item.students} alumnos ({item.percentage}%)
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={item.percentage} 
                  className="h-2"
                />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}