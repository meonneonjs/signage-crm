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
    const installerId = searchParams.get('installerId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!projectId) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    const where: any = { projectId };
    if (status) where.status = status;
    if (installerId) where.installers = { some: { id: installerId } };
    if (startDate) where.scheduledDate = { gte: new Date(startDate) };
    if (endDate) where.scheduledDate = { ...where.scheduledDate, lte: new Date(endDate) };

    const schedule = await prisma.installationSchedule.findUnique({
      where: { projectId },
      include: {
        project: {
          include: {
            specifications: true,
            client: true,
          }
        },
        installers: true,
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('[INSTALLATION_SCHEDULE_GET]', error);
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
      scheduledDate,
      estimatedDuration,
      status,
      siteAddress,
      siteContact,
      sitePhone,
      accessInstructions,
      equipmentNeeded,
      crewSize,
      permitRequired,
      permitNumber,
      installerIds,
    } = body;

    if (!projectId || !scheduledDate || !estimatedDuration || !status || !siteAddress) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const schedule = await prisma.installationSchedule.create({
      data: {
        projectId,
        scheduledDate: new Date(scheduledDate),
        estimatedDuration,
        status,
        siteAddress,
        siteContact,
        sitePhone,
        accessInstructions,
        equipmentNeeded,
        crewSize,
        permitRequired,
        permitNumber,
        installers: installerIds ? {
          connect: installerIds.map((id: string) => ({ id }))
        } : undefined,
      },
      include: {
        project: {
          include: {
            specifications: true,
            client: true,
          }
        },
        installers: true,
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('[INSTALLATION_SCHEDULE_POST]', error);
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
      scheduledDate,
      estimatedDuration,
      status,
      siteAddress,
      siteContact,
      sitePhone,
      accessInstructions,
      equipmentNeeded,
      crewSize,
      permitRequired,
      permitNumber,
      installerIds,
    } = body;

    if (!projectId) {
      return new NextResponse("Project ID required", { status: 400 });
    }

    const schedule = await prisma.installationSchedule.update({
      where: { projectId },
      data: {
        scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
        estimatedDuration,
        status,
        siteAddress,
        siteContact,
        sitePhone,
        accessInstructions,
        equipmentNeeded,
        crewSize,
        permitRequired,
        permitNumber,
        installers: installerIds ? {
          set: installerIds.map((id: string) => ({ id }))
        } : undefined,
      },
      include: {
        project: {
          include: {
            specifications: true,
            client: true,
          }
        },
        installers: true,
      }
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.error('[INSTALLATION_SCHEDULE_PUT]', error);
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

    await prisma.installationSchedule.delete({
      where: { projectId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[INSTALLATION_SCHEDULE_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 