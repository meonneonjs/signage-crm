import { ClientForm } from '../ClientForm';
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function NewClientPage() {
  const session = await getAuthSession();
  if (!session?.userId) {
    redirect('/sign-in');
  }

  const handleCreateClient = async (data: any) => {
    'use server';
    
    const session = await getAuthSession();
    if (!session?.userId) {
      throw new Error('Unauthorized');
    }

    await prisma.customer.create({
      data
    });
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-3xl font-bold">New Client</h1>
      <ClientForm onSubmit={handleCreateClient} />
    </div>
  );
} 