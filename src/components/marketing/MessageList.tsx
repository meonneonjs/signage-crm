'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow } from 'date-fns';

type MarketingPlatform = 'META' | 'GOOGLE' | 'LINKEDIN' | 'TWITTER' | 'TIKTOK' | 'INSTAGRAM' | 'YOUTUBE' | 'EMAIL' | 'OTHER';
type MessageStatus = 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED' | 'SPAM';

interface AdMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  content: string;
  platform: MarketingPlatform;
  status: MessageStatus;
  response?: string | null;
  campaign?: {
    id: string;
    name: string;
  } | null;
  assignedTo?: {
    id: string;
    name: string | null;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}

interface MessageFilters {
  platform?: MarketingPlatform;
  status?: MessageStatus;
}

interface MessageListProps {
  messages: AdMessage[];
  filters: MessageFilters;
  onFilterChange: (filters: MessageFilters) => void;
  onStatusChange: (messageId: string, status: MessageStatus) => void;
  onAssign: (messageId: string, userId: string) => void;
}

export function MessageList({ messages, filters, onFilterChange, onStatusChange, onAssign }: MessageListProps) {
  const handleFilterChange = (key: string, value: string | null) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const getStatusColor = (status: MessageStatus) => {
    const colors = {
      NEW: 'bg-blue-100 text-blue-800',
      IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
      RESPONDED: 'bg-green-100 text-green-800',
      CLOSED: 'bg-gray-100 text-gray-800',
      SPAM: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.NEW;
  };

  const getPlatformIcon = (platform: MarketingPlatform) => {
    const icons = {
      META: '📱',
      GOOGLE: '🔍',
      LINKEDIN: '💼',
      TWITTER: '🐦',
      TIKTOK: '📹',
      INSTAGRAM: '📸',
      YOUTUBE: '▶️',
      EMAIL: '📧',
      OTHER: '🌐'
    };
    return icons[platform] || icons.OTHER;
  };

  const marketingPlatforms: MarketingPlatform[] = ['META', 'GOOGLE', 'LINKEDIN', 'TWITTER', 'TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'EMAIL', 'OTHER'];
  const messageStatuses: MessageStatus[] = ['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED', 'SPAM'];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <Select
          value={filters.platform || ''}
          onValueChange={(value) => handleFilterChange('platform', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Platforms</SelectItem>
            {marketingPlatforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {getPlatformIcon(platform)} {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status || ''}
          onValueChange={(value) => handleFilterChange('status', value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            {messageStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{message.senderName}</div>
                    <div className="text-sm text-gray-500">{message.senderEmail}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="text-sm line-clamp-2">{message.content}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-2">{getPlatformIcon(message.platform)}</span>
                    {message.platform}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{message.campaign?.name || 'N/A'}</div>
                </TableCell>
                <TableCell>
                  <Select
                    value={message.status}
                    onValueChange={(value) => onStatusChange(message.id, value as MessageStatus)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue>
                        <Badge className={getStatusColor(message.status)}>
                          {message.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {messageStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          <Badge className={getStatusColor(status)}>
                            {status}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">
                    {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Open message details/reply modal
                      }}
                    >
                      Reply
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Open assign modal
                      }}
                    >
                      Assign
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 