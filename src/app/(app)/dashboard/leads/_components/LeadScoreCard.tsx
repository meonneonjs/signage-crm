'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface LeadScoreCardProps {
  title: string;
  score: number;
  trend: number;
  description: string;
  suffix?: string;
  isCount?: boolean;
}

export function LeadScoreCard({
  title,
  score,
  trend,
  description,
  suffix = '',
  isCount = false,
}: LeadScoreCardProps) {
  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUpIcon className="w-4 h-4" />;
    if (trend < 0) return <ArrowDownIcon className="w-4 h-4" />;
    return null;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <div className="text-2xl font-bold">
            {isCount ? score : score.toFixed(1)}{suffix}
          </div>
          <div className={`ml-2 flex items-center text-sm ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
            <span className="ml-1">{Math.abs(trend)}%</span>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
} 