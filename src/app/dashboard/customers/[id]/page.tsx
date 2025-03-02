"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditIcon, PhoneIcon, MailIcon, Globe } from "lucide-react";
import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface CustomerDetails {
  id: string;
  businessName: string;
  industry: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
}

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: string | null;
  isPrimary: boolean;
}

interface Project {
  id: string;
  name: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
  value: number | null;
}

export default async function CustomerPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();
  if (!session?.userId) {
    redirect('/sign-in');
  }

  const customer = await prisma.customer.findUnique({
    where: {
      id: params.id
    },
    include: {
      contacts: true,
      projects: true,
      reviews: true,
      warranties: true,
      followUps: true
    }
  });

  if (!customer) {
    redirect('/dashboard/customers');
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{customer.businessName}</h1>
        <div className="flex space-x-4">
          <Link href={`/dashboard/customers/${customer.id}/proposals/new`}>
            <Button>Create Proposal</Button>
          </Link>
          <Link href={`/dashboard/customers/${customer.id}/edit`}>
            <Button variant="secondary">Edit Customer</Button>
          </Link>
        </div>
      </div>

      {/* Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Business Details</h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-gray-500">Industry</dt>
              <dd>{customer.industry || 'Not specified'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Website</dt>
              <dd>{customer.website || 'Not specified'}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Address</dt>
              <dd>
                {customer.address ? (
                  <>
                    {customer.address}
                    <br />
                    {customer.city}, {customer.state} {customer.zipCode}
                  </>
                ) : (
                  'Not specified'
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Contacts</h2>
            <Link href={`/dashboard/customers/${customer.id}/contacts/new`}>
              <Button variant="secondary" size="sm">Add Contact</Button>
            </Link>
          </div>
          {customer.contacts.length > 0 ? (
            <ul className="space-y-4">
              {customer.contacts.map((contact) => (
                <li key={contact.id} className="border-b pb-2 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {contact.firstName} {contact.lastName}
                        {contact.isPrimary && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            Primary
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      {contact.phone && (
                        <p className="text-sm text-gray-500">{contact.phone}</p>
                      )}
                    </div>
                    <Link href={`/dashboard/customers/${customer.id}/contacts/${contact.id}/edit`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No contacts added yet.</p>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Link href={`/dashboard/projects/new?customerId=${customer.id}`}>
            <Button variant="secondary" size="sm">New Project</Button>
          </Link>
        </div>
        {customer.projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/dashboard/projects/${project.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {project.budget
                        ? new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          }).format(project.budget)
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No projects yet.</p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <Link href={`/dashboard/customers/${customer.id}/reviews/new`}>
            <Button variant="secondary" size="sm">Add Review</Button>
          </Link>
        </div>
        {customer.reviews.length > 0 ? (
          <ul className="space-y-4">
            {customer.reviews.map((review) => (
              <li key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 15.585l-6.327 3.323 1.209-7.037L.172 7.207l7.046-1.024L10 0l2.782 6.183 7.046 1.024-4.71 4.664 1.209 7.037L10 15.585z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2">{review.content}</p>
                    <p className="text-sm text-gray-500 mt-1">Source: {review.source}</p>
                  </div>
                  <Link href={`/dashboard/customers/${customer.id}/reviews/${review.id}/edit`}>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Warranties Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Warranties</h2>
          <Link href={`/dashboard/customers/${customer.id}/warranties/new`}>
            <Button variant="secondary" size="sm">Add Warranty</Button>
          </Link>
        </div>
        {customer.warranties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.warranties.map((warranty) => (
                  <tr key={warranty.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{warranty.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        warranty.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : warranty.status === 'EXPIRED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {warranty.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(warranty.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(warranty.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/dashboard/customers/${customer.id}/warranties/${warranty.id}/edit`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No warranties yet.</p>
        )}
      </div>
    </div>
  );
} 