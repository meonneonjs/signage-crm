'use client';

import { ReactNode } from 'react';
import { useClientPortal } from '@/contexts/ClientPortalContext';
import { ClientPortalHeader } from '@/components/client-portal/ClientPortalHeader';
import { ClientPortalSidebar } from '@/components/client-portal/ClientPortalSidebar';

interface ClientPortalShellProps {
  children: ReactNode;
}

export function ClientPortalShell({ children }: ClientPortalShellProps) {
  const { branding, isLoading } = useClientPortal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <ClientPortalHeader />
      <div className="flex">
        <ClientPortalSidebar />
        <main 
          className="flex-1 p-6"
          style={{
            '--primary-color': branding.primaryColor,
            '--secondary-color': branding.secondaryColor,
          } as React.CSSProperties}
        >
          {children}
        </main>
      </div>
    </div>
  );
} 