import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import Stripe from 'stripe';

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await db.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: subscription.status.toUpperCase() as any,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  await db.payment.update({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: {
      status: 'PAID',
      stripeChargeId: paymentIntent.latest_charge as string,
    },
  });

  if (paymentIntent.invoice) {
    await db.invoice.update({
      where: { stripeInvoiceId: paymentIntent.invoice as string },
      data: {
        status: 'PAID',
        paidAt: new Date(),
      },
    });
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  await db.payment.update({
    where: { stripePaymentIntentId: paymentIntent.id },
    data: { status: 'FAILED' },
  });

  if (paymentIntent.invoice) {
    await db.invoice.update({
      where: { stripeInvoiceId: paymentIntent.invoice as string },
      data: { status: 'UNCOLLECTIBLE' },
    });
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new NextResponse(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;

      case 'payment_intent.succeeded':
        const successfulPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSucceeded(successfulPayment);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailed(failedPayment);
        break;

      case 'account.updated':
        const account = event.data.object as Stripe.Account;
        if (account.metadata?.organizationId) {
          await db.organization.update({
            where: { stripeConnectedAccountId: account.id },
            data: {
              // Update relevant organization data based on the account update
            },
          });
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Webhook handler failed', { status: 500 });
  }
}

export const dynamic = 'force-dynamic'; 