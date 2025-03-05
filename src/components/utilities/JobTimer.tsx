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
import { Play, Pause, RotateCcw, Save } from 'lucide-react';

interface Timer {
  id: string;
  jobName: string;
  stage: string;
  elapsed: number;
  isRunning: boolean;
}

export function JobTimer() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newJobName, setNewJobName] = useState('');
  const [selectedStage, setSelectedStage] = useState('design');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer => ({
          ...timer,
          elapsed: timer.isRunning ? timer.elapsed + 1 : timer.elapsed,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addTimer = () => {
    if (!newJobName.trim()) return;

    setTimers(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        jobName: newJobName,
        stage: selectedStage,
        elapsed: 0,
        isRunning: false,
      },
    ]);
    setNewJobName('');
  };

  const toggleTimer = (id: string) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  const resetTimer = (id: string) => {
    setTimers(prev =>
      prev.map(timer =>
        timer.id === id ? { ...timer, elapsed: 0, isRunning: false } : timer
      )
    );
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Job Name</Label>
            <Input
              value={newJobName}
              onChange={(e) => setNewJobName(e.target.value)}
              placeholder="Enter job name"
            />
          </div>
          <div className="space-y-2">
            <Label>Stage</Label>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="installation">Installation</SelectItem>
                <SelectItem value="quality">Quality Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={addTimer} className="w-full">
          Add Timer
        </Button>
      </div>

      <div className="space-y-4">
        {timers.map((timer) => (
          <Card key={timer.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{timer.jobName}</h4>
                <p className="text-sm text-gray-500 capitalize">{timer.stage}</p>
              </div>
              <div className="text-2xl font-mono">
                {formatTime(timer.elapsed)}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant={timer.isRunning ? "destructive" : "default"}
                size="sm"
                onClick={() => toggleTimer(timer.id)}
              >
                {timer.isRunning ? (
                  <><Pause className="h-4 w-4 mr-2" /> Pause</>
                ) : (
                  <><Play className="h-4 w-4 mr-2" /> Start</>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resetTimer(timer.id)}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeTimer(timer.id)}
              >
                Remove
              </Button>
              <div className="flex-1" />
              <Button variant="ghost" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Log
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {timers.length === 0 && (
        <div className="text-center text-gray-500">
          No active timers. Add a timer to start tracking job time.
        </div>
      )}
    </div>
  );
} 