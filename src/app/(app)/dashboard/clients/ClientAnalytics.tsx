'use client';

import { Card, Grid, Title, TabGroup, TabList, Tab, TabPanels, TabPanel, AreaChart, DonutChart } from '@tremor/react';
import { UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { ClientWithStats } from './types';
import ClientList from './ClientList';

interface ClientAnalyticsProps {
  clients: ClientWithStats[];
  clientEngagement: Array<{
    name: string;
    engagement: number;
  }>;
  revenueByClient: Array<{
    name: string;
    revenue: number;
  }>;
}

export default function ClientAnalytics({ clients, clientEngagement, revenueByClient }: ClientAnalyticsProps) {
  return (
    <TabGroup>
      <TabList>
        <Tab icon={UserGroupIcon}>All Clients</Tab>
        <Tab icon={ChartBarIcon}>Analytics</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Card>
            <ClientList clients={clients} />
          </Card>
        </TabPanel>
        <TabPanel>
          <Grid numItems={1} numItemsLg={2} className="gap-6">
            <Card>
              <Title>Client Engagement</Title>
              <AreaChart
                className="mt-4 h-72"
                data={clientEngagement}
                index="name"
                categories={["engagement"]}
                colors={["blue"]}
              />
            </Card>
            <Card>
              <Title>Revenue by Client</Title>
              <DonutChart
                className="mt-4 h-72"
                data={revenueByClient}
                category="revenue"
                index="name"
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
              />
            </Card>
          </Grid>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
} 