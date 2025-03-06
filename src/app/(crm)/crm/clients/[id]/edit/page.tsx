import { ClientForm } from '../../ClientForm';
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function EditClientPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session?.userId) {
    redirect('/sign-in');
  }

  const client = await prisma.customer.findUnique({
    where: {
      id: params.id
    }
  });

  if (!client) {
    redirect('/dashboard/clients');
  }

  const handleUpdateClient = async (data: any) => {
    'use server';
    
    const session = await getAuthSession();
    if (!session?.userId) {
      throw new Error('Unauthorized');
    }

    await prisma.customer.update({
      where: {
        id: params.id
      },
      data
    });
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Edit Client</h1>
      <ClientForm 
        initialData={client}
        onSubmit={handleUpdateClient}
        isEdit
      />
    </div>
  );
} 