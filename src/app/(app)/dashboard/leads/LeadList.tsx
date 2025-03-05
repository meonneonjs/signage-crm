import Link from 'next/link';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from '@tremor/react';
import { PencilIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { LeadPriority, LeadSource, LeadStatus } from '@prisma/client';

interface Lead {
  id: string;
  companyName: string | null;
  contactName: string;
  email: string;
  phone: string | null;
  source: LeadSource;
  status: LeadStatus;
  priority: LeadPriority;
  createdAt: Date;
  assignedTo: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  activities: {
    id: string;
    type: string;
    createdAt: Date;
  }[];
  _count: {
    activities: number;
  };
}

function getStatusColor(status: LeadStatus) {
  const colors = {
    NEW: 'gray',
    CONTACTED: 'yellow',
    QUALIFIED: 'green',
    UNQUALIFIED: 'red',
    PROPOSAL_SENT: 'purple',
    CONVERTED: 'blue',
    LOST: 'red',
  } as const;
  return colors[status];
}

function getPriorityColor(priority: LeadPriority) {
  const colors = {
    LOW: 'gray',
    MEDIUM: 'yellow',
    HIGH: 'red',
  } as const;
  return colors[priority];
}

function formatSource(source: LeadSource) {
  return source.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
}

export default function LeadList({ leads }: { leads: Lead[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Contact</TableHeaderCell>
          <TableHeaderCell>Source</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Priority</TableHeaderCell>
          <TableHeaderCell>Assigned To</TableHeaderCell>
          <TableHeaderCell>Last Activity</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leads.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No leads found. Add your first lead to get started.
            </TableCell>
          </TableRow>
        ) : (
          leads.map((lead) => {
            const lastActivity = lead.activities[0];
            
            return (
              <TableRow key={lead.id}>
                <TableCell>
                  <div>
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="font-medium text-indigo-600 hover:text-indigo-900"
                    >
                      {lead.contactName}
                    </Link>
                    {lead.companyName && (
                      <div className="text-sm text-gray-500">{lead.companyName}</div>
                    )}
                    <div className="flex space-x-2 mt-1">
                      {lead.email && (
                        <Link
                          href={`mailto:${lead.email}`}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <EnvelopeIcon className="h-4 w-4" />
                        </Link>
                      )}
                      {lead.phone && (
                        <Link
                          href={`tel:${lead.phone}`}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <PhoneIcon className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge color="gray">
                    {formatSource(lead.source)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={getStatusColor(lead.status)}>
                    {lead.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge color={getPriorityColor(lead.priority)}>
                    {lead.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lead.assignedTo ? (
                    <div className="text-sm">
                      <div className="font-medium">{lead.assignedTo.name}</div>
                      <div className="text-gray-500">{lead.assignedTo.email}</div>
                    </div>
                  ) : (
                    <Badge color="gray">Unassigned</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {lastActivity ? (
                    <div className="text-sm">
                      <div className="font-medium">{lastActivity.type}</div>
                      <div className="text-gray-500">
                        {new Date(lastActivity.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">No activity</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-3">
                    <Link
                      href={`/dashboard/leads/${lead.id}/edit`}
                      className="text-gray-600 hover:text-indigo-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
} 