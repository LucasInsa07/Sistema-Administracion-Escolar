"use client"

import * as React from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, setYear, setMonth, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, isAfter, isBefore } from "date-fns"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Selecciona una fecha",
  disabled = false,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState(date || new Date())

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  // Generar años desde 1900 hasta el año actual
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => 1900 + i).reverse()

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const handleDateClick = (day: Date) => {
    onDateChange?.(day)
    setOpen(false)
  }

  const handleMonthChange = (monthIndex: string) => {
    setCurrentMonth(setMonth(currentMonth, parseInt(monthIndex)))
  }

  const handleYearChange = (year: string) => {
    setCurrentMonth(setYear(currentMonth, parseInt(year)))
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const today = new Date()
  const minDate = new Date("1900-01-01")
  const maxDate = new Date()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: es }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          {/* Header con selectores de mes y año */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <Select
                value={currentMonth.getMonth().toString()}
                onValueChange={handleMonthChange}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={currentMonth.getFullYear().toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-40">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendario */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isSelected = date && isSameDay(day, date)
              const isTodayDate = isToday(day)
              const isDisabled = isAfter(day, maxDate) || isBefore(day, minDate)

              return (
                <Button
                  key={day.toString()}
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 p-0 font-normal",
                    !isCurrentMonth && "text-muted-foreground opacity-50",
                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isTodayDate && !isSelected && "bg-accent text-accent-foreground",
                    isDisabled && "opacity-30 cursor-not-allowed"
                  )}
                  onClick={() => handleDateClick(day)}
                  disabled={isDisabled}
                >
                  {format(day, "d")}
                </Button>
              )
            })}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-between mt-4 pt-3 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onDateChange?.(undefined)
                setOpen(false)
              }}
            >
              Limpiar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const today = new Date()
                setCurrentMonth(today)
                onDateChange?.(today)
                setOpen(false)
              }}
            >
              Hoy
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}