'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, UserCircle2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  channel: string;
}

const SAMPLE_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'Hey team, just finished the new signage design for ABC Corp.',
    timestamp: '10:30 AM',
    channel: 'design'
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: "Great work! I'll start production prep.",
    timestamp: '10:32 AM',
    channel: 'design'
  },
  {
    id: '3',
    sender: 'Mike Johnson',
    content: 'Materials are ready for the XYZ project.',
    timestamp: '10:35 AM',
    channel: 'production'
  }
];

export function QuickChat() {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('design');

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: selectedChannel
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const filteredMessages = messages.filter(
    message => message.channel === selectedChannel
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Channel</Label>
        <Select value={selectedChannel} onValueChange={setSelectedChannel}>
          <SelectTrigger>
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Design Team</SelectItem>
            <SelectItem value="production">Production Team</SelectItem>
            <SelectItem value="sales">Sales Team</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-4">
        <div className="space-y-4 h-[300px] overflow-y-auto">
          {filteredMessages.map(message => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-2",
                message.sender === 'You' && "flex-row-reverse"
              )}
            >
              <UserCircle2 className="h-6 w-6 text-gray-400 flex-shrink-0" />
              <div
                className={cn(
                  "rounded-lg p-2 max-w-[80%]",
                  message.sender === 'You'
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {message.sender}
                  </span>
                  <span className="text-xs opacity-70">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 