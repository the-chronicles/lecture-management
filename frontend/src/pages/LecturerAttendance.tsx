/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getLecturerSchedule } from "../api/schedule";
import { generateAttendanceCode } from "../api/attendance";

interface Schedule {
  _id: string;
  courseTitle: string;
  startTime: string;
  endTime: string;
  hall: string;
}

export default function LecturerAttendance() {
  const { user } = useAuth();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState<Record<string, string>>(
    {}
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?._id) {
      loadSchedules();
    }
  }, [user]);

  const loadSchedules = async () => {
    try {
      const data = await getLecturerSchedule(user!._id);
      // Filter to only show upcoming classes
      const upcoming = data.filter(
        (s: Schedule) => new Date(s.startTime) > new Date()
      );
      setSchedules(upcoming);
    } catch (err) {
      console.error("Failed to load schedules:", err);
    }
  };

  const handleGenerateCode = async (scheduleId: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await generateAttendanceCode({
        lecturerId: user!._id,
        scheduleId,
        durationMinutes: 15, // 15 minutes validity
      });

      setGeneratedCodes((prev) => ({
        ...prev,
        [scheduleId]: response.code,
      }));

      // Auto-copy to clipboard
      navigator.clipboard.writeText(response.code);
      alert(`Code ${response.code} copied to clipboard!`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to generate code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">📊 Attendance Management</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Classes</h3>

          {schedules.length === 0 ? (
            <p className="text-gray-500">No upcoming classes found.</p>
          ) : (
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule._id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{schedule.courseTitle}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(schedule.startTime).toLocaleDateString()} •
                      {new Date(schedule.startTime).toLocaleTimeString()} -
                      {new Date(schedule.endTime).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Hall: {schedule.hall}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {generatedCodes[schedule._id] && (
                      <div className="text-center">
                        <span className="text-2xl font-mono font-bold text-green-600">
                          {generatedCodes[schedule._id]}
                        </span>
                        <p className="text-xs text-gray-500">
                          Active for 15 minutes
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => handleGenerateCode(schedule._id)}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? "Generating..." : "Generate Code"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">
            ℹ️ Instructions
          </h4>
          <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
            <li>Generate a code for each class session</li>
            <li>Share the code with students at the beginning of class</li>
            <li>Each code is valid for 15 minutes</li>
            <li>Students must enter the code to mark attendance</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
