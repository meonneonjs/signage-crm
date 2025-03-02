import { Card, Grid, Text, Metric } from '@tremor/react';
import { InstallationSchedule, Project, SignageSpecification, Client } from '@prisma/client';

type ExtendedInstallationSchedule = InstallationSchedule & {
  project: Project & {
    specifications: SignageSpecification[];
    client: Client;
  };
};

interface InstallationStatsProps {
  schedules: ExtendedInstallationSchedule[];
}

export function InstallationStats({ schedules }: InstallationStatsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = {
    upcoming: schedules.filter(s => new Date(s.scheduledDate) >= today).length,
    completed: schedules.filter(s => s.status === 'COMPLETED').length,
    pendingPermits: schedules.filter(s => s.permitRequired && !s.permitNumber).length,
    thisWeek: schedules.filter(s => {
      const scheduleDate = new Date(s.scheduledDate);
      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + 7);
      return scheduleDate >= today && scheduleDate <= weekEnd;
    }).length
  };

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
      <Card>
        <Text>Upcoming Installations</Text>
        <Metric>{stats.upcoming}</Metric>
      </Card>
      <Card>
        <Text>This Week</Text>
        <Metric>{stats.thisWeek}</Metric>
      </Card>
      <Card>
        <Text>Completed</Text>
        <Metric>{stats.completed}</Metric>
      </Card>
      <Card>
        <Text>Pending Permits</Text>
        <Metric>{stats.pendingPermits}</Metric>
      </Card>
    </Grid>
  );
} 