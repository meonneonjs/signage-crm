import { Title, Text, Grid, Card, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { CommunicationList } from '@/components/communication/CommunicationList';
import { CommunicationComposer } from '@/components/communication/CommunicationComposer';
import { CommunicationStats } from '@/components/communication/CommunicationStats';

async function getCommunicationData() {
  const communications = await prisma.communication.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    }
  });

  const clients = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
    },
    orderBy: { name: 'asc' }
  });

  return {
    communications,
    clients
  };
}

export default async function CommunicationPage() {
  const session = await currentUser();
  if (!session) {
    redirect('/sign-in');
  }

  const { communications, clients } = await getCommunicationData();

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <Title>Communications</Title>
          <Text>Manage all client communications in one place</Text>
        </div>
      </div>

      {/* Communication Statistics */}
      <CommunicationStats communications={communications} />

      <TabGroup>
        <TabList className="mt-8">
          <Tab>Recent Communications</Tab>
          <Tab>New Communication</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <div className="mt-6">
              <CommunicationList communications={communications} />
            </div>
          </TabPanel>
          
          <TabPanel>
            <Card className="mt-6">
              <CommunicationComposer clients={clients} />
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 