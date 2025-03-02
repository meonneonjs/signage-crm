'use client';

import { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Text,
} from '@tremor/react';
import { format } from 'date-fns';

interface Commission {
  id: string;
  projectId: string;
  amount: number;
  type: string;
  percentage: number;
  status: string;
  createdAt: Date;
  paidAt?: Date;
  project: {
    name: string;
    client: {
      name: string;
    };
  };
}

interface CommissionHistoryProps {
  commissions: Commission[];
}

export default function CommissionHistory({ commissions }: CommissionHistoryProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Project</TableHeaderCell>
          <TableHeaderCell>Client</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Rate</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Paid Date</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {commissions.map((commission) => (
          <TableRow key={commission.id}>
            <TableCell>
              {format(new Date(commission.createdAt), 'MMM d, yyyy')}
            </TableCell>
            <TableCell>{commission.project.name}</TableCell>
            <TableCell>{commission.project.client.name}</TableCell>
            <TableCell>
              <Badge color={commission.type === 'SELF_GENERATED' ? 'blue' : 'green'}>
                {commission.type.replace('_', ' ')}
              </Badge>
            </TableCell>
            <TableCell>{(commission.percentage * 100).toFixed(1)}%</TableCell>
            <TableCell>${commission.amount.toFixed(2)}</TableCell>
            <TableCell>
              <Badge
                color={
                  commission.status === 'PAID'
                    ? 'green'
                    : commission.status === 'PENDING'
                    ? 'yellow'
                    : 'red'
                }
              >
                {commission.status}
              </Badge>
            </TableCell>
            <TableCell>
              {commission.paidAt
                ? format(new Date(commission.paidAt), 'MMM d, yyyy')
                : '-'}
            </TableCell>
          </TableRow>
        ))}
        {commissions.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <Text>No commission history found</Text>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
} 