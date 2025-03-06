import { useEffect, useRef, useCallback, useState } from 'react';
import { Manager } from 'socket.io-client';
import type { Socket as ClientSocket } from 'socket.io-client/build/esm/socket';
import type { ServerToClientEvents, ClientToServerEvents } from '@/types/websocket';

type WebSocketHook = {
  connected: boolean;
  subscribeToDesign: (designId: string) => void;
  subscribeToProject: (projectId: string) => void;
  unsubscribeFromProject: (projectId: string) => void;
  onDesignUpdate: (callback: ServerToClientEvents['design:update']) => () => void;
  onDesignComment: (callback: ServerToClientEvents['design:comment']) => () => void;
  onDesignApproval: (callback: ServerToClientEvents['design:approval']) => () => void;
  onProjectUpdate: (callback: ServerToClientEvents['project:update']) => () => void;
  onNotification: (callback: ServerToClientEvents['notification:new']) => () => void;
};

export function useWebSocket(): WebSocketHook {
  const socket = useRef<ClientSocket<ServerToClientEvents, ClientToServerEvents>>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket.current) {
      const manager = new Manager(process.env.NEXT_PUBLIC_APP_URL || '', {
        path: '/api/socket',
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        transports: ['websocket'],
      });

      socket.current = manager.socket('/') as unknown as ClientSocket<ServerToClientEvents, ClientToServerEvents>;

      socket.current.on('connect', () => {
        console.log('Connected to WebSocket server');
        setConnected(true);
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        setConnected(false);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const subscribeToDesign = useCallback((designId: string) => {
    socket.current?.emit('design:view', designId);
  }, []);

  const subscribeToProject = useCallback((projectId: string) => {
    socket.current?.emit('project:join', projectId);
  }, []);

  const unsubscribeFromProject = useCallback((projectId: string) => {
    socket.current?.emit('project:leave', projectId);
  }, []);

  const onDesignUpdate = useCallback((callback: ServerToClientEvents['design:update']) => {
    socket.current?.on('design:update', callback);
    return () => {
      socket.current?.off('design:update', callback);
    };
  }, []);

  const onDesignComment = useCallback((callback: ServerToClientEvents['design:comment']) => {
    socket.current?.on('design:comment', callback);
    return () => {
      socket.current?.off('design:comment', callback);
    };
  }, []);

  const onDesignApproval = useCallback((callback: ServerToClientEvents['design:approval']) => {
    socket.current?.on('design:approval', callback);
    return () => {
      socket.current?.off('design:approval', callback);
    };
  }, []);

  const onProjectUpdate = useCallback((callback: ServerToClientEvents['project:update']) => {
    socket.current?.on('project:update', callback);
    return () => {
      socket.current?.off('project:update', callback);
    };
  }, []);

  const onNotification = useCallback((callback: ServerToClientEvents['notification:new']) => {
    socket.current?.on('notification:new', callback);
    return () => {
      socket.current?.off('notification:new', callback);
    };
  }, []);

  return {
    connected,
    subscribeToDesign,
    subscribeToProject,
    unsubscribeFromProject,
    onDesignUpdate,
    onDesignComment,
    onDesignApproval,
    onProjectUpdate,
    onNotification,
  };
} 