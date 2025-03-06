import { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { BrandLoadingScreen } from '@/components/BrandLoadingScreen';
import { ClientPortalProvider } from '@/contexts/ClientPortalContext';
import { ClientPortalShell } from '@/components/client/ClientPortalShell';

export const metadata: Metadata = {
  title: {
    template: '%s | Client Portal',
    default: 'Client Portal Dashboard'
  },
  description: 'Access your project information, files, and manage your account',
};

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionId } = auth();

  if (!userId || !sessionId) {
    redirect('/sign-in');
  }

  // Get the user's role from both possible sources
  const { sessionClaims, user } = auth();
  const userRole = sessionClaims?.role || user?.publicMetadata?.role;

  // If no role is found or role is not client, redirect to appropriate page
  if (!userRole) {
    console.error('No role found for user:', userId);
    redirect('/sign-in');
  }

  if (userRole !== 'client') {
    redirect('/crm');
  }

  return (
    <ClientPortalProvider>
      <ClientPortalShell>
        <Suspense fallback={<BrandLoadingScreen />}>
          {children}
        </Suspense>
      </ClientPortalShell>
    </ClientPortalProvider>
  );
} 