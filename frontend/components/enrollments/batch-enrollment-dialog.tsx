"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus, UserPlus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Student, Course, CreateEnrollmentRequest } from "@/lib/types"
import { studentsApi } from "@/lib/api/students"
import { coursesApi } from "@/lib/api/courses"

interface BatchEnrollmentRequest {
  cursoId: number
  alumnosIds: number[]
  fechaInscripcion: string
  estado: string
}

interface BatchEnrollmentResult {
  totalProcesados: number
  totalExitosas: number
  totalErrores: number
  exitosas: Array<{
    id: number
    alumnoNombre: string
    alumnoApellido: string
    cursoNombre: string
  }>
  errores: Array<{
    alumnoId: number
    alumnoNombre: string
    alumnoApellido: string
    mensaje: string
  }>
  cursoId: number
  cursoNombre: string
}

interface BatchEnrollmentDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (request: BatchEnrollmentRequest) => Promise<BatchEnrollmentResult>
}

export function BatchEnrollmentDialog({ isOpen, onClose, onSubmit }: BatchEnrollmentDialogProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [selectedStudents, setSelectedStudents] = useState<Set<number>>(new Set())
  const [fechaInscripcion, setFechaInscripcion] = useState<string>("")
  const [estado, setEstado] = useState<string>("ACTIVO")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BatchEnrollmentResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadData()
      // Set default date to today
      const today = new Date().toISOString().split('T')[0]
      setFechaInscripcion(today)
    }
  }, [isOpen])

  const loadData = async () => {
    setLoadingData(true)
    try {
      const [studentsData, coursesData] = await Promise.all([
        studentsApi.getAll(),
        coursesApi.getAll()
      ])
      setStudents(studentsData)
      setCourses(coursesData.filter(course => course.activo)) // Solo cursos activos
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const filteredStudents = students.filter(student =>
    student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleStudent = (studentId: number) => {
    const newSelected = new Set(selectedStudents)
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId)
    } else {
      newSelected.add(studentId)
    }
    setSelectedStudents(newSelected)
  }

  const selectAllVisible = () => {
    const newSelected = new Set(selectedStudents)
    filteredStudents.forEach(student => {
      newSelected.add(student.id)
    })
    setSelectedStudents(newSelected)
  }

  const clearSelection = () => {
    setSelectedStudents(new Set())
  }

  const handleSubmit = async () => {
    console.log("🚀 Iniciando inscripciones en lote")
    
    if (!selectedCourse || selectedStudents.size === 0 || !fechaInscripcion) {
      alert("Por favor, complete todos los campos obligatorios")
      return
    }

    const request: BatchEnrollmentRequest = {
      cursoId: parseInt(selectedCourse),
      alumnosIds: Array.from(selectedStudents),
      fechaInscripcion,
      estado
    }

    console.log("📋 Datos de la petición:", request)

    setLoading(true)
    try {
      const response = await onSubmit(request)
      console.log("✅ Respuesta recibida:", response)
      setResult(response)
      setShowResult(true)
    } catch (error) {
      console.error("❌ Error al crear inscripciones:", error)
      alert("Error al crear inscripciones: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSelectedCourse("")
    setSelectedStudents(new Set())
    setFechaInscripcion("")
    setEstado("ACTIVO")
    setSearchTerm("")
    setResult(null)
    setShowResult(false)
    onClose()
  }

  const handleBackToForm = () => {
    setShowResult(false)
    setResult(null)
  }

  if (showResult && result) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Resultado de Inscripciones en Lote
            </DialogTitle>
            <DialogDescription>
              Resumen del procesamiento para el curso: <strong>{result.cursoNombre}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Estadísticas */}
            <div className="flex gap-4 justify-center">
              <Badge variant="secondary" className="text-sm">
                Total: {result.totalProcesados}
              </Badge>
              <Badge variant="default" className="text-sm text-green-700 bg-green-100">
                Exitosas: {result.totalExitosas}
              </Badge>
              {result.totalErrores > 0 && (
                <Badge variant="destructive" className="text-sm">
                  Errores: {result.totalErrores}
                </Badge>
              )}
            </div>

            <Separator />

            {/* Inscripciones exitosas */}
            {result.exitosas.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-green-700 mb-2">
                  Inscripciones creadas exitosamente:
                </h3>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {result.exitosas.map((enrollment, index) => (
                      <div key={index} className="text-sm p-2 bg-green-50 rounded border">
                        {enrollment.alumnoNombre} {enrollment.alumnoApellido}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Errores */}
            {result.errores.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-red-700 mb-2">
                  Errores encontrados:
                </h3>
                <ScrollArea className="h-32">
                  <div className="space-y-2">
                    {result.errores.map((error, index) => (
                      <div key={index} className="text-sm p-2 bg-red-50 rounded border">
                        <strong>{error.alumnoNombre} {error.alumnoApellido}:</strong>
                        <br />
                        <span className="text-red-600">{error.mensaje}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleBackToForm}>
              Crear Más Inscripciones
            </Button>
            <Button onClick={handleClose}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Inscribir Alumnos en Lote
          </DialogTitle>
          <DialogDescription>
            Seleccione un curso y los alumnos que desea inscribir
          </DialogDescription>
        </DialogHeader>

        {loadingData ? (
          <div className="text-center py-8">Cargando datos...</div>
        ) : (
          <div className="space-y-6">
            {/* Selección de curso */}
            <div className="space-y-2">
              <Label htmlFor="curso">Curso *</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.nombre} - {course.anio}° {course.division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fecha y Estado */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fecha">Fecha de Inscripción *</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fechaInscripcion}
                  onChange={(e) => setFechaInscripcion(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select value={estado} onValueChange={setEstado}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVO">Activo</SelectItem>
                    <SelectItem value="FINALIZADO">Finalizado</SelectItem>
                    <SelectItem value="ANULADO">Anulado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Búsqueda de estudiantes */}
            <div className="space-y-2">
              <Label>Seleccionar Alumnos *</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, apellido o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button type="button" variant="outline" onClick={selectAllVisible} size="sm">
                  Seleccionar Visibles
                </Button>
                <Button type="button" variant="outline" onClick={clearSelection} size="sm">
                  Limpiar
                </Button>
              </div>
            </div>

            {/* Lista de estudiantes */}
            <div className="border rounded-lg">
              <div className="p-3 bg-muted/50 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Alumnos ({filteredStudents.length} mostrados, {selectedStudents.size} seleccionados)
                  </span>
                </div>
              </div>
              <ScrollArea className="h-64">
                <div className="p-2 space-y-1">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded cursor-pointer"
                      onClick={() => toggleStudent(student.id)}
                    >
                      <Checkbox
                        checked={selectedStudents.has(student.id)}
                        onChange={() => toggleStudent(student.id)}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {student.nombre} {student.apellido}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredStudents.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No se encontraron alumnos
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading || !selectedCourse || selectedStudents.size === 0 || !fechaInscripcion}
          >
            {loading ? "Creando..." : `Inscribir ${selectedStudents.size} Alumno(s)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}