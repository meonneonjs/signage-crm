'use client';

import { Card, Grid, Metric, Text } from "@tremor/react";
import { 
  UsersIcon, 
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

interface DashboardStatsProps {
  stats: {
    projects: number;
    clients: number;
    tasks: number;
    proposals: number;
  };
}

const stats = [
  {
    name: 'Total Projects',
    stat: (stats: DashboardStatsProps['stats']) => stats.projects,
    icon: BriefcaseIcon,
    color: 'blue',
  },
  {
    name: 'Active Clients',
    stat: (stats: DashboardStatsProps['stats']) => stats.clients,
    icon: UsersIcon,
    color: 'green',
  },
  {
    name: 'Open Tasks',
    stat: (stats: DashboardStatsProps['stats']) => stats.tasks,
    icon: ClipboardDocumentListIcon,
    color: 'amber',
  },
  {
    name: 'Proposals',
    stat: (stats: DashboardStatsProps['stats']) => stats.proposals,
    icon: DocumentTextIcon,
    color: 'purple',
  },
];

export function DashboardStats({ stats: statsData }: DashboardStatsProps) {
  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
      {stats.map((item) => (
        <Card 
          key={item.name}
          decoration="top"
          decorationColor={item.color as any}
        >
          <div className="flex items-center justify-between">
            <div>
              <Text>{item.name}</Text>
              <Metric>{item.stat(statsData)}</Metric>
            </div>
            <item.icon 
              className={`h-12 w-12 text-${item.color}-500 opacity-20`} 
              aria-hidden="true" 
            />
          </div>
        </Card>
      ))}
    </Grid>
  );
} 