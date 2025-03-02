import { Card, Title, BarList, Bold, Flex, Text } from '@tremor/react';
import { prisma } from '@/lib/db';
import { ProjectStatus } from '@prisma/client';

async function getProjectOverview() {
  const projects = await prisma.project.groupBy({
    by: ['status'],
    _count: {
      _all: true
    }
  });

  return projects.map(p => ({
    name: p.status,
    value: p._count._all,
    color: getStatusColor(p.status)
  }));
}

function getStatusColor(status: ProjectStatus): string {
  const colors: Record<ProjectStatus, string> = {
    PENDING: 'yellow',
    IN_PROGRESS: 'blue',
    COMPLETED: 'green',
    CANCELLED: 'red'
  };
  return colors[status];
}

export default async function ProjectsOverview() {
  const data = await getProjectOverview();

  return (
    <>
      <Title>Projects Overview</Title>
      <Flex className="mt-4">
        <Text>
          <Bold>Status</Bold>
        </Text>
        <Text>
          <Bold>Count</Bold>
        </Text>
      </Flex>
      <BarList data={data} className="mt-2" />
    </>
  );
} 