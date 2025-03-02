import { prisma } from '@/lib/db'
import { Title, Text } from '@tremor/react'
import AddButton from '@/components/AddButton'
import { ProjectStatus } from '@prisma/client'
import { ClientWithStats } from './types'
import ClientMetrics from './ClientMetrics'
import ClientAnalytics from './ClientAnalytics'

export const dynamic = 'force-dynamic'

async function getClients(): Promise<ClientWithStats[]> {
  const clients = await prisma.client.findMany({
    include: {
      projects: {
        select: {
          id: true,
          status: true,
          budget: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          projects: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return clients
}

async function getClientStats() {
  const totalClients = await prisma.client.count()
  const activeClients = await prisma.client.count({
    where: {
      projects: {
        some: {
          status: 'IN_PROGRESS' as ProjectStatus
        }
      }
    }
  })
  const totalRevenue = await prisma.project.aggregate({
    _sum: {
      budget: true
    },
    where: {
      status: 'COMPLETED' as ProjectStatus
    }
  })
  
  return {
    totalClients,
    activeClients,
    totalRevenue: totalRevenue._sum?.budget || 0
  }
}

export default async function ClientsPage() {
  const [clients, stats] = await Promise.all([getClients(), getClientStats()])

  // Calculate client engagement metrics
  const clientEngagement = clients.map(client => ({
    name: client.name,
    engagement: client._count.projects * 2
  })).sort((a, b) => b.engagement - a.engagement).slice(0, 5)

  // Calculate revenue by client
  const revenueByClient = clients.map(client => ({
    name: client.name,
    revenue: client.projects.reduce((sum: number, project) => sum + (project.budget || 0), 0)
  })).sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title>Clients</Title>
          <Text>Manage your client relationships and track engagement</Text>
        </div>
        <AddButton href="/dashboard/clients/new">Add Client</AddButton>
      </div>

      <ClientMetrics stats={stats} clients={clients} />
      <ClientAnalytics 
        clients={clients}
        clientEngagement={clientEngagement}
        revenueByClient={revenueByClient}
      />
    </div>
  )
} 