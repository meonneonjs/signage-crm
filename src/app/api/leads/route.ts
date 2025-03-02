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
    const score = searchParams.get('score');
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const assignedToId = searchParams.get('assignedToId');
    const priority = searchParams.get('priority');
    const tag = searchParams.get('tag');

    const where: any = {};
    
    if (status) where.status = status;
    if (score) where.score = score;
    if (source) where.source = source;
    if (assignedToId) where.assignedToId = assignedToId;
    if (priority) where.priority = priority;
    if (tag) where.tags = { has: tag };
    
    if (search) {
      where.OR = [
        { contactName: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        assignedTo: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        campaigns: {
          include: {
            campaign: true,
          }
        },
        _count: {
          select: {
            activities: true,
            deals: true,
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.lead.count({ where });

    return NextResponse.json({
      leads,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      }
    });
  } catch (error) {
    console.error('[LEADS_GET]', error);
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
      contactName,
      companyName,
      email,
      phone,
      source,
      status,
      priority,
      score,
      industry,
      employeeCount,
      annualRevenue,
      website,
      address,
      city,
      state,
      zipCode,
      budget,
      timeline,
      requirements,
      notes,
      tags,
      assignedToId,
    } = body;

    if (!contactName || !email || !source) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        contactName,
        companyName,
        email,
        phone,
        source,
        status,
        priority,
        score,
        industry,
        employeeCount,
        annualRevenue,
        website,
        address,
        city,
        state,
        zipCode,
        budget,
        timeline,
        requirements,
        notes,
        tags,
        assignedToId,
        lastContactedAt: new Date(),
      },
      include: {
        assignedTo: true,
      }
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('[LEADS_POST]', error);
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
      contactName,
      companyName,
      email,
      phone,
      source,
      status,
      priority,
      score,
      industry,
      employeeCount,
      annualRevenue,
      website,
      address,
      city,
      state,
      zipCode,
      budget,
      timeline,
      requirements,
      notes,
      tags,
      assignedToId,
      nextFollowUpDate,
      leadValue,
      conversionProbability,
    } = body;

    if (!id) {
      return new NextResponse("Lead ID required", { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: {
        contactName,
        companyName,
        email,
        phone,
        source,
        status,
        priority,
        score,
        industry,
        employeeCount,
        annualRevenue,
        website,
        address,
        city,
        state,
        zipCode,
        budget,
        timeline,
        requirements,
        notes,
        tags,
        assignedToId,
        nextFollowUpDate,
        leadValue,
        conversionProbability,
      },
      include: {
        assignedTo: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      }
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error('[LEADS_PUT]', error);
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
    const leadId = searchParams.get('id');

    if (!leadId) {
      return new NextResponse("Lead ID required", { status: 400 });
    }

    await prisma.lead.delete({
      where: { id: leadId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[LEADS_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 