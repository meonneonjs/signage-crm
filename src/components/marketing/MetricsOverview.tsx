'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MarketingPlatform } from '@prisma/client';

interface MetricsOverviewProps {
  metrics: {
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
  };
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalCampaigns}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.activeCampaigns} active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.totalSpend)}</div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(metrics.totalRevenue)} revenue
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ROAS</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 3h5v5M4 20L21 3M21 16v5h-5" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.roas.toFixed(2)}x</div>
          <p className="text-xs text-muted-foreground">
            Return on ad spend
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Platform Performance</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {metrics.platformMetrics.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-1">{getPlatformIcon(platform.platform)}</span>
                  <span>{platform.platform}</span>
                </div>
                <div className="font-medium">
                  {formatNumber(platform.impressions)} imp.
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 