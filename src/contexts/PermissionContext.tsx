'use client';

import { createContext, useContext, ReactNode } from 'react';
import { UserRole, DashboardPermissions, Permission, rolePermissions } from '@/types/roles';

interface PermissionContextType {
  userRole: UserRole;
  can: (section: keyof DashboardPermissions, action: keyof Permission) => boolean;
  canAny: (section: keyof DashboardPermissions, actions: Array<keyof Permission>) => boolean;
  canAll: (section: keyof DashboardPermissions, actions: Array<keyof Permission>) => boolean;
  canMultiple: (permissions: Array<{ section: keyof DashboardPermissions; action: keyof Permission }>) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

interface PermissionProviderProps {
  children: ReactNode;
  userRole: UserRole;
}

export function PermissionProvider({ children, userRole }: PermissionProviderProps) {
  const can = (section: keyof DashboardPermissions, action: keyof Permission): boolean => {
    return rolePermissions[userRole][section][action];
  };

  const canAny = (section: keyof DashboardPermissions, actions: Array<keyof Permission>): boolean => {
    return actions.some(action => can(section, action));
  };

  const canAll = (section: keyof DashboardPermissions, actions: Array<keyof Permission>): boolean => {
    return actions.every(action => can(section, action));
  };

  const canMultiple = (permissions: Array<{ section: keyof DashboardPermissions; action: keyof Permission }>): boolean => {
    return permissions.every(({ section, action }) => can(section, action));
  };

  const value = {
    userRole,
    can,
    canAny,
    canAll,
    canMultiple,
  };

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
} 