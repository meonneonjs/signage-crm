import { create } from 'zustand';

export type Permission = 'view' | 'edit' | 'delete' | 'manage' | 'admin';

export interface ContactsState {
  viewMode: 'my-contacts' | 'all-contacts' | 'team-contacts' | 'leads' | 'archived';
  userPermissions: Permission[];
  teamId: string | null;
  userId: string;
  setViewMode: (mode: ContactsState['viewMode']) => void;
  canPerformAction: (action: Permission) => boolean;
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  viewMode: 'my-contacts',
  userPermissions: ['view', 'edit'], // Default permissions
  teamId: null,
  userId: '1', // This should come from your auth system
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  canPerformAction: (action) => {
    const { userPermissions } = get();
    if (userPermissions.includes('admin')) return true;
    return userPermissions.includes(action);
  },
})); 