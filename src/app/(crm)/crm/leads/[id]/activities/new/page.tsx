import { Title } from '@tremor/react';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import ActivityForm from '../ActivityForm';

interface Props {
  params: {
    id: string;
  };
}

async function createActivity(leadId: string, data: {
  type: string;
  title: string;
  description?: string;
  scheduledAt?: Date;
}) {
  'use server';
  
  await prisma.leadActivity.create({
    data: {
      ...data,
      leadId,
      userId: 'placeholder', // TODO: Replace with actual user ID from auth
    },
  });

  redirect(`/dashboard/leads/${leadId}`);
}

export default async function NewActivityPage({ params }: Props) {
  const handleSubmit = async (data: {
    type: string;
    title: string;
    description?: string;
    scheduledAt?: Date;
  }) => {
    'use server';
    await createActivity(params.id, data);
  };

  return (
    <div className="space-y-6">
      <Title>Add Activity</Title>
      <ActivityForm
        leadId={params.id}
        onSubmit={handleSubmit}
      />
    </div>
  );
} 