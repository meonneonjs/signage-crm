import { Title } from '@tremor/react';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import LeadForm from '../LeadForm';

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

async function createLead(data: {
  companyName?: string;
  contactName: string;
  email: string;
  phone?: string;
  source: string;
  priority: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  budget?: number;
  timeline?: Date;
  requirements?: string;
  notes?: string;
  assignedToId?: string;
}) {
  'use server';
  
  await prisma.lead.create({
    data: {
      ...data,
      status: 'NEW',
    },
  });

  redirect('/dashboard/leads');
}

export default async function NewLeadPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <Title>New Lead</Title>
      <LeadForm
        users={users}
        onSubmit={createLead}
      />
    </div>
  );
} 