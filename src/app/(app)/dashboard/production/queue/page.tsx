'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FilterBar } from '@/components/app/FilterBar';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const filterOptions = [
  {
    id: 'status',
    label: 'Status',
    options: ['queued', 'in-progress', 'on-hold', 'completed'],
  },
  {
    id: 'priority',
    label: 'Priority',
    options: ['low', 'medium', 'high', 'urgent'],
  },
];

export default function ProductionQueuePage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Production Queue</h1>
          <p className="mt-2 text-gray-500">Manage and track production jobs</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Job
        </Button>
      </div>

      <FilterBar
        filters={filterOptions}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <div className="text-center py-6">
                  <p className="text-gray-500">No production jobs found</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Create your first job
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 