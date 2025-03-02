import { Card } from '@tremor/react';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track tasks across all your signage projects
        </p>
      </div>

      <Card>
        <div className="p-4">
          <p className="text-gray-500">Tasks functionality coming soon...</p>
        </div>
      </Card>
    </div>
  );
} 