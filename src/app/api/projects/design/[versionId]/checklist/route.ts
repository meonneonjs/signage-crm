import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const url = new URL(request.url);
    const versionId = url.pathname.split('/')[4];

    if (!versionId) {
      return new Response('Version ID is required', { status: 400 });
    }

    const body = await request.json();
    const { items } = body;

    if (!items || !Array.isArray(items)) {
      return new Response('Items array is required', { status: 400 });
    }

    // Update each checklist item
    const updates = items.map(item => 
      prisma.designChecklistItem.upsert({
        where: {
          id: item.id || 'new',
          designVersionId: versionId
        },
        create: {
          title: item.title,
          completed: item.completed || false,
          designVersion: {
            connect: {
              id: versionId
            }
          }
        },
        update: {
          title: item.title,
          completed: item.completed
        }
      })
    );

    await prisma.$transaction(updates);

    // Fetch updated checklist
    const checklist = await prisma.designChecklistItem.findMany({
      where: {
        designVersionId: versionId
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return Response.json(checklist);
  } catch (error) {
    console.error('Error updating design checklist:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 