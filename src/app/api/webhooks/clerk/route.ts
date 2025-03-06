import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { prisma } from '@/lib/prisma';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error occured', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, ...attributes } = evt.data;
    const email = email_addresses[0]?.email_address;

    // Create a default organization for the user
    const organization = await prisma.organization.create({
      data: {
        name: `${attributes.first_name || 'Default'}'s Organization`,
        slug: `${attributes.first_name || 'default'}-org-${Date.now()}`.toLowerCase(),
      }
    });

    // Create the user in our database
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: `${attributes.first_name} ${attributes.last_name}`,
        role: 'admin', // Set default role to admin for now
        organizationId: organization.id,
      }
    });

    // Update the user's public metadata in Clerk
    await fetch(`https://api.clerk.com/v1/users/${id}/metadata`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publicMetadata: {
          role: 'admin',
          organizationId: organization.id
        }
      })
    });

    // Update all active sessions for the user with the role claim
    const sessionsResponse = await fetch(`https://api.clerk.com/v1/users/${id}/sessions`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const sessions = await sessionsResponse.json();
    
    // Update each active session with the role claim
    if (sessions.data) {
      await Promise.all(sessions.data.map(async (session: any) => {
        await fetch(`https://api.clerk.com/v1/sessions/${session.id}/claims`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            claims: {
              role: 'admin'
            }
          })
        });
      }));
    }
  }

  return new NextResponse('Success', { status: 200 });
} 