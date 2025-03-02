import { Card, Title, Text, Tab, TabList, TabGroup, TabPanels, TabPanel, Grid } from "@tremor/react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

async function getDashboardData() {
  const [projectCount, clientCount, taskCount, proposalCount] = await Promise.all([
    prisma.project.count(),
    prisma.client.count(),
    prisma.task.count(),
    prisma.proposal.count(),
  ]);

  const recentProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      client: true,
    },
  });

  const tasks = await prisma.task.findMany({
    take: 5,
    where: {
      status: 'PENDING',
      dueDate: { not: null },
    },
    orderBy: { dueDate: 'asc' },
    include: {
      project: true,
      assignedTo: true,
    },
  });

  const upcomingTasks = tasks
    .filter((task): task is typeof task & { dueDate: Date } => task.dueDate !== null);

  const recentActivity = await prisma.leadActivity.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
    },
  });

  return {
    stats: {
      projects: projectCount,
      clients: clientCount,
      tasks: taskCount,
      proposals: proposalCount,
    },
    recentProjects,
    upcomingTasks,
    recentActivity: recentActivity.map(activity => ({
      id: activity.id,
      type: activity.type,
      description: activity.title,
      createdAt: activity.createdAt,
      user: {
        name: activity.user.name || 'Unknown User'
      }
    })),
  };
}

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const data = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <Title>Welcome back, {user.firstName}!</Title>
        <Text>Here's what's happening with your projects.</Text>
      </div>

      <DashboardStats stats={data.stats} />

      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card className="col-span-1 sm:col-span-2 lg:col-span-2">
          <TabGroup>
            <TabList>
              <Tab>Recent Projects</Tab>
              <Tab>Upcoming Tasks</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RecentProjects projects={data.recentProjects} />
              </TabPanel>
              <TabPanel>
                <UpcomingTasks tasks={data.upcomingTasks} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Card>

        <Card>
          <Title>Recent Activity</Title>
          <RecentActivity activities={data.recentActivity} />
        </Card>
      </Grid>
    </div>
  );
} 