'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/contexts/PermissionContext';
import { DashboardPermissions, Permission } from '@/types/roles';

interface PermissionRequirement {
  section: keyof DashboardPermissions;
  action: keyof Permission;
}

export function withPermission(
  WrappedComponent: React.ComponentType,
  requirements: PermissionRequirement | PermissionRequirement[],
  redirectPath: string = '/dashboard'
) {
  return function PermissionWrapper(props: any) {
    const router = useRouter();
    const { canMultiple } = usePermissions();

    const requiredPermissions = Array.isArray(requirements) ? requirements : [requirements];

    useEffect(() => {
      const hasPermission = canMultiple(requiredPermissions);
      if (!hasPermission) {
        router.push(redirectPath);
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
} 