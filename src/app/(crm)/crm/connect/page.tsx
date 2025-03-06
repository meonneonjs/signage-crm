'use client';

import { useState } from 'react';
import { TeamSidebar } from '@/components/connect/TeamSidebar';
import { MessageList } from '@/components/connect/MessageList';
import { ChannelHeader } from '@/components/connect/ChannelHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Search } from 'lucide-react';
import { ThreadPanel } from '@/components/connect/ThreadPanel';
import { UserPresence } from '@/components/connect/UserPresence';
import { SearchPanel } from '@/components/connect/SearchPanel';
import { useHotkeys } from 'react-hotkeys-hook';
import { MessageComposer } from '@/components/connect/MessageComposer';
import { Message, User, Attachment } from '@/types/connect';

interface Team {
  id: string;
  name: string;
  channels: Channel[];
}

interface Channel {
  id: string;
  name: string;
  isPrivate: boolean;
}

// Demo data with proper types
const demoTeams = [
  {
    id: '1',
    name: 'Factory Team',
    channels: [
      { id: '1', name: 'general', isPrivate: false },
      { id: '2', name: 'production', isPrivate: false },
      { id: '3', name: 'maintenance', isPrivate: true },
    ],
  },
  {
    id: '2',
    name: 'Design Team',
    channels: [
      { id: '4', name: 'general', isPrivate: false },
      { id: '5', name: 'projects', isPrivate: false },
      { id: '6', name: 'inspiration', isPrivate: false },
    ],
  },
  {
    id: '3',
    name: 'Sales Team',
    channels: [
      { id: '7', name: 'general', isPrivate: false },
      { id: '8', name: 'leads', isPrivate: true },
      { id: '9', name: 'deals', isPrivate: true },
    ],
  },
];

const demoMessages: Message[] = [
  {
    id: '1',
    content: 'Has anyone tested the new deployment?',
    timestamp: '2:30 PM',
    user: {
      id: 'user1',
      name: 'John Smith',
      avatar: '/avatars/john.png',
      initials: 'JS',
      status: 'online',
    },
    reactions: [],
  },
  {
    id: '2',
    content: 'Yes, all tests are passing!',
    timestamp: '2:35 PM',
    user: {
      id: 'user2',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.png',
      initials: 'SJ',
      status: 'away',
    },
    reactions: [],
  },
];

