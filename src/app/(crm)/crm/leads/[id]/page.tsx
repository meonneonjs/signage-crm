import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
  Card,
  Title,
  Text,
  Badge,
  Button,
  Grid,
  List,
  ListItem,
} from '@tremor/react';
import {
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

interface Props {
  params: {
    id: string;
  };
}

async function getLeadDetails(id: string) {
  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      activities: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!lead) {
    notFound();
  }

  return lead;
}

function getStatusColor(status: string) {
  const colors = {
    NEW: 'gray',
    CONTACTED: 'yellow',
    QUALIFIED: 'green',
    UNQUALIFIED: 'red',
    PROPOSAL_SENT: 'purple',
    CONVERTED: 'blue',
    LOST: 'red',
  } as const;
  return colors[status as keyof typeof colors] || 'gray';
}

function getPriorityColor(priority: string) {
  const colors = {
    LOW: 'gray',
    MEDIUM: 'yellow',
    HIGH: 'red',
  } as const;
  return colors[priority as keyof typeof colors] || 'gray';
}

function formatSource(source: string) {
  return source.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

export default async function LeadPage({ params }: Props) {
  const lead = await getLeadDetails(params.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <Title>{lead.contactName}</Title>
          {lead.companyName && (
            <Text className="text-gray-500">{lead.companyName}</Text>
          )}
          <div className="flex space-x-4 mt-2">
            {lead.email && (
              <Link
                href={`mailto:${lead.email}`}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <EnvelopeIcon className="h-5 w-5 mr-1" />
                {lead.email}
              </Link>
            )}
            {lead.phone && (
              <Link
                href={`tel:${lead.phone}`}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <PhoneIcon className="h-5 w-5 mr-1" />
                {lead.phone}
              </Link>
            )}
          </div>
        </div>
        <Link href={`/dashboard/leads/${params.id}/edit`}>
          <Button icon={PencilIcon}>Edit Lead</Button>
        </Link>
      </div>

      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card>
          <Title>Status</Title>
          <Badge
            color={getStatusColor(lead.status)}
            className="mt-2"
          >
            {lead.status.replace('_', ' ')}
          </Badge>
        </Card>
        <Card>
          <Title>Priority</Title>
          <Badge
            color={getPriorityColor(lead.priority)}
            className="mt-2"
          >
            {lead.priority}
          </Badge>
        </Card>
        <Card>
          <Title>Source</Title>
          <Text className="mt-2">{formatSource(lead.source)}</Text>
        </Card>
        <Card>
          <Title>Assigned To</Title>
          {lead.assignedTo ? (
            <div className="mt-2">
              <Text className="font-medium">{lead.assignedTo.name}</Text>
              <Text className="text-gray-500">{lead.assignedTo.email}</Text>
            </div>
          ) : (
            <Badge color="gray" className="mt-2">Unassigned</Badge>
          )}
        </Card>
      </Grid>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Requirements */}
          <Card>
            <Title>Requirements</Title>
            <Text className="mt-2">
              {lead.requirements || 'No requirements specified'}
            </Text>
          </Card>

          {/* Notes */}
          <Card>
            <Title>Notes</Title>
            <Text className="mt-2">
              {lead.notes || 'No notes added'}
            </Text>
          </Card>

          {/* Activities */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <Title>Activities</Title>
              <Link href={`/dashboard/leads/${params.id}/activities/new`}>
                <Button variant="light">Add Activity</Button>
              </Link>
            </div>
            {lead.activities.length === 0 ? (
              <Text>No activities recorded yet.</Text>
            ) : (
              <List>
                {lead.activities.map((activity) => (
                  <ListItem key={activity.id}>
                    <div>
                      <Text className="font-medium">{activity.title}</Text>
                      {activity.description && (
                        <Text className="text-gray-500 mt-1">
                          {activity.description}
                        </Text>
                      )}
                      <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                        <span>{activity.type}</span>
                        <span>by {activity.user.name || activity.user.email}</span>
                        <span>{new Date(activity.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          {/* Location */}
          <Card>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5 text-gray-500" />
              <Title>Location</Title>
            </div>
            {lead.address ? (
              <div className="mt-2 space-y-1">
                <Text>{lead.address}</Text>
                <Text>
                  {[lead.city, lead.state, lead.zipCode]
                    .filter(Boolean)
                    .join(', ')}
                </Text>
              </div>
            ) : (
              <Text className="mt-2">No location specified</Text>
            )}
          </Card>

          {/* Budget & Timeline */}
          <Card>
            <Title>Budget & Timeline</Title>
            <div className="mt-2 space-y-2">
              <div>
                <Text className="font-medium">Budget</Text>
                <Text>
                  {lead.budget
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(lead.budget)
                    : 'Not specified'}
                </Text>
              </div>
              <div>
                <Text className="font-medium">Timeline</Text>
                <Text>
                  {lead.timeline
                    ? new Date(lead.timeline).toLocaleDateString()
                    : 'Not specified'}
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 