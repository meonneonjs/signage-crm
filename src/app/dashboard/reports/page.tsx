import { Title, Text, Card, Grid } from '@tremor/react';
import Link from 'next/link';
import { ChartBarIcon, CurrencyDollarIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';

const reportTypes = [
  {
    title: 'Sales Performance',
    description: 'View sales metrics by representative, product type, and region',
    icon: ChartBarIcon,
    href: '/dashboard/reports/sales',
  },
  {
    title: 'Commissions',
    description: 'Track commission earnings and payouts',
    icon: CurrencyDollarIcon,
    href: '/dashboard/reports/commissions',
  },
  {
    title: 'Customer Analytics',
    description: 'Analyze customer engagement and satisfaction',
    icon: UserGroupIcon,
    href: '/dashboard/reports/customers',
  },
  {
    title: 'Production Metrics',
    description: 'Monitor production timelines and quality metrics',
    icon: ClockIcon,
    href: '/dashboard/reports/production',
  },
];

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <Title>Reports & Analytics</Title>
        <Text>Access detailed insights and performance metrics</Text>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-6">
        {reportTypes.map((report) => (
          <Link key={report.href} href={report.href}>
            <Card className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <report.icon className="h-8 w-8 text-indigo-600" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </Grid>
    </div>
  );
} 