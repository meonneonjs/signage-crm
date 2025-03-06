import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { createSubscription } from '@/lib/stripe';
import { z } from 'zod';

const createSubscriptionSchema = z.object({
  priceId: z.string(),
  organizationId: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await req.json();
    const body = createSubscriptionSchema.parse(json);

    const subscription = await createSubscription(
      body.organizationId,
      body.priceId
    );

    return NextResponse.json({
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; 