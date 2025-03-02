import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');
    const reportedAfter = searchParams.get('reportedAfter');
    const reportedBefore = searchParams.get('reportedBefore');

    const where: any = {};
    
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (reportedAfter) where.reportedDate = { gte: new Date(reportedAfter) };
    if (reportedBefore) where.reportedDate = { ...where.reportedDate, lte: new Date(reportedBefore) };
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const issues = await prisma.projectIssue.findMany({
      where,
      include: {
        project: {
          include: {
            client: true,
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { reportedDate: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.projectIssue.count({ where });

    return NextResponse.json({
      issues,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      }
    });
  } catch (error) {
    console.error('[PROJECT_ISSUES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = getAuth(request);
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
    } = body;

    if (!projectId || !title || !description || !priority || !status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const issue = await prisma.projectIssue.create({
      data: {
        projectId,
        title,
        description,
        priority,
        status,
        reportedDate: new Date(),
      },
      include: {
        project: {
          include: {
            client: true,
          }
        }
      }
    });

    return NextResponse.json(issue);
  } catch (error) {
    console.error('[PROJECT_ISSUES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = getAuth(request);
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
      resolvedDate,
    } = body;

    if (!id) {
      return new NextResponse("Issue ID required", { status: 400 });
    }

    const issue = await prisma.projectIssue.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        status,
        resolvedDate: resolvedDate ? new Date(resolvedDate) : undefined,
      },
      include: {
        project: {
          include: {
            client: true,
          }
        }
      }
    });

    return NextResponse.json(issue);
  } catch (error) {
    console.error('[PROJECT_ISSUES_PUT]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const issueId = searchParams.get('id');

    if (!issueId) {
      return new NextResponse("Issue ID required", { status: 400 });
    }

    await prisma.projectIssue.delete({
      where: { id: issueId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[PROJECT_ISSUES_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 