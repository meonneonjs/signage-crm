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
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const salesRepId = searchParams.get('salesRepId');
    const projectId = searchParams.get('projectId');
    const minAmount = searchParams.get('minAmount');
    const maxAmount = searchParams.get('maxAmount');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};
    
    if (status) where.status = status;
    if (type) where.type = type;
    if (salesRepId) where.userId = salesRepId;
    if (projectId) where.projectId = projectId;
    if (minAmount) where.amount = { gte: parseFloat(minAmount) };
    if (maxAmount) where.amount = { ...where.amount, lte: parseFloat(maxAmount) };
    if (startDate) where.createdAt = { gte: new Date(startDate) };
    if (endDate) where.createdAt = { ...where.createdAt, lte: new Date(endDate) };

    const commissions = await prisma.commission.findMany({
      where,
      include: {
        user: true,
        project: {
          include: {
            client: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.commission.count({ where });
    const totalAmount = await prisma.commission.aggregate({
      where,
      _sum: {
        amount: true,
      }
    });

    return NextResponse.json({
      commissions,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
      summary: {
        totalAmount: totalAmount._sum.amount || 0,
      }
    });
  } catch (error) {
    console.error('[COMMISSIONS_GET]', error);
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
      userId: salesRepId,
      projectId,
      amount,
      type,
      percentage,
      status,
    } = body;

    if (!salesRepId || !projectId || !amount || !type || !percentage) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const commission = await prisma.commission.create({
      data: {
        userId: salesRepId,
        projectId,
        amount,
        type,
        percentage,
        status,
      },
      include: {
        user: true,
        project: {
          include: {
            client: true,
          }
        }
      }
    });

    return NextResponse.json(commission);
  } catch (error) {
    console.error('[COMMISSIONS_POST]', error);
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
      amount,
      type,
      percentage,
      status,
      paidAt,
    } = body;

    if (!id) {
      return new NextResponse("Commission ID required", { status: 400 });
    }

    const commission = await prisma.commission.update({
      where: { id },
      data: {
        amount,
        type,
        percentage,
        status,
        paidAt: paidAt ? new Date(paidAt) : undefined,
      },
      include: {
        user: true,
        project: {
          include: {
            client: true,
          }
        }
      }
    });

    return NextResponse.json(commission);
  } catch (error) {
    console.error('[COMMISSIONS_PUT]', error);
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
    const commissionId = searchParams.get('id');

    if (!commissionId) {
      return new NextResponse("Commission ID required", { status: 400 });
    }

    await prisma.commission.delete({
      where: { id: commissionId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[COMMISSIONS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 