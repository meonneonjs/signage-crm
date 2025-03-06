import { NextRequest, NextResponse } from 'next/server';
import { MarketingService } from '@/lib/services/marketingService';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = req.nextUrl.searchParams;
    const campaignId = searchParams.get('campaignId');
    const platform = searchParams.get('platform');
    const status = searchParams.get('status');

    const filters: any = {};
    if (campaignId) filters.campaignId = campaignId;
    if (platform) filters.platform = platform;
    if (status) filters.status = status;

    const messages = await MarketingService.getMessages(filters);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const message = await MarketingService.createMessage({
      ...data,
      assignedToId: session.user.id
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Create message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const message = await MarketingService.updateMessage(id, updateData);
    return NextResponse.json(message);
  } catch (error) {
    console.error('Update message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 