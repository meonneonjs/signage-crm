import { create } from 'zustand';
import { Client, Project, Task, Deal, Communication, Note, mockClients } from '@/lib/mockData';

interface ClientState {
  currentClient: Client | null;
  isLoading: boolean;
  error: string | null;
  fetchClient: (id: string) => Promise<void>;
  updateClient: (id: string, data: Partial<Client>) => Promise<void>;
  addProject: (clientId: string, project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  addTask: (clientId: string, task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  addDeal: (clientId: string, deal: Omit<Deal, 'id' | 'createdAt'>) => Promise<void>;
  addCommunication: (clientId: string, communication: Omit<Communication, 'id'>) => Promise<void>;
  addNote: (clientId: string, note: Omit<Note, 'id' | 'createdAt'>) => Promise<void>;
}

export const useClientStore = create<ClientState>((set, get) => ({
  currentClient: null,
  isLoading: false,
  error: null,

  fetchClient: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, we'll use mock data
      const mockClient = mockClients.find(c => c.id === id);
      if (!mockClient) {
        throw new Error('Client not found');
      }
      
      set({ currentClient: mockClient, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch client', isLoading: false });
    }
  },

  updateClient: async (id: string, data: Partial<Client>) => {
    try {
      set({ isLoading: true, error: null });
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentClient = get().currentClient;
      if (!currentClient) throw new Error('No client selected');
      
      const updatedClient = { ...currentClient, ...data };
      set({ currentClient: updatedClient, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update client', isLoading: false });
    }
  },

  addProject: async (clientId: string, project: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      set({ isLoading: true, error: null });
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentClient = get().currentClient;
      if (!currentClient) throw new Error('No client selected');
      
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date(),
        tasks: [],
        team: [],
      };
      
      const updatedClient = {
        ...currentClient,
        projects: [...currentClient.projects, newProject],
      };
      
      set({ currentClient: updatedClient, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add project', isLoading: false });
    }
  },

  addTask: async (clientId: string, task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      set({ isLoading: true, error: null });
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentClient = get().currentClient;
      if (!currentClient) throw new Error('No client selected');
      
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      
      const updatedClient = {
        ...currentClient,
        tasks: [...currentClient.tasks, newTask],
      };
      
      set({ currentClient: updatedClient, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add task', isLoading: false });
    }
  },

  addDeal: async (clientId: string, deal: Omit<Deal, 'id' | 'createdAt'>) => {
    try {
      set({ isLoading: true, error: null });
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentClient = get().currentClient;
      if (!currentClient) throw new Error('No client selected');
      
      const newDeal: Deal = {
        ...deal,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      
      const updatedClient = {
        ...currentClient,
        deals: [...currentClient.deals, newDeal],
      };
      
      set({ currentClient: updatedClient, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add deal', isLoading: false });
    }
  },

  addCommunication: async (clientId: string, communication: Omit<Communication, 'id'>) => {
    try {
      set({ isLoading: true, error: null });
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentClient = get().currentClient;
      if (!currentClient) throw new Error('No client selected');
      
      const newCommunication: Communication = {
        ...communication,
        id: Date.now().toString(),
      };
      
      const updatedClient = {
        ...currentClient,
        communications: [...currentClient.communications, newCommunication],
      };
      
      set({ currentClient: updatedClient, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add communication', isLoading: false });
    }
  },

  addNote: async (clientId: string, note: Omit<Note, 'id' | 'createdAt'>) => {
    try {
      set({ isLoading: true, error: null });
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const currentClient = get().currentClient;
      if (!currentClient) throw new Error('No client selected');
      
      const newNote: Note = {
        ...note,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      
      const updatedClient = {
        ...currentClient,
        notes: [...currentClient.notes, newNote],
      };
      
      set({ currentClient: updatedClient, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add note', isLoading: false });
    }
  },
})); 