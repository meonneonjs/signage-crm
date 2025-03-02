import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Card, Title, Text } from '@tremor/react';
import AddButton from '@/components/AddButton';
import LeadList from './LeadList';
import type { Lead } from '@prisma/client';

export const dynamic = 'force-dynamic';

async function getLeads() {
  try {
    return await prisma.lead.findMany({
      include: {
        assignedTo: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return []
  }
}

async function getLeadStats() {
  try {
    const stats = await prisma.lead.groupBy({
      by: ['status'],
      _count: true,
    })
    return stats
  } catch (error) {
    console.error('Error fetching lead stats:', error)
    return []
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title>Leads</Title>
          <Text>Manage your sales pipeline</Text>
        </div>
        <AddButton href="/dashboard/leads/new">Add Lead</AddButton>
      </div>

      <Card>
        <LeadList leads={leads} />
      </Card>
    </div>
  );
} 