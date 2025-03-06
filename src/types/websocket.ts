// WebSocket event types
export interface ServerToClientEvents {
  'design:update': (design: {
    id: string;
    title: string;
    description: string | null;
    status: 'pending' | 'approved' | 'rejected';
    version: number;
    submittedBy: {
      id: string;
      name: string | null;
    };
    images: Array<{
      id: string;
      url: string;
      caption: string | null;
    }>;
    createdAt: Date;
    updatedAt: Date;
  }) => void;
  'design:comment': (comment: {
    id: string;
    content: string;
    user: {
      id: string;
      name: string | null;
      image: string | null;
    };
    createdAt: Date;
    updatedAt: Date;
  }) => void;
  'design:approval': (approval: {
    id: string;
    status: 'approved' | 'rejected';
    comment: string | null;
    design: {
      id: string;
      title: string;
    };
    createdAt: Date;
  }) => void;
  'project:update': (project: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    organization: {
      id: string;
      name: string;
    };
    createdAt: Date;
    updatedAt: Date;
  }) => void;
  'notification:new': (notification: {
    id: string;
    type: string;
    message: string;
    createdAt: Date;
    data?: any;
  }) => void;
}

export interface ClientToServerEvents {
  'design:view': (designId: string) => void;
  'project:join': (projectId: string) => void;
  'project:leave': (projectId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
} 