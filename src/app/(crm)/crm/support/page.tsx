'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MessageSquare, Clock, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewTicketDialog } from './_components/NewTicketDialog';
import { TicketList } from './_components/TicketList';
import { TicketDetails } from './_components/TicketDetails';

// Demo data - replace with actual API integration
const demoTickets = {
  tickets: [
    {
      id: '1',
      subject: 'Display Configuration Issue',
      description: 'Need help configuring multiple displays for digital signage setup',
      status: 'open',
      priority: 'high',
      category: 'Technical',
      customer: {
        name: 'John Smith',
        company: 'Tech Corp',
        email: 'john@techcorp.com',
      },
      assignee: 'Sarah Johnson',
      createdAt: '2024-03-05T09:00:00Z',
      updatedAt: '2024-03-05T10:30:00Z',
      messages: [
        {
          id: '1',
          sender: 'John Smith',
          content: 'Having trouble with the multi-display setup.',
          timestamp: '2024-03-05T09:00:00Z',
        },
        {
          id: '2',
          sender: 'Sarah Johnson',
          content: 'Could you please provide your current display configuration?',
          timestamp: '2024-03-05T09:30:00Z',
        },
      ],
    },
    {
      id: '2',
      subject: 'Content Scheduling Question',
      description: 'Need assistance with scheduling content across different time zones',
      status: 'in_progress',
      priority: 'medium',
      category: 'Usage',
      customer: {
        name: 'Mike Brown',
        company: 'Global Retail',
        email: 'mike@globalretail.com',
      },
      assignee: 'David Wilson',
      createdAt: '2024-03-04T14:00:00Z',
      updatedAt: '2024-03-05T11:00:00Z',
      messages: [
        {
          id: '1',
          sender: 'Mike Brown',
          content: 'How do I schedule content for different time zones?',
          timestamp: '2024-03-04T14:00:00Z',
        },
      ],
    },
  ],
  categories: ['Technical', 'Usage', 'Billing', 'Feature Request'],
  priorities: ['low', 'medium', 'high', 'urgent'],
  statuses: ['open', 'in_progress', 'resolved', 'closed'],
};

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  const filteredTickets = demoTickets.tickets.filter(ticket => {
    const matchesSearch = 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    const matchesPriority = !priorityFilter || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const openTickets = demoTickets.tickets.filter(t => t.status === 'open').length;
  const avgResponseTime = '2.5 hours';
  const resolvedToday = 12;
  const customerSatisfaction = '94%';

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1f2f5c]">Customer Support</h1>
        <NewTicketDialog categories={demoTickets.categories} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Open Tickets</div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Active</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">{openTickets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Avg. Response Time</div>
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold mt-2">{avgResponseTime}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Resolved Today</div>
              <Badge variant="outline" className="bg-green-100 text-green-800">Today</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">{resolvedToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Customer Satisfaction</div>
              <Badge variant="outline">Last 30 Days</Badge>
            </div>
            <div className="text-2xl font-bold mt-2">{customerSatisfaction}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Select
                value={statusFilter || ''}
                onValueChange={(value) => setStatusFilter(value || null)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {demoTickets.statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={priorityFilter || ''}
                onValueChange={(value) => setPriorityFilter(value || null)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Priorities</SelectItem>
                  {demoTickets.priorities.map(priority => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <TicketList
                  tickets={filteredTickets}
                  onSelectTicket={setSelectedTicket}
                  selectedTicket={selectedTicket}
                />
              </div>
              <div className="lg:col-span-2">
                <TicketDetails
                  ticket={filteredTickets.find(t => t.id === selectedTicket)}
                  categories={demoTickets.categories}
                  priorities={demoTickets.priorities}
                  statuses={demoTickets.statuses}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 