'use client';

import { Suspense } from 'react';
import { BrandLoadingScreen } from '@/components/BrandLoadingScreen';
import { AppShell } from '@/components/app/AppShell';
import { AppLayoutClient } from '@/components/app/AppLayoutClient';
import { PermissionProvider } from '@/contexts/PermissionContext';
import { UserRole } from '@/types/roles';

export default function CRMLayoutClient({
  children,
  userRole,
}: {
  children: React.ReactNode;
  userRole: UserRole;
}) {
  return (
    <PermissionProvider userRole={userRole}>
      <Suspense fallback={<BrandLoadingScreen />}>
        {children}
      </Suspense>
    </PermissionProvider>
  );
} 