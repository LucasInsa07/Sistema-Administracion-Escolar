import { DashboardStats } from "@/components/dashboard-stats"
import { AcademicCalendar } from "@/components/academic-calendar"
import { YearDistribution } from "@/components/year-distribution"

export function AdminDashboard() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-0 bg-background min-h-screen">
      {/* Statistics Cards */}
      <DashboardStats />
      
      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Academic Calendar - Takes 2 columns */}
        <div className="lg:col-span-2">
          <AcademicCalendar />
        </div>
        
        {/* Year Distribution */}
        <div className="lg:col-span-1">
          <YearDistribution />
        </div>
      </div>
    </div>
  )
}