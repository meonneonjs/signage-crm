'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Grid, LayoutList, FolderPlus } from 'lucide-react';
import { FilterBar } from '@/components/app/FilterBar';
import { useState } from 'react';

const filterOptions = [
  {
    id: 'type',
    label: 'Type',
    options: ['image', 'vector', 'document', 'video'],
  },
  {
    id: 'category',
    label: 'Category',
    options: ['brand', 'marketing', 'product', 'social'],
  },
];

export default function DesignAssetsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Asset Library</h1>
          <p className="mt-2 text-gray-500">Browse and manage design assets</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setView('list')}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Upload Asset
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <FilterBar
          filters={filterOptions}
          onFilterChange={setFilters}
          onSearchChange={setSearch}
        />
        <Button variant="outline" size="sm">
          <FolderPlus className="mr-2 h-4 w-4" /> New Folder
        </Button>
      </div>

      <Card className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">No assets found</p>
          <Button variant="outline" className="mt-4">
            <Plus className="mr-2 h-4 w-4" /> Upload your first asset
          </Button>
        </div>
      </Card>
    </div>
  );
} 