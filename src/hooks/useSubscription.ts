import { useEffect, useState } from 'react';
import { useOrganization } from '@clerk/nextjs';

interface SubscriptionData {
  plan: 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE';
  status: 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE' | 'INCOMPLETE_EXPIRED' | 'TRIALING' | 'UNPAID';
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}

export function useSubscription() {
  const { organization } = useOrganization();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!organization?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/subscriptions/${organization.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch subscription');
        }
        const data = await response.json();
        setSubscription(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, [organization?.id]);

  const isSubscribed = subscription?.status === 'ACTIVE';
  const isPro = isSubscribed && subscription.plan === 'PROFESSIONAL';
  const isEnterprise = isSubscribed && subscription.plan === 'ENTERPRISE';

  return {
    subscription,
    isLoading,
    error,
    isSubscribed,
    isPro,
    isEnterprise,
  };
} 