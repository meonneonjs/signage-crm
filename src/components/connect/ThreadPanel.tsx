'use client';

import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageComposer } from './MessageComposer';
import { FileText, Image as ImageIcon, Download, Pin, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Message, Attachment } from "@/types/connect";

interface User {
  name: string;
  avatar: string;
  initials: string;
  status: 'online' | 'away' | 'offline';
}

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface ThreadPanelProps {
  message: Message;
  onReply: (content: string, attachment?: File) => void;
  onClose: () => void;
  onReaction?: (messageId: string, emoji: string) => void;
  onDownload?: (attachment: Attachment) => void;
}

export function ThreadPanel({
  message,
  onReply,
  onClose,
  onReaction = () => {},
  onDownload = () => {},
}: ThreadPanelProps) {
  const [replyInput, setReplyInput] = useState('');
  const [replyAttachment, setReplyAttachment] = useState<File | null>(null);

  const handleSendReply = () => {
    if (!replyInput.trim() && !replyAttachment) return;
    onReply(replyInput, replyAttachment || undefined);
    setReplyInput('');
    setReplyAttachment(null);
  };

  const handleReaction = (messageId: string, reaction: Reaction) => {
    onReaction(messageId, reaction.emoji);
  };

  const handleDownload = async (attachment: Attachment) => {
    try {
      const response = await fetch(attachment.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = attachment.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const handleAttachFile = (file: File) => {
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDFs are allowed');
      return;
    }

    setReplyAttachment(file);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Thread</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Original message */}
          <div className="pb-4 mb-4 border-b">
            <div className="flex items-start gap-3">
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
                          onClick={() => handleDownload(attachment)}
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
                        onClick={() => handleReaction(message.id, reaction)}
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-xs">{reaction.count}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Thread replies */}
          <div className="space-y-4">
            {message.thread?.map((reply) => (
              <div key={reply.id} className="flex items-start gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={reply.user.avatar} />
                    <AvatarFallback>{reply.user.initials}</AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                      reply.user.status === 'online' && "bg-green-500",
                      reply.user.status === 'away' && "bg-yellow-500",
                      reply.user.status === 'offline' && "bg-gray-500"
                    )}
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold">{reply.user.name}</span>
                    <span className="text-xs text-gray-400">{reply.timestamp}</span>
                  </div>

                  <p className="text-gray-600 mt-1">{reply.content}</p>

                  {reply.attachments && reply.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {reply.attachments.map((attachment) => (
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
                            onClick={() => handleDownload(attachment)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </Card>
                      ))}
                    </div>
                  )}

                  {reply.reactions && reply.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {reply.reactions.map((reaction) => (
                        <Button
                          key={reaction.emoji}
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 gap-1"
                          onClick={() => handleReaction(reply.id, reaction)}
                        >
                          <span>{reaction.emoji}</span>
                          <span className="text-xs">{reaction.count}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Reply composer */}
      <div className="p-4 border-t">
        {replyAttachment && (
          <div className="mb-2">
            <Card className="p-3 flex items-center gap-3">
              {replyAttachment.type.startsWith('image/') ? (
                <ImageIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <FileText className="h-5 w-5 text-gray-500" />
              )}
              <span className="flex-1 text-sm">{replyAttachment.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyAttachment(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          </div>
        )}
        <MessageComposer
          value={replyInput}
          onChange={setReplyInput}
          onSend={handleSendReply}
          onAttachFile={handleAttachFile}
          onEmojiSelect={(emoji) => setReplyInput(prev => prev + emoji)}
          mentions={[
            { id: '1', name: message.user.name },
            ...(message.thread?.map(reply => ({ id: reply.id, name: reply.user.name })) || []),
          ]}
        />
      </div>
    </div>
  );
} 