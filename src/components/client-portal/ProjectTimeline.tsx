import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface TimelineItem {
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
}

const statusIcons = {
  completed: CheckCircle2,
  'in-progress': Clock,
  upcoming: Circle,
};

const statusColors = {
  completed: 'text-green-500',
  'in-progress': 'text-blue-500',
  upcoming: 'text-gray-300',
};

export function ProjectTimeline() {
  // TODO: Replace with real data from API
  const timelineItems: TimelineItem[] = [
    {
      title: 'Project Kickoff',
      date: '2024-03-01',
      status: 'completed',
      description: 'Initial meeting and requirements gathering',
    },
    {
      title: 'Design Phase',
      date: '2024-03-15',
      status: 'in-progress',
      description: 'Creating initial design concepts',
    },
    {
      title: 'Development',
      date: '2024-04-01',
      status: 'upcoming',
      description: 'Implementation of approved designs',
    },
    {
      title: 'Testing',
      date: '2024-04-15',
      status: 'upcoming',
      description: 'Quality assurance and bug fixes',
    },
  ];

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Project Timeline</h2>
      </div>
      <div className="p-4">
        <div className="space-y-8">
          {timelineItems.map((item, index) => {
            const Icon = statusIcons[item.status];
            const colorClass = statusColors[item.status];

            return (
              <div key={index} className="relative pl-8">
                {index !== timelineItems.length - 1 && (
                  <div
                    className="absolute left-[15px] top-[24px] h-full w-px bg-border"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-start">
                  <div className={`absolute left-0 ${colorClass}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.title}</h3>
                      <time className="text-sm text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </time>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
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