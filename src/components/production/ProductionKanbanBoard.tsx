import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, Text, Badge } from '@tremor/react';
import { Project, SignageSpecification } from '@prisma/client';

type ExtendedProject = Project & {
  specifications: SignageSpecification[];
};

interface ProductionKanbanBoardProps {
  projects: ExtendedProject[];
}

const stages = [
  'Design',
  'Printing',
  'Fabrication',
  'Assembly',
  'Quality Check',
  'Ready for Installation',
] as const;

interface ProjectCardProps {
  project: ExtendedProject;
  stage: string;
}

function ProjectCard({ project, stage }: ProjectCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'project',
    item: { id: project.id, currentStage: stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move ${isDragging ? 'opacity-50' : ''}`}
    >
      <Card className="p-4">
        <Text className="font-medium">{project.name}</Text>
        <Text className="text-sm text-gray-500">
          {project.specifications[0]?.type || 'No type specified'}
        </Text>
        <div className="mt-2">
          <Badge color="blue">
            {project.progressPercentage}% Complete
          </Badge>
        </div>
      </Card>
    </div>
  );
}

function StageColumn({ stage, projects }: { stage: string; projects: ExtendedProject[] }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'project',
    drop: (item: { id: string; currentStage: string }) => {
      // Handle stage update through API
      console.log(`Moving project ${item.id} from ${item.currentStage} to ${stage}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const stageProjects = projects.filter(
    (project) => project.productionSchedule?.[`${stage.toLowerCase()}Stage`]?.status === 'in_progress'
  );

  return (
    <div
      ref={drop}
      className={`rounded-lg bg-gray-50 p-4 ${isOver ? 'bg-blue-50' : ''}`}
    >
      <Text className="font-medium mb-4">{stage}</Text>
      <div className="space-y-4">
        {stageProjects.map((project) => (
          <ProjectCard key={project.id} project={project} stage={stage} />
        ))}
      </div>
    </div>
  );
}

export function ProductionKanbanBoard({ projects }: ProductionKanbanBoardProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stages.map((stage) => (
          <StageColumn key={stage} stage={stage} projects={projects} />
        ))}
      </div>
    </DndProvider>
  );
} 