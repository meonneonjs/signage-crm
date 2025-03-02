import { Title, Text, Grid, Card } from '@tremor/react';
import { prisma } from '@/lib/db';
import PipelineBoard from './PipelineBoard';

async function getDeals() {
  return await prisma.deal.findMany({
    include: {
      lead: {
        select: {
          contactName: true,
          companyName: true,
        },
      },
      assignedTo: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

async function getPipelineStats() {
  const stats = await prisma.deal.groupBy({
    by: ['stage'],
    _count: true,
    _sum: {
      value: true,
    },
  });

  const totalValue = stats.reduce((sum, stat) => sum + (stat._sum.value || 0), 0);
  const totalDeals = stats.reduce((sum, stat) => sum + stat._count, 0);
  const avgDealValue = totalDeals ? totalValue / totalDeals : 0;

  return {
    totalValue,
    totalDeals,
    avgDealValue,
    byStage: stats,
  };
}

export default async function PipelinePage() {
  const [deals, stats] = await Promise.all([
    getDeals(),
    getPipelineStats(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Title>Sales Pipeline</Title>
        <Text>Track and manage your deals through the sales process</Text>
      </div>

      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <Title>Total Pipeline Value</Title>
          <Text className="text-2xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(stats.totalValue)}
          </Text>
        </Card>
        <Card>
          <Title>Active Deals</Title>
          <Text className="text-2xl font-bold">{stats.totalDeals}</Text>
        </Card>
        <Card>
          <Title>Average Deal Value</Title>
          <Text className="text-2xl font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(stats.avgDealValue)}
          </Text>
        </Card>
      </Grid>

      <PipelineBoard initialDeals={deals} />
    </div>
  );
} 