'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hash, Settings, Users, Lock, Crown, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User } from "@/types/connect";

interface Channel {
  id: string;
  name: string;
  isPrivate: boolean;
  description?: string;
  members?: User[];
}

interface ChannelHeaderProps {
  channel: Channel;
  onUpdateChannel?: (channel: Channel) => void;
}

// Demo data
const demoMembers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: '/avatars/john.png',
    initials: 'JS',
    status: 'online',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.png',
    initials: 'SJ',
    status: 'online',
  },
  {
    id: '3',
    name: 'Mike Brown',
    avatar: '/avatars/mike.png',
    initials: 'MB',
    status: 'away',
  },
];

export function ChannelHeader({ channel, onUpdateChannel = () => {} }: ChannelHeaderProps) {
  const [showMembers, setShowMembers] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [channelName, setChannelName] = useState(channel.name);
  const [channelDescription, setChannelDescription] = useState(channel.description || '');
  const [isPrivate, setIsPrivate] = useState(channel.isPrivate);

  const handleSaveSettings = () => {
    onUpdateChannel({
      ...channel,
      name: channelName,
      description: channelDescription,
      isPrivate,
    });
    setShowSettings(false);
  };

  return (
    <div className="h-14 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        {channel.isPrivate ? (
          <Lock className="h-5 w-5 text-gray-400" />
        ) : (
          <Hash className="h-5 w-5 text-gray-400" />
        )}
        <h2 className="font-semibold">{channel.name}</h2>
      </div>
      <div className="flex items-center gap-2">
        <Dialog open={showMembers} onOpenChange={setShowMembers}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Members
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Channel Members</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {demoMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                            member.status === 'online'
                              ? 'bg-green-500'
                              : member.status === 'away'
                              ? 'bg-yellow-500'
                              : 'bg-gray-500'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Channel Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Channel Name</Label>
                <Input
                  id="name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={channelDescription}
                  onChange={(e) => setChannelDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="private">Private Channel</Label>
                <Switch
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
              </div>
              <Button onClick={handleSaveSettings} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 