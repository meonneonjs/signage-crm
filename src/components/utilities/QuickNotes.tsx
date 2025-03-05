'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2, Edit2, Pin } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  timestamp: string;
}

export function QuickNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      category,
      isPinned: false,
      timestamp: new Date().toLocaleString(),
    };

    setNotes(prev => [newNote, ...prev]);
    setTitle('');
    setContent('');
    setCategory('general');
  };

  const togglePin = (id: string) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const saveEdit = () => {
    if (!editingId) return;

    setNotes(prev =>
      prev.map(note =>
        note.id === editingId
          ? {
              ...note,
              title,
              content,
              category,
              timestamp: new Date().toLocaleString() + ' (edited)',
            }
          : note
      )
    );

    setEditingId(null);
    setTitle('');
    setContent('');
    setCategory('general');
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
          />
        </div>
        <div className="space-y-2">
          <Label>Note</Label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="important">Important</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={editingId ? saveEdit : addNote}
          className="w-full"
        >
          {editingId ? 'Save Changes' : 'Add Note'}
        </Button>
      </div>

      <div className="space-y-4">
        {sortedNotes.map((note) => (
          <Card key={note.id} className={cn("p-4", note.isPinned && "border-blue-200 bg-blue-50")}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">{note.title}</h4>
                <p className="text-sm text-gray-500 capitalize">{note.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePin(note.id)}
                >
                  <Pin
                    className={cn(
                      "h-4 w-4",
                      note.isPinned && "text-blue-500 fill-blue-500"
                    )}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(note)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNote(note.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-gray-600 whitespace-pre-wrap">{note.content}</p>
            <p className="mt-2 text-xs text-gray-400">{note.timestamp}</p>
          </Card>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center text-gray-500">
          No notes yet. Add a note to get started.
        </div>
      )}
    </div>
  );
} 