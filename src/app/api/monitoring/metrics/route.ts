import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '24h'

    // Calculate the start time based on the time range
    const now = new Date()
    let startTime: Date

    switch (timeRange) {
      case '1h':
        startTime = new Date(now.getTime() - 60 * 60 * 1000)
        break
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      default: // 24h
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    }

    // Fetch metrics from the database
    const metrics = await prisma.performanceMetric.findMany({
      where: {
        timestamp: {
          gte: startTime,
          lte: now,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    })

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Failed to fetch performance metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch performance metrics' },
      { status: 500 }
    )
  }
} 