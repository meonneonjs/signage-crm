import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, Title, Text, Badge, Button, Grid } from '@tremor/react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { prisma } from '@/lib/db';

interface Props {
  params: {
    id: string;
  };
}

async function getClientDetails(id: string) {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      projects: {
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { materials: true }
          }
        }
      },
      _count: {
        select: { projects: true }
      }
    },
  });

  if (!client) {
    notFound();
  }

  return client;
}

export default async function ClientPage({ params }: Props) {
  const client = await getClientDetails(params.id);
  const activeProjects = client.projects.filter(
    (p) => p.status !== 'COMPLETED' && p.status !== 'CANCELLED'
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Title>{client.name}</Title>
          <Text>{client.email}</Text>
          {client.phone && (
            <Text className="text-gray-500">{client.phone}</Text>
          )}
        </div>
        <Link href={`/dashboard/clients/${client.id}/edit`}>
          <Button icon={PencilIcon}>Edit Client</Button>
        </Link>
      </div>

      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <Title>Total Projects</Title>
          <Text className="text-2xl font-bold">{client._count.projects}</Text>
        </Card>
        <Card>
          <Title>Active Projects</Title>
          <Text className="text-2xl font-bold">{activeProjects.length}</Text>
        </Card>
        <Card>
          <Title>Client Since</Title>
          <Text className="text-2xl font-bold">
            {new Date(client.createdAt).toLocaleDateString()}
          </Text>
        </Card>
      </Grid>

      <Card>
        <Title>Recent Projects</Title>
        <div className="mt-6">
          {client.projects.length === 0 ? (
            <Text>No projects yet.</Text>
          ) : (
            <div className="divide-y divide-gray-200">
              {client.projects.map((project) => (
                <div key={project.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-medium"
                      >
                        {project.name}
                      </Link>
                      <div className="mt-1 flex items-center space-x-2">
                        <Badge color={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Text className="text-sm text-gray-500">
                          {project._count.materials} materials
                        </Text>
                      </div>
                    </div>
                    <Text className="text-sm text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                  {project.description && (
                    <Text className="mt-2 text-sm text-gray-500">
                      {project.description}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function getStatusColor(status: string) {
  const colors = {
    PENDING: 'yellow',
    IN_PROGRESS: 'blue',
    DESIGN: 'purple',
    PRODUCTION: 'orange',
    INSTALLATION: 'indigo',
    COMPLETED: 'green',
    CANCELLED: 'red'
  } as const;
  return colors[status as keyof typeof colors] || 'gray';
} 