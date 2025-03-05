import { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { BrandLoadingScreen } from '@/components/BrandLoadingScreen';
import { AppShell } from '@/components/app/AppShell';
import { AppLayoutClient } from '@/components/app/AppLayoutClient';
import { PermissionProviderClient } from '@/components/auth/PermissionProviderClient';
import { UserRole } from '@/types/roles';

export const metadata: Metadata = {
  title: {
    template: '%s | AtellierCRM Dashboard',
    default: 'Dashboard | AtellierCRM'
  },
  description: 'AtellierCRM Dashboard - Manage your creative business',
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // For demo purposes, we'll use a hardcoded user role
  // In a real application, this would come from your auth system
  const userRole: UserRole = 'admin';

  return (
    <PermissionProviderClient userRole={userRole}>
      <AppShell>
        <AppLayoutClient>
          <Suspense fallback={<BrandLoadingScreen />}>
            {children}
          </Suspense>
        </AppLayoutClient>
      </AppShell>
    </PermissionProviderClient>
  );
} 