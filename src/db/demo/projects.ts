import { Client } from './clients';

export interface Project {
  id: string;
  name: string;
  clientId: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  startDate: string;
  dueDate: string;
  budget: number;
  description: string;
  tags: string[];
}

export const demoProjects: Project[] = [
  {
    id: 'p1',
    name: 'Brand Refresh 2024',
    clientId: 'c1',
    status: 'in-progress',
    startDate: '2024-02-01T00:00:00Z',
    dueDate: '2024-04-15T00:00:00Z',
    budget: 15000,
    description: 'Complete brand refresh including logo redesign, style guide, and marketing materials',
    tags: ['branding', 'design', 'marketing']
  },
  {
    id: 'p2',
    name: 'Product Launch Campaign',
    clientId: 'c2',
    status: 'planning',
    startDate: '2024-03-01T00:00:00Z',
    dueDate: '2024-05-30T00:00:00Z',
    budget: 25000,
    description: 'Design and marketing campaign for new tech product launch',
    tags: ['campaign', 'product', 'digital']
  },
  {
    id: 'p3',
    name: 'Spring Collection Photography',
    clientId: 'c3',
    status: 'review',
    startDate: '2024-02-15T00:00:00Z',
    dueDate: '2024-03-15T00:00:00Z',
    budget: 8000,
    description: 'Product photography for spring artisan collection',
    tags: ['photography', 'product', 'seasonal']
  }
]; 