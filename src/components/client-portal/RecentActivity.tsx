import { FileCheck, MessageSquare, Upload, UserCircle2 } from 'lucide-react';

interface Activity {
  id: string;
  type: 'design_approval' | 'comment' | 'file_upload' | 'team_update';
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    role: string;
  };
}

const activityIcons = {
  design_approval: FileCheck,
  comment: MessageSquare,
  file_upload: Upload,
  team_update: UserCircle2,
};

const activityColors = {
  design_approval: 'bg-green-100 text-green-600',
  comment: 'bg-blue-100 text-blue-600',
  file_upload: 'bg-purple-100 text-purple-600',
  team_update: 'bg-orange-100 text-orange-600',
};

export function RecentActivity() {
  // TODO: Replace with real data from API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'design_approval',
      title: 'Design Approved',
      description: 'Homepage design concept approved',
      timestamp: '2024-03-05T10:30:00Z',
      user: {
        name: 'Sarah Johnson',
        role: 'Project Manager',
      },
    },
    {
      id: '2',
      type: 'comment',
      title: 'New Comment',
      description: 'Added feedback on the color scheme',
      timestamp: '2024-03-05T09:15:00Z',
      user: {
        name: 'Mike Chen',
        role: 'Client',
      },
    },
    {
      id: '3',
      type: 'file_upload',
      title: 'Files Uploaded',
      description: 'Updated brand assets uploaded',
      timestamp: '2024-03-04T16:45:00Z',
      user: {
        name: 'Alex Kim',
        role: 'Designer',
      },
    },
    {
      id: '4',
      type: 'team_update',
      title: 'Team Update',
      description: 'New developer added to the project',
      timestamp: '2024-03-04T14:20:00Z',
      user: {
        name: 'Emily Davis',
        role: 'Team Lead',
      },
    },
  ];

  function formatTimeAgo(timestamp: string) {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {activities.map(activity => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <div key={activity.id} className="flex gap-4">
                <div className={`rounded-lg p-2 ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <time className="text-sm text-muted-foreground">
                      {formatTimeAgo(activity.timestamp)}
                    </time>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{activity.user.name}</span>
                    <span>•</span>
                    <span>{activity.user.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 