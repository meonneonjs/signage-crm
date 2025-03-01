import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        projects: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const client = await prisma.client.create({
      data: {
        ...data,
        userId: 'temp-user-id', // TODO: Replace with actual user ID from auth
      },
    })
    return NextResponse.json(client)
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    )
  }
} 