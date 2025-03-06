import { Clock, FolderOpen, Tag, User } from 'lucide-react';

interface DesignInfoProps {
  design: {
    title: string;
    description: string;
    status: string;
    submittedBy: {
      name: string;
      avatar: string;
    };
    submittedAt: string;
    version: number;
    project: string;
  };
}

export function DesignInfo({ design }: DesignInfoProps) {
  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  const infoItems = [
    {
      icon: User,
      label: 'Submitted by',
      value: design.submittedBy.name,
    },
    {
      icon: Clock,
      label: 'Submitted on',
      value: formatDate(design.submittedAt),
    },
    {
      icon: Tag,
      label: 'Version',
      value: `v${design.version}`,
    },
    {
      icon: FolderOpen,
      label: 'Project',
      value: design.project,
    },
  ];

  return (
    <div className="rounded-lg border bg-card">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Design Information</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{design.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {design.description}
            </p>
          </div>

          <div className="space-y-3">
            {infoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
} 