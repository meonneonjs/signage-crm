import { Card } from '@tremor/react';

export default function ProjectChatPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Project Chat</h1>
        <p className="mt-1 text-sm text-gray-500">
          Project-specific communication channel
        </p>
      </div>

      <Card>
        <div className="p-4">
          <p className="text-gray-500">Project chat functionality coming soon...</p>
          <p className="text-sm text-gray-400 mt-2">Project ID: {params.projectId}</p>
        </div>
      </Card>
    </div>
  );
} 