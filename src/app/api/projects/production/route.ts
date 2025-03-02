import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!projectId) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    const where: any = { projectId };
    if (status) where.status = status;
    if (startDate) where.startDate = { gte: new Date(startDate) };
    if (endDate) where.endDate = { lte: new Date(endDate) };

    const schedule = await prisma.productionSchedule.findUnique({
      where: { projectId },
      include: {
        project: {
          include: {
            specifications: true,
          }
        }
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('[PRODUCTION_SCHEDULE_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      startDate,
      endDate,
      status,
      designStage,
      printingStage,
      fabricationStage,
      assemblyStage,
      assignedMachine,
      materialStatus,
    } = body;

    if (!projectId || !startDate || !endDate || !status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const schedule = await prisma.productionSchedule.create({
      data: {
        projectId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
        designStage,
        printingStage,
        fabricationStage,
        assemblyStage,
        assignedMachine,
        materialStatus,
      },
      include: {
        project: {
          include: {
            specifications: true,
          }
        }
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('[PRODUCTION_SCHEDULE_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const {
      projectId,
      startDate,
      endDate,
      status,
      designStage,
      printingStage,
      fabricationStage,
      assemblyStage,
      assignedMachine,
      materialStatus,
    } = body;

    if (!projectId) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    const schedule = await prisma.productionSchedule.update({
      where: { projectId },
      data: {
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        status,
        designStage,
        printingStage,
        fabricationStage,
        assemblyStage,
        assignedMachine,
        materialStatus,
      },
      include: {
        project: {
          include: {
            specifications: true,
          }
        }
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('[PRODUCTION_SCHEDULE_PUT]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (!projectId) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    await prisma.productionSchedule.delete({
      where: { projectId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[PRODUCTION_SCHEDULE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 