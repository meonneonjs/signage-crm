'use client';

import { ReactNode } from 'react';
import { PermissionProvider } from '@/contexts/PermissionContext';
import { UserRole } from '@/types/roles';

interface PermissionProviderClientProps {
  children: ReactNode;
  userRole: UserRole;
}

export function PermissionProviderClient({ children, userRole }: PermissionProviderClientProps) {
  return (
    <PermissionProvider userRole={userRole}>
      {children}
    </PermissionProvider>
  );
} 