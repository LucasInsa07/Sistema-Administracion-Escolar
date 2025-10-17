"use client"

import { useState, useEffect } from "react"
import { CoursesHeader } from "@/components/courses/courses-header"
import { CoursesTableView } from "@/components/courses/courses-table-view"
import { CoursesModuleView } from "@/components/courses/courses-module-view"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { getCourses, deleteCourse } from "@/lib/api/courses"
import { CourseDialog } from "@/components/courses/course-dialog"
import type { Course } from "@/lib/types"

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<'table' | 'modules'>('table')
  const [courses, setCourses] = useState<Course[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      setLoading(true)
      const data = await getCourses()
      setCourses(data)
    } catch (error) {
      console.error("Error loading courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateClick = () => {
    setSelectedCourse(null)
    setIsDialogOpen(true)
  }

  const handleEdit = (course: Course) => {
    setSelectedCourse(course)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Está seguro de que desea eliminar este curso?")) {
      try {
        await deleteCourse(id)
        await loadCourses()
      } catch (error) {
        console.error("Error deleting course:", error)
      }
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedCourse(null)
    loadCourses()
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <CoursesHeader 
          viewMode={viewMode} 
          onViewModeChange={setViewMode}
          onCreateClick={handleCreateClick}
        />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-background min-h-screen">
          {viewMode === 'table' ? (
            <CoursesTableView 
              courses={courses}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          ) : (
            <CoursesModuleView 
              courses={courses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
        
        <CourseDialog 
          open={isDialogOpen} 
          onClose={handleDialogClose} 
          course={selectedCourse} 
        />
      </SidebarInset>
    </SidebarProvider>
  )
}
