import { Title, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Card } from '@tremor/react';
import { prisma } from '@/lib/prisma';
import { ProjectStatus } from '@prisma/client';

type ClientWithRelations = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
  projects: {
    id: string;
    name: string;
    status: ProjectStatus;
  }[];
  _count: {
    projects: number;
  };
};

async function getRecentClients(): Promise<ClientWithRelations[]> {
  return prisma.client.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      projects: {
        orderBy: {
          updatedAt: 'desc'
        },
        take: 1,
        select: {
          id: true,
          name: true,
          status: true
        }
      },
      _count: {
        select: { projects: true }
      }
    }
  });
}

function getProjectStatusColor(status: ProjectStatus): string {
  const colors = {
    [ProjectStatus.PENDING]: 'yellow',
    [ProjectStatus.IN_PROGRESS]: 'blue',
    [ProjectStatus.COMPLETED]: 'green',
    [ProjectStatus.CANCELLED]: 'red'
  } as const;
  
  return colors[status] ?? 'gray';
}

export default async function RecentClients() {
  const clients = await getRecentClients();

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <Title>Recent Clients</Title>
      </div>
      <Table>
        <TableHead>
          <TableRow className="border-t border-gray-200">
            <TableHeaderCell className="py-3">Client Name</TableHeaderCell>
            <TableHeaderCell className="py-3">Contact Info</TableHeaderCell>
            <TableHeaderCell className="py-3 text-center">Projects</TableHeaderCell>
            <TableHeaderCell className="py-3">Latest Project</TableHeaderCell>
            <TableHeaderCell className="py-3">Joined</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => {
            const latestProject = client.projects[0];
            return (
              <TableRow key={client.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="py-3 font-medium">{client.name}</TableCell>
                <TableCell className="py-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium">{client.email}</div>
                    <div className="text-xs text-gray-500">{client.phone || '-'}</div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-gray-100">
                    {client._count.projects}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  {latestProject ? (
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">{latestProject.name}</div>
                      <Badge size="sm" color={getProjectStatusColor(latestProject.status)}>
                        {latestProject.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                  ) : (
                    <Badge size="sm" color="gray">NO PROJECTS</Badge>
                  )}
                </TableCell>
                <TableCell className="py-3 text-sm">
                  {new Date(client.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
} 