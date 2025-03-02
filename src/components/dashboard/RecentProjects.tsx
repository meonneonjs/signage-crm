'use client';

import { Badge, Text } from "@tremor/react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  status: string;
  client: {
    name: string;
  };
  createdAt: Date;
}

interface RecentProjectsProps {
  projects: Project[];
}

const statusColors = {
  PENDING: 'yellow',
  IN_PROGRESS: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',
} as const;

export function RecentProjects({ projects }: RecentProjectsProps) {
  return (
    <div className="mt-6">
      <div className="flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project.id} className="py-5">
              <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                <h3 className="text-sm font-semibold text-gray-800">
                  <Link href={`/dashboard/projects/${project.id}`} className="hover:underline focus:outline-none">
                    {project.name}
                  </Link>
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <Text className="text-sm text-gray-600">
                    {project.client.name}
                  </Text>
                  <span className="text-gray-300">•</span>
                  <Badge color={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
                <Text className="mt-1 text-sm text-gray-500">
                  Created on {new Date(project.createdAt).toLocaleDateString()}
                </Text>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <Link
          href="/dashboard/projects"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          View all projects
        </Link>
      </div>
    </div>
  );
} 