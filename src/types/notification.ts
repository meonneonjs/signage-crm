export type NotificationType = 
  | 'task_assigned'
  | 'task_completed'
  | 'task_commented'
  | 'task_due_soon'
  | 'task_overdue'
  | 'mention'
  | 'project_update'
  | 'team_update';

export interface Notification {
  id: string;
  type: NotificationType;
  userId: string;
  title: string;
  message: string;
  data: Record<string, any>;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  taskAssigned: boolean;
  taskCompleted: boolean;
  taskCommented: boolean;
  taskDueSoon: boolean;
  taskOverdue: boolean;
  mentions: boolean;
  projectUpdates: boolean;
  teamUpdates: boolean;
  emailDigestFrequency: 'never' | 'daily' | 'weekly';
} 