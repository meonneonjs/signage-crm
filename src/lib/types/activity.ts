export type ActivityType = 
  // Lead Activities
  | 'lead_created'
  | 'lead_updated'
  | 'lead_status_changed'
  | 'lead_assigned'
  | 'lead_converted'
  | 'lead_lost'
  
  // Proposal Activities
  | 'proposal_created'
  | 'proposal_sent'
  | 'proposal_viewed'
  | 'proposal_accepted'
  | 'proposal_rejected'
  | 'proposal_revised'
  
  // Project Activities
  | 'project_created'
  | 'project_started'
  | 'project_milestone'
  | 'project_completed'
  | 'project_delayed'
  
  // Task Activities
  | 'task_created'
  | 'task_assigned'
  | 'task_status_changed'
  | 'task_completed'
  | 'task_overdue'
  
  // Document Activities
  | 'document_uploaded'
  | 'document_updated'
  | 'document_shared'
  | 'document_signed'
  
  // Communication Activities
  | 'email_sent'
  | 'call_logged'
  | 'meeting_scheduled'
  | 'note_added';

export interface ActivityMetadata {
  // Lead metadata
  previousStatus?: string;
  newStatus?: string;
  assignedTo?: string;
  conversionDetails?: {
    clientId: string;
    dealValue?: number;
  };
  
  // Proposal metadata
  proposalValue?: number;
  validUntil?: Date;
  revisionNumber?: number;
  
  // Project metadata
  projectValue?: number;
  milestoneTitle?: string;
  completionPercentage?: number;
  delayReason?: string;
  
  // Task metadata
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  
  // Document metadata
  fileSize?: number;
  fileType?: string;
  signedBy?: string;
  
  // Communication metadata
  contactMethod?: string;
  duration?: number;
  participants?: string[];
}

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  userName: string;
  entityId: string;
  entityType: 'lead' | 'proposal' | 'project' | 'task' | 'document' | 'communication';
  description: string;
  metadata?: ActivityMetadata;
  createdAt: Date;
  importance?: 'low' | 'medium' | 'high';
  isSystem?: boolean;
}

export interface ActivityLog {
  activities: Activity[];
  total: number;
  hasMore: boolean;
} 