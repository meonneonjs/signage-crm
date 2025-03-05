import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        role: 'ADMIN'
      }
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const provider = formData.get('provider') as string;
    const apiKey = formData.get('apiKey') as string;
    const fromEmail = formData.get('fromEmail') as string;

    if (!provider || !apiKey || !fromEmail) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Update or create system settings
    const settings = await prisma.systemSettings.upsert({
      where: {
        id: 'default' // We'll only ever have one settings record
      },
      update: {
        emailProvider: provider,
        emailApiKey: apiKey,
        emailFromAddress: fromEmail,
      },
      create: {
        id: 'default',
        emailProvider: provider,
        emailApiKey: apiKey,
        emailFromAddress: fromEmail,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[EMAIL_SETTINGS]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 