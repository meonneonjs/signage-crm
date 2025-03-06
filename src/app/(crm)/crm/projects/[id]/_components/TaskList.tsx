'use client';

import { Task } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(
    new Set(tasks.filter(t => t.status === 'completed').map(t => t.id))
  );

  const handleTaskToggle = (taskId: string) => {
    setCompletedTaskIds(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Tasks ({completedTasks}/{totalTasks})</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-2 p-3 hover:bg-gray-50 rounded-lg border">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={completedTaskIds.has(task.id)}
              onChange={() => handleTaskToggle(task.id)}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{task.title}</span>
                <Badge variant="secondary" className="text-xs">{task.priority}</Badge>
              </div>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">
                Due {format(new Date(task.dueDate), 'MMM d')}
              </div>
              <Avatar className="h-6 w-6">
                <AvatarFallback>
                  {task.assigneeId.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 