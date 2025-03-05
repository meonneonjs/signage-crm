'use client';

import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import './calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: string;
  clientId?: string;
  teamMembers: string[];
  description?: string;
  location?: string;
}

const eventCategories = [
  { name: 'Client Meeting', color: 'bg-blue-500' },
  { name: 'Team Sync', color: 'bg-green-500' },
  { name: 'Project Review', color: 'bg-purple-500' },
  { name: 'Installation', color: 'bg-orange-500' },
  { name: 'Design Review', color: 'bg-pink-500' },
];

export default function CalendarPage() {
  const [view, setView] = useState('month');
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Sample Client Meeting',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 11, 0),
      category: 'Client Meeting',
      clientId: 'client1',
      teamMembers: ['John Doe'],
      description: 'Initial consultation for signage project',
      location: 'Virtual',
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNewEventSheet, setShowNewEventSheet] = useState(false);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setShowNewEventSheet(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center gap-4">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet open={showNewEventSheet} onOpenChange={setShowNewEventSheet}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Event
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create New Event</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Enter event title" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input type="datetime-local" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="datetime-local" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input placeholder="Add event description" />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input placeholder="Add location" />
                </div>
                <Button className="w-full">Create Event</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <Card className="p-4">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 'calc(100vh - 250px)' }}
              view={view as any}
              onView={(newView) => setView(newView)}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              popup
              eventPropGetter={(event) => ({
                className: `${eventCategories.find(cat => cat.name === event.category)?.color} text-white`,
              })}
            />
          </Card>
        </div>

        <div className="col-span-3 space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Filters</h3>
            <div className="space-y-2">
              {eventCategories.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <Checkbox id={category.name} />
                  <Label htmlFor={category.name} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${category.color} mr-2`} />
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Team Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  <span>John Doe</span>
                </div>
                <Badge>Available</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                  <span>Jane Smith</span>
                </div>
                <Badge variant="destructive">Busy</Badge>
              </div>
            </div>
          </Card>

          {selectedEvent && (
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Event Details</h3>
              <div className="space-y-2">
                <p className="font-medium">{selectedEvent.title}</p>
                <p className="text-sm text-gray-500">
                  {format(selectedEvent.start, 'PPp')} - {format(selectedEvent.end, 'PPp')}
                </p>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${eventCategories.find(cat => cat.name === selectedEvent.category)?.color} mr-2`} />
                  <span>{selectedEvent.category}</span>
                </div>
                {selectedEvent.description && (
                  <p className="text-sm">{selectedEvent.description}</p>
                )}
                {selectedEvent.location && (
                  <p className="text-sm text-gray-500">{selectedEvent.location}</p>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 