import { notFound, redirect } from 'next/navigation';
import { Title } from '@tremor/react';
import { prisma } from '@/lib/db';
import LeadForm from '../../LeadForm';

interface Props {
  params: {
    id: string;
  };
}

async function getLead(id: string) {
  const lead = await prisma.lead.findUnique({
    where: { id },
    select: {
      id: true,
      companyName: true,
      contactName: true,
      email: true,
      phone: true,
      source: true,
      priority: true,
      address: true,
      city: true,
      state: true,
      zipCode: true,
      budget: true,
      timeline: true,
      requirements: true,
      notes: true,
      assignedToId: true,
    },
  });

  if (!lead) {
    notFound();
  }

  return lead;
}

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

async function updateLead(id: string, data: {
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
  
  await prisma.lead.update({
    where: { id },
    data,
  });

  redirect('/dashboard/leads');
}

export default async function EditLeadPage({ params }: Props) {
  const [lead, users] = await Promise.all([
    getLead(params.id),
    getUsers(),
  ]);

  const handleSubmit = async (data: {
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
  }) => {
    'use server';
    await updateLead(params.id, data);
  };

  return (
    <div className="space-y-6">
      <Title>Edit Lead</Title>
      <LeadForm
        initialData={lead}
        users={users}
        onSubmit={handleSubmit}
        isEdit
      />
    </div>
  );
} 