import { Metadata } from 'next';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { UserRole } from '@/types/roles';
import CRMLayoutClient from './CRMLayoutClient';

export const metadata: Metadata = {
  title: {
    template: '%s | AtellierCRM',
    default: 'CRM Dashboard | AtellierCRM'
  },
  description: 'AtellierCRM - Manage your creative business',
};

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { userId, sessionId } = auth();

    // Only check for authentication
    if (!userId || !sessionId) {
      redirect('/sign-in');
    }

    // For now, give all authenticated users manager access
    const userRole: UserRole = 'manager';

    return <CRMLayoutClient userRole={userRole}>{children}</CRMLayoutClient>;
  } catch (error) {
    console.error('Authentication error:', error);
    redirect('/sign-in');
  }
} 