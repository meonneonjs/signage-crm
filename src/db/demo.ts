import { CustomFieldValue, Module } from '@/types/customFields';
import { Task } from '@/types/task';
import { Notification } from '@/types/notification';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  startDate: string;
  dueDate: string;
  tags: string[];
  customFields: Record<string, CustomFieldValue>;
  clientId: string;
  budget: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export interface Invoice {
  id: string;
  number: string;
  projectId: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  total: number;
}

// Demo modules for projects
export const demoProjectModules: Module[] = [
  {
    id: '1',
    name: 'Budget Information',
    description: 'Track project budget and financial details',
    entityType: 'project',
    active: true,
    fields: [
      {
        id: 'budget',
        name: 'Budget',
        type: 'number',
        required: true,
        description: 'Total project budget',
        entityType: 'project',
        moduleId: '1',
      },
      {
        id: 'currency',
        name: 'Currency',
        type: 'select',
        required: true,
        entityType: 'project',
        moduleId: '1',
        options: [
          { id: 'usd', label: 'USD', value: 'USD' },
          { id: 'eur', label: 'EUR', value: 'EUR' },
          { id: 'gbp', label: 'GBP', value: 'GBP' },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Client Information',
    description: 'Additional client-related project details',
    entityType: 'project',
    active: true,
    fields: [
      {
        id: 'clientContact',
        name: 'Client Contact',
        type: 'text',
        required: true,
        description: 'Main point of contact',
        entityType: 'project',
        moduleId: '2',
      },
      {
        id: 'clientEmail',
        name: 'Client Email',
        type: 'text',
        required: true,
        entityType: 'project',
        moduleId: '2',
      },
    ],
  },
];

export const demoProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design and improved user experience.',
    status: 'in-progress',
    startDate: '2024-03-01',
    dueDate: '2024-04-15',
    tags: ['design', 'digital', 'branding'],
    customFields: {
      budget: { fieldId: 'budget', value: 50000 },
      currency: { fieldId: 'currency', value: 'USD' },
      clientContact: { fieldId: 'clientContact', value: 'John Smith' },
      clientEmail: { fieldId: 'clientEmail', value: 'john@example.com' },
    },
    clientId: '1',
    budget: 50000,
  },
  {
    id: '2',
    name: 'Brand Identity Update',
    description: 'Refresh of brand guidelines, logo variations, and visual identity system.',
    status: 'planning',
    startDate: '2024-03-15',
    dueDate: '2024-05-01',
    tags: ['branding', 'design'],
    customFields: {
      budget: { fieldId: 'budget', value: 25000 },
      currency: { fieldId: 'currency', value: 'EUR' },
      clientContact: { fieldId: 'clientContact', value: 'Sarah Johnson' },
      clientEmail: { fieldId: 'clientEmail', value: 'sarah@example.com' },
    },
    clientId: '2',
    budget: 25000,
  },
  {
    id: '3',
    name: 'Social Media Campaign',
    description: 'Q2 social media campaign focusing on product launches and brand awareness.',
    status: 'review',
    startDate: '2024-02-15',
    dueDate: '2024-03-31',
    tags: ['marketing', 'digital'],
    customFields: {
      budget: { fieldId: 'budget', value: 15000 },
      currency: { fieldId: 'currency', value: 'USD' },
      clientContact: { fieldId: 'clientContact', value: 'Mike Wilson' },
      clientEmail: { fieldId: 'clientEmail', value: 'mike@example.com' },
    },
    clientId: '1',
    budget: 15000,
  },
  {
    id: '4',
    name: 'Product Photography',
    description: 'Professional photography session for new product line and marketing materials.',
    status: 'completed',
    startDate: '2024-02-01',
    dueDate: '2024-02-28',
    tags: ['photography', 'product'],
    customFields: {
      budget: { fieldId: 'budget', value: 8000 },
      currency: { fieldId: 'currency', value: 'GBP' },
      clientContact: { fieldId: 'clientContact', value: 'Emma Brown' },
      clientEmail: { fieldId: 'clientEmail', value: 'emma@example.com' },
    },
    clientId: '1',
    budget: 8000,
  },
  {
    id: '5',
    name: 'Email Marketing Templates',
    description: 'Design and development of new responsive email templates for various campaigns.',
    status: 'in-progress',
    startDate: '2024-03-10',
    dueDate: '2024-04-10',
    tags: ['design', 'marketing', 'digital'],
    customFields: {
      budget: { fieldId: 'budget', value: 12000 },
      currency: { fieldId: 'currency', value: 'USD' },
      clientContact: { fieldId: 'clientContact', value: 'David Lee' },
      clientEmail: { fieldId: 'clientEmail', value: 'david@example.com' },
    },
    clientId: '2',
    budget: 12000,
  },
  {
    id: '6',
    name: 'Brand Video Production',
    description: 'Creation of brand story video for website and social media channels.',
    status: 'planning',
    startDate: '2024-04-01',
    dueDate: '2024-05-15',
    tags: ['branding', 'marketing'],
    customFields: {
      budget: { fieldId: 'budget', value: 35000 },
      currency: { fieldId: 'currency', value: 'EUR' },
      clientContact: { fieldId: 'clientContact', value: 'Lisa Chen' },
      clientEmail: { fieldId: 'clientEmail', value: 'lisa@example.com' },
    },
    clientId: '2',
    budget: 35000,
  },
  {
    id: '7',
    name: 'Print Collateral Design',
    description: 'Design of business cards, letterheads, and promotional materials.',
    status: 'review',
    startDate: '2024-03-05',
    dueDate: '2024-04-05',
    tags: ['design', 'branding'],
    customFields: {
      budget: { fieldId: 'budget', value: 18000 },
      currency: { fieldId: 'currency', value: 'USD' },
      clientContact: { fieldId: 'clientContact', value: 'Tom Anderson' },
      clientEmail: { fieldId: 'clientEmail', value: 'tom@example.com' },
    },
    clientId: '1',
    budget: 18000,
  },
  {
    id: '8',
    name: 'Product Packaging',
    description: 'Design and production of packaging for new product line.',
    status: 'in-progress',
    startDate: '2024-02-20',
    dueDate: '2024-04-20',
    tags: ['product', 'design', 'branding'],
    customFields: {
      budget: { fieldId: 'budget', value: 28000 },
      currency: { fieldId: 'currency', value: 'GBP' },
      clientContact: { fieldId: 'clientContact', value: 'Rachel Kim' },
      clientEmail: { fieldId: 'clientEmail', value: 'rachel@example.com' },
    },
    clientId: '1',
    budget: 28000,
  },
];

// Demo modules for tasks
export const demoTaskModules: Module[] = [
  {
    id: '3',
    name: 'Time Tracking',
    description: 'Track time spent on tasks',
    entityType: 'task',
    active: true,
    fields: [
      {
        id: 'estimatedHours',
        name: 'Estimated Hours',
        type: 'number',
        required: true,
        description: 'Estimated time to complete the task',
        entityType: 'task',
        moduleId: '3',
      },
      {
        id: 'actualHours',
        name: 'Actual Hours',
        type: 'number',
        required: false,
        description: 'Actual time spent on the task',
        entityType: 'task',
        moduleId: '3',
      },
    ],
  },
  {
    id: '4',
    name: 'Quality Control',
    description: 'Task quality and review information',
    entityType: 'task',
    active: true,
    fields: [
      {
        id: 'reviewedBy',
        name: 'Reviewed By',
        type: 'text',
        required: false,
        entityType: 'task',
        moduleId: '4',
      },
      {
        id: 'qualityScore',
        name: 'Quality Score',
        type: 'select',
        required: false,
        entityType: 'task',
        moduleId: '4',
        options: [
          { id: '1', label: 'Needs Improvement', value: '1' },
          { id: '2', label: 'Meets Expectations', value: '2' },
          { id: '3', label: 'Exceeds Expectations', value: '3' },
        ],
      },
    ],
  },
];

export const demoClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Tech Solutions Inc.',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Tech City, TC 12345',
    notes: 'Long-term client since 2020. Prefers email communication.',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Creative Designs Co.',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    address: '456 Design St, Art City, AC 67890',
    notes: 'New client with multiple upcoming projects.',
  },
];

