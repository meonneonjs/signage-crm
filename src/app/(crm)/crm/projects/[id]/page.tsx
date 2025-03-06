'use client';

import { notFound } from 'next/navigation';
import { demoProjects, demoClients, demoTasks, demoInvoices } from '@/db/demo';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Users,
  Clock,
  FileText,
  MessageSquare,
  Paperclip,
  Calendar,
  DollarSign,
  Plus,
  Building,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskList from './_components/TaskList';
import ProjectHeader from './_components/ProjectHeader';
import ProjectMetrics from './_components/ProjectMetrics';
import ClientInfo from './_components/ClientInfo';
import ProjectProgress from './_components/ProjectProgress';
import { useState } from 'react';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [projectData, setProjectData] = useState(() => {
    const project = demoProjects.find((p) => p.id === params.id);
    if (!project) return null;
    return project;
  });

  if (!projectData) {
    notFound();
  }

  const client = demoClients.find((c) => c.id === projectData.clientId);
  const tasks = demoTasks.filter((t) => t.projectId === projectData.id);
  const invoices = demoInvoices.filter((i) => i.projectId === projectData.id);

  const totalBudget = projectData.budget;
  const invoicedAmount = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const budgetProgress = (invoicedAmount / totalBudget) * 100;

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleClientChange = (clientId: string) => {
    setProjectData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        clientId
      };
    });
  };

  return (
    <div className="h-full flex flex-col gap-8 p-8">
      <ProjectHeader project={projectData} />
      <ProjectMetrics 
        project={projectData}
        totalBudget={totalBudget}
        budgetProgress={budgetProgress}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        taskProgress={taskProgress}
      />

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <Card className="flex-1">
            <Tabs defaultValue="tasks" className="h-full">
              <TabsList className="p-2 bg-transparent border-b">
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="p-4">
                  <TabsContent value="tasks" className="mt-0">
                    <TaskList tasks={tasks} />
                  </TabsContent>
                  <TabsContent value="timeline" className="mt-0">
                    <div className="space-y-4">
                      {/* Timeline implementation */}
                    </div>
                  </TabsContent>
                  <TabsContent value="files" className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
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
                    </div>
                  </TabsContent>
                  <TabsContent value="comments" className="mt-0">
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
                  </TabsContent>
                  <TabsContent value="invoices" className="mt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Invoices</h3>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Invoice
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {invoices.map(invoice => (
                          <div key={invoice.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg border">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{invoice.number}</span>
                                <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'} className="text-xs">
                                  {invoice.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-1">
                                <p className="text-sm text-gray-500">
                                  Due {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                                </p>
                                <p className="text-sm font-medium">${invoice.total.toLocaleString()}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </Card>
        </div>

        <div className="space-y-6">
          <ClientInfo 
            client={client} 
            onClientChange={handleClientChange}
          />
          <ProjectProgress 
            taskProgress={taskProgress} 
            budgetProgress={budgetProgress}
            totalBudget={totalBudget}
            invoicedAmount={invoicedAmount}
          />
        </div>
      </div>
    </div>
  );
} 