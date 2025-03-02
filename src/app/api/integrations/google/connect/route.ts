import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

// This is a mock implementation. In a real app, you would:
// 1. Redirect to Google OAuth consent screen
// 2. Handle the OAuth callback
// 3. Store the refresh token
// 4. Use the refresh token to get access tokens as needed

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

    // In a real implementation, this would be the refresh token from Google OAuth
    const mockRefreshToken = 'mock_refresh_token';

    // Update or create user integration settings
    await prisma.userIntegration.upsert({
      where: {
        userId
      },
      update: {
        googleConnected: true,
        googleEmail: 'example@gmail.com', // This would come from Google OAuth
        googleRefreshToken: mockRefreshToken,
        lastSyncedAt: new Date(),
      },
      create: {
        userId,
        googleConnected: true,
        googleEmail: 'example@gmail.com',
        googleRefreshToken: mockRefreshToken,
        lastSyncedAt: new Date(),
      }
    });

    // Redirect back to the integrations page
    return NextResponse.redirect(new URL('/dashboard/settings/profile/integrations', request.url));
  } catch (error) {
    console.error('[GOOGLE_CONNECT]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 