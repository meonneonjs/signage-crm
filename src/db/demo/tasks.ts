export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
  createdAt: string;
}

export const demoTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Logo Design Concepts',
    description: 'Create 3 initial logo concepts for client review',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-02-15T00:00:00Z',
    assignedTo: 'user',
    createdAt: '2024-02-01T09:00:00Z'
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Color Palette Selection',
    description: 'Define primary and secondary color palettes',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-02-20T00:00:00Z',
    assignedTo: 'user',
    createdAt: '2024-02-01T09:30:00Z'
  },
  {
    id: 't3',
    projectId: 'p2',
    title: 'Campaign Strategy Document',
    description: 'Create detailed campaign strategy and timeline',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-03-10T00:00:00Z',
    assignedTo: 'user',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: 't4',
    projectId: 'p3',
    title: 'Product Styling',
    description: 'Style and arrange products for photo shoot',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-02-20T00:00:00Z',
    assignedTo: 'user',
    createdAt: '2024-02-15T11:00:00Z'
  }
]; 