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
    const setting = formData.get('setting') as 'calendar' | 'email';

    if (!setting) {
      return new NextResponse("Missing setting type", { status: 400 });
    }

    // Get current integration settings
    const integration = await prisma.userIntegration.findUnique({
      where: { userId }
    });

    if (!integration) {
      return new NextResponse("No integration found", { status: 404 });
    }

    // Toggle the specified setting
    await prisma.userIntegration.update({
      where: { userId },
      data: {
        [setting === 'calendar' ? 'calendarSyncEnabled' : 'emailSyncEnabled']: 
          setting === 'calendar' ? !integration.calendarSyncEnabled : !integration.emailSyncEnabled
      }
    });

    // Redirect back to the integrations page
    return NextResponse.redirect(new URL('/dashboard/settings/profile/integrations', request.url));
  } catch (error) {
    console.error('[GOOGLE_SETTINGS]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 