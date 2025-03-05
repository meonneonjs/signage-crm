'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageCircle,
  Send,
  Image as ImageIcon,
  Paperclip,
  MoreVertical,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
  };
  timestamp: Date;
  attachments?: Array<{
    type: string;
    url: string;
    name: string;
  }>;
}

interface ConnectThreadProps {
  threadId: string;
  title: string;
  participants: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  context?: {
    type: 'client' | 'project' | 'task';
    id: string;
    name: string;
  };
}

export function ConnectThread({
  threadId,
  title,
  participants,
  context,
}: ConnectThreadProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi team, I've uploaded the latest design files for review.",
      sender: {
        id: '1',
        name: 'John Doe',
      },
      timestamp: new Date(),
      attachments: [
        {
          type: 'file',
          url: '#',
          name: 'design-v2.pdf',
        },
      ],
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: String(messages.length + 1),
      content: newMessage,
      sender: {
        id: 'current-user',
        name: 'Current User',
      },
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader className="flex-none border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge variant="secondary">
              {participants.length} participant{participants.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          {context && (
            <Badge variant="outline">
              {context.type}: {context.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100%-80px)] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender.id === 'current-user'
                    ? 'flex-row-reverse'
                    : 'flex-row'
                }`}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.sender.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex max-w-[70%] flex-col gap-1 ${
                    message.sender.id === 'current-user'
                      ? 'items-end'
                      : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {message.sender.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender.id === 'current-user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 text-sm"
                          >
                            <Paperclip className="h-4 w-4" />
                            <a
                              href={attachment.url}
                              className="hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {attachment.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-2 border-t p-4">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 