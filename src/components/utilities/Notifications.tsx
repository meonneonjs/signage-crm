'use client';

import { useState } from 'react';
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
import { Bell, CheckCircle2, AlertCircle, Clock, Calendar, Users, X } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'task' | 'schedule' | 'team';
  timestamp: string;
  isRead: boolean;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New Task Assigned',
    message: 'You have been assigned to the XYZ Corp signage project.',
    type: 'info',
    category: 'task',
    timestamp: '5 mins ago',
    isRead: false
  },
  {
    id: '2',
    title: 'Design Approved',
    message: 'The design for ABC Retail has been approved by the client.',
    type: 'success',
    category: 'task',
    timestamp: '1 hour ago',
    isRead: false
  },
  {
    id: '3',
    title: 'Upcoming Installation',
    message: 'Reminder: Installation scheduled for tomorrow at 9 AM.',
    type: 'warning',
    category: 'schedule',
    timestamp: '2 hours ago',
    isRead: true
  },
  {
    id: '4',
    title: 'System Update',
    message: 'The CRM will be undergoing maintenance tonight at 11 PM.',
    type: 'info',
    category: 'system',
    timestamp: '3 hours ago',
    isRead: true
  },
  {
    id: '5',
    title: 'Team Meeting',
    message: 'Weekly team meeting starts in 30 minutes.',
    type: 'info',
    category: 'team',
    timestamp: '30 mins ago',
    isRead: false
  }
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [categoryFilter, setCategoryFilter] = useState<Notification['category'] | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<Notification['type'] | 'all'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const typeIcons = {
    info: <Bell className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />
  };

  const categoryIcons = {
    system: <Bell className="h-4 w-4" />,
    task: <Clock className="h-4 w-4" />,
    schedule: <Calendar className="h-4 w-4" />,
    team: <Users className="h-4 w-4" />
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesUnread = !showUnreadOnly || !notification.isRead;
    return matchesCategory && matchesType && matchesUnread;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 text-sm text-blue-500">
              ({unreadCount} unread)
            </span>
          )}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={categoryFilter}
              onValueChange={(value: Notification['category'] | 'all') => setCategoryFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
                <SelectItem value="schedule">Schedule</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={typeFilter}
              onValueChange={(value: Notification['type'] | 'all') => setTypeFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="info">Information</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="unread-only"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="unread-only">Show unread only</Label>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <Card
            key={notification.id}
            className={cn(
              "p-4",
              !notification.isRead && "bg-blue-50"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {typeIcons[notification.type]}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{notification.title}</h4>
                    <p className="text-sm text-gray-500">{notification.message}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-gray-500">
                      {categoryIcons[notification.category]}
                      {notification.category}
                    </span>
                    <span className="text-gray-500">
                      {notification.timestamp}
                    </span>
                  </div>
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center text-gray-500">
            No notifications found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
} 