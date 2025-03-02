import { Card, Text, Badge } from '@tremor/react';
import { format } from 'date-fns';
import { ProductionSchedule, Project, SignageSpecification } from '@prisma/client';

type ExtendedProductionSchedule = ProductionSchedule & {
  project: Project & {
    specifications: SignageSpecification[];
  };
};

interface ProductionScheduleCardProps {
  schedules: ExtendedProductionSchedule[];
}

function getStatusColor(status: string) {
  const colors = {
    scheduled: 'yellow',
    in_progress: 'blue',
    completed: 'green',
    delayed: 'red',
  } as const;
  return colors[status.toLowerCase() as keyof typeof colors] || 'gray';
}

export function ProductionScheduleCard({ schedules }: ProductionScheduleCardProps) {
  return (
    <div className="divide-y divide-gray-200">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <Text className="font-medium">{schedule.project.specifications[0]?.type || 'Untitled'}</Text>
              <Text className="text-sm text-gray-500">
                Project: {schedule.project.name}
              </Text>
            </div>
            <Badge color={getStatusColor(schedule.status)}>
              {schedule.status}
            </Badge>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <Text className="text-sm text-gray-500">Start Date</Text>
              <Text className="text-sm">
                {format(new Date(schedule.startDate), 'MMM d, yyyy')}
              </Text>
            </div>
            <div>
              <Text className="text-sm text-gray-500">End Date</Text>
              <Text className="text-sm">
                {format(new Date(schedule.endDate), 'MMM d, yyyy')}
              </Text>
            </div>
            <div>
              <Text className="text-sm text-gray-500">Machine</Text>
              <Text className="text-sm">
                {schedule.assignedMachine || 'Not assigned'}
              </Text>
            </div>
            <div>
              <Text className="text-sm text-gray-500">Materials</Text>
              <Text className="text-sm">
                {schedule.materialStatus || 'Not specified'}
              </Text>
            </div>
          </div>

          {/* Production Stages */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {['designStage', 'printingStage', 'fabricationStage', 'assemblyStage'].map((stage) => {
              const stageData = schedule[stage as keyof ProductionSchedule] as any;
              return (
                <div key={stage} className="rounded-lg bg-gray-50 p-3">
                  <Text className="text-sm font-medium">
                    {stage.replace('Stage', '').charAt(0).toUpperCase() + stage.slice(1).replace('Stage', '')}
                  </Text>
                  <Badge
                    color={getStatusColor(stageData?.status || 'pending')}
                    className="mt-1"
                  >
                    {stageData?.status || 'Pending'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
} 