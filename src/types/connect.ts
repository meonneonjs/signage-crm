export type UserStatus = 'online' | 'away' | 'offline' | 'dnd';

export interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  status: UserStatus;
  customStatus?: {
    emoji?: string;
    text?: string;
    expiresAt?: Date;
  };
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Attachment {
  type: 'file' | 'image';
  url: string;
  name: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  user: User;
  reactions?: Reaction[];
  thread?: Message[];
  isPinned?: boolean;
  attachments?: Attachment[];
} 