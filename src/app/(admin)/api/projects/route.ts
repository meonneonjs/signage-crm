import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { ProjectStatus, TaskStatus, MilestoneStatus, Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as ProjectStatus | null;
    const clientId = searchParams.get('clientId');
    const search = searchParams.get('search');
    
    const where: Prisma.ProjectWhereInput = {};
    
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        client: true,
        tasks: {
          include: {
            assignedTo: true
          }
        },
        milestones: true,
        team: {
          include: {
            user: true
          }
        },
        materials: true,
        deal: {
          include: {
            activities: true
          }
        },
        expenses: true,
        _count: {
          select: {
            tasks: true,
            milestones: true,
            team: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.project.count({ where });

    return NextResponse.json({
      projects,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('[PROJECTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      status,
      budget,
      startDate,
      endDate,
      clientId,
      milestones,
      materials,
    } = body;

    if (!name || !clientId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        status: status as ProjectStatus || ProjectStatus.PENDING,
        budget: budget ? parseFloat(budget) : null,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        clientId,
        tasks: {
          create: []
        },
        milestones: {
          create: milestones?.map((m: any) => ({
            title: m.name,
            description: m.description,
            dueDate: new Date(m.dueDate),
            status: MilestoneStatus.PENDING
          })) || []
        },
        materials: {
          create: materials?.map((m: any) => ({
            name: m.name,
            quantity: m.quantity,
            unit: m.unit,
            cost: m.cost
          })) || []
        }
      },
      include: {
        client: true,
        tasks: {
          include: {
            assignedTo: true
          }
        },
        milestones: true,
        team: {
          include: {
            user: true
          }
        },
        materials: true,
        deal: {
          include: {
            activities: true
          }
        },
        expenses: true,
        _count: {
          select: {
            tasks: true,
            milestones: true,
            team: true
          }
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[PROJECTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      name,
      description,
      status,
      budget,
      startDate,
      endDate,
      progress,
      actualCost,
      margin
    } = body;

    if (!id) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        status: status as ProjectStatus,
        budget: budget ? parseFloat(budget) : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        progress: progress ? parseFloat(progress) : undefined,
        actualCost: actualCost ? parseFloat(actualCost) : undefined,
        margin: margin ? parseFloat(margin) : undefined
      },
      include: {
        client: true,
        tasks: {
          include: {
            assignedTo: true
          }
        },
        milestones: true,
        team: {
          include: {
            user: true
          }
        },
        materials: true,
        deal: {
          include: {
            activities: true
          }
        },
        expenses: true,
        _count: {
          select: {
            tasks: true,
            milestones: true,
            team: true
          }
        }
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[PROJECTS_PUT]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    await prisma.project.delete({
      where: { id: projectId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[PROJECTS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 