import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ProposalForm } from '@/components/proposals/ProposalForm';

export default async function EditProposalPage({
  params,
}: {
  params: { id: string; proposalId: string };
}) {
  const session = await getAuthSession();
  if (!session?.userId) {
    redirect('/sign-in');
  }

  const [customer, proposal] = await Promise.all([
    prisma.customer.findUnique({
      where: {
        id: params.id
      },
      include: {
        contacts: true
      }
    }),
    prisma.proposal.findUnique({
      where: {
        id: params.proposalId,
        customerId: params.id
      }
    })
  ]);

  if (!customer || !proposal) {
    redirect('/dashboard/customers');
  }

  const handleUpdateProposal = async (data: any) => {
    'use server';
    
    const session = await getAuthSession();
    if (!session?.userId) {
      throw new Error('Unauthorized');
    }

    await prisma.proposal.update({
      where: {
        id: proposal.id
      },
      data: {
        ...data,
        customerId: customer.id
      }
    });
  };

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Edit Proposal</h1>
      <ProposalForm 
        customer={customer}
        initialData={proposal}
        onSubmit={handleUpdateProposal}
        isEdit
      />
    </div>
  );
} 