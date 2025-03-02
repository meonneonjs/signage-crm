'use client';

import { useState } from 'react';
import { Title, Text, Select, SelectItem, TextInput, Textarea, Button, DatePicker } from '@tremor/react';
import { EnvelopeIcon, PhoneIcon, CalendarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
}

interface CommunicationComposerProps {
  clients: Client[];
}

type CommunicationType = 'EMAIL' | 'SMS' | 'CALL' | 'MEETING';

interface FormData {
  type: CommunicationType;
  clientId: string;
  subject?: string;
  content: string;
  scheduledAt?: Date;
}

export function CommunicationComposer({ clients }: CommunicationComposerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    type: 'EMAIL',
    clientId: '',
    subject: '',
    content: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/communication/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send communication');
      }

      // Reset form
      setFormData({
        type: 'EMAIL',
        clientId: '',
        subject: '',
        content: '',
      });

      // TODO: Show success message
    } catch (error) {
      console.error('Error sending communication:', error);
      // TODO: Show error message
    } finally {
      setIsLoading(false);
    }
  };

  const selectedClient = clients.find(c => c.id === formData.clientId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Title>New Communication</Title>
        <Text>Create a new communication with your client</Text>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Communication Type
          </label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as CommunicationType })}
            icon={
              formData.type === 'EMAIL' ? EnvelopeIcon :
              formData.type === 'SMS' ? ChatBubbleLeftIcon :
              formData.type === 'CALL' ? PhoneIcon :
              CalendarIcon
            }
          >
            <SelectItem value="EMAIL" icon={EnvelopeIcon}>Email</SelectItem>
            <SelectItem value="SMS" icon={ChatBubbleLeftIcon}>SMS</SelectItem>
            <SelectItem value="CALL" icon={PhoneIcon}>Call</SelectItem>
            <SelectItem value="MEETING" icon={CalendarIcon}>Meeting</SelectItem>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client
          </label>
          <Select
            value={formData.clientId}
            onValueChange={(value) => setFormData({ ...formData, clientId: value })}
            placeholder="Select a client"
          >
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {selectedClient && (
        <div className="rounded-lg bg-gray-50 p-4">
          <Text>Selected Contact:</Text>
          <div className="mt-2 space-y-1">
            <Text className="font-medium">{selectedClient.name}</Text>
            {formData.type === 'EMAIL' && (
              <Text className="text-sm text-gray-500">{selectedClient.email}</Text>
            )}
            {(formData.type === 'SMS' || formData.type === 'CALL') && selectedClient.phone && (
              <Text className="text-sm text-gray-500">{selectedClient.phone}</Text>
            )}
          </div>
        </div>
      )}

      {(formData.type === 'EMAIL' || formData.type === 'MEETING') && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <TextInput
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder={formData.type === 'EMAIL' ? 'Email subject' : 'Meeting title'}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {formData.type === 'EMAIL' ? 'Email Body' :
           formData.type === 'SMS' ? 'Message' :
           formData.type === 'CALL' ? 'Call Notes' :
           'Meeting Details'}
        </label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder={
            formData.type === 'EMAIL' ? 'Write your email...' :
            formData.type === 'SMS' ? 'Type your message...' :
            formData.type === 'CALL' ? 'Add notes about the call...' :
            'Enter meeting details and agenda...'
          }
          rows={6}
        />
      </div>

      {(formData.type === 'CALL' || formData.type === 'MEETING') && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Schedule For
          </label>
          <DatePicker
            value={formData.scheduledAt}
            onValueChange={(date) => setFormData({ ...formData, scheduledAt: date })}
            enableClear={false}
          />
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={isLoading}
          disabled={!formData.clientId || !formData.content || isLoading}
        >
          {formData.type === 'EMAIL' ? 'Send Email' :
           formData.type === 'SMS' ? 'Send Message' :
           formData.type === 'CALL' ? 'Schedule Call' :
           'Schedule Meeting'}
        </Button>
      </div>
    </form>
  );
} 