'use client';

import { ReactNode } from 'react';
import { DashboardPermissions, Permission } from '@/types/roles';
import { usePermissions } from '@/contexts/PermissionContext';

interface PermissionGuardProps {
  children: ReactNode;
  section: keyof DashboardPermissions;
  action: keyof Permission;
  fallback?: ReactNode;
}

export function PermissionGuard({
  children,
  section,
  action,
  fallback = null,
}: PermissionGuardProps) {
  const { can } = usePermissions();

  if (!can(section, action)) {
    return fallback;
  }

  return <>{children}</>;
}

interface MultiPermissionGuardProps {
  children: ReactNode;
  permissions: Array<{
    section: keyof DashboardPermissions;
    action: keyof Permission;
  }>;
  requireAll?: boolean;
  fallback?: ReactNode;
}

export function MultiPermissionGuard({
  children,
  permissions,
  requireAll = true,
  fallback = null,
}: MultiPermissionGuardProps) {
  const { canMultiple, canAny } = usePermissions();

  const hasPermission = requireAll
    ? canMultiple(permissions)
    : canAny(permissions[0].section, permissions.map(p => p.action));

  if (!hasPermission) {
    return fallback;
  }

  return <>{children}</>;
}

interface WithPermissionProps {
  section: keyof DashboardPermissions;
  action?: keyof Permission;
}

export function withPermission<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { section, action = 'view' }: WithPermissionProps
) {
  return function WithPermissionWrapper(props: P) {
    return (
      <PermissionGuard section={section} action={action}>
        <WrappedComponent {...props} />
      </PermissionGuard>
    );
  };
} 