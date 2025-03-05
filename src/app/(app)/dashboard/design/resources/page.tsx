'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, FileText, Palette, Book, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';

const resources = [
  {
    title: 'Brand Guidelines',
    description: 'Official brand guidelines and style guides',
    icon: FileText,
    items: [],
  },
  {
    title: 'Design System',
    description: 'UI components and design patterns',
    icon: Palette,
    items: [],
  },
  {
    title: 'Tutorials',
    description: 'Step-by-step design tutorials',
    icon: Book,
    items: [],
  },
  {
    title: 'Training Videos',
    description: 'Video tutorials and workshops',
    icon: Video,
    items: [],
  },
];

export default function DesignResourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Design Resources</h1>
          <p className="mt-2 text-gray-500">Access design guidelines and resources</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Resource
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search resources..."
          className="pl-10 max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <Card key={resource.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <resource.icon className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
                {resource.items.length === 0 ? (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">No resources available</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" /> Add {resource.title}
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 