import { ProjectStatus } from '@prisma/client';

export interface ClientWithStats {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  projects: {
    id: string;
    status: ProjectStatus;
    budget: number | null;
    createdAt: Date;
  }[];
  _count: {
    projects: number;
  };
} 