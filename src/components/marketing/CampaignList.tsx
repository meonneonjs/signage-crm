'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, format } from 'date-fns';

type MarketingPlatform = 'META' | 'GOOGLE' | 'LINKEDIN' | 'TWITTER' | 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE' | 'EMAIL' | 'OTHER';
type MarketingType = 'DISPLAY_AD' | 'SEARCH_AD' | 'SOCIAL_AD' | 'VIDEO_AD' | 'EMAIL_CAMPAIGN' | 'CONTENT_MARKETING' | 'INFLUENCER_CAMPAIGN' | 'OTHER';
type CampaignStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ARCHIVED';

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

interface CampaignFilters {
  platform?: MarketingPlatform;
  status?: CampaignStatus;
  type?: MarketingType;
  startDate?: Date;
  endDate?: Date;
}

interface CampaignListProps {
  campaigns: MarketingCampaign[];
  filters: CampaignFilters;
  onFilterChange: (filters: CampaignFilters) => void;
}

export function CampaignList({ campaigns, filters, onFilterChange }: CampaignListProps) {
  const handleFilterChange = (key: string, value: string | null) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const getStatusColor = (status: CampaignStatus) => {
    const colors = {
      DRAFT: 'bg-gray-100 text-gray-800',
      ACTIVE: 'bg-green-100 text-green-800',
      PAUSED: 'bg-yellow-100 text-yellow-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
      ARCHIVED: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.DRAFT;
  };

  const getPlatformIcon = (platform: MarketingPlatform) => {
    const icons = {
      META: '📱',
      GOOGLE: '🔍',
      LINKEDIN: '💼',
      TWITTER: '🐦',
      TIKTOK: '📹',
      INSTAGRAM: '📸',
      YOUTUBE: '▶️',
      EMAIL: '📧',
      OTHER: '🌐'
    };
    return icons[platform] || icons.OTHER;
  };

  const marketingPlatforms: MarketingPlatform[] = ['META', 'GOOGLE', 'LINKEDIN', 'TWITTER', 'TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'EMAIL', 'OTHER'];
  const marketingTypes: MarketingType[] = ['DISPLAY_AD', 'SEARCH_AD', 'SOCIAL_AD', 'VIDEO_AD', 'EMAIL_CAMPAIGN', 'CONTENT_MARKETING', 'INFLUENCER_CAMPAIGN', 'OTHER'];
  const campaignStatuses: CampaignStatus[] = ['DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <Select
          value={filters.platform || ''}
          onValueChange={(value) => handleFilterChange('platform', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Platforms</SelectItem>
            {marketingPlatforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {getPlatformIcon(platform)} {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status || ''}
          onValueChange={(value) => handleFilterChange('status', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            {campaignStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.type || ''}
          onValueChange={(value) => handleFilterChange('type', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            {marketingTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={filters.startDate?.toISOString().split('T')[0] || ''}
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
          placeholder="Start Date"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Spend</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Metrics</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.type}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{getPlatformIcon(campaign.platform)}</span>
                    {campaign.platform}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                <TableCell>${campaign.metrics?.spend.toLocaleString() || '0'}</TableCell>
                <TableCell>
                  <div>
                    <div>{format(campaign.startDate, 'MMM d, yyyy')}</div>
                    <div className="text-sm text-gray-500">
                      {formatDistanceToNow(campaign.startDate, { addSuffix: true })}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">
                      👁️ {campaign.metrics?.impressions.toLocaleString() || '0'} impressions
                    </div>
                    <div className="text-sm">
                      🎯 {campaign.metrics?.clicks.toLocaleString() || '0'} clicks
                    </div>
                    <div className="text-sm">
                      💰 ROAS: {campaign.metrics?.revenue && campaign.metrics.spend ? (campaign.metrics.revenue / campaign.metrics.spend).toFixed(2) : '0.00'}x
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 