'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';
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

const filterOptions = [
  {
    id: 'status',
    label: 'Status',
    options: ['operational', 'maintenance', 'repair', 'offline'],
  },
  {
    id: 'type',
    label: 'Type',
    options: ['printer', 'cutter', 'press', 'finishing'],
  },
];

const stats = [
  {
    title: 'Total Equipment',
    value: '0',
    description: 'All equipment',
    icon: Wrench,
  },
  {
    title: 'Operational',
    value: '0',
    description: 'Equipment in use',
    icon: CheckCircle2,
  },
  {
    title: 'Maintenance Required',
    value: '0',
    description: 'Due for maintenance',
    icon: AlertTriangle,
  },
];

export default function EquipmentPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment Management</h1>
          <p className="mt-2 text-gray-500">Monitor and maintain equipment</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Equipment
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

      <FilterBar
        filters={filterOptions}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <div className="text-center py-6">
                  <p className="text-gray-500">No equipment found</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add your first equipment
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