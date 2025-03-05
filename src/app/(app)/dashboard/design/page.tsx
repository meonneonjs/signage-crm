'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileImage, CheckCircle2, BookOpen } from 'lucide-react';

const stats = [
  {
    title: 'Active Requests',
    value: '12',
    description: 'Design requests in progress',
    icon: FileImage,
  },
  {
    title: 'Pending Approvals',
    value: '5',
    description: 'Designs awaiting review',
    icon: CheckCircle2,
  },
  {
    title: 'Asset Library',
    value: '234',
    description: 'Total design assets',
    icon: BookOpen,
  },
];

export default function DesignStudioPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Design Studio</h1>
          <p className="mt-2 text-gray-500">Manage design requests and assets</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Design Request
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h2>
          <p className="text-sm text-gray-500">No recent design requests</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h2>
          <p className="text-sm text-gray-500">No pending approvals</p>
        </Card>
      </div>
    </div>
  );
} 