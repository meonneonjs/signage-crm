'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UploadDialog } from './_components/UploadDialog';

// Demo data - replace with actual data fetching
const demoResources = [
  {
    id: '1',
    title: 'Brand Guidelines',
    category: 'Design',
    type: 'PDF',
    updatedAt: '2024-03-05',
    size: '2.4 MB',
    url: '/resources/brand-guidelines.pdf'
  },
  {
    id: '2',
    title: 'Project Templates',
    category: 'Templates',
    type: 'ZIP',
    updatedAt: '2024-03-04',
    size: '5.1 MB',
    url: '/resources/project-templates.zip'
  },
  {
    id: '3',
    title: 'Client Onboarding Guide',
    category: 'Documentation',
    type: 'PDF',
    updatedAt: '2024-03-03',
    size: '1.8 MB',
    url: '/resources/onboarding-guide.pdf'
  }
];

const categories = ['All', 'Design', 'Templates', 'Documentation', 'Assets'];
const fileTypes = ['All', 'PDF', 'ZIP', 'DOC', 'IMG'];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [resources, setResources] = useState(demoResources);

  const handleUpload = async (data: { title: string; category: string; file: File | null }) => {
    if (!data.file) return;

    // In a real application, you would upload the file to your storage service here
    // For demo purposes, we'll just add it to the resources array
    const newResource = {
      id: (resources.length + 1).toString(),
      title: data.title,
      category: data.category,
      type: data.file.name.split('.').pop()?.toUpperCase() || 'FILE',
      updatedAt: new Date().toISOString().split('T')[0],
      size: `${(data.file.size / (1024 * 1024)).toFixed(1)} MB`,
      url: URL.createObjectURL(data.file)
    };

    setResources(prev => [...prev, newResource]);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Resources</h1>
        <UploadDialog onUpload={handleUpload} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="File Type" />
          </SelectTrigger>
          <SelectContent>
            {fileTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map(resource => (
          <Card key={resource.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-[#1f2f5c]">{resource.title}</h3>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                  {resource.type}
                </span>
              </div>
              <p className="text-sm text-gray-500">{resource.category}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Updated: {resource.updatedAt}</span>
                <span>{resource.size}</span>
              </div>
              <Button 
                variant="outline" 
                className="mt-2 w-full hover:bg-[#1eb5b6] hover:text-white transition-colors"
                onClick={() => window.open(resource.url, '_blank')}
              >
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}
    </div>
  );
} 