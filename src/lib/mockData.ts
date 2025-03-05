export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive' | 'lead';
  type: 'customer' | 'prospect' | 'partner';
  assignedTo: string;
  lastContact: Date;
  createdAt: Date;
  revenue: number;
  projects: Project[];
  communications: Communication[];
  deals: Deal[];
  notes: Note[];
  chatThreads: ChatThread[];
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed';
  clientId: string;
  createdAt: Date;
  tasks: Task[];
  team: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed';
  clientId: string;
  createdAt: Date;
}

export interface Communication {
  id: string;
  type: 'email' | 'call' | 'meeting';
  subject: string;
  content: string;
  date: Date;
  participants: string[];
}

export interface Deal {
  id: string;
  name: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedClose: Date;
  createdAt: Date;
}

export interface ChatThread {
  id: string;
  title: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
}

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Acme Corp',
    email: 'john@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, New York, NY 10001',
    status: 'active',
    type: 'customer',
    assignedTo: 'Sarah Johnson',
    lastContact: new Date('2024-02-15'),
    createdAt: new Date('2024-01-01'),
    revenue: 50000,
    projects: [
      {
        id: '1',
        name: 'Website Redesign',
        description: 'Complete overhaul of company website',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-01'),
        budget: 25000,
        status: 'in-progress',
        clientId: '1',
        createdAt: new Date('2024-02-01'),
        tasks: [],
        team: ['Sarah Johnson', 'Mike Chen']
      }
    ],
    communications: [
      {
        id: '1',
        type: 'email',
        subject: 'Project Update',
        content: 'Here is the latest update on the website redesign project...',
        date: new Date('2024-02-15'),
        participants: ['John Smith', 'Sarah Johnson']
      }
    ],
    deals: [
      {
        id: '1',
        name: 'Website Redesign Project',
        value: 25000,
        stage: 'negotiation',
        probability: 75,
        expectedClose: new Date('2024-03-01'),
        createdAt: new Date('2024-01-15')
      }
    ],
    notes: [
      {
        id: '1',
        content: 'Client prefers modern design with focus on mobile experience',
        createdAt: new Date('2024-02-01'),
        createdBy: 'Sarah Johnson'
      }
    ],
    chatThreads: [],
    tasks: [
      {
        id: '1',
        title: 'Review Design Mockups',
        description: 'Review and provide feedback on initial design mockups',
        priority: 'high',
        dueDate: new Date('2024-02-20'),
        assignedTo: 'Sarah Johnson',
        status: 'pending',
        clientId: '1',
        createdAt: new Date('2024-02-15')
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Doe',
    company: 'TechStart Inc',
    email: 'jane@techstart.com',
    phone: '+1 (555) 987-6543',
    address: '456 Innovation Blvd, San Francisco, CA 94105',
    status: 'lead',
    type: 'prospect',
    assignedTo: 'Mike Chen',
    lastContact: new Date('2024-02-10'),
    createdAt: new Date('2024-02-01'),
    revenue: 0,
    projects: [],
    communications: [
      {
        id: '2',
        type: 'call',
        subject: 'Initial Contact',
        content: 'Discussed potential partnership opportunities',
        date: new Date('2024-02-10'),
        participants: ['Jane Doe', 'Mike Chen']
      }
    ],
    deals: [
      {
        id: '2',
        name: 'Digital Marketing Campaign',
        value: 15000,
        stage: 'prospecting',
        probability: 30,
        expectedClose: new Date('2024-04-01'),
        createdAt: new Date('2024-02-10')
      }
    ],
    notes: [
      {
        id: '2',
        content: 'Interested in our digital marketing services',
        createdAt: new Date('2024-02-10'),
        createdBy: 'Mike Chen'
      }
    ],
    chatThreads: [],
    tasks: [
      {
        id: '2',
        title: 'Follow-up Call',
        description: 'Schedule follow-up call to discuss proposal',
        priority: 'medium',
        dueDate: new Date('2024-02-25'),
        assignedTo: 'Mike Chen',
        status: 'pending',
        clientId: '2',
        createdAt: new Date('2024-02-10')
      }
    ]
  }
]; 