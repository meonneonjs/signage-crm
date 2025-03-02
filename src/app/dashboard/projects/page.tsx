'use client';

import { Card, Grid, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title, Metric, DonutChart } from '@tremor/react';
import { prisma } from '@/lib/db';
import { Project, ProjectStatus } from '@prisma/client';
import Link from 'next/link';
import {
  ChatBubbleLeftRightIcon,
  DocumentMagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import { Badge, Flex } from '@tremor/react';
import React from 'react';

interface ProjectTask {
  id: string;
  title: string;
  status: string;
  assignedTo: {
    id: string;
    name: string | null;
    email: string;
  } | null;
}

interface ProjectMilestone {
  id: string;
  title: string;
  dueDate: Date;
  status: string;
}

type ProjectWithClient = Project & {
  client: {
    id: string;
    name: string;
    email: string;
  };
};

async function getProjects(): Promise<ProjectWithClient[]> {
  try {
    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getProjectStats() {
  const projects = await prisma.project.findMany({
    select: {
      status: true
    }
  });
  
  const counts = {
    total: projects.length,
    active: projects.filter(p => p.status === 'IN_PROGRESS').length,
    completed: projects.filter(p => p.status === 'COMPLETED').length,
    pending: projects.filter(p => p.status === 'PENDING').length,
    cancelled: projects.filter(p => p.status === 'CANCELLED').length
  };
  
  return counts;
}

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<ProjectWithClient[]>([]);
  const [stats, setStats] = React.useState({
    total: 0,
    active: 0,
    completed: 0,
    pending: 0,
    cancelled: 0
  });

  React.useEffect(() => {
    async function loadData() {
      const [projectsData, statsData] = await Promise.all([
        getProjects(),
        getProjectStats()
      ]);
      setProjects(projectsData);
      setStats(statsData);
    }
    loadData();
  }, []);
  
  const chartData = [
    { name: 'Pending', value: stats.pending },
    { name: 'In Progress', value: stats.active },
    { name: 'Completed', value: stats.completed },
    { name: 'Cancelled', value: stats.cancelled }
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'PENDING':
        return 'yellow';
      case 'IN_PROGRESS':
        return 'blue';
      case 'COMPLETED':
        return 'green';
      case 'CANCELLED':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card>
          <Text>Total Projects</Text>
          <Metric>{stats.total}</Metric>
        </Card>
        <Card>
          <Text>Active Projects</Text>
          <Metric>{stats.active}</Metric>
        </Card>
        <Card>
          <Text>Completed Projects</Text>
          <Metric>{stats.completed}</Metric>
        </Card>
        <Card>
          <Text>Pending Projects</Text>
          <Metric>{stats.pending}</Metric>
        </Card>
      </Grid>

      <TabGroup>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Projects</Tab>
          <Tab>Milestones</Tab>
          <Tab>Team</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid numItems={1} numItemsLg={2} className="gap-6">
              <Card>
                <Title>Project Status Distribution</Title>
                <DonutChart
                  data={chartData}
                  category="value"
                  index="name"
                  valueFormatter={(value) => value.toString()}
                  colors={['yellow', 'blue', 'green', 'red']}
                  className="mt-6"
                />
              </Card>
            </Grid>
          </TabPanel>
          <TabPanel>
            <Card>
              <Title>All Projects</Title>
              <div className="mt-6 space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Link href={`/projects/${project.id}`} className="text-lg font-medium hover:text-blue-600">
                        {project.name}
                      </Link>
                      <Text className="text-gray-500">{project.client.name}</Text>
                    </div>
                    <Badge color={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <Title>Upcoming Milestones</Title>
              <div className="mt-6 space-y-4">
                {/* Add upcoming milestones list here */}
              </div>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card>
              <Title>Project Teams</Title>
              <div className="mt-6 space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="p-4 border rounded-lg">
                    <Text className="font-medium">{project.name}</Text>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {project.projectTeamMembers.map(member => (
                        <div key={member.id} className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <UserGroupIcon className="w-4 h-4 text-gray-500" />
                            </div>
                          </div>
                          <div>
                            <Text>{member.user.name}</Text>
                            <Text className="text-gray-500">{member.role}</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 