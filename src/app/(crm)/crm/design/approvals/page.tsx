'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    options: ['pending', 'approved', 'rejected', 'changes-requested'],
  },
  {
    id: 'type',
    label: 'Type',
    options: ['graphic', 'web', 'print', 'social'],
  },
];

export default function DesignApprovalsPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Design Approvals</h1>
          <p className="mt-2 text-gray-500">Review and approve design submissions</p>
        </div>
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
              <TableHead>Design</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <div className="text-center py-6">
                  <p className="text-gray-500">No approvals pending</p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 