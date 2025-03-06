'use client';

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from 'lucide-react';

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

interface TicketListProps {
  tickets: Ticket[];
  onSelectTicket: (id: string) => void;
  selectedTicket: string | null;
}

export function TicketList({
  tickets,
  onSelectTicket,
  selectedTicket,
}: TicketListProps) {
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

  return (
    <div className="space-y-4">
      {tickets.map(ticket => (
        <Card
          key={ticket.id}
          className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
            selectedTicket === ticket.id ? 'ring-2 ring-[#1eb5b6]' : ''
          }`}
          onClick={() => onSelectTicket(ticket.id)}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{ticket.subject}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {ticket.description}
                </p>
              </div>
              <Badge className={getStatusColor(ticket.status)}>
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1 text-gray-500" />
                  <span>{ticket.messages.length}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-gray-500" />
                  <span>
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Badge className={getPriorityColor(ticket.priority)}>
                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-500">Customer:</span>{' '}
                <span className="font-medium">{ticket.customer.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Assignee:</span>{' '}
                <span className="font-medium">{ticket.assignee}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {tickets.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tickets found matching your criteria
        </div>
      )}
    </div>
  );
} 