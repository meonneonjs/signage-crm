import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const customerId = url.pathname.split('/')[3];

    if (!customerId) {
      return new Response('Customer ID is required', { status: 400 });
    }

    const customer = await prisma.customer.findUnique({
      where: {
        id: customerId
      },
      include: {
        contacts: true,
        reviews: true,
        followUps: true,
        projects: {
          include: {
            activities: true
          }
        }
      }
    });

    if (!customer) {
      return new Response('Customer not found', { status: 404 });
    }

    return Response.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const customerId = url.pathname.split('/')[3];

    if (!customerId) {
      return new Response('Customer ID is required', { status: 400 });
    }

    const body = await request.json();
    const { businessName, industry, referralSource, notes } = body;

    const customer = await prisma.customer.update({
      where: {
        id: customerId
      },
      data: {
        ...(businessName && { businessName }),
        ...(industry && { industry }),
        ...(referralSource && { referralSource }),
        ...(notes && { notes })
      }
    });

    return Response.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const customerId = url.pathname.split('/')[3];

    if (!customerId) {
      return new Response('Customer ID is required', { status: 400 });
    }

    await prisma.customer.delete({
      where: {
        id: customerId
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 