'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ViewSwitcher, ViewType } from '@/components/app/ViewSwitcher';
import { FilterBar, FilterOption } from '@/components/app/FilterBar';
import { demoProjects, demoProjectModules } from '@/db/demo';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  ArrowRight, 
  Settings, 
  Users, 
  Clock, 
  FileText, 
  MessageSquare, 
  Paperclip,
  Calendar,
  DollarSign,
  BarChart2,
  GitBranch,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ModuleManager } from '@/components/app/ModuleManager';
import { CustomFields } from '@/components/app/CustomFields';
import { Module } from '@/types/customFields';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

const filterOptions: FilterOption[] = [
  {
    id: 'status',
    label: 'Status',
    options: ['planning', 'in-progress', 'review', 'completed'],
  },
  {
    id: 'priority',
    label: 'Priority',
    options: ['low', 'medium', 'high', 'urgent'],
  },
  {
    id: 'tags',
    label: 'Tags',
    options: ['branding', 'design', 'marketing', 'digital', 'photography', 'product'],
  },
  {
    id: 'team',
    label: 'Team',
    options: ['design', 'development', 'marketing', 'sales'],
  },
  {
    id: 'client',
    label: 'Client',
    options: ['internal', 'external'],
  },
];

type ExtendedViewType = ViewType | 'kanban' | 'timeline' | 'calendar';

export default function ProjectsPage() {
  const [view, setView] = useState<ExtendedViewType>('list');
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState('');
  const [modules, setModules] = useState<Module[]>(demoProjectModules);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Filter and search projects
  const filteredProjects = demoProjects.filter(project => {
    // Search
    if (search && !project.name.toLowerCase().includes(search.toLowerCase()) &&
        !project.description.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Filters
    for (const [key, values] of Object.entries(filters)) {
      if (values.length === 0) continue;
      if (key === 'tags') {
        if (!project.tags.some(tag => values.includes(tag))) return false;
      } else if (key === 'status' && !values.includes(project.status)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="h-full flex">
      <div className="flex-1 flex flex-col">
        <div className="border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">Projects</h1>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Project Settings</SheetTitle>
                    <SheetDescription>
                      Customize project fields and modules
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <ModuleManager
                      modules={modules}
                      onModulesChange={setModules}
                      entityType="project"
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <FilterBar
                  filters={filterOptions}
                  onFilterChange={setFilters}
                  onSearchChange={setSearch}
                />
              </div>
              <ViewSwitcher
                currentView={view as ViewType}
                onViewChange={(v: ViewType) => setView(v as ExtendedViewType)}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {view === 'kanban' && renderKanbanBoard()}
          {view === 'timeline' && renderTimelineView()}
          {view === 'list' && renderListView()}
        </div>
      </div>

      {selectedProject && (
        <Sheet open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <SheetContent side="right" className="w-[600px] sm:max-w-[600px]">
            <SheetHeader>
              <SheetTitle>Project Details</SheetTitle>
            </SheetHeader>
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                <TabsContent value="overview" className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Project Information</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <Badge className="mt-1">In Progress</Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Priority</p>
                          <Badge variant="secondary" className="mt-1">High</Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="text-sm mt-1">
                          {demoProjects.find(p => p.id === selectedProject)?.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Timeline</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="text-sm mt-1">
                            {format(new Date(demoProjects.find(p => p.id === selectedProject)?.startDate || ''), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Due Date</p>
                          <p className="text-sm mt-1">
                            {format(new Date(demoProjects.find(p => p.id === selectedProject)?.dueDate || ''), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={70} className="flex-1" />
                          <span className="text-sm">70%</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <h3 className="font-medium mb-2">Custom Fields</h3>
                    <CustomFields
                      fields={modules.flatMap(m => m.fields)}
                      values={demoProjects.find(p => p.id === selectedProject)?.customFields || {}}
                      onChange={() => {}}
                    />
                  </Card>
                </TabsContent>
                <TabsContent value="tasks" className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Tasks</h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Task
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                          <input type="checkbox" className="h-4 w-4" />
                          <span className="text-sm flex-1">Task {i}</span>
                          <Badge variant="secondary" className="text-xs">High</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="team" className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Team Members</h3>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                          <Avatar>
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">User {i}</p>
                            <p className="text-xs text-gray-500">Role</p>
                          </div>
                          <Badge variant="outline" className="text-xs">Owner</Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="files" className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Files</h3>
                      <Button size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Document {i}.pdf</p>
                            <p className="text-xs text-gray-500">1.2 MB • Uploaded 2 days ago</p>
                          </div>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="comments" className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Comments</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Input className="flex-1" placeholder="Write a comment..." />
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Comment
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex gap-3">
                            <Avatar>
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">User {i}</p>
                                <p className="text-xs text-gray-500">2 days ago</p>
                              </div>
                              <p className="text-sm mt-1">This is a comment on the project.</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );

  function renderKanbanBoard() {
    const columns = ['planning', 'in-progress', 'review', 'completed'];
    
    return (
      <div className="grid grid-cols-4 gap-4 p-4">
        {columns.map(status => (
          <div key={status} className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4 capitalize">{status}</h3>
            <div className="space-y-4">
              {filteredProjects
                .filter(project => project.status === status)
                .map(project => (
                  <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{project.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarDays className="h-4 w-4" />
                          <span>Due {format(new Date(project.dueDate), 'MMM d')}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={70} className="flex-1" />
                          <span className="text-sm text-gray-500">70%</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-white">
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderTimelineView() {
    return (
      <div className="p-4">
        <div className="space-y-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
              <div className="ml-8 relative">
                <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-primary-500" />
                <Link href={`/dashboard/projects/${project.id}`}>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                      </div>
                      <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(project.startDate), 'MMM d')} - {format(new Date(project.dueDate), 'MMM d')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>5 team members</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>120 hours logged</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <DollarSign className="h-4 w-4" />
                        <span>Budget: $15,000</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                      <Progress value={70} />
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderListView() {
    return (
      <div className="space-y-4 p-4">
        {filteredProjects.map(project => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.description}</p>
                </div>
                <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Timeline</p>
                    <p>{format(new Date(project.startDate), 'MMM d')} - {format(new Date(project.dueDate), 'MMM d')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Team</p>
                    <div className="flex -space-x-2 mt-1">
                      {[1, 2, 3].map(i => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-white">
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Time Logged</p>
                    <p>120 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <DollarSign className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Budget</p>
                    <p>$15,000</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} />
                </div>
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    );
  }
} 