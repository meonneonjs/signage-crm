'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus } from 'lucide-react';

// Mock data - replace with actual data fetching
const mockInvoices = [
  {
    id: 'INV-2024-001',
    date: 'Mar 1, 2024',
    dueDate: 'Mar 15, 2024',
    amount: 3500.00,
    status: 'paid',
  },
  {
    id: 'INV-2024-002',
    date: 'Mar 5, 2024',
    dueDate: 'Mar 20, 2024',
    amount: 2800.00,
    status: 'pending',
  },
  {
    id: 'INV-2024-003',
    date: 'Feb 15, 2024',
    dueDate: 'Mar 1, 2024',
    amount: 1500.00,
    status: 'overdue',
  },
];

interface ClientInvoicesProps {
  clientId: string;
}

export function ClientInvoices({ clientId }: ClientInvoicesProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>View and manage client invoices</CardDescription>
        </div>
        <Link href={`/crm/finance/invoices/new?client=${clientId}`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <Link
              key={invoice.id}
              href={`/crm/finance/invoices/${invoice.id}`}
              className="block"
            >
              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <FileText className="h-4 w-4" />
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">
                      Due {invoice.dueDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                  <p className={`text-sm ${
                    invoice.status === 'paid'
                      ? 'text-green-600'
                      : invoice.status === 'pending'
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 