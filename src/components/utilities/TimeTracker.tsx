'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Pause, StopCircle, Timer, Trash2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TimeEntry {
  id: string;
  taskName: string;
  projectName: string;
  category: 'design' | 'production' | 'installation' | 'maintenance' | 'admin';
  startTime: number;
  endTime?: number;
  duration: number;
  isRunning: boolean;
}

export function TimeTracker() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [taskName, setTaskName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [category, setCategory] = useState<TimeEntry['category']>('design');
  const [activeEntry, setActiveEntry] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries(prev =>
        prev.map(entry =>
          entry.isRunning
            ? { ...entry, duration: Math.floor((Date.now() - entry.startTime) / 1000) }
            : entry
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    if (!taskName.trim() || !projectName.trim()) return;

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      taskName,
      projectName,
      category,
      startTime: Date.now(),
      duration: 0,
      isRunning: true
    };

    setEntries(prev => [...prev, newEntry]);
    setActiveEntry(newEntry.id);
    setTaskName('');
    setProjectName('');
  };

  const stopTimer = (id: string) => {
    setEntries(prev =>
      prev.map(entry =>
        entry.id === id
          ? { ...entry, isRunning: false, endTime: Date.now() }
          : entry
      )
    );
    setActiveEntry(null);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    if (activeEntry === id) {
      setActiveEntry(null);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const categoryColors = {
    design: 'bg-blue-100 text-blue-700',
    production: 'bg-green-100 text-green-700',
    installation: 'bg-purple-100 text-purple-700',
    maintenance: 'bg-orange-100 text-orange-700',
    admin: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Task Name</Label>
          <Input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name"
            disabled={!!activeEntry}
          />
        </div>

        <div className="space-y-2">
          <Label>Project Name</Label>
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            disabled={!!activeEntry}
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={category}
            onValueChange={(value: TimeEntry['category']) => setCategory(value)}
            disabled={!!activeEntry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="installation">Installation</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={startTimer}
          className="w-full"
          disabled={!!activeEntry || !taskName.trim() || !projectName.trim()}
        >
          <Play className="h-4 w-4 mr-2" />
          Start Timer
        </Button>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <Card key={entry.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4 text-gray-500" />
                  <h4 className="font-medium">{entry.taskName}</h4>
                </div>
                <p className="text-sm text-gray-500">{entry.projectName}</p>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    categoryColors[entry.category]
                  )}>
                    {entry.category}
                  </span>
                  <span className="text-sm font-medium">
                    {formatDuration(entry.duration)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {entry.isRunning ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => stopTimer(entry.id)}
                  >
                    <StopCircle className="h-4 w-4 text-red-500" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {entries.length === 0 && (
          <div className="text-center text-gray-500">
            No time entries yet. Start tracking your time by adding a task.
          </div>
        )}
      </div>
    </div>
  );
} 