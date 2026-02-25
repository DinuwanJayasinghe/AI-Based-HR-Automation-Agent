import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useWebSockets = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host === 'localhost:3000' ? 'localhost:8000' : window.location.host;
    const socket = new WebSocket(`${protocol}//${host}/api/v1/ws/${token}`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setLastMessage(message);
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, [token]);

  return { lastMessage };
};
