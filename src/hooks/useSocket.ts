import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents } from '@/lib/websocket';

export function useSocket() {
  const socket = useRef<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io({
        path: '/api/socket',
        addTrailingSlash: false,
      });

      socket.current.on('connect', () => {
        console.log('Connected to WebSocket');
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected from WebSocket');
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const subscribeToDesign = (designId: string) => {
    socket.current?.emit('design:view', designId);
  };

  const subscribeToProject = (projectId: string) => {
    socket.current?.emit('project:join', projectId);
  };

  const unsubscribeFromProject = (projectId: string) => {
    socket.current?.emit('project:leave', projectId);
  };

  const onDesignUpdate = (callback: (design: any) => void) => {
    socket.current?.on('design:update', callback);
    return () => {
      socket.current?.off('design:update', callback);
    };
  };

  const onDesignComment = (callback: (comment: any) => void) => {
    socket.current?.on('design:comment', callback);
    return () => {
      socket.current?.off('design:comment', callback);
    };
  };

  const onDesignApproval = (callback: (approval: any) => void) => {
    socket.current?.on('design:approval', callback);
    return () => {
      socket.current?.off('design:approval', callback);
    };
  };

  const onProjectUpdate = (callback: (project: any) => void) => {
    socket.current?.on('project:update', callback);
    return () => {
      socket.current?.off('project:update', callback);
    };
  };

  const onNotification = (callback: (notification: any) => void) => {
    socket.current?.on('notification:new', callback);
    return () => {
      socket.current?.off('notification:new', callback);
    };
  };

  return {
    socket: socket.current,
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