'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Mail, Printer, Share2, CheckCircle2 } from 'lucide-react';

// Mock invoice data - replace with actual data fetching
const mockInvoice = {
  id: 'INV-2024-001',
  client: {
    name: 'Client A',
    email: 'client.a@example.com',
    address: '123 Business St, Suite 100, City, State 12345',
  },
  issueDate: '2024-03-01',
  dueDate: '2024-03-15',
  status: 'pending',
  items: [
    {
      description: 'Website Design',
      quantity: 1,
      rate: 2500.00,
      amount: 2500.00,
    },
    {
      description: 'Logo Design',
      quantity: 1,
      rate: 1000.00,
      amount: 1000.00,
    },
  ],
  subtotal: 3500.00,
  tax: 0,
  total: 3500.00,
};

export default function InvoiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkAsPaid = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement mark as paid logic
      console.log('Marking invoice as paid:', params.id);
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendInvoice = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement send invoice logic
      console.log('Sending invoice:', params.id);
    } catch (error) {
      console.error('Error sending invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice {mockInvoice.id}</h1>
          <p className="text-muted-foreground">View and manage invoice details.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button onClick={handleSendInvoice} disabled={isLoading}>
            <Mail className="mr-2 h-4 w-4" />
            Send Invoice
          </Button>
          {mockInvoice.status === 'pending' && (
            <Button onClick={handleMarkAsPaid} disabled={isLoading} variant="default">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd className="text-sm">{mockInvoice.client.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="text-sm">{mockInvoice.client.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Address</dt>
                <dd className="text-sm">{mockInvoice.client.address}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Issue Date</dt>
                <dd className="text-sm">{mockInvoice.issueDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Due Date</dt>
                <dd className="text-sm">{mockInvoice.dueDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                <dd className="text-sm capitalize">{mockInvoice.status}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Rate</th>
                  <th className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoice.items.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">${item.rate.toFixed(2)}</td>
                    <td className="px-6 py-4">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="border-t-2">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">Subtotal</td>
                  <td className="px-6 py-4">${mockInvoice.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">Tax</td>
                  <td className="px-6 py-4">${mockInvoice.tax.toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium">Total</td>
                  <td className="px-6 py-4 font-bold">${mockInvoice.total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 