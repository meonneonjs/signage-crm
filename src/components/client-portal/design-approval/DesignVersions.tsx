import { CheckCircle, Clock, XCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Version {
  version: number;
  status: 'approved' | 'rejected' | 'pending';
  updatedAt: string;
  changes: string;
}

interface DesignVersionsProps {
  designId: string;
  currentVersion: number;
}

const statusConfig = {
  approved: {
    icon: CheckCircle,
    color: 'text-green-500',
    label: 'Approved',
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-500',
    label: 'Rejected',
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    label: 'Pending',
  },
};

export function DesignVersions({ designId, currentVersion }: DesignVersionsProps) {
  // TODO: Replace with real data from API
  const versions: Version[] = [
    {
      version: 2,
      status: 'pending',
      updatedAt: '2024-03-05T10:30:00Z',
      changes: 'Updated layout with client feedback',
    },
    {
      version: 1,
      status: 'rejected',
      updatedAt: '2024-03-01T15:45:00Z',
      changes: 'Initial design submission',
    },
  ];

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Version History</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {versions.map((version) => {
            const StatusIcon = statusConfig[version.status].icon;
            const isCurrentVersion = version.version === currentVersion;

            return (
              <Link
                key={version.version}
                href={`/design-approval/${designId}?version=${version.version}`}
                className={cn(
                  'block rounded-lg border p-3 transition-colors',
                  isCurrentVersion ? 'border-primary bg-accent' : 'hover:bg-accent'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Version {version.version}</span>
                    {isCurrentVersion && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <div className={`flex items-center gap-1 ${statusConfig[version.status].color}`}>
                    <StatusIcon className="h-4 w-4" />
                    <span className="text-sm">{statusConfig[version.status].label}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {version.changes}
                </p>
                <time className="mt-1 block text-sm text-muted-foreground">
                  {formatDate(version.updatedAt)}
                </time>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 