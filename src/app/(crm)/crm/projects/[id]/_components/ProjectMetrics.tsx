import { Project } from '@/db/demo';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectMetricsProps {
  project: Project;
  totalBudget: number;
  budgetProgress: number;
  completedTasks: number;
  totalTasks: number;
  taskProgress: number;
}

export default function ProjectMetrics({
  project,
  totalBudget,
  budgetProgress,
  completedTasks,
  totalTasks,
  taskProgress,
}: ProjectMetricsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <div>
            <p className="font-medium">Timeline</p>
            <p>{format(new Date(project.startDate), 'MMM d')} - {format(new Date(project.dueDate), 'MMM d')}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <DollarSign className="h-4 w-4" />
          <div>
            <p className="font-medium">Budget</p>
            <div className="flex items-center gap-2">
              <p>${totalBudget.toLocaleString()}</p>
              <span className="text-xs">({Math.round(budgetProgress)}% invoiced)</span>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CheckCircle2 className="h-4 w-4" />
          <div>
            <p className="font-medium">Tasks</p>
            <div className="flex items-center gap-2">
              <p>{completedTasks} of {totalTasks} completed</p>
              <span className="text-xs">({Math.round(taskProgress)}%)</span>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <AlertCircle className="h-4 w-4" />
          <div>
            <p className="font-medium">Status</p>
            <Select defaultValue={project.status}>
              <SelectTrigger className="w-[140px] h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  );
} 