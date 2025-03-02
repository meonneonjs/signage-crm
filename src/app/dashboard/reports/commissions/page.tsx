import { Title, Text, Card, BarChart } from '@tremor/react';
import { currentUser } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function CommissionsReportPage() {
  const session = await currentUser();
  if (!session) {
    redirect('/sign-in');
  }

  // Get commission data for the last 12 months
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);
  
  const commissions = await prisma.commission.groupBy({
    by: ['userId'],
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    _sum: {
      amount: true,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: commissions.map(c => c.userId),
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const data = commissions.map(commission => ({
    name: users.find(u => u.id === commission.userId)?.name || 'Unknown',
    amount: commission._sum.amount || 0,
  }));

  return (
    <div className="space-y-6 p-8">
      <div>
        <Title>Commission Reports</Title>
        <Text>View commission earnings by sales representative</Text>
      </div>

      <Card>
        <Title>Commission Distribution</Title>
        <BarChart
          data={data}
          index="name"
          categories={["amount"]}
          colors={["blue"]}
          valueFormatter={(value) => 
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(value)
          }
        />
      </Card>
    </div>
  );
} 