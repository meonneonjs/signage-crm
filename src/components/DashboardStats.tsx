import { Card, Metric, Text, Flex, Grid } from '@tremor/react';
import { CurrencyDollarIcon, UserGroupIcon, DocumentCheckIcon, ChartBarIcon } from '@heroicons/react/24/solid';

interface StatsProps {
  stats: {
    clientCount: number;
    projectCount: number;
    completedProjects: number;
    totalRevenue: number;
  };
}

const DashboardStats = ({ stats }: StatsProps) => {
  const items = [
    {
      title: "Total Clients",
      metric: stats.clientCount,
      icon: UserGroupIcon,
      color: "blue",
    },
    {
      title: "Total Projects",
      metric: stats.projectCount,
      icon: ChartBarIcon,
      color: "green",
    },
    {
      title: "Completed Projects",
      metric: stats.completedProjects,
      icon: DocumentCheckIcon,
      color: "purple",
    },
    {
      title: "Total Revenue",
      metric: `$${stats.totalRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: "yellow",
    },
  ];

  return (
    <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
      {items.map((item) => (
        <Card key={item.title} decoration="top" decorationColor={item.color as any}>
          <Flex justifyContent="start" className="space-x-4">
            <item.icon className="w-8 h-8 text-gray-500" />
            <div>
              <Text>{item.title}</Text>
              <Metric>{item.metric}</Metric>
            </div>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
};

export default DashboardStats; 