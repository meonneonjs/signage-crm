import { prisma } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = await request.formData();
    const projectId = data.get('projectId') as string;
    const message = data.get('message') as string;

    if (!projectId || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a new deal activity for the message
    const activity = await prisma.dealActivity.create({
      data: {
        type: 'FACTORY_CHAT',
        title: 'Chat Message',
        description: message,
        deal: {
          connect: {
            projectId: projectId,
          },
        },
        user: {
          connect: {
            id: session.userId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    return Response.json(activity);
  } catch (error) {
    console.error('Error sending message:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 