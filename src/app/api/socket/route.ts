import { NextRequest } from 'next/server';
import { initializeSocket } from '@/lib/websocket';
import { auth } from '@clerk/nextjs';

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const isWebSocket = await initializeSocket(req);
  if (!isWebSocket) {
    return new Response('Expected WebSocket connection', { status: 400 });
  }

  return new Response(null, {
    status: 101,
    headers: {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade',
    },
  });
}

export const dynamic = 'force-dynamic'; 