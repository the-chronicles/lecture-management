/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { createSchedule } from '../api/schedule';
import { useAuth } from '@/context/AuthContext';

export default function BookSchedule() {
  const [courseTitle, setCourseTitle] = useState('');
  const [hall, setHall] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    try {
      await createSchedule({
        courseTitle,
        hall,
        startTime,
        endTime,
        lecturer: user?._id ?? user?.userId ?? '', // Ensure lecturer is always a string
      });
      setMessage('✅ Class scheduled successfully!');
      setCourseTitle('');
      setHall('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to schedule class.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-4">📅 Schedule a New Lecture</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Hall</label>
          <input
            type="text"
            value={hall}
            onChange={(e) => setHall(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">End Time</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Scheduling...' : 'Schedule Class'}
        </button>
      </form>

      {message && <div className="mt-4 text-center">{message}</div>}
    </DashboardLayout>
  );
}
