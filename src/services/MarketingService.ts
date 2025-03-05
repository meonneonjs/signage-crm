import { prisma } from '@/lib/prisma';
import type { Prisma, Campaign, CampaignMetrics, MarketingPlatform, MarketingType, MessageStatus } from '@prisma/client';

type CampaignWithIncludes = Campaign & {
  metrics: CampaignMetrics | null;
  assignedTo: {
    id: string;
    name: string | null;
  } | null;
};

type MessageWithIncludes = {
  id: string;
  campaignId: string;
  platform: MarketingPlatform;
  senderId: string;
  senderName: string;
  message: string;
  receivedAt: Date;
  status: MessageStatus;
  assignedToId: string | null;
  response: string | null;
  respondedAt: Date | null;
  metadata: any | null;
  campaign: CampaignWithIncludes | null;
  assignedTo: {
    id: string;
    name: string | null;
  } | null;
};

export class MarketingService {
  static async getCampaigns(filters: Prisma.CampaignWhereInput): Promise<CampaignWithIncludes[]> {
    try {
      const campaigns = await prisma.campaign.findMany({
        where: filters,
        include: {
          metrics: true,
          assignedTo: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return campaigns.map(campaign => ({
        ...campaign,
        assignedTo: campaign.assignedTo ? {
          id: campaign.assignedTo.id,
          name: campaign.assignedTo.name
        } : null
      }));
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  }

  static async createCampaign(data: Omit<Prisma.CampaignCreateInput, 'status' | 'metrics'>): Promise<CampaignWithIncludes> {
    try {
      const campaign = await prisma.campaign.create({
        data: {
          ...data,
          status: 'DRAFT',
          metrics: {
            create: {
              impressions: 0,
              clicks: 0,
              conversions: 0,
              spend: 0,
              revenue: 0
            }
          }
        },
        include: {
          metrics: true,
          assignedTo: true
        }
      });

      return {
        ...campaign,
        assignedTo: campaign.assignedTo ? {
          id: campaign.assignedTo.id,
          name: campaign.assignedTo.name
        } : null
      };
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  static async updateCampaign(id: string, data: Prisma.CampaignUpdateInput): Promise<CampaignWithIncludes> {
    try {
      const campaign = await prisma.campaign.update({
        where: { id },
        data,
        include: {
          metrics: true,
          assignedTo: true
        }
      });

      return {
        ...campaign,
        assignedTo: campaign.assignedTo ? {
          id: campaign.assignedTo.id,
          name: campaign.assignedTo.name
        } : null
      };
    } catch (error) {
      console.error('Error updating campaign:', error);
      throw error;
    }
  }

  static async getMessages(filters: Prisma.AdMessageWhereInput): Promise<MessageWithIncludes[]> {
    try {
      const messages = await prisma.adMessage.findMany({
        where: filters,
        include: {
          campaign: {
            include: {
              metrics: true,
              assignedTo: true
            }
          },
          assignedTo: true
        },
        orderBy: {
          receivedAt: 'desc'
        }
      });

      return messages.map(message => ({
        ...message,
        campaign: message.campaign ? {
          ...message.campaign,
          assignedTo: message.campaign.assignedTo ? {
            id: message.campaign.assignedTo.id,
            name: message.campaign.assignedTo.name
          } : null
        } : null,
        assignedTo: message.assignedTo ? {
          id: message.assignedTo.id,
          name: message.assignedTo.name
        } : null
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  static async createMessage(data: {
    campaignId: string;
    platform: MarketingPlatform;
    senderId: string;
    senderName: string;
    message: string;
    assignedToId?: string;
  }): Promise<MessageWithIncludes> {
    try {
      const message = await prisma.adMessage.create({
        data: {
          ...data,
          status: 'NEW',
          receivedAt: new Date()
        },
        include: {
          campaign: {
            include: {
              metrics: true,
              assignedTo: true
            }
          },
          assignedTo: true
        }
      });

      return {
        ...message,
        campaign: message.campaign ? {
          ...message.campaign,
          assignedTo: message.campaign.assignedTo ? {
            id: message.campaign.assignedTo.id,
            name: message.campaign.assignedTo.name
          } : null
        } : null,
        assignedTo: message.assignedTo ? {
          id: message.assignedTo.id,
          name: message.assignedTo.name
        } : null
      };
    } catch (error) {
      console.error('Error creating message:', error);
      throw error;
    }
  }

  static async updateMessage(id: string, data: {
    status?: MessageStatus;
    assignedToId?: string;
    response?: string;
  }): Promise<MessageWithIncludes> {
    try {
      const message = await prisma.adMessage.update({
        where: { id },
        data: {
          ...data,
          ...(data.response && { respondedAt: new Date() })
        },
        include: {
          campaign: {
            include: {
              metrics: true,
              assignedTo: true
            }
          },
          assignedTo: true
        }
      });

      return {
        ...message,
        campaign: message.campaign ? {
          ...message.campaign,
          assignedTo: message.campaign.assignedTo ? {
            id: message.campaign.assignedTo.id,
            name: message.campaign.assignedTo.name
          } : null
        } : null,
        assignedTo: message.assignedTo ? {
          id: message.assignedTo.id,
          name: message.assignedTo.name
        } : null
      };
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  }

  static async updateMetrics(campaignId: string, metrics: Prisma.CampaignMetricsUpdateInput) {
    try {
      const updatedMetrics = await prisma.campaignMetrics.update({
        where: { campaignId },
        data: metrics
      });

      return updatedMetrics;
    } catch (error) {
      console.error('Error updating metrics:', error);
      throw error;
    }
  }

  static async getMetrics() {
    try {
      const [campaigns, messages] = await Promise.all([
        prisma.campaign.findMany({
          include: {
            metrics: true
          }
        }),
        prisma.adMessage.count()
      ]);

      const totalCampaigns = campaigns.length;
      const activeCampaigns = campaigns.filter(c => c.status === 'ACTIVE').length;
      const totalSpend = campaigns.reduce((sum, c) => sum + (c.metrics?.spend || 0), 0);
      const totalRevenue = campaigns.reduce((sum, c) => sum + (c.metrics?.revenue || 0), 0);
      const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;

      const platforms: MarketingPlatform[] = [
        'META',
        'GOOGLE',
        'LINKEDIN',
        'TWITTER',
        'TIKTOK',
        'INSTAGRAM',
        'YOUTUBE',
        'EMAIL',
        'OTHER'
      ];
      const platformMetrics = platforms.map(platform => {
        const platformCampaigns = campaigns.filter(c => c.platform === platform);
        return {
          platform,
          impressions: platformCampaigns.reduce((sum, c) => sum + (c.metrics?.impressions || 0), 0),
          clicks: platformCampaigns.reduce((sum, c) => sum + (c.metrics?.clicks || 0), 0),
          conversions: platformCampaigns.reduce((sum, c) => sum + (c.metrics?.conversions || 0), 0),
          spend: platformCampaigns.reduce((sum, c) => sum + (c.metrics?.spend || 0), 0),
          revenue: platformCampaigns.reduce((sum, c) => sum + (c.metrics?.revenue || 0), 0)
        };
      });

      return {
        totalCampaigns,
        activeCampaigns,
        totalSpend,
        totalRevenue,
        roas,
        platformMetrics,
        totalMessages: messages
      };
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  }
} 