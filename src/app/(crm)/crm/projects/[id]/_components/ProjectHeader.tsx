import { Project } from '@/db/demo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Plus } from 'lucide-react';

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <Badge variant={project.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
            {project.status}
          </Badge>
        </div>
        <p className="text-gray-500">{project.description}</p>
        <div className="flex gap-2 mt-2">
          {project.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Log Time
        </Button>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
    </div>
  );
} 