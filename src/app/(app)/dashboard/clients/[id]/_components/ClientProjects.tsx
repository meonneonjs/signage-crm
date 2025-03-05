import { Project, demoProjects } from '@/db/demo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { format } from 'date-fns';

interface ClientProjectsProps {
  clientId: string;
}

export default function ClientProjects({ clientId }: ClientProjectsProps) {
  const clientProjects = demoProjects.filter(p => p.clientId === clientId);

  if (clientProjects.length === 0) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <p>No projects found for this client</p>
        <p className="text-sm mt-1">Create a new project to get started</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {clientProjects.map(project => {
        const progress = project.status === 'completed' ? 100 : 
          project.status === 'review' ? 75 :
          project.status === 'in-progress' ? 50 :
          25;

        return (
          <Link 
            key={project.id} 
            href={`/dashboard/projects/${project.id}`}
            className="block"
          >
            <Card className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{project.name}</h3>
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                <div className="text-sm text-right">
                  <p className="text-gray-500">Due date</p>
                  <p className="font-medium">{format(new Date(project.dueDate), 'MMM d, yyyy')}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="mt-4 flex gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
} 