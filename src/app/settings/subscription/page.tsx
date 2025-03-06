'use client';

import { useEffect, useState } from 'react';
import { useOrganization } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { StripeProvider } from '@/components/providers/StripeProvider';
import { PaymentForm } from '@/components/payments/PaymentForm';

interface PlanCardProps {
  name: string;
  priceId: string;
  features: string[];
  isCurrentPlan: boolean;
  onSelect: () => void;
}

function PlanCard({ name, priceId, features, isCurrentPlan, onSelect }: PlanCardProps) {
  return (
    <Card className="p-6 flex flex-col">
      <h3 className="text-xl font-bold">{name}</h3>
      <ul className="mt-4 space-y-2 flex-grow">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Button
        onClick={onSelect}
        variant={isCurrentPlan ? 'secondary' : 'default'}
        className="mt-6"
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
      </Button>
    </Card>
  );
}

export default function SubscriptionPage() {
  const { organization } = useOrganization();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  useEffect(() => {
    // Fetch current subscription status
    if (organization?.id) {
      fetch(`/api/subscriptions/${organization.id}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentPlan(data.plan);
        })
        .catch(console.error);
    }
  }, [organization?.id]);

  const handlePlanSelect = async (priceId: string) => {
    if (!organization?.id) return;

    setSelectedPlan(priceId);

    try {
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          organizationId: organization.id,
        }),
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
          <PlanCard
            key={key}
            name={plan.name}
            priceId={plan.priceId!}
            features={plan.features}
            isCurrentPlan={currentPlan === key}
            onSelect={() => handlePlanSelect(plan.priceId!)}
          />
        ))}
      </div>

      {selectedPlan && clientSecret && (
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Complete Subscription</h2>
            <StripeProvider
              clientSecret={clientSecret}
              options={{ mode: 'subscription' }}
            >
              <PaymentForm
                amount={0} // Amount is handled by the subscription
                onSuccess={() => {
                  // Handle successful subscription
                  window.location.reload();
                }}
              />
            </StripeProvider>
          </Card>
        </div>
      )}
    </div>
  );
} 