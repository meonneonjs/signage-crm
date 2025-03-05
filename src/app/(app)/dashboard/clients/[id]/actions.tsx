import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  FileText,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  DollarSign,
  ClipboardList,
  MoreVertical,
  Flag,
  Bell,
  Tag,
  Users,
} from 'lucide-react';
import { useContactsStore } from '@/lib/stores/contactsStore';

interface ActionProps {
  clientId: string;
}

export function ClientActions({ clientId }: ActionProps) {
  const { canPerformAction } = useContactsStore();
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setActiveSheet(action);
  };

  const renderActionSheet = () => {
    switch (activeSheet) {
      case 'add-task':
        return (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Task</SheetTitle>
              <SheetDescription>Create a new task for this client</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="task-title">Task Title</Label>
                <Input id="task-title" placeholder="Enter task title" />
              </div>
              <div>
                <Label htmlFor="task-description">Description</Label>
                <Textarea id="task-description" placeholder="Enter task description" />
              </div>
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input type="datetime-local" id="due-date" />
              </div>
              <div>
                <Label htmlFor="assignee">Assign To</Label>
                <Input id="assignee" placeholder="Select team member" />
              </div>
              <Button className="w-full">Create Task</Button>
            </div>
          </SheetContent>
        );

      case 'add-project':
        return (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>New Project</SheetTitle>
              <SheetDescription>Start a new project with this client</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </div>
              <div>
                <Label htmlFor="project-description">Description</Label>
                <Textarea id="project-description" placeholder="Enter project description" />
              </div>
              <div>
                <Label htmlFor="project-budget">Budget</Label>
                <Input type="number" id="project-budget" placeholder="Enter budget" />
              </div>
              <div>
                <Label htmlFor="project-timeline">Timeline</Label>
                <Input type="date" id="project-timeline" />
              </div>
              <Button className="w-full">Create Project</Button>
            </div>
          </SheetContent>
        );

      case 'schedule-meeting':
        return (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Schedule Meeting</SheetTitle>
              <SheetDescription>Schedule a meeting with this client</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="meeting-title">Meeting Title</Label>
                <Input id="meeting-title" placeholder="Enter meeting title" />
              </div>
              <div>
                <Label htmlFor="meeting-date">Date & Time</Label>
                <Input type="datetime-local" id="meeting-date" />
              </div>
              <div>
                <Label htmlFor="meeting-type">Meeting Type</Label>
                <Input id="meeting-type" placeholder="In-person / Virtual" />
              </div>
              <div>
                <Label htmlFor="meeting-agenda">Agenda</Label>
                <Textarea id="meeting-agenda" placeholder="Enter meeting agenda" />
              </div>
              <Button className="w-full">Schedule Meeting</Button>
            </div>
          </SheetContent>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Sheet open={activeSheet !== null} onOpenChange={() => setActiveSheet(null)}>
        <div className="flex items-center gap-2">
          <SheetTrigger asChild>
            <Button variant="outline" onClick={() => handleAction('add-task')}>
              <ClipboardList className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </SheetTrigger>

          <SheetTrigger asChild>
            <Button variant="outline" onClick={() => handleAction('add-project')}>
              <FileText className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </SheetTrigger>

          <SheetTrigger asChild>
            <Button variant="outline" onClick={() => handleAction('schedule-meeting')}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </SheetTrigger>

          {canPerformAction('edit') && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  More Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Phone className="h-4 w-4 mr-2" />
                  Log Call
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Create Quote
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" />
                  Set Follow-up
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Tag className="h-4 w-4 mr-2" />
                  Manage Tags
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  Change Owner
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {renderActionSheet()}
      </Sheet>
    </div>
  );
} 