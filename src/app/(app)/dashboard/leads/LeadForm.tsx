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

interface LeadFormData {
  companyName?: string;
  contactName: string;
  email: string;
  phone?: string;
  source: string;
  priority: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  budget?: number;
  timeline?: Date;
  requirements?: string;
  notes?: string;
  assignedToId?: string;
}

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface LeadFormProps {
  initialData?: LeadFormData;
  users: User[];
  onSubmit: (data: LeadFormData) => Promise<void>;
  isEdit?: boolean;
}

const LEAD_SOURCES = [
  'INSTAGRAM',
  'WEBSITE',
  'TRADE_SHOW',
  'IN_PERSON',
  'PERMIT_PORTAL',
  'REFERRAL',
  'OTHER',
];

const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

export default function LeadForm({
  initialData,
  users,
  onSubmit,
  isEdit = false,
}: LeadFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>(
    initialData || {
      contactName: '',
      email: '',
      source: 'WEBSITE',
      priority: 'MEDIUM',
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      router.push('/dashboard/leads');
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
              Contact Name *
            </label>
            <div className="mt-1">
              <TextInput
                id="contactName"
                name="contactName"
                required
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Enter contact name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div className="mt-1">
              <TextInput
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Enter company name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <div className="mt-1">
              <TextInput
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="mt-1">
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">
              Lead Source *
            </label>
            <div className="mt-1">
              <Select
                id="source"
                value={formData.source}
                onValueChange={(value) => setFormData({ ...formData, source: value })}
              >
                {LEAD_SOURCES.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source.replace('_', ' ')}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority *
            </label>
            <div className="mt-1">
              <Select
                id="priority"
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                {PRIORITIES.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <div className="mt-1">
              <Select
                id="assignedTo"
                value={formData.assignedToId || ''}
                onValueChange={(value) => setFormData({ ...formData, assignedToId: value })}
              >
                <SelectItem value="">Unassigned</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name || user.email}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
              Budget
            </label>
            <div className="mt-1">
              <TextInput
                id="budget"
                name="budget"
                type="number"
                value={formData.budget?.toString() || ''}
                onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) || undefined })}
                placeholder="Enter budget"
              />
            </div>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
              Timeline
            </label>
            <div className="mt-1">
              <DatePicker
                value={formData.timeline}
                onValueChange={(date) => setFormData({ ...formData, timeline: date })}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <div className="mt-1">
            <Textarea
              id="requirements"
              value={formData.requirements || ''}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Enter project requirements"
              rows={3}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <div className="mt-1">
            <Textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter any additional notes"
              rows={3}
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
            {isEdit ? 'Update Lead' : 'Create Lead'}
          </Button>
        </div>
      </form>
    </Card>
  );
} 