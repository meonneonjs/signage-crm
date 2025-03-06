import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { CommunicationType } from '@prisma/client';

// This would be replaced with actual email/SMS service implementations
const mockSendEmail = async (to: string, subject: string, content: string) => {
  console.log('Sending email to:', to, 'Subject:', subject, 'Content:', content);
  return true;
};

const mockSendSMS = async (to: string, content: string) => {
  console.log('Sending SMS to:', to, 'Content:', content);
  return true;
};

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { type, clientId, subject, content, scheduledAt } = body;

    if (!type || !clientId || !content) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get client details
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      }
    });

    if (!client) {
      return new NextResponse("Client not found", { status: 404 });
    }

    // Validate communication requirements
    if (type === 'EMAIL' && !client.email) {
      return new NextResponse("Client email not available", { status: 400 });
    }
    if ((type === 'SMS' || type === 'CALL') && !client.phone) {
      return new NextResponse("Client phone number not available", { status: 400 });
    }

    let status = scheduledAt && new Date(scheduledAt) > new Date() ? 'SCHEDULED' : 'PENDING';

    // Create communication record
    const communication = await prisma.communication.create({
      data: {
        type: type as CommunicationType,
        status,
        subject,
        content,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        clientId,
        userId,
      }
    });

    // If not scheduled, attempt to send immediately
    if (status === 'PENDING') {
      try {
        let success = false;

        switch (type) {
          case 'EMAIL':
            success = await mockSendEmail(client.email, subject || '', content);
            break;
          case 'SMS':
            success = await mockSendSMS(client.phone!, content);
            break;
          case 'CALL':
          case 'MEETING':
            // These are just scheduled, no immediate action needed
            success = true;
            break;
        }

        if (success) {
          await prisma.communication.update({
            where: { id: communication.id },
            data: { status: 'SENT', sentAt: new Date() }
          });
        } else {
          await prisma.communication.update({
            where: { id: communication.id },
            data: { status: 'FAILED' }
          });
        }
      } catch (error) {
        console.error('Error sending communication:', error);
        await prisma.communication.update({
          where: { id: communication.id },
          data: { status: 'FAILED' }
        });
      }
    }

    return NextResponse.json(communication);
  } catch (error) {
    console.error('[COMMUNICATION_SEND]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 