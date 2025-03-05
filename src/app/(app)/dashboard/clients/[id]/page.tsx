'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Check, X } from 'lucide-react';
import { ClientActions } from './actions';
import { useContactsStore } from '@/lib/stores/contactsStore';
import { useClientStore } from '@/lib/stores/clientStore';
import {
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  Clock,
  Calendar as CalendarIcon,
  MessageSquare,
  FileText,
  DollarSign,
  Settings,
  Activity,
  MessageCircle,
  FileIcon,
  Download,
  Upload,
  PlusCircle,
  AlertCircle,
  ChevronRight,
  History,
  CreditCard,
  Receipt,
  Settings2,
  Loader2,
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from 'next/navigation';
import { Client } from '@/lib/mockData';
import { TaskDialog } from './components/TaskDialog';
import { ProjectDialog } from './components/ProjectDialog';
import { MeetingDialog } from './components/MeetingDialog';
import ClientProjects from './_components/ClientProjects';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  label?: string;
  type?: string;
}

function EditableField({ value, onSave, label, type = 'text' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const { canPerformAction } = useContactsStore();

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="group flex items-center gap-2">
        {label && <span className="text-sm text-gray-500">{label}:</span>}
        <span>{value}</span>
        {canPerformAction('edit') && (
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="max-w-sm"
      />
      <Button size="sm" onClick={handleSave}>
        <Check className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" onClick={handleCancel}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const { currentClient, isLoading, error, fetchClient, updateClient, addProject, addTask, addCommunication } = useClientStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchClient(params.id);
    }
  }, [params.id, mounted, fetchClient]);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error || !currentClient) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            ← Back to Clients
          </Button>
        </div>
        <Card className="p-6 text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-red-500" />
          <h2 className="mt-4 text-xl font-semibold">Error Loading Client</h2>
          <p className="mt-2 text-gray-500">{error || 'Client not found'}</p>
          <Button className="mt-4" onClick={() => router.back()}>
            Return to Clients
          </Button>
        </Card>
      </div>
    );
  }

  const handleUpdateField = (field: keyof Client, value: string) => {
    updateClient(currentClient.id, { [field]: value });
  };

  const renderCommunicationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Communications History</h3>
        <div className="flex gap-2">
          <MeetingDialog 
            clientId={currentClient.id} 
            onMeetingScheduled={(meeting) => {
              addCommunication(currentClient.id, {
                type: 'meeting',
                subject: meeting.title,
                content: meeting.description,
                date: meeting.date,
                participants: meeting.participants,
              });
            }} 
          />
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Communication
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {currentClient.communications.map((comm) => (
          <Link href={`/dashboard/communications/${comm.id}`} key={comm.id}>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    comm.type === 'email' ? 'bg-blue-100' :
                    comm.type === 'call' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{comm.subject}</div>
                    <div className="text-sm text-gray-500">{comm.date.toLocaleDateString()}</div>
                    <div className="text-sm mt-1">{comm.content}</div>
                    <div className="flex gap-2 mt-2">
                      {comm.participants.map((participant) => (
                        <Badge variant="secondary" key={participant}>
                          {participant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );

  const renderDealsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Deals Pipeline</h3>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Deal
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'].map((stage) => (
          <div key={stage} className="space-y-4">
            <div className="font-medium capitalize">{stage.replace('-', ' ')}</div>
            {currentClient.deals
              .filter((deal) => deal.stage === stage)
              .map((deal) => (
                <Card key={deal.id} className="p-4">
                  <div className="space-y-2">
                    <div className="font-medium">{deal.name}</div>
                    <div className="text-sm text-gray-500">
                      ${deal.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Expected: {deal.expectedClose.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{deal.probability}%</span>
                    </div>
                  </div>
                  </Card>
              ))}
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <ProjectDialog 
          clientId={currentClient.id} 
          onProjectAdded={(project) => {
            addProject(currentClient.id, project);
          }} 
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <ClientProjects clientId={currentClient.id} />
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Documents</h3>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>
      <Card>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <FileIcon className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Contract.pdf</span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>Added 2 days ago</span>
            <span>2.3 MB</span>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderTasksTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <TaskDialog 
          clientId={currentClient.id} 
          onTaskAdded={(task) => {
            addTask(currentClient.id, task);
          }} 
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {currentClient.tasks.map((task) => (
          <Card key={task.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="font-medium">{task.title}</div>
                <Badge>{task.priority}</Badge>
            </div>
            <div className="text-sm text-gray-500">
                Due: {task.dueDate.toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <div className="bg-purple-500 w-full h-full flex items-center justify-center text-white text-xs">
                    {task.assignedTo[0]}
                </div>
              </Avatar>
                <span className="text-sm">Assigned to {task.assignedTo}</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full">
              View Task
            </Button>
          </div>
        </Card>
        ))}
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Billing & Payments</h3>
        <div className="flex gap-2">
          <Button variant="outline">
            <Receipt className="h-4 w-4 mr-2" />
            Invoices
          </Button>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            New Payment
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold mt-1">
            ${currentClient.revenue.toLocaleString()}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Outstanding Balance</div>
          <div className="text-2xl font-bold mt-1">$0.00</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-gray-500">Last Payment</div>
          <div className="text-2xl font-bold mt-1">$5,000.00</div>
          <div className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString()}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Client Settings</h3>
        <Button>
          <Settings2 className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      <div className="space-y-6">
        <Card className="p-4">
          <h4 className="font-medium mb-4">Preferences</h4>
          <div className="space-y-4">
            <div>
              <Label>Communication Preferences</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Billing Cycle</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{currentClient.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <EditableField
              value={currentClient.name}
              onSave={(value) => handleUpdateField('name', value)}
            />
            <div className="flex items-center gap-2 text-gray-500">
              <EditableField
                value={currentClient.company}
                onSave={(value) => handleUpdateField('company', value)}
              />
              <Badge variant={currentClient.status === 'active' ? 'default' : 'secondary'}>
                {currentClient.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <ClientActions clientId={params.id} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-8 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="deals">Deals</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <EditableField
                  value={currentClient.email}
                  onSave={(value) => handleUpdateField('email', value)}
                  label="Email"
                  type="email"
                />
                <EditableField
                  value={currentClient.phone}
                  onSave={(value) => handleUpdateField('phone', value)}
                  label="Phone"
                  type="tel"
                />
                <EditableField
                  value={currentClient.address}
                  onSave={(value) => handleUpdateField('address', value)}
                  label="Address"
                />
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Account Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Assigned to: {currentClient.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Last Contact: {currentClient.lastContact.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span>Type: {currentClient.type}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Total Revenue</span>
                  <span className="font-medium">${currentClient.revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Active Projects</span>
                  <span className="font-medium">{currentClient.projects.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Open Deals</span>
                  <span className="font-medium">{currentClient.deals.length}</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Atelier Connect Chats</h3>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  View All Chats
                </Button>
              </div>
              <div className="space-y-4">
                {currentClient.chatThreads?.map((thread) => (
                  <Link href={`/dashboard/chat/${thread.id}`} key={thread.id}>
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{thread.title}</div>
                        <div className="text-sm text-gray-500">{thread.lastMessage}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-gray-500">
                          {thread.lastMessageDate.toLocaleDateString()}
                        </div>
                        {thread.unreadCount > 0 && (
                          <Badge>{thread.unreadCount}</Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Active Deals</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-4">
                {currentClient.deals.map((deal) => (
                  <div key={deal.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 rounded-full bg-green-100">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{deal.name}</div>
                      <div className="text-sm text-gray-500">
                        ${deal.value.toLocaleString()} • {deal.probability}% probability
                      </div>
                      <div className="text-sm mt-1">
                        Expected close: {deal.expectedClose.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communications">
          {renderCommunicationsTab()}
        </TabsContent>

        <TabsContent value="deals">
          {renderDealsTab()}
        </TabsContent>

        <TabsContent value="projects">
          {renderProjectsTab()}
        </TabsContent>

        <TabsContent value="documents">
          {renderDocumentsTab()}
        </TabsContent>

        <TabsContent value="tasks">
          {renderTasksTab()}
        </TabsContent>

        <TabsContent value="billing">
          {renderBillingTab()}
        </TabsContent>

        <TabsContent value="settings">
          {renderSettingsTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
} 