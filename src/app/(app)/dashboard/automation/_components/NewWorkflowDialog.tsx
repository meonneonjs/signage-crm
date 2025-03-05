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
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  triggers: string[];
  actions: string[];
}

interface NewWorkflowDialogProps {
  templates: Template[];
}

interface WorkflowFormData {
  name: string;
  template: string;
  description: string;
  triggerConditions: Record<string, string>;
  actionSettings: Record<string, string>;
}

export function NewWorkflowDialog({ templates }: NewWorkflowDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<WorkflowFormData>({
    name: '',
    template: '',
    description: '',
    triggerConditions: {},
    actionSettings: {},
  });

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    setFormData(prev => ({
      ...prev,
      template: templateId,
      triggerConditions: template?.triggers.reduce((acc, trigger) => {
        acc[trigger] = '';
        return acc;
      }, {} as Record<string, string>) || {},
      actionSettings: template?.actions.reduce((acc, action) => {
        acc[action] = '';
        return acc;
      }, {} as Record<string, string>) || {},
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create workflow
    console.log('New workflow:', formData);
    setIsOpen(false);
    setFormData({
      name: '',
      template: '',
      description: '',
      triggerConditions: {},
      actionSettings: {},
    });
    setSelectedTemplate(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#1eb5b6] hover:bg-[#1eb5b6]/90">
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Set up a new automated workflow based on a template.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Workflow Template</Label>
              <Select
                value={formData.template}
                onValueChange={handleTemplateSelect}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      <div className="flex items-center justify-between">
                        <span>{template.name}</span>
                        <Badge>{template.category}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTemplate && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Workflow Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    placeholder={`${selectedTemplate.name} Workflow`}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                    placeholder="Describe the purpose of this workflow..."
                  />
                </div>

                <div className="space-y-4">
                  <Label>Trigger Conditions</Label>
                  {selectedTemplate.triggers.map(trigger => (
                    <div key={trigger} className="space-y-2">
                      <Label className="text-sm text-gray-500">{trigger}</Label>
                      <Input
                        value={formData.triggerConditions[trigger] || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          triggerConditions: {
                            ...prev.triggerConditions,
                            [trigger]: e.target.value
                          }
                        }))}
                        placeholder="Set condition..."
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Label>Action Settings</Label>
                  {selectedTemplate.actions.map(action => (
                    <div key={action} className="space-y-2">
                      <Label className="text-sm text-gray-500">{action}</Label>
                      <Input
                        value={formData.actionSettings[action] || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          actionSettings: {
                            ...prev.actionSettings,
                            [action]: e.target.value
                          }
                        }))}
                        placeholder="Configure action..."
                        required
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
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
              disabled={!selectedTemplate}
            >
              Create Workflow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 