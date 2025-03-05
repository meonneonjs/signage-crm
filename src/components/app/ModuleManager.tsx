'use client';

import { useState } from 'react';
import { Module, CustomField, CustomFieldType } from '@/types/customFields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface ModuleManagerProps {
  modules: Module[];
  entityType: 'client' | 'project' | 'task';
  onModulesChange: (modules: Module[]) => void;
}

export function ModuleManager({ modules, entityType, onModulesChange }: ModuleManagerProps) {
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  const handleAddModule = () => {
    const newModule: Module = {
      id: crypto.randomUUID(),
      name: 'New Module',
      entityType,
      fields: [],
      active: true,
    };
    onModulesChange([...modules, newModule]);
    setEditingModuleId(newModule.id);
  };

  const handleDeleteModule = (moduleId: string) => {
    onModulesChange(modules.filter((m) => m.id !== moduleId));
    if (editingModuleId === moduleId) {
      setEditingModuleId(null);
    }
  };

  const handleModuleChange = (moduleId: string, updates: Partial<Module>) => {
    onModulesChange(
      modules.map((m) => (m.id === moduleId ? { ...m, ...updates } : m))
    );
  };

  const handleAddField = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    const newField: CustomField = {
      id: crypto.randomUUID(),
      name: 'New Field',
      type: 'text',
      required: false,
      entityType,
      moduleId,
    };

    handleModuleChange(moduleId, {
      fields: [...module.fields, newField],
    });
  };

  const handleDeleteField = (moduleId: string, fieldId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    handleModuleChange(moduleId, {
      fields: module.fields.filter((f) => f.id !== fieldId),
    });
  };

  const handleFieldChange = (
    moduleId: string,
    fieldId: string,
    updates: Partial<CustomField>
  ) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    handleModuleChange(moduleId, {
      fields: module.fields.map((f) => (f.id === fieldId ? { ...f, ...updates } : f)),
    });
  };

  const handleMoveField = (moduleId: string, fieldId: string, direction: 'up' | 'down') => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    const fieldIndex = module.fields.findIndex((f) => f.id === fieldId);
    if (fieldIndex === -1) return;

    const newFields = [...module.fields];
    const newIndex = direction === 'up' ? fieldIndex - 1 : fieldIndex + 1;

    if (newIndex < 0 || newIndex >= newFields.length) return;

    const field = newFields[fieldIndex];
    newFields[fieldIndex] = newFields[newIndex];
    newFields[newIndex] = field;

    handleModuleChange(moduleId, { fields: newFields });
  };

  const fieldTypes: CustomFieldType[] = [
    'text',
    'number',
    'date',
    'select',
    'multiselect',
    'checkbox',
    'url',
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Custom Modules</h2>
        <Button onClick={handleAddModule}>
          <Plus className="w-4 h-4 mr-2" />
          Add Module
        </Button>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                {editingModuleId === module.id ? (
                  <Input
                    value={module.name}
                    onChange={(e) =>
                      handleModuleChange(module.id, { name: e.target.value })
                    }
                    className="max-w-sm"
                  />
                ) : (
                  <CardTitle>{module.name}</CardTitle>
                )}
                {module.description && <CardDescription>{module.description}</CardDescription>}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={module.active}
                    onCheckedChange={(checked) =>
                      handleModuleChange(module.id, { active: checked })
                    }
                  />
                  <span className="text-sm text-gray-500">
                    {module.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setEditingModuleId(
                      editingModuleId === module.id ? null : module.id
                    )
                  }
                >
                  {editingModuleId === module.id ? 'Done' : 'Edit'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteModule(module.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            {editingModuleId === module.id && (
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={module.description || ''}
                      onChange={(e) =>
                        handleModuleChange(module.id, {
                          description: e.target.value,
                        })
                      }
                      placeholder="Module description..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Fields</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddField(module.id)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Field
                      </Button>
                    </div>

                    {module.fields.map((field, index) => (
                      <Card key={field.id}>
                        <CardContent className="pt-6">
                          <div className="grid gap-4">
                            <div className="flex items-start justify-between">
                              <div className="grid gap-2 flex-1 mr-4">
                                <Input
                                  value={field.name}
                                  onChange={(e) =>
                                    handleFieldChange(module.id, field.id, {
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="Field name"
                                />
                                <div className="flex gap-4">
                                  <Select
                                    value={field.type}
                                    onValueChange={(value: CustomFieldType) =>
                                      handleFieldChange(module.id, field.id, {
                                        type: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {fieldTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                          {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      checked={field.required}
                                      onCheckedChange={(checked) =>
                                        handleFieldChange(module.id, field.id, {
                                          required: checked,
                                        })
                                      }
                                    />
                                    <span className="text-sm text-gray-500">Required</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleMoveField(module.id, field.id, 'up')
                                  }
                                  disabled={index === 0}
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleMoveField(module.id, field.id, 'down')
                                  }
                                  disabled={index === module.fields.length - 1}
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteField(module.id, field.id)
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
} 