export default function ConnectPage() {
  const [selectedTeam, setSelectedTeam] = useState(demoTeams[0]);
  const [selectedChannel, setSelectedChannel] = useState(demoTeams[0].channels[0]);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(demoMessages);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [showThreadPanel, setShowThreadPanel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'current',
    name: 'Current User',
    avatar: '/avatars/user.png',
    initials: 'CU',
    status: 'online',
  });

  // Keyboard shortcuts
  useHotkeys('mod+k', (e: KeyboardEvent) => {
    e.preventDefault();
    setShowSearch(true);
  });

  useHotkeys('mod+/', (e: KeyboardEvent) => {
    e.preventDefault();
    if (selectedThread) {
      setShowThreadPanel(!showThreadPanel);
    }
  });

  useHotkeys('mod+shift+f', (e: KeyboardEvent) => {
    e.preventDefault();
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    input?.focus();
  });

  const handleSendMessage = (content: string = messageInput, attachments?: Attachment[]) => {
    if (!content.trim() && !attachments?.length) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: currentUser,
      reactions: [],
      attachments,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput('');
  };

  const handleOpenThread = (messageId: string) => {
    setSelectedThread(messageId);
    setShowThreadPanel(true);
  };

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === reaction);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions?.map((r) =>
                r.emoji === reaction
                  ? { ...r, count: r.count + 1, users: [...r.users, 'Current User'] }
                  : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [
                ...(msg.reactions || []),
                { emoji: reaction, count: 1, users: ['Current User'] },
              ],
            };
          }
        }
        return msg;
      })
    );
  };

  const handlePin = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg
      )
    );
  };

  const handleThreadReply = async (content: string, attachment?: File) => {
    if (!selectedThread) return;

    let attachments: Attachment[] | undefined;
    if (attachment) {
      attachments = [{
        type: attachment.type.startsWith('image/') ? 'image' : 'file',
        url: URL.createObjectURL(attachment),
        name: attachment.name,
      }];
    }

    const reply: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      user: currentUser,
      attachments,
    };

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === selectedThread
          ? { ...msg, thread: [...(msg.thread || []), reply] }
          : msg
      )
    );
  };

  const handleTeamCreate = (name: string) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name,
      channels: [
        { id: `${Date.now()}-1`, name: 'general', isPrivate: false },
      ],
    };
    demoTeams.push(newTeam);
    setSelectedTeam(newTeam);
    setSelectedChannel(newTeam.channels[0]);
  };

  const handleChannelCreate = (teamId: string, name: string, isPrivate: boolean) => {
    const newChannel: Channel = {
      id: Date.now().toString(),
      name,
      isPrivate,
    };

    const team = demoTeams.find(t => t.id === teamId);
    if (team) {
      team.channels.push(newChannel);
      setSelectedChannel(newChannel);
    }
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

  const handleShare = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    try {
      await navigator.clipboard.writeText(
        `${message.user.name} in #${selectedChannel.name}:\n${message.content}`
      );
      alert('Message link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing message:', error);
      alert('Failed to share message. Please try again.');
    }
  };

  const handleStatusUpdate = (status: User['status']) => {
    setCurrentUser(prev => ({ ...prev, status }));
  };

  const handleCustomStatusUpdate = (customStatus: User['customStatus']) => {
    setCurrentUser(prev => ({ ...prev, customStatus }));
  };

  const handleMessageSelect = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setSelectedThread(messageId);
      setShowThreadPanel(true);
    }
  };

  const handleFileSelect = (fileId: string) => {
    const message = messages.find(m => 
      m.attachments?.some(a => a.url.includes(fileId))
    );
    if (message) {
      setSelectedThread(message.id);
      setShowThreadPanel(true);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <TeamSidebar
        teams={demoTeams}
        selectedTeam={selectedTeam}
        selectedChannel={selectedChannel}
        onTeamSelect={setSelectedTeam}
        onChannelSelect={setSelectedChannel}
        onTeamCreate={handleTeamCreate}
        onChannelCreate={handleChannelCreate}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <ChannelHeader channel={selectedChannel} />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSearch(true)}
              className="gap-2"
            >
              <Search className="h-4 w-4" />
              Search
              <kbd className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">⌘K</kbd>
            </Button>
            <UserPresence
              user={currentUser}
              onUpdateStatus={handleStatusUpdate}
              onUpdateCustomStatus={handleCustomStatusUpdate}
            />
          </div>
        </div>
        
        <div className="flex-1 flex">
          <div className={`flex-1 flex flex-col ${showThreadPanel ? 'border-r' : ''}`}>
            <MessageList
              messages={messages}
              onOpenThread={handleOpenThread}
              onReaction={handleReaction}
              onPin={handlePin}
              onShare={handleShare}
              onDownload={handleDownload}
            />
            
            <div className="p-4 border-t">
              <MessageComposer
                value={messageInput}
                onChange={setMessageInput}
                onSend={handleSendMessage}
                onAttachFile={(file: File) => {
                  const attachment: Attachment = {
                    type: file.type.startsWith('image/') ? 'image' : 'file',
                    url: URL.createObjectURL(file),
                    name: file.name,
                  };
                  handleSendMessage(messageInput, [attachment]);
                }}
                onEmojiSelect={(emoji: string) => setMessageInput(prev => prev + emoji)}
                mentions={messages.map(m => ({ id: m.user.id, name: m.user.name }))}
              />
            </div>
          </div>

          {showThreadPanel && selectedThread && (
            <ThreadPanel
              message={messages.find((m) => m.id === selectedThread)!}
              onClose={() => setShowThreadPanel(false)}
              onReply={handleThreadReply}
              onReaction={handleReaction}
              onDownload={handleDownload}
            />
          )}

          {showSearch && (
            <SearchPanel
              onClose={() => setShowSearch(false)}
              onMessageSelect={handleMessageSelect}
              onFileSelect={handleFileSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
} 