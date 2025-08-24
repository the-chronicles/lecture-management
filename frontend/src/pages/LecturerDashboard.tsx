import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { getLecturerSchedule } from '../api/schedule';

interface Lecture {
  courseTitle: string;
  hall: string;
  startTime: string;
  endTime: string;
  isCancelled: boolean;
  remarks?: string;
}

export default function LecturerDashboard() {
  const { user } = useAuth();
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    if (user?.userId || user?._id) {
      getLecturerSchedule(user._id || user.userId).then(setLectures);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = () => {
      if (user?._id) {
        getLecturerSchedule(user._id).then(setLectures);
      }
    };
  
    fetchData(); // initial fetch
  
    const interval = setInterval(fetchData, 30_000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, [user]);
  

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-4">📅 Upcoming Lectures</h2>

      <div className="space-y-4">
        {lectures.length === 0 ? (
          <div className="text-gray-500">No upcoming lectures</div>
        ) : (
          lectures.map((lec, index) => (
            <div
              key={index}
              className={`border p-4 rounded shadow-sm ${
                lec.isCancelled ? 'bg-red-100 text-red-800' : 'bg-white'
              }`}
            >
              <div className="font-semibold text-lg">{lec.courseTitle}</div>
              <div className="text-sm">
                <strong>Hall:</strong> {lec.hall}
              </div>
              <div className="text-sm">
                <strong>Time:</strong>{' '}
                {new Date(lec.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                {new Date(lec.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm">
                <strong>Date:</strong> {new Date(lec.startTime).toLocaleDateString()}
              </div>
              {lec.isCancelled && <div className="text-xs mt-1">❌ Cancelled — {lec.remarks}</div>}
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
