'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Plus, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: 'low' | 'medium' | 'high';
  type: 'installation' | 'maintenance' | 'design' | 'production' | 'meeting';
}

const SAMPLE_TASKS: Task[] = [
  {
    id: '1',
    title: 'Client Meeting - XYZ Corp',
    description: 'Discuss new signage requirements',
    date: '2024-03-20',
    time: '10:00',
    priority: 'high',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Install Storefront Sign',
    description: 'ABC Retail location',
    date: '2024-03-21',
    time: '09:00',
    priority: 'medium',
    type: 'installation'
  }
];

export function QuickSchedule() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [type, setType] = useState<Task['type']>('meeting');

  const addTask = () => {
    if (!title.trim() || !date || !time) return;

    const task: Task = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      priority,
      type
    };

    setTasks(prev => [...prev, task]);
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setPriority('medium');
    setType('meeting');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700'
  };

  const typeIcons = {
    installation: '🔧',
    maintenance: '🛠️',
    design: '✏️',
    production: '🏭',
    meeting: '👥'
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="h-20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Time</Label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select 
              value={priority} 
              onValueChange={(value: Task['priority']) => setPriority(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select 
              value={type} 
              onValueChange={(value: Task['type']) => setType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="installation">Installation</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={addTask} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span>{typeIcons[task.type]}</span>
                  <h4 className="font-medium">{task.title}</h4>
                </div>
                <p className="text-sm text-gray-500">{task.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {task.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {task.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  priorityColors[task.priority]
                )}>
                  {task.priority}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {tasks.length === 0 && (
          <div className="text-center text-gray-500">
            No tasks scheduled. Add a task to get started.
          </div>
        )}
      </div>
    </div>
  );
} 