'use client';

import { Text } from "@tremor/react";

interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: Date;
  user: {
    name: string;
  };
}

interface RecentActivityProps {
  activities: Activity[];
}

const activityTypeIcons = {
  PROJECT_CREATED: '🎯',
  TASK_COMPLETED: '✅',
  COMMENT_ADDED: '💬',
  FILE_UPLOADED: '📎',
  PROPOSAL_SENT: '📤',
  CLIENT_ADDED: '👥',
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="mt-6">
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {activities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== activities.length - 1 ? (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white text-lg">
                      {activityTypeIcons[activity.type as keyof typeof activityTypeIcons] || '📋'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <Text className="font-medium text-gray-900">
                          {activity.user.name}
                        </Text>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {activity.description}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <time dateTime={activity.createdAt.toISOString()}>
                        {new Date(activity.createdAt).toLocaleDateString()} at{' '}
                        {new Date(activity.createdAt).toLocaleTimeString()}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 