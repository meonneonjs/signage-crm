'use client';

import { InvoiceForm } from '@/components/finance/InvoiceForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewInvoicePage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Invoice</h1>
        <p className="text-muted-foreground">Create a new invoice and send it to your client.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceForm />
        </CardContent>
      </Card>
    </div>
  );
} 