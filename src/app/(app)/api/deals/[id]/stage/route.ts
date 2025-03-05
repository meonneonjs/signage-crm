import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const dealId = url.pathname.split('/')[3];

    if (!dealId) {
      return new Response('Deal ID is required', { status: 400 });
    }

    const body = await request.json();
    const { stage } = body;

    if (!stage) {
      return new Response('Stage is required', { status: 400 });
    }

    const deal = await prisma.deal.update({
      where: {
        id: dealId
      },
      data: {
        stage,
        activities: {
          create: {
            type: 'STAGE_CHANGE',
            title: 'Stage Updated',
            description: `Deal stage updated to ${stage}`,
            userId: session.userId
          }
        }
      },
      include: {
        activities: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    return Response.json(deal);
  } catch (error) {
    console.error('Error updating deal stage:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 