'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CampaignList } from './CampaignList';
import { MessageList } from './MessageList';
import { MetricsOverview } from './MetricsOverview';
import { CreateCampaignDialog } from './CreateCampaignDialog';
import { MarketingService } from '@/services/MarketingService';
import { Button } from '@/components/ui/button';

type MarketingPlatform = 'META' | 'GOOGLE' | 'LINKEDIN' | 'TWITTER' | 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE' | 'EMAIL' | 'OTHER';
type MarketingType = 'DISPLAY_AD' | 'SEARCH_AD' | 'SOCIAL_AD' | 'VIDEO_AD' | 'EMAIL_CAMPAIGN' | 'CONTENT_MARKETING' | 'INFLUENCER_CAMPAIGN' | 'OTHER';
type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';
type MessageStatus = 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED' | 'SPAM';

interface MarketingCampaign {
  id: string;
  name: string;
  description: string;
  platform: MarketingPlatform;
  type: MarketingType;
  status: CampaignStatus;
  budget: number;
  startDate: Date;
  endDate: Date;
  metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    revenue: number;
  } | null;
  assignedTo?: {
    id: string;
    name: string | null;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AdMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  content: string;
  platform: MarketingPlatform;
  status: MessageStatus;
  response?: string | null;
  campaign?: MarketingCampaign | null;
  assignedTo?: {
    id: string;
    name: string | null;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  totalRevenue: number;
  roas: number;
  platformMetrics: {
    platform: MarketingPlatform;
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    revenue: number;
  }[];
  totalMessages: number;
}

interface CampaignFilters {
  platform?: MarketingPlatform;
  status?: CampaignStatus;
  type?: MarketingType;
  startDate?: Date;
  endDate?: Date;
}

interface MessageFilters {
  platform?: MarketingPlatform;
  status?: MessageStatus;
}

interface CampaignFormData {
  name: string;
  description: string;
  platform: MarketingPlatform;
  type: MarketingType;
  budget: number;
  startDate: string;
  endDate: string;
}

export function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [messages, setMessages] = useState<AdMessage[]>([]);
  const [campaignFilters, setCampaignFilters] = useState<CampaignFilters>({});
  const [messageFilters, setMessageFilters] = useState<MessageFilters>({});

  const fetchDashboardData = async () => {
    try {
      const [metricsData, campaignsData, messagesData] = await Promise.all([
        MarketingService.getMetrics(),
        MarketingService.getCampaigns(campaignFilters),
        MarketingService.getMessages(messageFilters),
      ]);

      setMetrics(metricsData);
      setCampaigns(campaignsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [campaignFilters, messageFilters]);

  const handleCreateCampaign = async (data: CampaignFormData) => {
    try {
      await MarketingService.createCampaign({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      });
      fetchDashboardData();
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleMessageStatusChange = async (messageId: string, status: MessageStatus) => {
    try {
      await MarketingService.updateMessage(messageId, { status });
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleMessageAssign = async (messageId: string, userId: string) => {
    try {
      await MarketingService.updateMessage(messageId, { assignedToId: userId });
      fetchDashboardData();
    } catch (error) {
      console.error('Error assigning message:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
        <CreateCampaignDialog />
      </div>
      
      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Active Campaigns</h2>
          <p className="text-gray-600">No active campaigns yet. Create your first campaign to get started!</p>
        </div>
      </div>
    </div>
  );
} 