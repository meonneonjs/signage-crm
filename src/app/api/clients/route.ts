import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

export async function GET(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const type = searchParams.get('type')
    const segment = searchParams.get('segment')
    const search = searchParams.get('search')
    const minLifetimeValue = searchParams.get('minLifetimeValue')
    const assignedToId = searchParams.get('assignedToId')

    const where: any = {}
    
    if (type) where.type = type
    if (segment) where.segment = segment
    if (assignedToId) where.userId = assignedToId
    if (minLifetimeValue) where.lifetimeValue = { gte: parseFloat(minLifetimeValue) }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { companyName: { contains: search, mode: 'insensitive' } },
      ]
    }

    const clients = await prisma.client.findMany({
      where,
      include: {
        user: true,
        projects: {
          orderBy: { updatedAt: 'desc' },
          take: 5,
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            createdBy: true,
          }
        },
        _count: {
          select: {
            projects: true,
            notes: true,
          }
        }
      },
      orderBy: { updatedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    const total = await prisma.client.count({ where })

    return NextResponse.json({
      clients,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      }
    })
  } catch (error) {
    console.error('[CLIENTS_GET]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      email,
      phone,
      companyName,
      website,
      industry,
      address,
      city,
      state,
      zipCode,
      country,
      notes,
      status,
      customFields,
    } = body

    if (!name || !email) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        companyName,
        website,
        industry,
        address,
        city,
        state,
        zipCode,
        country,
        notes,
        status,
        customFields,
        userId,
      },
      include: {
        user: true,
        clientNotes: {
          include: {
            createdBy: true,
          }
        }
      }
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('[CLIENTS_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const {
      id,
      name,
      email,
      phone,
      companyName,
      website,
      industry,
      address,
      city,
      state,
      zipCode,
      country,
      notes,
      status,
      lastContactDate,
      nextFollowUpDate,
      customFields,
    } = body

    if (!id) {
      return new NextResponse("Client ID required", { status: 400 })
    }

    const client = await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        companyName,
        website,
        industry,
        address,
        city,
        state,
        zipCode,
        country,
        notes,
        status,
        lastContactDate: lastContactDate ? new Date(lastContactDate) : undefined,
        nextFollowUpDate: nextFollowUpDate ? new Date(nextFollowUpDate) : undefined,
        customFields,
      },
      include: {
        user: true,
        projects: {
          orderBy: { updatedAt: 'desc' },
          take: 5,
        },
        clientNotes: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: {
            createdBy: true,
          }
        }
      }
    })

    return NextResponse.json(client)
  } catch (error) {
    console.error('[CLIENTS_PUT]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('id')

    if (!clientId) {
      return new NextResponse("Client ID required", { status: 400 })
    }

    await prisma.client.delete({
      where: { id: clientId }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[CLIENTS_DELETE]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 