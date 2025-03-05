'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FilterBar } from '@/components/app/FilterBar';
import { useState } from 'react';

const filterOptions = [
  {
    id: 'status',
    label: 'Status',
    options: ['new', 'in-progress', 'review', 'completed'],
  },
  {
    id: 'priority',
    label: 'Priority',
    options: ['low', 'medium', 'high', 'urgent'],
  },
  {
    id: 'type',
    label: 'Type',
    options: ['graphic', 'web', 'print', 'social'],
  },
];

export default function DesignRequestsPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Design Requests</h1>
          <p className="mt-2 text-gray-500">Manage and track design requests</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      <FilterBar
        filters={filterOptions}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
      />

      <Card className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">No design requests found</p>
          <Button variant="outline" className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Create your first request
          </Button>
        </div>
      </Card>
    </div>
  );
} 