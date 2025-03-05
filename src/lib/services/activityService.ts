import { prisma } from '@/lib/prisma';
import { Activity, ActivityType, ActivityMetadata } from '@/lib/types/activity';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(app)/api/auth/[...nextauth]/route";

export class ActivityService {
  static async logActivity({
    type,
    userId,
    userName,
    entityId,
    entityType,
    description,
    metadata,
    importance = 'medium',
    isSystem = false,
  }: {
    type: ActivityType;
    userId: string;
    userName: string;
    entityId: string;
    entityType: string;
    description: string;
    metadata?: ActivityMetadata;
    importance?: 'low' | 'medium' | 'high';
    isSystem?: boolean;
  }): Promise<Activity> {
    try {
      const activity = await prisma.activity.create({
        data: {
          type,
          userId,
          userName,
          entityId,
          entityType,
          description,
          metadata: metadata as any,
          importance,
          isSystem,
        },
      });

      return activity as Activity;
    } catch (error) {
      console.error('Error logging activity:', error);
      throw error;
    }
  }

  static async getActivities({
    page = 1,
    limit = 10,
    userId,
    entityId,
    entityType,
    type,
  }: {
    page?: number;
    limit?: number;
    userId?: string;
    entityId?: string;
    entityType?: string;
    type?: ActivityType;
  } = {}) {
    try {
      const skip = (page - 1) * limit;

      const where = {
        ...(userId && { userId }),
        ...(entityId && { entityId }),
        ...(entityType && { entityType }),
        ...(type && { type }),
      };

      const [activities, total] = await Promise.all([
        prisma.activity.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        }),
        prisma.activity.count({ where }),
      ]);

      return {
        activities: activities as Activity[],
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error('Error getting activities:', error);
      throw error;
    }
  }

  static async getActivityLog(params: {
    page?: number;
    limit?: number;
    entityType?: string;
    entityId?: string;
    userId?: string;
    importance?: 'low' | 'medium' | 'high';
    startDate?: Date;
    endDate?: Date;
    types?: ActivityType[];
    isSystem?: boolean;
  }): Promise<{ activities: Activity[]; total: number; hasMore: boolean }> {
    const {
      page = 1,
      limit = 10,
      entityType,
      entityId,
      userId,
      importance,
      startDate,
      endDate,
      types,
      isSystem
    } = params;

    const skip = (page - 1) * limit;

    const where = {
      ...(entityType && { entityType }),
      ...(entityId && { entityId }),
      ...(userId && { userId }),
      ...(importance && { importance }),
      ...(isSystem !== undefined && { isSystem }),
      ...(types?.length && { type: { in: types } }),
      ...(startDate && endDate && {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      })
    };

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              image: true
            }
          }
        }
      }),
      prisma.activity.count({ where })
    ]);

    return {
      activities: activities as Activity[],
      total,
      hasMore: total > skip + activities.length
    };
  }

  static async getRecentActivities(params: {
    limit?: number;
    excludeTypes?: ActivityType[];
    onlyImportant?: boolean;
  } = {}): Promise<Activity[]> {
    const { limit = 5, excludeTypes, onlyImportant } = params;

    const where = {
      ...(excludeTypes?.length && {
        type: { notIn: excludeTypes }
      }),
      ...(onlyImportant && {
        importance: 'high'
      })
    };

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });

    return activities as Activity[];
  }

  static async getActivityStats(params: {
    startDate?: Date;
    endDate?: Date;
    userId?: string;
  } = {}): Promise<{
    totalActivities: number;
    byType: Record<ActivityType, number>;
    byImportance: Record<string, number>;
  }> {
    const { startDate, endDate, userId } = params;

    const where = {
      ...(userId && { userId }),
      ...(startDate && endDate && {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      })
    };

    const [total, typeStats, importanceStats] = await Promise.all([
      prisma.activity.count({ where }),
      prisma.activity.groupBy({
        by: ['type'],
        _count: true,
        where
      }),
      prisma.activity.groupBy({
        by: ['importance'],
        _count: true,
        where
      })
    ]);

    const byType = typeStats.reduce((acc, stat) => {
      acc[stat.type as ActivityType] = stat._count;
      return acc;
    }, {} as Record<ActivityType, number>);

    const byImportance = importanceStats.reduce((acc, stat) => {
      acc[stat.importance || 'medium'] = stat._count;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalActivities: total,
      byType,
      byImportance
    };
  }
} 