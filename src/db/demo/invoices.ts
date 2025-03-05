export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  projectId: string;
  number: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}

export const demoInvoices: Invoice[] = [
  {
    id: 'i1',
    clientId: 'c1',
    projectId: 'p1',
    number: 'INV-2024-001',
    status: 'sent',
    issueDate: '2024-02-15T00:00:00Z',
    dueDate: '2024-03-15T00:00:00Z',
    items: [
      {
        id: 'item1',
        description: 'Brand Strategy & Research',
        quantity: 1,
        rate: 3000,
        amount: 3000
      },
      {
        id: 'item2',
        description: 'Logo Design & Iterations',
        quantity: 1,
        rate: 2500,
        amount: 2500
      }
    ],
    subtotal: 5500,
    tax: 440,
    total: 5940,
    notes: 'First installment for brand refresh project'
  },
  {
    id: 'i2',
    clientId: 'c2',
    projectId: 'p2',
    number: 'INV-2024-002',
    status: 'draft',
    issueDate: '2024-03-01T00:00:00Z',
    dueDate: '2024-03-31T00:00:00Z',
    items: [
      {
        id: 'item3',
        description: 'Campaign Strategy Development',
        quantity: 1,
        rate: 5000,
        amount: 5000
      },
      {
        id: 'item4',
        description: 'Initial Design Concepts',
        quantity: 1,
        rate: 3500,
        amount: 3500
      }
    ],
    subtotal: 8500,
    tax: 680,
    total: 9180,
    notes: 'Initial payment for product launch campaign'
  }
]; 