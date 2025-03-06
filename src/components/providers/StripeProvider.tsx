import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeProviderProps {
  children: ReactNode;
  clientSecret?: string;
  options?: {
    appearance?: any;
    mode?: 'payment' | 'subscription';
  };
}

export function StripeProvider({
  children,
  clientSecret,
  options = {},
}: StripeProviderProps) {
  if (!clientSecret) {
    return <>{children}</>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          ...options.appearance,
        },
        mode: options.mode || 'payment',
      }}
    >
      {children}
    </Elements>
  );
} 