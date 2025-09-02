// AdminDashboard.tsx
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import DashboardLayout from "../layouts/DashboardLayout";

interface HeadcountData {
  deviceId: string;
  count: number;
  timestamp: string;
}

export default function AdminDashboard() {
  const [data, setData] = useState<HeadcountData[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => console.log("🔌 Connected to WebSocket"));

    socket.on("headcountUpdate", (incoming: HeadcountData) => {
      console.log("📡 Incoming:", incoming);
      setData((prev) => {
        const others = prev.filter((d) => d.deviceId !== incoming.deviceId);
        return [...others, incoming].sort((a, b) => a.deviceId.localeCompare(b.deviceId));
      });
    });

    socket.on("disconnect", () => console.log("❌ Disconnected"));
    return () => { socket.disconnect(); };
  }, []);

  return (
    <DashboardLayout>
      <div className="text-xl font-bold mb-4">📊 Real-Time Headcount</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.length === 0 && (
          <div className="text-gray-500 col-span-2">Waiting for headcount data...</div>
        )}

        {data.map((item, i) => (
          <div key={i} className="bg-white p-6 rounded shadow border">
            <div className="text-lg font-semibold">Device: {item.deviceId}</div>
            <div className="text-3xl font-bold my-2">{item.count} students</div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date(item.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
