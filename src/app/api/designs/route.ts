import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const designSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  projectId: z.string().uuid(),
  images: z.array(z.object({
    url: z.string().url(),
    caption: z.string(),
  })),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await req.json();
    const body = designSchema.parse(json);

    const design = await db.design.create({
      data: {
        title: body.title,
        description: body.description,
        projectId: body.projectId,
        submittedById: session.user.id,
        status: 'pending',
        version: 1,
        images: {
          create: body.images,
        },
      },
      include: {
        submittedBy: true,
        images: true,
      },
    });

    return NextResponse.json(design);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const where = {
      ...(projectId && { projectId }),
      ...(status && { status }),
      // Add organization/client filtering based on user's role
      organizationId: session.user.organizationId,
    };

    const [designs, total] = await Promise.all([
      db.design.findMany({
        where,
        include: {
          submittedBy: true,
          images: true,
          project: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.design.count({ where }),
    ]);

    return NextResponse.json({
      designs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 