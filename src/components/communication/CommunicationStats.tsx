import { Card, Grid, Text, Metric } from '@tremor/react';
import { Communication, CommunicationType } from '@prisma/client';

interface ExtendedCommunication extends Communication {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

interface CommunicationStatsProps {
  communications: ExtendedCommunication[];
}

export function CommunicationStats({ communications }: CommunicationStatsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const stats = {
    total: communications.length,
    today: communications.filter(c => {
      const commDate = new Date(c.createdAt);
      return commDate >= today;
    }).length,
    byType: {
      email: communications.filter(c => c.type === 'EMAIL').length,
      sms: communications.filter(c => c.type === 'SMS').length,
      call: communications.filter(c => c.type === 'CALL').length,
      meeting: communications.filter(c => c.type === 'MEETING').length,
    },
    pending: communications.filter(c => 
      c.status === 'PENDING' || 
      (c.scheduledAt && new Date(c.scheduledAt) > new Date())
    ).length
  };

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={5} className="gap-6">
      <Card>
        <Text>Total Communications</Text>
        <Metric>{stats.total}</Metric>
      </Card>
      <Card>
        <Text>Today's Communications</Text>
        <Metric>{stats.today}</Metric>
      </Card>
      <Card>
        <Text>Emails</Text>
        <Metric>{stats.byType.email}</Metric>
      </Card>
      <Card>
        <Text>SMS/Calls</Text>
        <Metric>{stats.byType.sms + stats.byType.call}</Metric>
      </Card>
      <Card>
        <Text>Pending/Scheduled</Text>
        <Metric>{stats.pending}</Metric>
      </Card>
    </Grid>
  );
} 