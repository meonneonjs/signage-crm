'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Settings } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  triggers: string[];
  actions: string[];
}

interface ActiveWorkflow {
  id: string;
  name: string;
  template: string;
  status: string;
  lastRun: string;
  stats: {
    runs: number;
    successful: number;
    failed: number;
  };
}

interface WorkflowListProps {
  templates: Template[];
  activeWorkflows: ActiveWorkflow[];
}

export function WorkflowList({ templates, activeWorkflows }: WorkflowListProps) {
  const getWorkflowStatus = (templateId: string) => {
    return activeWorkflows.find(w => w.template === templateId);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {templates.map(template => {
        const activeWorkflow = getWorkflowStatus(template.id);
        
        return (
          <Card key={template.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
                <Badge>{template.category}</Badge>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="text-sm font-medium">Triggers</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.triggers.map(trigger => (
                      <Badge
                        key={trigger}
                        variant="outline"
                        className="text-xs"
                      >
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium">Actions</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.actions.map(action => (
                      <Badge
                        key={action}
                        variant="outline"
                        className="text-xs"
                      >
                        {action}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {activeWorkflow ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <Badge
                      variant="outline"
                      className={
                        activeWorkflow.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {activeWorkflow.status === 'active' ? 'Running' : 'Paused'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Last Run</span>
                    <span>{new Date(activeWorkflow.lastRun).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Success Rate</span>
                    <span>
                      {Math.round(
                        (activeWorkflow.stats.successful / activeWorkflow.stats.runs) * 100
                      )}%
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      {activeWorkflow.status === 'active' ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full bg-[#1eb5b6] hover:bg-[#1eb5b6]/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
} 