import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const service = formData.get('service') as string;

    if (!service) {
      return new NextResponse("Missing service type", { status: 400 });
    }

    // Update user integration settings
    await prisma.userIntegration.update({
      where: {
        userId
      },
      data: {
        googleConnected: false,
        googleEmail: null,
        googleRefreshToken: null,
        lastSyncedAt: null,
        [service === 'calendar' ? 'calendarSyncEnabled' : 'emailSyncEnabled']: false
      }
    });

    // Redirect back to the integrations page
    return NextResponse.redirect(new URL('/dashboard/settings/profile/integrations', request.url));
  } catch (error) {
    console.error('[GOOGLE_DISCONNECT]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 