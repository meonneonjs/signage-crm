import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PaymentFormProps {
  amount: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/confirmation`,
        },
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      toast({
        title: 'Payment successful',
        description: 'Your payment has been processed successfully.',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment failed',
        description: error instanceof Error ? error.message : 'An error occurred while processing your payment.',
        variant: 'destructive',
      });
      onError?.(error instanceof Error ? error : new Error('Payment failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : `Pay ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount / 100)}`}
      </Button>
    </form>
  );
} 