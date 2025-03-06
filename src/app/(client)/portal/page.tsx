import { ProjectTimeline } from '@/components/client-portal/ProjectTimeline';
import { ProjectMetrics } from '@/components/client-portal/ProjectMetrics';
import { RecentActivity } from '@/components/client-portal/RecentActivity';
import { UpcomingDeadlines } from '@/components/client-portal/UpcomingDeadlines';
import { ProjectTeam } from '@/components/client-portal/ProjectTeam';

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ProjectMetrics />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <ProjectTimeline />
          <UpcomingDeadlines />
        </div>
        <div className="space-y-6">
          <RecentActivity />
          <ProjectTeam />
        </div>
      </div>
    </div>
  );
} 