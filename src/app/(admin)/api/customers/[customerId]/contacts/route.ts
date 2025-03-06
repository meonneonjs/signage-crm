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

    const contacts = await prisma.contact.findMany({
      where: {
        customerId: customerId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
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
    const { firstName, lastName, email, phone, isPrimary } = body;

    if (!firstName || !lastName || !email) {
      return new Response('First name, last name, and email are required', { status: 400 });
    }

    // If this is a primary contact, update all other contacts to non-primary
    if (isPrimary) {
      await prisma.contact.updateMany({
        where: {
          customerId: customerId,
          isPrimary: true
        },
        data: {
          isPrimary: false
        }
      });
    }

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        isPrimary: isPrimary || false,
        customerId
      }
    });

    return Response.json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 