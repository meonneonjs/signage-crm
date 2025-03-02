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
    const search = searchParams.get('search');

    const where: any = {};
    
    if (status) where.status = status;
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const campaigns = await prisma.campaign.findMany({
      where,
      include: {
        metrics: true,
        _count: {
          select: {
            participants: true,
          }
        }
      },
      orderBy: { startDate: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.campaign.count({ where });

    return NextResponse.json({
      campaigns,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      }
    });
  } catch (error) {
    console.error('[CAMPAIGNS_GET]', error);
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
      name,
      description,
      startDate,
      endDate,
      status,
      type,
      budget,
      metrics,
    } = body;

    if (!name || !startDate || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        status,
        type,
        budget,
        metrics: metrics ? {
          create: {
            impressions: metrics.impressions || 0,
            clicks: metrics.clicks || 0,
            conversions: metrics.conversions || 0,
            revenue: metrics.revenue || 0,
            roi: metrics.roi || 0,
          }
        } : undefined,
      },
      include: {
        metrics: true,
      }
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('[CAMPAIGNS_POST]', error);
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
      name,
      description,
      startDate,
      endDate,
      status,
      type,
      budget,
      metrics,
    } = body;

    if (!id) {
      return new NextResponse("Campaign ID required", { status: 400 });
    }

    const campaign = await prisma.campaign.update({
      where: { id },
      data: {
        name,
        description,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        status,
        type,
        budget,
        metrics: metrics ? {
          upsert: {
            create: {
              impressions: metrics.impressions || 0,
              clicks: metrics.clicks || 0,
              conversions: metrics.conversions || 0,
              revenue: metrics.revenue || 0,
              roi: metrics.roi || 0,
            },
            update: {
              impressions: metrics.impressions,
              clicks: metrics.clicks,
              conversions: metrics.conversions,
              revenue: metrics.revenue,
              roi: metrics.roi,
            }
          }
        } : undefined,
      },
      include: {
        metrics: true,
        _count: {
          select: {
            participants: true,
          }
        }
      }
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('[CAMPAIGNS_PUT]', error);
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
    const campaignId = searchParams.get('id');

    if (!campaignId) {
      return new NextResponse("Campaign ID required", { status: 400 });
    }

    await prisma.campaign.delete({
      where: { id: campaignId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[CAMPAIGNS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 