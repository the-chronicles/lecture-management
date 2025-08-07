import { useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import DashboardLayout from '../layouts/DashboardLayout';

export default function AdminDashboard() {
  const [headcount, setHeadcount] = useState<number | null>(null);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('🔌 Connected to WebSocket');
    });

    socket.on('headcountUpdate', (data: { count: number }) => {
      console.log('📡 Headcount update:', data);
      setHeadcount(data.count);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="text-xl font-semibold mb-4">📍 Live Headcount</div>

      <div className="bg-white rounded shadow p-6 text-center text-4xl font-bold">
        {headcount !== null ? `${headcount} students in hall` : 'Waiting for data...'}
      </div>
    </DashboardLayout>
  );
}
