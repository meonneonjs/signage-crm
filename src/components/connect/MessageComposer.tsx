'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bold,
  Italic,
  Link,
  Paperclip,
  Send,
  Smile,
  Code,
  AtSign,
  Hash,
  FileText,
  Clock,
  Search,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { User } from "@/types/connect";

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttachFile: (file: File) => void;
  onEmojiSelect: (emoji: string) => void;
  mentions: Pick<User, 'id' | 'name'>[];
}

interface SlashCommand {
  command: string;
  description: string;
  icon: React.ReactNode;
  action: (arg?: string) => void;
}

interface EmojiCategories {
  'Smileys & People': string[];
  'Animals & Nature': string[];
  'Food & Drink': string[];
  'Activities': string[];
  'Objects': string[];
}

const emojiCategories: EmojiCategories = {
  'Smileys & People': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰'],
  'Animals & Nature': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🌸'],
  'Food & Drink': ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝'],
  'Activities': ['⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑'],
  'Objects': ['⌚️', '📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀'],
};

type EmojiCategory = keyof EmojiCategories;

export function MessageComposer({
  value,
  onChange,
  onSend,
  onAttachFile,
  onEmojiSelect,
  mentions,
}: MessageComposerProps) {
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  const [selectedEmojiCategory, setSelectedEmojiCategory] = useState<EmojiCategory>('Smileys & People');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const slashCommands: SlashCommand[] = [
    {
      command: 'code',
      description: 'Insert a code block',
      icon: <Code className="h-4 w-4" />,
      action: () => handleFormat('```\n', '\n```'),
    },
    {
      command: 'channel',
      description: 'Link to a channel',
      icon: <Hash className="h-4 w-4" />,
      action: () => handleFormat('#'),
    },
    {
      command: 'file',
      description: 'Share a recent file',
      icon: <FileText className="h-4 w-4" />,
      action: () => fileInputRef.current?.click(),
    },
    {
      command: 'remind',
      description: 'Set a reminder',
      icon: <Clock className="h-4 w-4" />,
      action: () => alert('Reminder feature coming soon!'),
    },
    {
      command: 'search',
      description: 'Search in conversation',
      icon: <Search className="h-4 w-4" />,
      action: () => alert('Search feature coming soon!'),
    },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    } else if (e.key === '@') {
      setShowMentions(true);
    } else if (e.key === '/') {
      const isAtStart = textareaRef.current?.selectionStart === 0;
      if (isAtStart) {
        setShowSlashCommands(true);
      }
    }
    // Handle keyboard shortcuts
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          handleFormat('**');
          break;
        case 'i':
          e.preventDefault();
          handleFormat('_');
          break;
        case 'k':
          e.preventDefault();
          handleFormat('[', '](url)');
          break;
        case '`':
          e.preventDefault();
          handleFormat('`');
          break;
      }
    }
  };

  const handleFormat = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end);
    const beforeSelection = value.slice(0, start);
    const afterSelection = value.slice(end);

    const newValue = `${beforeSelection}${prefix}${selectedText}${suffix}${afterSelection}`;
    onChange(newValue);

    // Set cursor position after formatting
    requestAnimationFrame(() => {
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = end + prefix.length;
      textarea.focus();
    });
  };

  const handleMention = (user: Pick<User, 'id' | 'name'>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const beforeCursor = value.slice(0, cursorPosition);
    const afterCursor = value.slice(cursorPosition);
    
    onChange(`${beforeCursor}@${user.name} ${afterCursor}`);
    setShowMentions(false);
    setMentionFilter('');
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    onAttachFile(file);
    e.target.value = ''; // Reset input
  };

  const filteredMentions = mentions.filter(user =>
    user.name.toLowerCase().includes(mentionFilter.toLowerCase())
  );

  const renderPreview = () => {
    let formatted = value;
    // Convert markdown-style formatting
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/_(.*?)_/g, '<em>$1</em>');
    formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    formatted = formatted.replace(/@(\w+)/g, '<span class="mention">@$1</span>');

    return (
      <div
        className="prose prose-sm max-w-none p-4 border rounded-lg bg-gray-50"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    );
  };

  return (
    <div className="p-4 border-t">
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('**')}
            title="Bold (⌘B)"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('_')}
            title="Italic (⌘I)"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('[', '](url)')}
            title="Link (⌘K)"
          >
            <Link className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleFormat('`')}
            title="Code (⌘`)"
          >
            <Code className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className={cn(showPreview && "bg-gray-100")}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="p-2">
                <div className="flex gap-2 mb-4">
                  {(Object.keys(emojiCategories) as EmojiCategory[]).map(category => (
                    <Button
                      key={category}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "px-2",
                        selectedEmojiCategory === category && "bg-gray-100"
                      )}
                      onClick={() => setSelectedEmojiCategory(category)}
                    >
                      {emojiCategories[category][0]}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {emojiCategories[selectedEmojiCategory].map((emoji: string) => (
                    <Button
                      key={emoji}
                      variant="ghost"
                      size="sm"
                      className="p-1"
                      onClick={() => onEmojiSelect(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/gif,application/pdf"
            onChange={handleFileSelect}
          />
        </div>

        {showPreview && (
          <div className="mb-4">
            {renderPreview()}
          </div>
        )}

        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[100px] p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message... Use @ to mention someone, / for commands"
          />

          {showSlashCommands && (
            <div className="absolute bottom-full left-0 w-64 bg-white border rounded-lg shadow-lg mb-2">
              <div className="p-2">
                <Input
                  placeholder="Search commands..."
                  value={mentionFilter}
                  onChange={(e) => setMentionFilter(e.target.value)}
                />
              </div>
              <ScrollArea className="h-48">
                <div className="p-2">
                  {slashCommands.map(cmd => (
                    <Button
                      key={cmd.command}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        cmd.action();
                        setShowSlashCommands(false);
                      }}
                    >
                      {cmd.icon}
                      <span className="ml-2 font-medium">/{cmd.command}</span>
                      <span className="ml-2 text-sm text-gray-500">{cmd.description}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {showMentions && (
            <div className="absolute bottom-full left-0 w-64 bg-white border rounded-lg shadow-lg mb-2">
              <div className="p-2">
                <Input
                  placeholder="Search users..."
                  value={mentionFilter}
                  onChange={(e) => setMentionFilter(e.target.value)}
                />
              </div>
              <ScrollArea className="h-48">
                <div className="p-2">
                  {filteredMentions.map(user => (
                    <Button
                      key={user.id}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleMention(user)}
                    >
                      <AtSign className="h-4 w-4 mr-2" />
                      {user.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-2">
          <Button onClick={onSend}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
} 