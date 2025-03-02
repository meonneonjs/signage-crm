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

    const reviews = await prisma.review.findMany({
      where: {
        customerId: customerId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return Response.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
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
    const { rating, content, source } = body;

    if (!rating || !source) {
      return new Response('Rating and source are required', { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        content,
        source,
        status: 'SUBMITTED',
        submittedAt: new Date(),
        customerId
      }
    });

    return Response.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const customerId = url.pathname.split('/')[3];
    const reviewId = url.searchParams.get('id');

    if (!customerId || !reviewId) {
      return new Response('Customer ID and Review ID are required', { status: 400 });
    }

    const body = await request.json();
    const { rating, content, source, status } = body;

    const review = await prisma.review.update({
      where: {
        id: reviewId,
        customerId: customerId
      },
      data: {
        ...(rating && { rating }),
        ...(content && { content }),
        ...(source && { source }),
        ...(status && { status }),
        updatedAt: new Date()
      }
    });

    return Response.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 