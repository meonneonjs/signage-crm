'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Button,
  TextInput,
  Textarea,
  DatePicker,
  NumberInput,
  Select,
  SelectItem,
} from '@tremor/react';
import { Customer, Contact, Proposal } from '@prisma/client';

interface ProposalFormData {
  title: string;
  content: {
    introduction: string;
    scope: string;
    pricing: {
      items: Array<{
        description: string;
        quantity: number;
        unitPrice: number;
      }>;
      subtotal: number;
      tax: number;
      total: number;
    };
    terms: string;
  };
  totalAmount: number;
  validUntil?: Date;
  contactId?: string;
}

interface ProposalFormProps {
  customer: Customer & {
    contacts: Contact[];
  };
  initialData?: Proposal;
  onSubmit: (data: ProposalFormData) => Promise<void>;
  isEdit?: boolean;
}

export function ProposalForm({
  customer,
  initialData,
  onSubmit,
  isEdit = false,
}: ProposalFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProposalFormData>(
    initialData || {
      title: `Proposal for ${customer.businessName}`,
      content: {
        introduction: '',
        scope: '',
        pricing: {
          items: [],
          subtotal: 0,
          tax: 0,
          total: 0,
        },
        terms: '',
      },
      totalAmount: 0,
    }
  );

  const [pricingItems, setPricingItems] = useState<Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>>(formData.content.pricing.items);

  const updatePricing = () => {
    const subtotal = pricingItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    const tax = subtotal * 0.1; // 10% tax rate
    const total = subtotal + tax;

    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        pricing: {
          items: pricingItems,
          subtotal,
          tax,
          total,
        },
      },
      totalAmount: total,
    }));
  };

  const addPricingItem = () => {
    setPricingItems(prev => [
      ...prev,
      { description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const updatePricingItem = (
    index: number,
    field: keyof typeof pricingItems[0],
    value: string | number
  ) => {
    setPricingItems(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
    updatePricing();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      router.refresh();
      if (!isEdit) {
        router.push(`/dashboard/customers/${customer.id}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <div className="space-y-4">
          <TextInput
            name="title"
            placeholder="Proposal Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />

          <div>
            <h3 className="text-lg font-medium mb-2">Introduction</h3>
            <Textarea
              placeholder="Write an introduction for your proposal..."
              value={formData.content.introduction}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: {
                    ...prev.content,
                    introduction: e.target.value,
                  },
                }))
              }
              rows={4}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Scope of Work</h3>
            <Textarea
              placeholder="Describe the scope of work..."
              value={formData.content.scope}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: {
                    ...prev.content,
                    scope: e.target.value,
                  },
                }))
              }
              rows={4}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Pricing</h3>
            <div className="space-y-4">
              {pricingItems.map((item, index) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  <TextInput
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) =>
                      updatePricingItem(index, 'description', e.target.value)
                    }
                  />
                  <NumberInput
                    placeholder="Quantity"
                    value={item.quantity}
                    onValueChange={(value) =>
                      updatePricingItem(index, 'quantity', value || 0)
                    }
                    min={1}
                  />
                  <NumberInput
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onValueChange={(value) =>
                      updatePricingItem(index, 'unitPrice', value || 0)
                    }
                    min={0}
                    enableStepper={false}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={addPricingItem}
              >
                Add Item
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(formData.content.pricing.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(formData.content.pricing.tax)}
                </span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(formData.content.pricing.total)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Terms & Conditions</h3>
            <Textarea
              placeholder="Enter terms and conditions..."
              value={formData.content.terms}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: {
                    ...prev.content,
                    terms: e.target.value,
                  },
                }))
              }
              rows={4}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Contact</h3>
            <Select
              value={formData.contactId || ''}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, contactId: value }))
              }
            >
              {customer.contacts.map((contact) => (
                <SelectItem key={contact.id} value={contact.id}>
                  {contact.firstName} {contact.lastName}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Valid Until</h3>
            <DatePicker
              value={formData.validUntil}
              onValueChange={(date) =>
                setFormData((prev) => ({ ...prev, validUntil: date }))
              }
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
          >
            {isEdit ? 'Update Proposal' : 'Create Proposal'}
          </Button>
        </div>
      </Card>
    </form>
  );
} 