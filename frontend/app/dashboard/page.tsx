import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity-new"
import { AcademicCalendar } from "@/components/academic-calendar"
import { YearDistribution } from "@/components/year-distribution"
import { AlertsAndEvents } from "@/components/alerts-and-events"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AuthGuard from "@/components/auth-guard"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
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
            
            {/* Bottom Section */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Alerts and Events */}
              <AlertsAndEvents />
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  )
}
