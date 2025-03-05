'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle } from 'lucide-react';
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
    id: 'category',
    label: 'Category',
    options: ['raw-materials', 'supplies', 'finished-goods'],
  },
  {
    id: 'status',
    label: 'Status',
    options: ['in-stock', 'low-stock', 'out-of-stock', 'on-order'],
  },
];

export default function InventoryPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="mt-2 text-gray-500">Track and manage inventory levels</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" /> Low Stock Alert
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>

      <FilterBar
        filters={filterOptions}
        onFilterChange={setFilters}
        onSearchChange={setSearch}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-medium text-gray-500">Total Items</h3>
          <p className="text-3xl font-semibold mt-2">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium text-gray-500">Low Stock Items</h3>
          <p className="text-3xl font-semibold mt-2">0</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-medium text-gray-500">Out of Stock</h3>
          <p className="text-3xl font-semibold mt-2">0</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <div className="text-center py-6">
                  <p className="text-gray-500">No inventory items found</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Add your first item
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