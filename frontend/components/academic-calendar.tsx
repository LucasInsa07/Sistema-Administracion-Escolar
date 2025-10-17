"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { dictadosApi } from "@/lib/api/dictados"
import { getSubjects } from "@/lib/api/subjects"
import type { Dictado, Subject } from "@/lib/types"

type DayKey = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes"

const days: DayKey[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

interface CalendarCell {
  subjectName: string
  courseLabel: string
  startTime?: string
  endTime?: string
  teacher?: string
}

function ScheduleCell({ cell }: { cell?: CalendarCell }) {
  if (!cell) return <div className="p-1"></div>

  return (
    <div className="p-1">
      <div className={`p-2 rounded bg-red-50 text-red-900 text-xs`}>
        <div className="font-medium">{cell.subjectName}</div>
        <div className="text-[11px]">{cell.courseLabel}</div>
        {cell.startTime && (
          <div className="flex items-center gap-1 text-[11px] mt-1">
            <span className="font-mono">{cell.startTime}</span>
            <span className="text-gray-400">—</span>
            <span className="font-mono">{cell.endTime}</span>
          </div>
        )}
        {cell.teacher && (
          <div className="flex items-center gap-1 text-[11px] mt-1">
            <MapPin className="h-3 w-3" />
            <span>{cell.teacher}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function timeToSlot(time: string) {
  // normalize to HH:MM
  return time.slice(0, 5)
}

export function AcademicCalendar() {
  const [loading, setLoading] = useState(true)
  const [dictados, setDictados] = useState<Dictado[]>([])
  const [subjects, setSubjectsState] = useState<Subject[]>([])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    Promise.all([dictadosApi.getAll(), getSubjects()])
      .then(([d, s]) => {
        if (!mounted) return
        setDictados(d || [])
        setSubjectsState(s || [])
      })
      .catch((err) => {
        console.error("Error cargando dictados/materias:", err)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  // Build a map from materiaId to its schedule fields if available
  const subjectScheduleMap = useMemo(() => {
    const map = new Map<number, Subject & { diaSemana?: string; horaInicio?: string; horaFin?: string }>()
    subjects.forEach((s) => map.set(s.id, s))
    return map
  }, [subjects])

  // Determine time slots from dictados' start times (unique, sorted)
  const timeSlots = useMemo(() => {
    const set = new Set<string>()
    dictados.forEach((d) => {
      if (d && (d as any).fechaInicio) {
        // fechaInicio expected in ISO; extract time
        const t = new Date(d.fechaInicio).toISOString().slice(11, 16)
        set.add(t)
      }
      // also consider materia schedule if present
      const subj = subjectScheduleMap.get(d.materiaId)
      if (subj && subj.horaInicio) set.add(timeToSlot(subj.horaInicio))
    })
    const arr = Array.from(set)
    arr.sort()
    return arr
  }, [dictados, subjectScheduleMap])

  // Build grid: for each time slot, create a row with 5 days
  const grid = useMemo(() => {
    // Helper to find a dictado that matches materia and day/time
    const rows = timeSlots.map((time) => {
      const row: Record<DayKey, CalendarCell | undefined> = {
        Lunes: undefined,
        Martes: undefined,
        Miércoles: undefined,
        Jueves: undefined,
        Viernes: undefined,
      }

      dictados.forEach((d) => {
        const subj = subjectScheduleMap.get(d.materiaId)
        const start = subj?.horaInicio ? timeToSlot(subj.horaInicio) : new Date(d.fechaInicio).toISOString().slice(11, 16)
        const end = subj?.horaFin ? timeToSlot(subj.horaFin) : new Date(d.fechaFin).toISOString().slice(11, 16)

        if (start !== time) return

        const day = subj?.diaSemana || ""
        const dayKey = day && days.find((dd) => dd.toLowerCase().startsWith(day.toLowerCase())) as DayKey | undefined
        if (!dayKey) return

        row[dayKey] = {
          subjectName: d.materiaNombre,
          courseLabel: `${d.cursoAnio}° ${d.cursoDivision}`,
          startTime: start,
          endTime: end,
          teacher: `${d.materiaProfesorNombre} ${d.materiaProfesorApellido}`,
        }
      })

      return { time, row }
    })

    return rows
  }, [timeSlots, dictados, subjectScheduleMap])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Calendar className="h-5 w-5" />
          Calendario Académico - Semana Actual
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-1 mb-4">
          <div className="text-sm font-medium text-gray-600 p-2">Hora</div>
          {days.map((day) => (
            <div key={day} className="text-sm font-medium text-gray-600 p-2 text-center">
              {day}
            </div>
          ))}
        </div>

        {loading ? (
          <div>Cargando calendario...</div>
        ) : grid.length === 0 ? (
          <div>No hay horarios cargados todavía.</div>
        ) : (
          <div className="space-y-1">
            {grid.map(({ time, row }) => (
              <div key={time} className="grid grid-cols-6 gap-1">
                <div className="text-sm text-gray-500 p-2 font-mono">{time}</div>
                <ScheduleCell cell={row.Lunes} />
                <ScheduleCell cell={row.Martes} />
                <ScheduleCell cell={row.Miércoles} />
                <ScheduleCell cell={row.Jueves} />
                <ScheduleCell cell={row.Viernes} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}