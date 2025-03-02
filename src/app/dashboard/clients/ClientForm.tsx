"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, TextInput } from '@tremor/react';
import { Customer } from '@prisma/client';

interface Props {
  initialData?: Customer;
  onSubmit: (data: Partial<Customer>) => Promise<void>;
  isEdit?: boolean;
}

export function ClientForm({ initialData, onSubmit, isEdit = false }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Customer>>(
    initialData || {
      businessName: '',
      industry: '',
      website: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      router.refresh();
      if (!isEdit) {
        router.push('/dashboard/clients');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof Customer, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="space-y-4">
          <TextInput
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName || ''}
            onChange={(e) => handleChange('businessName', e.target.value)}
            required
          />
          
          <TextInput
            name="industry"
            placeholder="Industry"
            value={formData.industry || ''}
            onChange={(e) => handleChange('industry', e.target.value)}
          />

          <TextInput
            name="website"
            placeholder="Website"
            value={formData.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
          />

          <TextInput
            name="address"
            placeholder="Address"
            value={formData.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              name="city"
              placeholder="City"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            <TextInput
              name="state"
              placeholder="State"
              value={formData.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </div>

          <TextInput
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode || ''}
            onChange={(e) => handleChange('zipCode', e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push('/dashboard/clients')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
          >
            {isEdit ? 'Update Client' : 'Create Client'}
          </Button>
        </div>
      </Card>
    </form>
  );
} 