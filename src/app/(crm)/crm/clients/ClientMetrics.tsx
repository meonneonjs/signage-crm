'use client';

import { Card, Grid, Text, Metric, Flex, Badge } from '@tremor/react';
import { UserGroupIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { ProjectStatus } from '@prisma/client';
import { ClientWithStats } from './types';

interface ClientMetricsProps {
  stats: {
    totalClients: number;
    activeClients: number;
    totalRevenue: number;
  };
  clients: ClientWithStats[];
}

export default function ClientMetrics({ stats, clients }: ClientMetricsProps) {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
      <Card className="space-y-2">
        <Flex>
          <UserGroupIcon className="h-6 w-6 text-blue-500" />
          <div>
            <Text>Total Clients</Text>
            <Metric>{stats.totalClients}</Metric>
          </div>
        </Flex>
        <Badge color="blue">{Math.round(stats.activeClients / stats.totalClients * 100)}% Active</Badge>
      </Card>
      <Card className="space-y-2">
        <Flex>
          <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
          <div>
            <Text>Total Revenue</Text>
            <Metric>${stats.totalRevenue.toLocaleString()}</Metric>
          </div>
        </Flex>
        <Badge color="green">From Completed Projects</Badge>
      </Card>
      <Card className="space-y-2">
        <Flex>
          <ChartBarIcon className="h-6 w-6 text-purple-500" />
          <div>
            <Text>Active Projects</Text>
            <Metric>
              {clients.reduce((sum, client) => 
                sum + client.projects.filter(p => p.status === 'IN_PROGRESS').length, 0)}
            </Metric>
          </div>
        </Flex>
        <Badge color="purple">In Progress</Badge>
      </Card>
    </Grid>
  );
} 