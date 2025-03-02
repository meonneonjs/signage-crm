import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Button } from '@tremor/react';
import type { Customer, Contact, Deal } from '@prisma/client';

interface ProposalWithRelations {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: {
    introduction: string;
    scope: string;
    pricing: {
      items: Array<{
        description: string;
        quantity: number;
        unitPrice: number;
      }>;
      subtotal: number;
      tax: number;
      total: number;
    };
    terms: string;
  };
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'VIEWED' | 'SIGNED' | 'EXPIRED' | 'DECLINED';
  validUntil: Date | null;
  signedAt: Date | null;
  signedBy: string | null;
  paymentStatus: 'PENDING' | 'PAID' | 'VOID' | 'FAILED' | 'REFUNDED';
  paidAt: Date | null;
  customerId: string;
  contactId: string | null;
  dealId: string | null;
  customer: Customer;
  contact: Contact | null;
  deal: Deal | null;
}

export default async function ProposalsPage() {
  const session = await getAuthSession();
  if (!session?.userId) {
    redirect('/sign-in');
  }

  const proposals = await prisma.proposal.findMany({
    include: {
      customer: true,
      contact: true,
      deal: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) as ProposalWithRelations[];

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Proposals</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proposals.map((proposal: ProposalWithRelations) => (
                <tr key={proposal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/dashboard/customers/${proposal.customerId}/proposals/${proposal.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {proposal.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/dashboard/customers/${proposal.customerId}`}
                      className="text-gray-900 hover:text-gray-600"
                    >
                      {proposal.customer.businessName}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proposal.contact ? (
                      `${proposal.contact.firstName} ${proposal.contact.lastName}`
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(proposal.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      proposal.status === 'SIGNED' ? 'bg-green-100 text-green-800' :
                      proposal.status === 'SENT' ? 'bg-blue-100 text-blue-800' :
                      proposal.status === 'EXPIRED' ? 'bg-red-100 text-red-800' :
                      proposal.status === 'DECLINED' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {proposal.validUntil ? new Date(proposal.validUntil).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/customers/${proposal.customerId}/proposals/${proposal.id}`}
                      >
                        <Button variant="secondary" size="sm">
                          View
                        </Button>
                      </Link>
                      {proposal.status === 'DRAFT' && (
                        <Link
                          href={`/dashboard/customers/${proposal.customerId}/proposals/${proposal.id}/edit`}
                        >
                          <Button size="sm">
                            Edit
                          </Button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 