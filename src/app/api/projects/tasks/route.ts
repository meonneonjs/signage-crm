import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedToId = searchParams.get('assignedToId');
    const search = searchParams.get('search');
    const dueBefore = searchParams.get('dueBefore');
    const dueAfter = searchParams.get('dueAfter');

    const where: any = {};
    
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assignedToId) where.assignedToId = assignedToId;
    if (dueBefore) where.dueDate = { lte: new Date(dueBefore) };
    if (dueAfter) where.dueDate = { ...where.dueDate, gte: new Date(dueAfter) };
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const tasks = await prisma.projectTask.findMany({
      where,
      include: {
        assignedTo: true,
        project: {
          include: {
            client: true,
          }
        }
      },
      orderBy: [
        { dueDate: 'asc' },
        { priority: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.projectTask.count({ where });

    return NextResponse.json({
      tasks,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      }
    });
  } catch (error) {
    console.error('[PROJECT_TASKS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      title,
      description,
      priority,
      status,
      dueDate,
      assignedToId,
    } = body;

    if (!projectId || !title || !priority || !status || !assignedToId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const task = await prisma.projectTask.create({
      data: {
        projectId,
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
      },
      include: {
        assignedTo: true,
        project: {
          include: {
            client: true,
          }
        }
      }
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('[PROJECT_TASKS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      id,
      title,
      description,
      priority,
      status,
      dueDate,
      completedDate,
      assignedToId,
    } = body;

    if (!id) {
      return new NextResponse("Task ID required", { status: 400 });
    }

    const task = await prisma.projectTask.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        completedDate: completedDate ? new Date(completedDate) : undefined,
        assignedToId,
      },
      include: {
        assignedTo: true,
        project: {
          include: {
            client: true,
          }
        }
      }
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error('[PROJECT_TASKS_PUT]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('id');

    if (!taskId) {
      return new NextResponse("Task ID required", { status: 400 });
    }

    await prisma.projectTask.delete({
      where: { id: taskId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[PROJECT_TASKS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 