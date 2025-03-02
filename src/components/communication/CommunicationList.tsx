"use client";

import { useState } from 'react';
import { Card, Title, Text, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Select, SelectItem } from '@tremor/react';
import { Communication, CommunicationType } from '@prisma/client';
import { format } from 'date-fns';
import { EnvelopeIcon, PhoneIcon, CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

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

interface CommunicationListProps {
  communications: ExtendedCommunication[];
}

function getTypeIcon(type: CommunicationType) {
  const icons = {
    EMAIL: EnvelopeIcon,
    SMS: ChatBubbleLeftIcon,
    CALL: PhoneIcon,
    MEETING: CalendarIcon
  };
  const Icon = icons[type];
  return <Icon className="h-5 w-5" />;
}

function getStatusColor(status: string) {
  const colors = {
    SENT: 'green',
    PENDING: 'yellow',
    FAILED: 'red',
    SCHEDULED: 'blue',
    DRAFT: 'gray'
  } as const;
  return colors[status as keyof typeof colors] || 'gray';
}

export function CommunicationList({ communications }: CommunicationListProps) {
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredCommunications = communications.filter(comm => {
    if (typeFilter !== 'ALL' && comm.type !== typeFilter) return false;
    if (statusFilter !== 'ALL' && comm.status !== statusFilter) return false;
    return true;
  });

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <Title>Communication History</Title>
        <div className="flex space-x-4">
          <Select
            value={typeFilter}
            onValueChange={setTypeFilter}
            placeholder="Filter by type"
          >
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="EMAIL">Email</SelectItem>
            <SelectItem value="SMS">SMS</SelectItem>
            <SelectItem value="CALL">Call</SelectItem>
            <SelectItem value="MEETING">Meeting</SelectItem>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            placeholder="Filter by status"
          >
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="SENT">Sent</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="SCHEDULED">Scheduled</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
          </Select>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Client</TableHeaderCell>
            <TableHeaderCell>Subject/Content</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Sent By</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCommunications.map((comm) => (
            <TableRow key={comm.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getTypeIcon(comm.type)}
                  <Text>{comm.type}</Text>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <Text className="font-medium">{comm.client.name}</Text>
                  <Text className="text-sm text-gray-500">{comm.client.email}</Text>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {comm.subject && (
                    <Text className="font-medium">{comm.subject}</Text>
                  )}
                  <Text className="text-sm text-gray-500 truncate max-w-md">
                    {comm.content}
                  </Text>
                </div>
              </TableCell>
              <TableCell>
                <Badge color={getStatusColor(comm.status)}>
                  {comm.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <Text>{format(new Date(comm.createdAt), 'MMM d, yyyy')}</Text>
                  <Text className="text-sm text-gray-500">
                    {format(new Date(comm.createdAt), 'h:mm a')}
                  </Text>
                </div>
              </TableCell>
              <TableCell>
                <Text>{comm.user.name || comm.user.email}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
} 