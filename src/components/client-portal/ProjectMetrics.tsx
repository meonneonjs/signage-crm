import { Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function MetricCard({ title, value, icon: Icon, description, trend }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold">{value}</span>
        {trend && (
          <span
            className={`text-sm ${
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function ProjectMetrics() {
  // TODO: Replace with real data from API
  const metrics = [
    {
      title: 'Active Projects',
      value: 12,
      icon: Clock,
      description: 'Projects in progress',
      trend: { value: 8, isPositive: true },
    },
    {
      title: 'Completed',
      value: 48,
      icon: CheckCircle,
      description: 'Projects delivered',
    },
    {
      title: 'Pending Actions',
      value: 3,
      icon: AlertCircle,
      description: 'Requires attention',
    },
    {
      title: 'Upcoming',
      value: 5,
      icon: Calendar,
      description: 'Starting this month',
    },
  ];

  return (
    <>
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </>
  );
} 