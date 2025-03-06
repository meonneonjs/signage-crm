'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Button,
  TextInput,
  Select,
  SelectItem,
  Textarea,
  DatePicker,
} from '@tremor/react';

interface ActivityFormData {
  type: string;
  title: string;
  description?: string;
  scheduledAt?: Date;
}

interface ActivityFormProps {
  leadId: string;
  onSubmit: (data: ActivityFormData) => Promise<void>;
}

const ACTIVITY_TYPES = [
  'EMAIL',
  'CALL',
  'MEETING',
  'NOTE',
  'PROPOSAL',
  'FOLLOW_UP',
];

export default function ActivityForm({
  leadId,
  onSubmit,
}: ActivityFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ActivityFormData>({
    type: 'NOTE',
    title: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      router.push(`/dashboard/leads/${leadId}`);
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      // TODO: Add error handling UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Activity Type *
          </label>
          <div className="mt-1">
            <Select
              id="type"
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              {ACTIVITY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.replace('_', ' ')}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <div className="mt-1">
            <TextInput
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter activity title"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1">
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter activity description"
              rows={3}
            />
          </div>
        </div>

        <div>
          <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700">
            Schedule For
          </label>
          <div className="mt-1">
            <DatePicker
              value={formData.scheduledAt}
              onValueChange={(date) => setFormData({ ...formData, scheduledAt: date })}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            onClick={() => router.back()}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
          >
            Add Activity
          </Button>
        </div>
      </form>
    </Card>
  );
} 