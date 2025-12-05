"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trash2, Archive, AlertTriangle, Info } from "lucide-react"

interface DeleteConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: (deleteType: 'hard' | 'soft') => void
  studentName: string
  loading?: boolean
}

export function DeleteConfirmationDialog({ 
  open, 
  onClose, 
  onConfirm, 
  studentName, 
  loading = false 
}: DeleteConfirmationDialogProps) {
  const [selectedOption, setSelectedOption] = useState<'hard' | 'soft' | null>(null)

  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption)
    }
  }

  const handleClose = () => {
    setSelectedOption(null)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Confirmar Eliminación
          </DialogTitle>
          <DialogDescription>
            ¿Cómo desea eliminar al estudiante <strong>{studentName}</strong>?
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Opción Soft Delete */}
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedOption === 'soft' 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedOption('soft')}
          >
            <div className="flex items-start gap-3">
              <Archive className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Desactivar (Recomendado)</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  El estudiante será marcado como inactivo pero se mantendrán todos sus datos e historial académico.
                </p>
              </div>
            </div>
          </div>

          {/* Opción Hard Delete */}
          <div 
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedOption === 'hard' 
                ? 'border-red-500 bg-red-50 dark:bg-red-950' 
                : 'border-gray-200 hover:border-red-300'
            }`}
            onClick={() => setSelectedOption('hard')}
          >
            <div className="flex items-start gap-3">
              <Trash2 className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium">Eliminar Permanentemente</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Se eliminarán todas las inscripciones y datos del estudiante. Esta acción no se puede deshacer.
                </p>
              </div>
            </div>
          </div>

          {/* Advertencia para Hard Delete */}
          {selectedOption === 'hard' && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 dark:text-red-400">
                <strong>¡Advertencia!</strong> Esta acción eliminará permanentemente todas las inscripciones 
                y el historial académico del estudiante. No se puede recuperar.
              </AlertDescription>
            </Alert>
          )}

          {/* Info para Soft Delete */}
          {selectedOption === 'soft' && (
            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                El estudiante no aparecerá en las listas activas pero mantendrá su historial académico.
                Puede ser reactivado en cualquier momento.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!selectedOption || loading}
            variant={selectedOption === 'hard' ? 'destructive' : 'default'}
          >
            {loading ? "Procesando..." : 
             selectedOption === 'hard' ? "Eliminar Permanentemente" : 
             selectedOption === 'soft' ? "Desactivar" : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}