'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStripe } from '@stripe/react-stripe-js';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentConfirmation() {
  const [status, setStatus] = useState<'success' | 'processing' | 'error'>();
  const [message, setMessage] = useState('');
  const stripe = useStripe();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get('payment_intent_client_secret');

    if (!clientSecret) {
      setStatus('error');
      setMessage('No payment information found.');
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case 'succeeded':
            setStatus('success');
            setMessage('Payment successful! Thank you for your payment.');
            break;
          case 'processing':
            setStatus('processing');
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setStatus('error');
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setStatus('error');
            setMessage('Something went wrong.');
            break;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatus('error');
        setMessage('An error occurred while checking payment status.');
      });
  }, [stripe, searchParams]);

  return (
    <div className="container max-w-md py-12">
      <Card className="p-6">
        <div className="text-center space-y-4">
          {status === 'success' && (
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
          )}
          {status === 'error' && (
            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
          )}
          {status === 'processing' && (
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          )}
          <h1 className="text-2xl font-bold">
            {status === 'success' && 'Payment Successful'}
            {status === 'error' && 'Payment Failed'}
            {status === 'processing' && 'Processing Payment'}
          </h1>
          <p className="text-gray-600">{message}</p>
          <div className="pt-4">
            <Link href="/dashboard">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
} 