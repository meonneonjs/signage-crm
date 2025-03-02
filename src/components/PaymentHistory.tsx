'use client';

import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from '@tremor/react';
import { format } from 'date-fns';

interface Payment {
  id: string;
  amount: number;
  paidAt: Date;
  year: number;
  month: number;
  notes?: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export default function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Payment Date</TableHeaderCell>
          <TableHeaderCell>Period</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
          <TableHeaderCell>Notes</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>
              {format(new Date(payment.paidAt), 'MMM d, yyyy')}
            </TableCell>
            <TableCell>
              {format(new Date(payment.year, payment.month - 1), 'MMMM yyyy')}
            </TableCell>
            <TableCell>${payment.amount.toFixed(2)}</TableCell>
            <TableCell>{payment.notes || '-'}</TableCell>
          </TableRow>
        ))}
        {payments.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              <Text>No payment history found</Text>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
} 