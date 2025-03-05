import { prisma } from '@/lib/prisma';
import { 
  MarketingType, 
  MarketingPlatform, 
  ContentType, 
  ContentStatus,
  AdSetStatus,
  AdStatus,
  MessageStatus,
  Prisma
} from '@prisma/client';

export class MarketingService {
  // Campaign Management
  static async createCampaign(data: {
    name: string;
    description?: string;
    type: MarketingType;
    status: CampaignStatus;
    startDate: Date;
    endDate?: Date;
    budget: number;
    platform: MarketingPlatform;
    targetAudience?: Prisma.JsonValue;
    goals?: string[];
    tags?: string[];
    assignedToId?: string;
  }) {
    return prisma.marketingCampaign.create({
      data: {
        ...data,
        metrics: {
          create: {
            impressions: 0,
            clicks: 0,
            conversions: 0,
            reach: 0,
            engagement: 0,
            spend: 0
          }
        }
      },
      include: {
        metrics: true,
        assignedTo: true
      }
    });
  }

  static async updateCampaign(id: string, data: Partial<{
    name: string;
    description: string;
    status: CampaignStatus;
    endDate: Date;
    budget: number;
    actualSpend: number;
    targetAudience: Prisma.JsonValue;
    goals: string[];
    tags: string[];
    assignedToId: string;
  }>) {
    return prisma.marketingCampaign.update({
      where: { id },
      data,
      include: {
        metrics: true,
        assignedTo: true
      }
    });
  }

  static async getCampaign(id: string) {
    return prisma.marketingCampaign.findUnique({
      where: { id },
      include: {
        metrics: true,
        content: true,
        adSets: {
          include: {
            ads: true
          }
        },
        messages: true,
        assignedTo: true
      }
    });
  }

  static async getCampaigns(filters: {
    platform?: MarketingPlatform;
    status?: CampaignStatus;
    type?: MarketingType;
    assignedToId?: string;
  }) {
    return prisma.marketingCampaign.findMany({
      where: filters,
      include: {
        metrics: true,
        assignedTo: true
      },
      orderBy: {
        startDate: 'desc'
      }
    });
  }

  // Content Management
  static async createContent(data: {
    campaignId: string;
    type: ContentType;
    title: string;
    description?: string;
    mediaUrl?: string;
    callToAction?: string;
    landingPage?: string;
    status?: ContentStatus;
    performance?: Prisma.JsonValue;
  }) {
    return prisma.marketingContent.create({
      data
    });
  }

  static async updateContent(id: string, data: Partial<{
    title: string;
    description: string;
    mediaUrl: string;
    callToAction: string;
    landingPage: string;
    status: ContentStatus;
    performance: Prisma.JsonValue;
  }>) {
    return prisma.marketingContent.update({
      where: { id },
      data
    });
  }

  // Ad Set Management
  static async createAdSet(data: {
    campaignId: string;
    name: string;
    status: AdSetStatus;
    budget: number;
    startDate: Date;
    endDate?: Date;
    targeting: Prisma.JsonValue;
    placements: string[];
    bidStrategy?: string;
  }) {
    return prisma.adSet.create({
      data
    });
  }

  static async updateAdSet(id: string, data: Partial<{
    name: string;
    status: AdSetStatus;
    budget: number;
    endDate: Date;
    targeting: Prisma.JsonValue;
    placements: string[];
    bidStrategy: string;
  }>) {
    return prisma.adSet.update({
      where: { id },
      data
    });
  }

  // Ad Management
  static async createAd(data: {
    adSetId: string;
    name: string;
    status: AdStatus;
    preview?: string;
    mediaUrls: string[];
    headline: string;
    primaryText?: string;
    description?: string;
    callToAction?: string;
    destinationUrl?: string;
    metrics?: Prisma.JsonValue;
  }) {
    return prisma.ad.create({
      data
    });
  }

  static async updateAd(id: string, data: Partial<{
    name: string;
    status: AdStatus;
    preview: string;
    mediaUrls: string[];
    headline: string;
    primaryText: string;
    description: string;
    callToAction: string;
    destinationUrl: string;
    metrics: Prisma.JsonValue;
  }>) {
    return prisma.ad.update({
      where: { id },
      data
    });
  }

  // Message Management
  static async createMessage(data: {
    campaignId: string;
    platform: MarketingPlatform;
    senderId: string;
    senderName: string;
    message: string;
    assignedToId?: string;
    metadata?: Prisma.JsonValue;
  }) {
    return prisma.adMessage.create({
      data: {
        ...data,
        status: MessageStatus.UNREAD
      },
      include: {
        assignedTo: true
      }
    });
  }

  static async updateMessage(id: string, data: Partial<{
    status: MessageStatus;
    assignedToId: string;
    response: string;
    respondedAt: Date;
  }>) {
    return prisma.adMessage.update({
      where: { id },
      data: {
        ...data,
        ...(data.response && {
          respondedAt: new Date(),
          status: MessageStatus.REPLIED
        })
      },
      include: {
        assignedTo: true
      }
    });
  }

  static async getMessages(filters: {
    campaignId?: string;
    platform?: MarketingPlatform;
    status?: MessageStatus;
    assignedToId?: string;
  }) {
    return prisma.adMessage.findMany({
      where: filters,
      include: {
        campaign: true,
        assignedTo: true
      },
      orderBy: {
        receivedAt: 'desc'
      }
    });
  }

  // Metrics Management
  static async updateMetrics(campaignId: string, metrics: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    reach?: number;
    engagement?: number;
    spend?: number;
    cpc?: number;
    cpm?: number;
    ctr?: number;
    roas?: number;
  }) {
    return prisma.marketingMetrics.update({
      where: { campaignId },
      data: {
        ...metrics,
        lastUpdated: new Date()
      }
    });
  }

  static async getMetricsSummary(filters: {
    platform?: MarketingPlatform;
    startDate?: Date;
    endDate?: Date;
  }) {
    const campaigns = await prisma.marketingCampaign.findMany({
      where: {
        platform: filters.platform,
        startDate: filters.startDate ? { gte: filters.startDate } : undefined,
        endDate: filters.endDate ? { lte: filters.endDate } : undefined
      },
      include: {
        metrics: true
      }
    });

    return {
      totalSpend: campaigns.reduce((sum, campaign) => sum + campaign.actualSpend, 0),
      totalImpressions: campaigns.reduce((sum, campaign) => sum + (campaign.metrics?.impressions || 0), 0),
      totalClicks: campaigns.reduce((sum, campaign) => sum + (campaign.metrics?.clicks || 0), 0),
      totalConversions: campaigns.reduce((sum, campaign) => sum + (campaign.metrics?.conversions || 0), 0),
      averageCPC: campaigns.reduce((sum, campaign) => sum + (campaign.metrics?.cpc || 0), 0) / campaigns.length,
      averageROAS: campaigns.reduce((sum, campaign) => sum + (campaign.metrics?.roas || 0), 0) / campaigns.length
    };
  }
} 