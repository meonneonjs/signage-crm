'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageSquare,
  MoreHorizontal,
  Pin,
  Share,
  Smile,
  FileText,
  Image as ImageIcon,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Message, Attachment } from "@/types/connect";

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface MessageListProps {
  messages: Message[];
  onOpenThread: (messageId: string) => void;
  onReaction: (messageId: string, reaction: string) => void;
  onPin: (messageId: string) => void;
  onShare: (messageId: string) => void;
  onDownload: (attachment: Attachment) => void;
}

// Common emojis for reactions
const commonEmojis = ['👍', '❤️', '😊', '🎉', '🚀', '👏', '🙌', '💯', '✅', '❌'];

export function MessageList({
  messages,
  onOpenThread,
  onReaction,
  onPin,
  onShare,
  onDownload,
}: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="group relative flex items-start gap-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={message.user.avatar} />
                <AvatarFallback>{message.user.initials}</AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                  message.user.status === 'online' && "bg-green-500",
                  message.user.status === 'away' && "bg-yellow-500",
                  message.user.status === 'offline' && "bg-gray-500"
                )}
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold">{message.user.name}</span>
                <span className="text-xs text-gray-400">{message.timestamp}</span>
                {message.isPinned && (
                  <Badge variant="secondary" className="text-xs">
                    <Pin className="h-3 w-3 mr-1" />
                    Pinned
                  </Badge>
                )}
              </div>

              <p className="text-gray-600 mt-1">{message.content}</p>

              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((attachment) => (
                    <Card key={attachment.name} className="p-3 flex items-center gap-3">
                      {attachment.type === 'image' ? (
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-500" />
                      )}
                      <span className="flex-1 text-sm">{attachment.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(attachment)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}

              {message.reactions && message.reactions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.reactions.map((reaction) => (
                    <Button
                      key={reaction.emoji}
                      variant="outline"
                      size="sm"
                      className="h-6 px-2 gap-1"
                      onClick={() => onReaction(message.id, reaction.emoji)}
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-xs">{reaction.count}</span>
                    </Button>
                  ))}
                </div>
              )}

              {message.thread && message.thread.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => onOpenThread(message.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {message.thread.length} replies
                </Button>
              )}
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onOpenThread(message.id)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Reply in Thread
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Popover>
                      <PopoverTrigger className="w-full flex items-center px-2 py-1.5 text-sm">
                        <Smile className="h-4 w-4 mr-2" />
                        Add Reaction
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-2">
                        <div className="grid grid-cols-5 gap-2">
                          {commonEmojis.map(emoji => (
                            <Button
                              key={emoji}
                              variant="ghost"
                              size="sm"
                              onClick={() => onReaction(message.id, emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onPin(message.id)}>
                    <Pin className="h-4 w-4 mr-2" />
                    {message.isPinned ? 'Unpin' : 'Pin'} Message
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onShare(message.id)}>
                    <Share className="h-4 w-4 mr-2" />
                    Share Message
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
} 