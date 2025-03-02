import { Card, Title, Text, Grid } from '@tremor/react';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { InstallationCalendar } from '@/components/installation/InstallationCalendar';
import { InstallationList } from '@/components/installation/InstallationList';
import { InstallationStats } from '@/components/installation/InstallationStats';

async function getInstallationData() {
  const schedules = await prisma.installationSchedule.findMany({
    include: {
      project: {
        include: {
          specifications: true,
          client: true,
        }
      },
      installers: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    },
    orderBy: { scheduledDate: 'asc' }
  });

  const installers = await prisma.user.findMany({
    where: {
      role: 'INSTALLER',
      isActive: true
    },
    select: {
      id: true,
      name: true,
      email: true,
      workingHours: true
    }
  });

  return {
    schedules,
    installers
  };
}

export default async function InstallationDashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const { schedules, installers } = await getInstallationData();

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <Title>Installation Management</Title>
          <Text>Schedule and manage installation jobs</Text>
        </div>
      </div>

      {/* Installation Statistics */}
      <InstallationStats schedules={schedules} />

      {/* Installation Calendar */}
      <Card>
        <Title>Installation Calendar</Title>
        <div className="mt-6">
          <InstallationCalendar 
            schedules={schedules}
            installers={installers}
          />
        </div>
      </Card>

      {/* Installation List */}
      <Card>
        <Title>Upcoming Installations</Title>
        <div className="mt-6">
          <InstallationList 
            schedules={schedules}
            installers={installers}
          />
        </div>
      </Card>
    </div>
  );
} 