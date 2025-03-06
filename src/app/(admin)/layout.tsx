import { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { BrandLoadingScreen } from '@/components/BrandLoadingScreen';
import { AppShell } from '@/components/app/AppShell';
import { AppLayoutClient } from '@/components/app/AppLayoutClient';

export const metadata: Metadata = {
  title: {
    template: '%s | AtellierCRM',
    default: 'CRM Dashboard | AtellierCRM'
  },
  description: 'AtellierCRM Dashboard - Manage your creative business',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { userId, sessionId } = auth();

    // Only check for authentication, no role check
    if (!userId || !sessionId) {
      redirect('/sign-in');
    }

    return (
      <AppShell>
        <AppLayoutClient>
          <Suspense fallback={<BrandLoadingScreen />}>
            {children}
          </Suspense>
        </AppLayoutClient>
      </AppShell>
    );
  } catch (error) {
    console.error('Authentication error:', error);
    redirect('/sign-in');
  }
} 