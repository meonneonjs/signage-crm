'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Calendar,
  Star,
  Filter,
  X,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  channel: string;
  hasThread?: boolean;
  isPinned?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: 'file' | 'image';
  url: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  channel: string;
}

interface SearchPanelProps {
  onClose: () => void;
  onMessageSelect: (messageId: string) => void;
  onFileSelect: (fileId: string) => void;
}

const filterOptions = {
  from: ['anyone', 'me', ...['John Smith', 'Sarah Johnson', 'Mike Brown']],
  channel: ['all-channels', 'general', 'random', 'team-updates'],
  date: ['anytime', 'today', 'yesterday', 'this-week', 'this-month'],
  type: ['all', 'messages', 'files', 'channels'],
};

export function SearchPanel({ onClose, onMessageSelect, onFileSelect }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('messages');
  const [filters, setFilters] = useState({
    from: 'anyone',
    channel: 'all-channels',
    date: 'anytime',
    type: 'all',
  });

  // Demo data - in a real app, this would be fetched based on search query and filters
  const messages: Message[] = [
    {
      id: '1',
      content: 'Has anyone tested the new deployment?',
      timestamp: '2:30 PM',
      user: {
        name: 'John Smith',
        avatar: '/avatars/john.png',
        initials: 'JS',
      },
      channel: 'general',
      hasThread: true,
    },
    {
      id: '2',
      content: 'The latest design mockups are ready for review',
      timestamp: '11:45 AM',
      user: {
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.png',
        initials: 'SJ',
      },
      channel: 'design',
      isPinned: true,
    },
  ];

  const files: Attachment[] = [
    {
      id: '1',
      name: 'design-specs.pdf',
      type: 'file',
      url: '/files/design-specs.pdf',
      timestamp: '2:30 PM',
      user: {
        name: 'John Smith',
        avatar: '/avatars/john.png',
        initials: 'JS',
      },
      channel: 'design',
    },
    {
      id: '2',
      name: 'screenshot.png',
      type: 'image',
      url: '/files/screenshot.png',
      timestamp: '11:45 AM',
      user: {
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.png',
        initials: 'SJ',
      },
      channel: 'general',
    },
  ];

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const renderFilterBadges = () => {
    return Object.entries(filters).map(([key, value]) => {
      if (value === filterOptions[key as keyof typeof filterOptions][0]) return null;
      return (
        <Badge
          key={key}
          variant="secondary"
          className="flex items-center gap-1"
        >
          {key}: {value}
          <X
            className="h-3 w-3 cursor-pointer"
            onClick={() => updateFilter(key as keyof typeof filters, filterOptions[key as keyof typeof filterOptions][0])}
          />
        </Badge>
      );
    });
  };

  return (
    <div className="w-96 border-l h-full flex flex-col bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-semibold">Search</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search messages and files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="p-2 space-y-4">
                <div>
                  <label className="text-xs font-medium">From:</label>
                  <ScrollArea className="h-32">
                    {filterOptions.from.map(option => (
                      <Button
                        key={option}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => updateFilter('from', option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
                <div>
                  <label className="text-xs font-medium">Channel:</label>
                  <ScrollArea className="h-32">
                    {filterOptions.channel.map(option => (
                      <Button
                        key={option}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => updateFilter('channel', option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
                <div>
                  <label className="text-xs font-medium">Date:</label>
                  <ScrollArea className="h-32">
                    {filterOptions.date.map(option => (
                      <Button
                        key={option}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => updateFilter('date', option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <ScrollArea className="flex-1">
            <div className="flex gap-2">
              {renderFilterBadges()}
            </div>
          </ScrollArea>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="p-0 h-12 border-b rounded-none">
          <TabsTrigger value="messages" className="flex-1 rounded-none">
            <MessageSquare className="h-4 w-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="files" className="flex-1 rounded-none">
            <FileText className="h-4 w-4 mr-2" />
            Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => onMessageSelect(message.id)}
                >
                  <Avatar>
                    <AvatarImage src={message.user.avatar} />
                    <AvatarFallback>{message.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.user.name}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      {message.isPinned && (
                        <Star className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{message.content}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        #{message.channel}
                      </Badge>
                      {message.hasThread && (
                        <Badge variant="secondary" className="text-xs">
                          Has thread
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="files" className="flex-1 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {files.map(file => (
                <div
                  key={file.id}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => onFileSelect(file.id)}
                >
                  {file.type === 'image' ? (
                    <ImageIcon className="h-10 w-10 text-blue-500" />
                  ) : (
                    <FileText className="h-10 w-10 text-blue-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{file.name}</span>
                      <span className="text-xs text-gray-500">{file.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={file.user.avatar} />
                          <AvatarFallback>{file.user.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500">{file.user.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        #{file.channel}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
} 