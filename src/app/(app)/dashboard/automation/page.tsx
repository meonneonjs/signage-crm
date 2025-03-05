'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Play, Pause, Settings } from 'lucide-react';
import { NewWorkflowDialog } from './_components/NewWorkflowDialog';
import { WorkflowList } from './_components/WorkflowList';

// Demo data - replace with actual API integration
const demoWorkflows = {
  templates: [
    {
      id: 'lead-nurture',
      name: 'Lead Nurturing',
      description: 'Automatically send follow-up emails to new leads',
      category: 'Sales',
      triggers: ['New Lead Created'],
      actions: ['Send Email', 'Create Task', 'Update Lead Status'],
    },
    {
      id: 'deal-update',
      name: 'Deal Updates',
      description: 'Notify team members when deals progress',
      category: 'Pipeline',
      triggers: ['Deal Stage Changed'],
      actions: ['Send Notification', 'Create Activity'],
    },
    {
      id: 'project-reminder',
      name: 'Project Reminders',
      description: 'Send reminders for upcoming project deadlines',
      category: 'Production',
      triggers: ['Project Due Date Approaching'],
      actions: ['Send Email', 'Create Task'],
    },
  ],
  active: [
    {
      id: '1',
      name: 'VIP Lead Follow-up',
      template: 'lead-nurture',
      status: 'active',
      lastRun: '2024-03-05T10:00:00Z',
      stats: {
        runs: 45,
        successful: 42,
        failed: 3,
      },
    },
    {
      id: '2',
      name: 'High-Value Deal Notifications',
      template: 'deal-update',
      status: 'paused',
      lastRun: '2024-03-04T15:30:00Z',
      stats: {
        runs: 28,
        successful: 28,
        failed: 0,
      },
    },
  ],
};

export default function AutomationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredTemplates = demoWorkflows.templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set(demoWorkflows.templates.map(t => t.category))
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Automation & Workflows</h1>
        <NewWorkflowDialog templates={demoWorkflows.templates} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Active Workflows</div>
              <Badge variant="outline" className="bg-green-100 text-green-800">Running</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">
              {demoWorkflows.active.filter(w => w.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Total Executions</div>
              <Badge variant="outline">Last 30 Days</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">
              {demoWorkflows.active.reduce((sum, w) => sum + w.stats.runs, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Success Rate</div>
              <Badge variant="outline">Last 30 Days</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">
              {Math.round(
                (demoWorkflows.active.reduce((sum, w) => sum + w.stats.successful, 0) /
                demoWorkflows.active.reduce((sum, w) => sum + w.stats.runs, 0)) * 100
              )}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Available Templates</div>
              <Settings className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold mt-2">
              {demoWorkflows.templates.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search templates..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={categoryFilter === category ? "default" : "outline"}
                    onClick={() => setCategoryFilter(
                      categoryFilter === category ? null : category
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <WorkflowList
              templates={filteredTemplates}
              activeWorkflows={demoWorkflows.active}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 