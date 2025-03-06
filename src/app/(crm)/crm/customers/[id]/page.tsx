import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CustomerDetails from './CustomerDetails';

interface CustomerData {
  id: string;
  businessName: string;
  industry: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  contacts: Array<{
  id: string;
  firstName: string;
  lastName: string;
    email: string | null;
  phone: string | null;
    title: string | null;
  isPrimary: boolean;
  }>;
  projects: Array<{
  id: string;
  name: string;
  status: string;
  startDate: string | null;
  endDate: string | null;
    budget: number | null;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
  }>;
  warranties: Array<any>;
  followUps: Array<any>;
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

  // Transform the data to match the expected interface
  const transformedCustomer: CustomerData = {
    id: customer.id,
    businessName: customer.businessName,
    industry: customer.industry,
    website: customer.website,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    zipCode: customer.zipCode,
    contacts: customer.contacts.map(contact => ({
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      title: contact.title,
      isPrimary: contact.isPrimary,
    })),
    projects: customer.projects.map(project => ({
      id: project.id,
      name: project.name,
      status: project.status.toString(),
      startDate: project.startDate?.toISOString() || null,
      endDate: project.endDate?.toISOString() || null,
      budget: project.budget,
    })),
    reviews: customer.reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    })),
    warranties: customer.warranties,
    followUps: customer.followUps,
  };

  return <CustomerDetails customer={transformedCustomer} />;
} 