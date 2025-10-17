"use client"

import { useState } from "react"
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
import { Plus, Minus, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { CreateStudentRequest } from "@/lib/types"
import type { BatchStudentResult } from "@/lib/api/students"

interface BatchStudentDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (students: CreateStudentRequest[]) => Promise<BatchStudentResult>
}

interface BatchResult {
  totalProcesados: number
  totalExitosos: number
  totalErrores: number
  exitosos: Array<{
    id: number
    nombre: string
    apellido: string
    email: string
  }>
  errores: Array<{
    indice: number
    alumno: CreateStudentRequest
    mensaje: string
  }>
}

export function BatchStudentDialog({ isOpen, onClose, onSubmit }: BatchStudentDialogProps) {
  const [students, setStudents] = useState<CreateStudentRequest[]>([
    { nombre: "", apellido: "", email: "" },
    { nombre: "", apellido: "", email: "" },
    { nombre: "", apellido: "", email: "" }
  ])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BatchResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const addStudent = () => {
    if (students.length < 20) { // Límite máximo
      setStudents([...students, { nombre: "", apellido: "", email: "" }])
    }
  }

  const removeStudent = (index: number) => {
    if (students.length > 1) {
      setStudents(students.filter((_, i) => i !== index))
    }
  }

  const updateStudent = (index: number, field: keyof CreateStudentRequest, value: string) => {
    const updatedStudents = [...students]
    updatedStudents[index][field] = value
    setStudents(updatedStudents)
  }

  const validateStudents = () => {
    return students.filter(student => 
      student.nombre.trim() && 
      student.apellido.trim() && 
      student.email.trim() &&
      student.email.includes("@")
    )
  }

  const handleSubmit = async () => {
    console.log("🚀 Iniciando creación de estudiantes en lote")
    console.log("📋 Estudiantes a procesar:", students)
    
    const validStudents = validateStudents()
    console.log("✅ Estudiantes válidos:", validStudents)
    
    if (validStudents.length === 0) {
      alert("Por favor, complete al menos un estudiante con datos válidos")
      return
    }

    setLoading(true)
    try {
      console.log("📡 Enviando petición a onSubmit con:", validStudents)
      const response = await onSubmit(validStudents)
      console.log("✅ Respuesta recibida:", response)
      
      // Convertir BatchStudentResult a BatchResult para el componente
      const result: BatchResult = {
        totalProcesados: response.totalProcesados,
        totalExitosos: response.totalExitosos,
        totalErrores: response.totalErrores,
        exitosos: response.exitosos,
        errores: response.errores
      }
      
      setResult(result)
      setShowResult(true)
    } catch (error) {
      console.error("❌ Error al crear estudiantes:", error)
      alert("Error al crear estudiantes: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStudents([
      { nombre: "", apellido: "", email: "" },
      { nombre: "", apellido: "", email: "" },
      { nombre: "", apellido: "", email: "" }
    ])
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
              Resultado de Creación en Lote
            </DialogTitle>
            <DialogDescription>
              Resumen del procesamiento de estudiantes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Estadísticas */}
            <div className="flex gap-4 justify-center">
              <Badge variant="secondary" className="text-sm">
                Total: {result.totalProcesados}
              </Badge>
              <Badge variant="default" className="text-sm text-green-700 bg-green-100">
                Exitosos: {result.totalExitosos}
              </Badge>
              {result.totalErrores > 0 && (
                <Badge variant="destructive" className="text-sm">
                  Errores: {result.totalErrores}
                </Badge>
              )}
            </div>

            <Separator />

            {/* Estudiantes exitosos */}
            {result.exitosos.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-green-700 mb-2">
                  Estudiantes creados exitosamente:
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {result.exitosos.map((student, index) => (
                    <div key={index} className="text-sm p-2 bg-green-50 rounded border">
                      {student.nombre} {student.apellido} ({student.email})
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Errores */}
            {result.errores.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-red-700 mb-2">
                  Errores encontrados:
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {result.errores.map((error, index) => (
                    <div key={index} className="text-sm p-2 bg-red-50 rounded border">
                      <strong>Fila {error.indice + 1}:</strong> {error.alumno.nombre} {error.alumno.apellido}
                      <br />
                      <span className="text-red-600">{error.mensaje}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleBackToForm}>
              Crear Más Estudiantes
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Agregar Estudiantes en Lote
          </DialogTitle>
          <DialogDescription>
            Complete la información de los estudiantes que desea agregar. 
            Mínimo 1 estudiante, máximo 20.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {students.map((student, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Estudiante {index + 1}</h4>
                {students.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStudent(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor={`nombre-${index}`}>Nombre</Label>
                  <Input
                    id={`nombre-${index}`}
                    value={student.nombre}
                    onChange={(e) => updateStudent(index, "nombre", e.target.value)}
                    placeholder="Ingrese el nombre"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`apellido-${index}`}>Apellido</Label>
                  <Input
                    id={`apellido-${index}`}
                    value={student.apellido}
                    onChange={(e) => updateStudent(index, "apellido", e.target.value)}
                    placeholder="Ingrese el apellido"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`email-${index}`}>Email</Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    value={student.email}
                    onChange={(e) => updateStudent(index, "email", e.target.value)}
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>
            </div>
          ))}

          {students.length < 20 && (
            <Button
              type="button"
              variant="outline"
              onClick={addStudent}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Otro Estudiante
            </Button>
          )}

          <div className="text-sm text-gray-600">
            Estudiantes válidos: {validateStudents().length} / {students.length}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading || validateStudents().length === 0}
          >
            {loading ? "Creando..." : `Crear ${validateStudents().length} Estudiante(s)`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}