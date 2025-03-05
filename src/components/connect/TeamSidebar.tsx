'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Hash, Lock, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";

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

interface TeamSidebarProps {
  teams: Team[];
  selectedTeam: Team;
  selectedChannel: Channel;
  onTeamSelect: (team: Team) => void;
  onChannelSelect: (channel: Channel) => void;
  onTeamCreate?: (name: string) => void;
  onChannelCreate?: (teamId: string, name: string, isPrivate: boolean) => void;
  onTeamUpdate?: (team: Team) => void;
}

export function TeamSidebar({
  teams,
  selectedTeam,
  selectedChannel,
  onTeamSelect,
  onChannelSelect,
  onTeamCreate = () => {},
  onChannelCreate = () => {},
  onTeamUpdate = () => {},
}: TeamSidebarProps) {
  const [newTeamName, setNewTeamName] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [isNewChannelPrivate, setIsNewChannelPrivate] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [showNewChannelDialog, setShowNewChannelDialog] = useState(false);
  const [showTeamSettings, setShowTeamSettings] = useState(false);
  const [teamName, setTeamName] = useState(selectedTeam.name);

  const handleTeamCreate = () => {
    if (!newTeamName.trim()) return;
    onTeamCreate(newTeamName);
    setNewTeamName('');
    setShowNewTeamDialog(false);
  };

  const handleChannelCreate = () => {
    if (!newChannelName.trim()) return;
    onChannelCreate(selectedTeam.id, newChannelName, isNewChannelPrivate);
    setNewChannelName('');
    setIsNewChannelPrivate(false);
    setShowNewChannelDialog(false);
  };

  const handleTeamUpdate = () => {
    onTeamUpdate({
      ...selectedTeam,
      name: teamName,
    });
    setShowTeamSettings(false);
  };

  return (
    <div className="w-64 bg-gray-50 border-r flex flex-col">
      <div className="p-4 border-b">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between" size="sm">
              <span className="font-semibold">Atelier Connect</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => setShowTeamSettings(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Team Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {teams.map((team) => (
            <div key={team.id} className="mb-4">
              <button
                className={cn(
                  'w-full text-left px-2 py-1 text-sm font-medium rounded flex items-center justify-between',
                  selectedTeam.id === team.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
                onClick={() => onTeamSelect(team)}
              >
                <span>{team.name}</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowNewChannelDialog(true);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>
              {team.channels.map((channel) => (
                <button
                  key={channel.id}
                  className={cn(
                    'w-full text-left px-3 py-1 text-sm rounded flex items-center gap-2',
                    selectedChannel.id === channel.id
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                  onClick={() => onChannelSelect(channel)}
                >
                  {channel.isPrivate ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Hash className="h-4 w-4" />
                  )}
                  {channel.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Team name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
              </div>
              <Button onClick={handleTeamCreate} className="w-full">
                Create Team
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showNewChannelDialog} onOpenChange={setShowNewChannelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Channel</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  placeholder="Channel name"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="private-channel"
                    checked={isNewChannelPrivate}
                    onChange={(e) => setIsNewChannelPrivate(e.target.checked)}
                  />
                  <label htmlFor="private-channel">Private channel</label>
                </div>
              </div>
              <Button onClick={handleChannelCreate} className="w-full">
                Create Channel
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showTeamSettings} onOpenChange={setShowTeamSettings}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Team Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <Button onClick={handleTeamUpdate} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 