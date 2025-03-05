import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProjectProgressProps {
  taskProgress: number;
  budgetProgress: number;
  totalBudget: number;
  invoicedAmount: number;
}

export default function ProjectProgress({
  taskProgress,
  budgetProgress,
  totalBudget,
  invoicedAmount,
}: ProjectProgressProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-4">Project Progress</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Tasks Progress</span>
            <span className="text-sm font-medium">{Math.round(taskProgress)}%</span>
          </div>
          <Progress value={taskProgress} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Budget Used</span>
            <span className="text-sm font-medium">{Math.round(budgetProgress)}%</span>
          </div>
          <Progress value={budgetProgress} />
        </div>
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-lg font-medium">${totalBudget.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Invoiced</p>
              <p className="text-lg font-medium">${invoicedAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 