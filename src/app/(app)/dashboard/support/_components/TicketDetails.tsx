'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Send, User } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  customer: {
    name: string;
    company: string;
    email: string;
  };
  assignee: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    sender: string;
    content: string;
    timestamp: string;
  }>;
}

interface TicketDetailsProps {
  ticket: Ticket | undefined;
  categories: string[];
  priorities: string[];
  statuses: string[];
}

export function TicketDetails({
  ticket,
  categories,
  priorities,
  statuses,
}: TicketDetailsProps) {
  const [newMessage, setNewMessage] = useState('');

  if (!ticket) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <MessageSquare className="w-12 h-12 text-gray-400" />
            <div className="text-lg font-medium text-gray-900">
              Select a ticket to view details
            </div>
            <p className="text-sm text-gray-500">
              Choose a ticket from the list to view and manage its details
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitMessage = () => {
    if (!newMessage.trim()) return;
    // TODO: Implement API call to add message
    console.log('New message:', newMessage);
    setNewMessage('');
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{ticket.subject}</h3>
          <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Status</div>
            <Select defaultValue={ticket.status}>
              <SelectTrigger>
                <SelectValue>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    <Badge className={getStatusColor(status)}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500">Priority</div>
            <Select defaultValue={ticket.priority}>
              <SelectTrigger>
                <SelectValue>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </Badge>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority} value={priority}>
                    <Badge className={getPriorityColor(priority)}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500">Category</div>
            <Select defaultValue={ticket.category}>
              <SelectTrigger>
                <SelectValue>{ticket.category}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500">Assignee</div>
            <Select defaultValue={ticket.assignee}>
              <SelectTrigger>
                <SelectValue>{ticket.assignee}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ticket.assignee}>
                  {ticket.assignee}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-500">Customer Information</div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Name:</span>
              <span className="font-medium">{ticket.customer.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Company:</span>
              <span className="font-medium">{ticket.customer.company}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium">{ticket.customer.email}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm text-gray-500">Conversation</div>
          <div className="space-y-4">
            {ticket.messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.sender === ticket.customer.name
                    ? 'flex-row'
                    : 'flex-row-reverse'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
                <div className={`flex-1 space-y-1 ${
                  message.sender === ticket.customer.name
                    ? 'items-start'
                    : 'items-end'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{message.sender}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.sender === ticket.customer.name
                      ? 'bg-gray-100'
                      : 'bg-blue-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitMessage}
              className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90"
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 