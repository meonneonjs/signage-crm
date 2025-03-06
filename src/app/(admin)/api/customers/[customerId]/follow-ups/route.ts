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

    const followUps = await prisma.followUp.findMany({
      where: {
        customerId: customerId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(followUps);
  } catch (error) {
    console.error('Error fetching follow-ups:', error);
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
    const { type, notes, dueDate, status } = body;

    if (!type || !notes || !dueDate) {
      return new Response('Type, notes, and due date are required', { status: 400 });
    }

    const followUp = await prisma.followUp.create({
      data: {
        type,
        notes,
        dueDate: new Date(dueDate),
        status: status || 'PENDING',
        customerId
      }
    });

    return Response.json(followUp);
  } catch (error) {
    console.error('Error creating follow-up:', error);
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
    const followUpId = url.searchParams.get('id');

    if (!customerId || !followUpId) {
      return new Response('Customer ID and Follow-up ID are required', { status: 400 });
    }

    const body = await request.json();
    const { type, notes, dueDate, status } = body;

    const followUp = await prisma.followUp.update({
      where: {
        id: followUpId,
        customerId: customerId
      },
      data: {
        ...(type && { type }),
        ...(notes && { notes }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(status && { status })
      }
    });

    return Response.json(followUp);
  } catch (error) {
    console.error('Error updating follow-up:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 