'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Moon, Sun, Coffee, Laptop, Phone, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  status: 'online' | 'away' | 'offline' | 'dnd';
  customStatus?: {
    emoji?: string;
    text?: string;
    expiresAt?: Date;
  };
}

interface UserPresenceProps {
  user: User;
  onUpdateStatus: (status: User['status']) => void;
  onUpdateCustomStatus: (customStatus: User['customStatus']) => void;
}

const statusOptions = [
  { value: 'online', label: 'Active', icon: Sun },
  { value: 'away', label: 'Away', icon: Moon },
  { value: 'dnd', label: 'Do not disturb', icon: X },
  { value: 'offline', label: 'Invisible', icon: Coffee },
];

const commonCustomStatuses = [
  { emoji: '💻', text: 'Working remotely' },
  { emoji: '🏃', text: 'Out for lunch' },
  { emoji: '🎯', text: 'Focusing' },
  { emoji: '🤝', text: 'In a meeting' },
  { emoji: '✈️', text: 'Traveling' },
];

const expirationOptions = [
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' },
  { value: 240, label: '4 hours' },
  { value: 480, label: 'Today' },
  { value: -1, label: "Don't clear" },
];

export function UserPresence({ user, onUpdateStatus, onUpdateCustomStatus }: UserPresenceProps) {
  const [showCustomStatus, setShowCustomStatus] = useState(false);
  const [customStatusEmoji, setCustomStatusEmoji] = useState(user.customStatus?.emoji || '');
  const [customStatusText, setCustomStatusText] = useState(user.customStatus?.text || '');
  const [customStatusExpiration, setCustomStatusExpiration] = useState<number>(-1);

  const handleStatusUpdate = (status: User['status']) => {
    onUpdateStatus(status);
  };

  const handleCustomStatusSave = () => {
    const expiresAt = customStatusExpiration === -1 
      ? undefined 
      : new Date(Date.now() + customStatusExpiration * 60 * 1000);

    onUpdateCustomStatus({
      emoji: customStatusEmoji,
      text: customStatusText,
      expiresAt,
    });
    setShowCustomStatus(false);
  };

  const clearCustomStatus = () => {
    setCustomStatusEmoji('');
    setCustomStatusText('');
    onUpdateCustomStatus({});
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'dnd':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 w-full">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">{user.name}</div>
              {user.customStatus && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  {user.customStatus.emoji && <span>{user.customStatus.emoji}</span>}
                  <span>{user.customStatus.text}</span>
                </div>
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {statusOptions.map(({ value, label, icon: Icon }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => handleStatusUpdate(value as User['status'])}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {label}
            </DropdownMenuItem>
          ))}
          <Dialog open={showCustomStatus} onOpenChange={setShowCustomStatus}>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <span className="flex items-center gap-2">
                  {user.customStatus?.emoji || '😊'}
                  {user.customStatus?.text || 'Update your status...'}
                </span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set a status</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCustomStatus(true)}
                  >
                    {customStatusEmoji || '😊'}
                  </Button>
                  <Input
                    placeholder="What's your status?"
                    value={customStatusText}
                    onChange={(e) => setCustomStatusText(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Clear after</Label>
                  <ScrollArea className="h-32 mt-2">
                    {expirationOptions.map(({ value, label }) => (
                      <Button
                        key={value}
                        variant="ghost"
                        className={`w-full justify-start ${
                          customStatusExpiration === value ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => setCustomStatusExpiration(value)}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {label}
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
                <div className="space-y-2">
                  <Label>Suggestions</Label>
                  <ScrollArea className="h-32">
                    {commonCustomStatuses.map(({ emoji, text }) => (
                      <Button
                        key={text}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          setCustomStatusEmoji(emoji);
                          setCustomStatusText(text);
                        }}
                      >
                        <span className="mr-2">{emoji}</span>
                        {text}
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={clearCustomStatus}>
                    Clear status
                  </Button>
                  <Button onClick={handleCustomStatusSave}>Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 