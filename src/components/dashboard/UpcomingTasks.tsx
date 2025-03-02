'use client';

import { Badge, Text } from "@tremor/react";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: Date | null;
  project: {
    id: string;
    name: string;
  } | null;
  assignedTo: {
    name: string;
  } | null;
}

interface UpcomingTasksProps {
  tasks: (Task & { dueDate: Date })[];  // Only tasks with due dates
}

const priorityColors = {
  LOW: 'gray',
  MEDIUM: 'yellow',
  HIGH: 'orange',
  URGENT: 'red',
} as const;

export function UpcomingTasks({ tasks }: UpcomingTasksProps) {
  return (
    <div className="mt-6">
      <div className="flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id} className="py-5">
              <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                <h3 className="text-sm font-semibold text-gray-800">
                  <Link href={`/dashboard/tasks/${task.id}`} className="hover:underline focus:outline-none">
                    {task.title}
                  </Link>
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  {task.project && (
                    <>
                      <Text className="text-sm text-gray-600">
                        {task.project.name}
                      </Text>
                      <span className="text-gray-300">•</span>
                    </>
                  )}
                  <Badge color={priorityColors[task.priority]}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Text className="text-sm text-gray-500">
                    Due {task.dueDate.toLocaleDateString()}
                  </Text>
                  {task.assignedTo && (
                    <>
                      <span className="text-gray-300">•</span>
                      <Text className="text-sm text-gray-500">
                        Assigned to {task.assignedTo.name}
                      </Text>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href="/dashboard/tasks"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          View all tasks
        </Link>
      </div>
    </div>
  );
} 