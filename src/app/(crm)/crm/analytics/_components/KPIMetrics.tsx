'use client';

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface KPIMetric {
  label: string;
  value: string | number;
  trend: number;
  prefix?: string;
  suffix?: string;
}

interface KPIMetricsProps {
  metrics: KPIMetric[];
}

export function KPIMetrics({ metrics }: KPIMetricsProps) {
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {metric.prefix}{metric.value}{metric.suffix}
            </div>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <div className={`flex items-center mt-2 ${getTrendColor(metric.trend)}`}>
              {getTrendIcon(metric.trend)}
              <span className="ml-1">{Math.abs(metric.trend)}%</span>
              <span className="text-sm text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 