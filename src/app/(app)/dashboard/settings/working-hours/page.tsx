'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function WorkingHoursSettings() {
  const [schedules, setSchedules] = useState(
    DAYS.map(day => ({
      day,
      isOpen: day !== 'Saturday' && day !== 'Sunday',
      openTime: '09:00',
      closeTime: '17:00',
      breaks: []
    }))
  );

  const [timezone, setTimezone] = useState('America/New_York');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Working Hours Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your business hours and availability.
        </p>
      </div>
      <Separator />
      <div className="grid gap-6">
        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Business Hours</h4>
          <div className="space-y-4">
            {DAYS.map((day) => (
              <div key={day} className="grid grid-cols-[1fr,2fr,2fr] gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Switch id={day.toLowerCase()} />
                  <Label htmlFor={day.toLowerCase()}>{day}</Label>
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Opening time" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour.toString().padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Closing time" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour.toString().padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Break Times</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Lunch Break</Label>
                <p className="text-sm text-muted-foreground">Set daily lunch break hours</p>
              </div>
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map((hour) => (
                      <SelectItem key={hour} value={hour.toString()}>
                        {hour.toString().padStart(2, '0')}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-sm font-medium mb-4">Holiday Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Holiday Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily close during holidays</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
} 