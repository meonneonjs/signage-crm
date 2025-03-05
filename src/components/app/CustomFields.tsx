'use client';

import { useState } from 'react';
import { CustomField, CustomFieldValue } from '@/types/customFields';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomFieldsProps {
  fields: CustomField[];
  values: Record<string, CustomFieldValue>;
  onChange: (values: Record<string, CustomFieldValue>) => void;
  readOnly?: boolean;
}

export function CustomFields({ fields, values, onChange, readOnly = false }: CustomFieldsProps) {
  const handleFieldChange = (field: CustomField, value: any) => {
    if (readOnly) return;

    const newValues = {
      ...values,
      [field.id]: {
        fieldId: field.id,
        value,
      },
    };
    onChange(newValues);
  };

  const renderField = (field: CustomField) => {
    const value = values[field.id]?.value;

    switch (field.type) {
      case 'text':
      case 'url':
        return (
          <Input
            type={field.type === 'url' ? 'url' : 'text'}
            value={value as string || ''}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            placeholder={field.placeholder}
            disabled={readOnly}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value as number || ''}
            onChange={(e) => handleFieldChange(field, Number(e.target.value))}
            placeholder={field.placeholder}
            disabled={readOnly}
          />
        );

      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'justify-start text-left font-normal',
                  !value && 'text-muted-foreground'
                )}
                disabled={readOnly}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(new Date(value as string), 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value ? new Date(value as string) : undefined}
                onSelect={(date) => handleFieldChange(field, date?.toISOString())}
                disabled={readOnly}
              />
            </PopoverContent>
          </Popover>
        );

      case 'select':
        return (
          <Select
            value={value as string}
            onValueChange={(newValue) => handleFieldChange(field, newValue)}
            disabled={readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        return (
          <Select
            value={Array.isArray(value) ? value[0] : value as string}
            onValueChange={(newValue) => {
              const currentValues = (value as string[]) || [];
              const newValues = currentValues.includes(newValue)
                ? currentValues.filter((v) => v !== newValue)
                : [...currentValues, newValue];
              handleFieldChange(field, newValues);
            }}
            disabled={readOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <Checkbox
            checked={value as boolean || false}
            onCheckedChange={(checked) => handleFieldChange(field, checked)}
            disabled={readOnly}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label>
            {field.name}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {field.description && (
            <p className="text-sm text-gray-500">{field.description}</p>
          )}
          {renderField(field)}
        </div>
      ))}
    </div>
  );
} 