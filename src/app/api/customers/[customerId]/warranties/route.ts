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

    const warranties = await prisma.warranty.findMany({
      where: {
        project: {
          customerId: customerId
        }
      },
      include: {
        project: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(warranties);
  } catch (error) {
    console.error('Error fetching warranties:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
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
    const { projectId, type, startDate, endDate, description } = body;

    if (!projectId || !type || !startDate || !endDate) {
      return new Response('Project ID, type, start date, and end date are required', { status: 400 });
    }

    const warranty = await prisma.warranty.create({
      data: {
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description,
        status: 'ACTIVE',
        project: {
          connect: {
            id: projectId
          }
        }
      },
      include: {
        project: true
      }
    });

    return Response.json(warranty);
  } catch (error) {
    console.error('Error creating warranty:', error);
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
    const warrantyId = url.searchParams.get('id');

    if (!customerId || !warrantyId) {
      return new Response('Customer ID and Warranty ID are required', { status: 400 });
    }

    const body = await request.json();
    const { type, startDate, endDate, description, status } = body;

    const warranty = await prisma.warranty.update({
      where: {
        id: warrantyId,
        project: {
          customerId: customerId
        }
      },
      data: {
        ...(type && { type }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(description && { description }),
        ...(status && { status })
      },
      include: {
        project: true
      }
    });

    return Response.json(warranty);
  } catch (error) {
    console.error('Error updating warranty:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 