export const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create initial mockups for the homepage redesign',
    status: 'in-progress',
    priority: 'high',
    projectId: '1',
    dueDate: '2024-03-15',
    assigneeId: 'user1',
  },
  {
    id: '2',
    title: 'Develop Navigation Component',
    description: 'Implement responsive navigation menu',
    status: 'completed',
    priority: 'medium',
    projectId: '1',
    dueDate: '2024-03-20',
    assigneeId: 'user2',
  },
];

export const demoInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    projectId: '1',
    status: 'paid',
    dueDate: '2024-03-31',
    total: 25000,
  },
  {
    id: '2',
    number: 'INV-2024-002',
    projectId: '1',
    status: 'sent',
    dueDate: '2024-04-15',
    total: 25000,
  },
];

export const demoNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_assigned',
    userId: 'user1',
    title: 'New Task Assigned',
    message: 'You have been assigned to "Design Homepage Layout"',
    data: {
      taskId: '1',
      projectId: '1',
    },
    read: false,
    createdAt: '2024-03-01T09:00:00Z',
    link: '/tasks/1',
  },
  {
    id: '2',
    type: 'task_commented',
    userId: 'user1',
    title: 'New Comment on Task',
    message: 'John commented on "Design Homepage Layout"',
    data: {
      taskId: '1',
      commentId: '1',
      userId: 'user2',
    },
    read: false,
    createdAt: '2024-03-10T11:20:00Z',
    link: '/tasks/1#comment-1',
  },
  {
    id: '3',
    type: 'task_due_soon',
    userId: 'user1',
    title: 'Task Due Soon',
    message: '"Design Homepage Layout" is due in 2 days',
    data: {
      taskId: '1',
      dueDate: '2024-03-20',
    },
    read: false,
    createdAt: '2024-03-18T09:00:00Z',
    link: '/tasks/1',
  },
  {
    id: '4',
    type: 'task_completed',
    userId: 'user2',
    title: 'Task Completed',
    message: '"Design Hero Section" has been completed',
    data: {
      taskId: '3',
      completedBy: 'user1',
    },
    read: true,
    createdAt: '2024-03-14T16:45:00Z',
    link: '/tasks/3',
  },
]; 