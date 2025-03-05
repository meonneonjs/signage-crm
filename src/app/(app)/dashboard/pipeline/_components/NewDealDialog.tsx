'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";

interface Stage {
  id: string;
  name: string;
  color: string;
}

interface NewDealDialogProps {
  stages: Stage[];
}

interface DealFormData {
  title: string;
  company: string;
  value: string;
  stage: string;
  probability: string;
  expectedCloseDate: string;
  owner: string;
  contacts: string[];
  notes: string;
}

export function NewDealDialog({ stages }: NewDealDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<DealFormData>({
    title: '',
    company: '',
    value: '',
    stage: stages[0].id,
    probability: '20',
    expectedCloseDate: '',
    owner: '',
    contacts: [''],
    notes: '',
  });

  const addContact = () => {
    setFormData(prev => ({
      ...prev,
      contacts: [...prev.contacts, ''],
    }));
  };

  const removeContact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  const updateContact = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      contacts: prev.contacts.map((contact, i) => i === index ? value : contact),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create deal
    console.log('New deal:', {
      ...formData,
      value: parseFloat(formData.value),
      probability: parseInt(formData.probability),
    });
    setIsOpen(false);
    setFormData({
      title: '',
      company: '',
      value: '',
      stage: stages[0].id,
      probability: '20',
      expectedCloseDate: '',
      owner: '',
      contacts: [''],
      notes: '',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
          <Plus className="w-4 h-4 mr-2" />
          New Deal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
          <DialogDescription>
            Add a new deal to your sales pipeline.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Deal Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="value">Deal Value</Label>
              <Input
                id="value"
                type="number"
                min="0"
                step="1000"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="probability">Win Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData(prev => ({ ...prev, probability: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage">Stage</Label>
              <Select
                value={formData.stage}
                onValueChange={(value) => setFormData(prev => ({ ...prev, stage: value }))}
              >
                <SelectTrigger>
                  <SelectValue>
                    {stages.find(s => s.id === formData.stage)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage.id} value={stage.id}>
                      <Badge className={stage.color}>{stage.name}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedCloseDate">Expected Close Date</Label>
              <Input
                id="expectedCloseDate"
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedCloseDate: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner">Deal Owner</Label>
              <Input
                id="owner"
                value={formData.owner}
                onChange={(e) => setFormData(prev => ({ ...prev, owner: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Contacts</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addContact}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
            <div className="space-y-2">
              {formData.contacts.map((contact, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={contact}
                    onChange={(e) => updateContact(index, e.target.value)}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeContact(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Add any relevant notes about the deal..."
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90"
            >
              Create Deal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 