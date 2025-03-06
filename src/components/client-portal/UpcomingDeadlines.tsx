import { CalendarClock } from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  project: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const priorityColors = {
  high: 'text-red-500 bg-red-50',
  medium: 'text-yellow-500 bg-yellow-50',
  low: 'text-green-500 bg-green-50',
};

export function UpcomingDeadlines() {
  // TODO: Replace with real data from API
  const deadlines: Deadline[] = [
    {
      id: '1',
      title: 'Design Review Meeting',
      project: 'Website Redesign',
      date: '2024-03-10T14:00:00Z',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Content Submission',
      project: 'Blog Launch',
      date: '2024-03-12T23:59:59Z',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'User Testing',
      project: 'Mobile App',
      date: '2024-03-15T09:00:00Z',
      priority: 'high',
    },
    {
      id: '4',
      title: 'Progress Review',
      project: 'E-commerce Platform',
      date: '2024-03-18T15:30:00Z',
      priority: 'low',
    },
  ];

  function formatDeadline(date: string) {
    const deadlineDate = new Date(date);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays < 7) {
      return `In ${diffDays} days`;
    } else {
      return deadlineDate.toLocaleDateString();
    }
  }

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {deadlines.map(deadline => (
            <div
              key={deadline.id}
              className="flex items-start gap-4 rounded-lg border p-4"
            >
              <div className="mt-1">
                <CalendarClock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{deadline.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {deadline.project}
                    </p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      priorityColors[deadline.priority]
                    }`}
                  >
                    {deadline.priority}
                  </div>
                </div>
                <p className="text-sm font-medium">
                  {formatDeadline(deadline.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 