import { Server as HTTPServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs';
import type { ServerToClientEvents, ClientToServerEvents, InterServerEvents } from '@/types/websocket';

type SocketData = {
  userId: string;
};

type SocketServer = IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
type SocketClient = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

let io: SocketServer;

export async function initializeSocket(req: NextRequest): Promise<boolean> {
  if (!io) {
    const httpServer = new HTTPServer();
    io = new IOServer(httpServer, {
      path: '/api/socket',
      transports: ['websocket'],
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL,
        methods: ['GET', 'POST'],
        credentials: true,
      },
      pingTimeout: 20000,
      pingInterval: 25000,
    });

    io.use(async (socket: SocketClient, next: (err?: Error) => void) => {
      try {
        const { userId } = await auth();
        if (!userId) {
          return next(new Error('Unauthorized'));
        }
        socket.data.userId = userId;
        next();
      } catch (error) {
        next(new Error('Authentication failed'));
      }
    });

    io.on('connection', (socket: SocketClient) => {
      console.log(`Socket connected: ${socket.id}`);

      socket.on('design:view', (designId: string) => {
        socket.join(`design:${designId}`);
      });

      socket.on('project:join', (projectId: string) => {
        socket.join(`project:${projectId}`);
      });

      socket.on('project:leave', (projectId: string) => {
        socket.leave(`project:${projectId}`);
      });

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });

    // Start the HTTP server
    const port = parseInt(process.env.WEBSOCKET_PORT || '3001', 10);
    httpServer.listen(port, () => {
      console.log(`WebSocket server is running on port ${port}`);
    });
  }

  const upgrade = req.headers.get('upgrade');
  return upgrade?.toLowerCase() === 'websocket';
}

export function emitEvent<T extends keyof ServerToClientEvents>(
  event: T,
  room: string,
  ...args: Parameters<ServerToClientEvents[T]>
) {
  io?.to(room).emit(event, ...args);
}

export type { ServerToClientEvents, ClientToServerEvents, InterServerEvents }; 