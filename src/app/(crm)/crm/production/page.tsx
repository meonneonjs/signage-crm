'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ListChecks, Package, Wrench, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    title: 'Production Queue',
    value: '15',
    description: 'Jobs in production',
    icon: ListChecks,
    progress: 60,
  },
  {
    title: 'Inventory Status',
    value: '85%',
    description: 'Materials in stock',
    icon: Package,
    progress: 85,
  },
  {
    title: 'Equipment Status',
    value: '92%',
    description: 'Equipment operational',
    icon: Wrench,
    progress: 92,
  },
  {
    title: 'Quality Issues',
    value: '3',
    description: 'Open quality reports',
    icon: AlertTriangle,
    progress: 20,
  },
];

export default function ProductionPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Production</h1>
          <p className="mt-2 text-gray-500">Monitor production status and operations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Production Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
                <Progress value={stat.progress} className="mt-2 h-1.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Jobs</h2>
          <p className="text-sm text-gray-500">No active production jobs</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h2>
          <p className="text-sm text-gray-500">No recent quality issues reported</p>
        </Card>
      </div>
    </div>
  );
} 