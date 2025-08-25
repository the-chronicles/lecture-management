/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getStudentSchedule } from "../api/schedule";
import { checkInAttendance } from "../api/attendance";

interface Schedule {
  _id: string;
  courseTitle: string;
  startTime: string;
  endTime: string;
  hall: string;
  lecturer: string;
}

export default function StudentAttendance() {
  const { user, token } = useAuth();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.department && user?.level && token) {
      loadSchedules();
    }
  }, [user, token]);

  // In StudentAttendance.tsx, update the loadSchedules function:
  const loadSchedules = async () => {
    try {
      const data = await getStudentSchedule(
        user!.department!,
        user!.level!,
        token!
      );
      setSchedules(data);
    } catch (err) {
      console.error("Failed to load schedules:", err);
    }
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await checkInAttendance({
        studentId: user!._id,
        code: code.toUpperCase().trim(),
      });

      setMessage("✅ Attendance marked successfully!");
      setCode("");

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(`❌ ${err.response?.data?.message || "Failed to check in"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">📝 Class Attendance</h2>

        {/* Check-in Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Enter Attendance Code</h3>

          <form onSubmit={handleCheckIn} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Attendance Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter code from lecturer"
                className="w-full border p-3 rounded text-lg font-mono uppercase"
                required
                maxLength={6}
                pattern="[A-Z0-9]{6}"
                title="6-character alphanumeric code"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Checking In..." : "Check In"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Your Upcoming Classes</h3>

          {schedules.length === 0 ? (
            <p className="text-gray-500">No upcoming classes.</p>
          ) : (
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div key={schedule._id} className="border rounded-lg p-4">
                  <h4 className="font-semibold">{schedule.courseTitle}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(schedule.startTime).toLocaleDateString()} •
                    {new Date(schedule.startTime).toLocaleTimeString()} -
                    {new Date(schedule.endTime).toLocaleTimeString()}
                  </p>
                  <p className="text-sm text-gray-600">Hall: {schedule.hall}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">
            ℹ️ How to check in
          </h4>
          <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
            <li>
              Get the attendance code from your lecturer at the beginning of
              class
            </li>
            <li>Enter the code exactly as provided (case insensitive)</li>
            <li>Each code is only valid for 15 minutes</li>
            <li>You can only check in once per code</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
