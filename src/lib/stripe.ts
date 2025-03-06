import Stripe from 'stripe';
import { db } from '@/lib/db';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    features: [
      'Up to 5 team members',
      'Basic project management',
      'Standard support',
    ],
  },
  PROFESSIONAL: {
    name: 'Professional',
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    features: [
      'Up to 20 team members',
      'Advanced project management',
      'Priority support',
      'Custom branding',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      'Unlimited team members',
      'Enterprise features',
      '24/7 support',
      'Custom integrations',
      'Dedicated account manager',
    ],
  },
};

export async function createStripeCustomer(organizationId: string) {
  const organization = await db.organization.findUnique({
    where: { id: organizationId },
  });

  if (!organization) {
    throw new Error('Organization not found');
  }

  const customer = await stripe.customers.create({
    name: organization.name,
    metadata: {
      organizationId,
    },
  });

  await db.organization.update({
    where: { id: organizationId },
    data: { stripeCustomerId: customer.id },
  });

  return customer;
}

export async function createStripeConnectedAccount(organizationId: string) {
  const organization = await db.organization.findUnique({
    where: { id: organizationId },
  });

  if (!organization) {
    throw new Error('Organization not found');
  }

  const account = await stripe.accounts.create({
    type: 'standard',
    metadata: {
      organizationId,
    },
  });

  await db.organization.update({
    where: { id: organizationId },
    data: { stripeConnectedAccountId: account.id },
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/payments`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/payments`,
    type: 'account_onboarding',
  });

  return accountLink;
}

export async function createSubscription(organizationId: string, priceId: string) {
  const organization = await db.organization.findUnique({
    where: { id: organizationId },
  });

  if (!organization) {
    throw new Error('Organization not found');
  }

  let { stripeCustomerId } = organization;

  if (!stripeCustomerId) {
    const customer = await createStripeCustomer(organizationId);
    stripeCustomerId = customer.id;
  }

  const subscription = await stripe.subscriptions.create({
    customer: stripeCustomerId,
    items: [{ price: priceId }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
    metadata: {
      organizationId,
    },
  });

  await db.subscription.create({
    data: {
      organizationId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      status: subscription.status.toUpperCase() as any,
      plan: getPlanFromPriceId(priceId),
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  });

  return subscription;
}

export async function createPaymentIntent({
  amount,
  organizationId,
  customerId,
  currency = 'usd',
}: {
  amount: number;
  organizationId: string;
  customerId?: string;
  currency?: string;
}) {
  const organization = await db.organization.findUnique({
    where: { id: organizationId },
    include: { Customer: customerId ? { where: { id: customerId } } : false },
  });

  if (!organization) {
    throw new Error('Organization not found');
  }

  if (!organization.stripeConnectedAccountId) {
    throw new Error('Organization has not connected their Stripe account');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    application_fee_amount: Math.round(amount * 0.05), // 5% platform fee
    metadata: {
      organizationId,
      customerId,
    },
  }, {
    stripeAccount: organization.stripeConnectedAccountId,
  });

  await db.payment.create({
    data: {
      organizationId,
      customerId,
      amount: amount / 100, // Convert from cents to dollars
      currency,
      status: 'PENDING',
      stripePaymentIntentId: paymentIntent.id,
    },
  });

  return paymentIntent;
}

export async function createInvoice({
  organizationId,
  customerId,
  items,
  dueDate,
}: {
  organizationId: string;
  customerId?: string;
  items: Array<{ description: string; quantity: number; unitPrice: number }>;
  dueDate?: Date;
}) {
  const amount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  const invoice = await db.invoice.create({
    data: {
      organizationId,
      customerId,
      amount,
      status: 'DRAFT',
      dueDate,
      items: {
        create: items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          amount: item.quantity * item.unitPrice,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  return invoice;
}

function getPlanFromPriceId(priceId: string): 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE' {
  if (priceId === process.env.STRIPE_BASIC_PRICE_ID) return 'BASIC';
  if (priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID) return 'PROFESSIONAL';
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) return 'ENTERPRISE';
  throw new Error('Invalid price ID');
} 