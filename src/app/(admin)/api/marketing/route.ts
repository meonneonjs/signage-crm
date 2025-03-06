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
    const platform = searchParams.get('platform');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const filters: any = {};
    if (platform) filters.platform = platform;
    if (status) filters.status = status;
    if (type) filters.type = type;

    const [campaigns, metrics] = await Promise.all([
      MarketingService.getCampaigns(filters),
      MarketingService.getMetricsSummary({
        platform: platform || undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined
      })
    ]);

    return NextResponse.json({ campaigns, metrics });
  } catch (error) {
    console.error('Marketing dashboard error:', error);
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
    const campaign = await MarketingService.createCampaign({
      ...data,
      assignedToId: session.user.id
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 