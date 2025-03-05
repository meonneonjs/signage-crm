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
    const salesRepId = searchParams.get('salesRepId');
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const minAmount = searchParams.get('minAmount');
    const maxAmount = searchParams.get('maxAmount');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {};
    
    if (salesRepId) where.userId = salesRepId;
    if (year) where.year = parseInt(year);
    if (month) where.month = parseInt(month);
    if (minAmount) where.amount = { gte: parseFloat(minAmount) };
    if (maxAmount) where.amount = { ...where.amount, lte: parseFloat(maxAmount) };
    if (startDate) where.paidAt = { gte: new Date(startDate) };
    if (endDate) where.paidAt = { ...where.paidAt, lte: new Date(endDate) };

    const payments = await prisma.commissionPayment.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
        { paidAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.commissionPayment.count({ where });
    const totalAmount = await prisma.commissionPayment.aggregate({
      where,
      _sum: {
        amount: true,
      }
    });

    return NextResponse.json({
      payments,
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
    console.error('[COMMISSION_PAYMENTS_GET]', error);
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
      amount,
      paidAt,
      year,
      month,
      notes,
    } = body;

    if (!salesRepId || !amount || !paidAt || !year || !month) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Update all unpaid commissions for this user in this month/year to paid
    await prisma.commission.updateMany({
      where: {
        userId: salesRepId,
        status: 'PENDING',
        createdAt: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      data: {
        status: 'PAID',
        paidAt: new Date(paidAt),
      },
    });

    const payment = await prisma.commissionPayment.create({
      data: {
        userId: salesRepId,
        amount,
        paidAt: new Date(paidAt),
        year,
        month,
        notes,
      },
      include: {
        user: true,
      }
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('[COMMISSION_PAYMENTS_POST]', error);
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
      paidAt,
      notes,
    } = body;

    if (!id) {
      return new NextResponse("Payment ID required", { status: 400 });
    }

    const payment = await prisma.commissionPayment.update({
      where: { id },
      data: {
        amount,
        paidAt: paidAt ? new Date(paidAt) : undefined,
        notes,
      },
      include: {
        user: true,
      }
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error('[COMMISSION_PAYMENTS_PUT]', error);
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
    const paymentId = searchParams.get('id');

    if (!paymentId) {
      return new NextResponse("Payment ID required", { status: 400 });
    }

    // Get the payment details before deleting
    const payment = await prisma.commissionPayment.findUnique({
      where: { id: paymentId },
    });

    if (payment) {
      // Reset the commissions back to pending
      await prisma.commission.updateMany({
        where: {
          userId: payment.userId,
          status: 'PAID',
          paidAt: payment.paidAt,
        },
        data: {
          status: 'PENDING',
          paidAt: null,
        },
      });
    }

    await prisma.commissionPayment.delete({
      where: { id: paymentId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[COMMISSION_PAYMENTS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 