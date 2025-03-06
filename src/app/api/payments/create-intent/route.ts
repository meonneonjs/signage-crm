import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { createPaymentIntent } from '@/lib/stripe';
import { z } from 'zod';

const createPaymentIntentSchema = z.object({
  amount: z.number().min(1),
  organizationId: z.string(),
  customerId: z.string().optional(),
  currency: z.string().default('usd'),
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await req.json();
    const body = createPaymentIntentSchema.parse(json);

    const paymentIntent = await createPaymentIntent({
      amount: body.amount,
      organizationId: body.organizationId,
      customerId: body.customerId,
      currency: body.currency,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; 