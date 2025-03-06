'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewTaskDialog } from './_components/NewTaskDialog';
import { ScheduleEventDialog } from './_components/ScheduleEventDialog';

// Demo data - replace with actual data fetching
const demoTasks = [
  {
    id: '1',
    title: 'Client Presentation',
    description: 'Prepare and deliver project presentation',
    assignedTo: 'John Doe',
    dueDate: '2024-03-10',
    priority: 'high',
    status: 'in-progress',
    project: 'Website Redesign'
  },
  {
    id: '2',
    title: 'Contract Review',
    description: 'Review and update client contract',
    assignedTo: 'Sarah Smith',
    dueDate: '2024-03-15',
    priority: 'medium',
    status: 'pending',
    project: 'Legal Documentation'
  }
];

const demoEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync',
    date: '2024-03-07',
    time: '10:00',
    attendees: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
    type: 'internal'
  },
  {
    id: '2',
    title: 'Client Call',
    description: 'Project status update',
    date: '2024-03-08',
    time: '14:30',
    attendees: ['Sarah Smith', 'Client Name'],
    type: 'external'
  }
];

const priorities = ['low', 'medium', 'high'];
const statuses = ['pending', 'in-progress', 'completed'];

export default function TasksPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState<'day' | 'week'>('week');
  const [tasks, setTasks] = useState(demoTasks);
  const [events, setEvents] = useState(demoEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleCreateTask = (task: {
    title: string;
    description: string;
    assignedTo: string;
    dueDate: Date;
    priority: string;
    project: string;
  }) => {
    const newTask = {
      id: (tasks.length + 1).toString(),
      ...task,
      dueDate: task.dueDate.toISOString().split('T')[0],
      status: 'pending'
    };
    setTasks([...tasks, newTask]);
  };

  const handleScheduleEvent = (event: {
    title: string;
    description: string;
    date: Date;
    time: string;
    type: string;
    attendees: string[];
  }) => {
    const newEvent = {
      id: (events.length + 1).toString(),
      ...event,
      date: event.date.toISOString().split('T')[0]
    };
    setEvents([...events, newEvent]);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Tasks & Calendar</h1>
        <div className="flex space-x-2">
          <NewTaskDialog onCreateTask={handleCreateTask} />
          <ScheduleEventDialog onScheduleEvent={handleScheduleEvent} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks Section */}
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Tasks</h2>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="space-y-4">
              {filteredTasks.map(task => (
                <Card key={task.id} className="p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Checkbox />
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-500">{task.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{task.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <div className="mt-2 text-sm text-gray-500">
                        Due: {task.dueDate}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {filteredTasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No tasks found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Calendar Section */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedView === 'day' ? 'default' : 'outline'}
                onClick={() => setSelectedView('day')}
                size="sm"
              >
                Day
              </Button>
              <Button
                variant={selectedView === 'week' ? 'default' : 'outline'}
                onClick={() => setSelectedView('week')}
                size="sm"
              >
                Week
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />

            <div className="space-y-3">
              <h3 className="font-medium">Upcoming Events</h3>
              {events
                .filter(event => event.date >= new Date().toISOString().split('T')[0])
                .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
                .map(event => (
                  <Card key={event.id} className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-12 text-center">
                        <div className="text-sm font-medium">{event.time}</div>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-500">{event.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{event.attendees.length} attendees</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

              {events.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No upcoming events scheduled.
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 