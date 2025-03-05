import { WithCustomFields } from './customFields';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'completed';

export interface Task extends WithCustomFields {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  projectId: string;
  dueDate: string;
  assigneeId: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  parentTaskId?: string;
  subtasks: string[]; // Array of task IDs
  attachments: string[]; // Array of attachment URLs
  comments: Comment[];
  watchers: string[]; // Array of user IDs
  labels: string[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  attachments: string[]; // Array of attachment URLs
  mentions: string[]; // Array of user IDs
}

export interface TaskActivity {
  id: string;
  taskId: string;
  userId: string;
  type: 'created' | 'updated' | 'commented' | 'status_changed' | 'assigned' | 'completed';
  data: Record<string, any>;
  createdAt: string;
} 