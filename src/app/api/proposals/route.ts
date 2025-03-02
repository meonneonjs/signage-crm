import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      content, 
      totalAmount, 
      validUntil, 
      customerId, 
      contactId,
      dealId 
    } = body;

    if (!title || !content || !totalAmount || !customerId) {
      return new Response('Missing required fields', { status: 400 });
    }

    const proposal = await prisma.proposal.create({
      data: {
        title,
        content,
        totalAmount,
        validUntil: validUntil ? new Date(validUntil) : undefined,
        customerId,
        contactId,
        dealId
      },
      include: {
        customer: true,
        contact: true,
        deal: true
      }
    });

    return Response.json(proposal);
  } catch (error) {
    console.error('Error creating proposal:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const customerId = searchParams.get('customerId');
    const contactId = searchParams.get('contactId');
    const dealId = searchParams.get('dealId');

    const proposals = await prisma.proposal.findMany({
      where: {
        ...(customerId && { customerId }),
        ...(contactId && { contactId }),
        ...(dealId && { dealId })
      },
      include: {
        customer: true,
        contact: true,
        deal: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 