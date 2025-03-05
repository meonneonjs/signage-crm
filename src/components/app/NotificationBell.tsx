'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { demoNotifications } from '@/db/demo';
import { Notification } from '@/types/notification';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'task_assigned':
        return '📋';
      case 'task_completed':
        return '✅';
      case 'task_commented':
        return '💬';
      case 'task_due_soon':
        return '⏰';
      case 'task_overdue':
        return '⚠️';
      case 'mention':
        return '@';
      case 'project_update':
        return '📢';
      case 'team_update':
        return '👥';
      default:
        return '🔔';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2 border-b">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-4 ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="text-sm font-medium">{notification.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {notification.message}
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 