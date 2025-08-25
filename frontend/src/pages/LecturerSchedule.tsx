import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getLecturerSchedule, cancelLecture } from "../api/schedule";

interface Lecture {
  _id: string;
  courseTitle: string;
  hall: string;
  startTime: string;
  endTime: string;
  isCancelled: boolean;
  remarks?: string;
}

export default function LecturerSchedule() {
  const { user } = useAuth();
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    if (user?._id) {
      fetchSchedule();
    }
  }, [user]);

  const fetchSchedule = async () => {
    if (user?._id) {
      const data = await getLecturerSchedule(user._id);
      setLectures(data);
    }
  };

  const handleCancel = async (id: string) => {
    const reason = prompt('Reason for cancellation:');
    if (!reason) return;
  
    await cancelLecture(id, reason);
    fetchSchedule();
  };

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-4">📅 Your Upcoming Lectures</h2>
      {lectures.length === 0 ? (
        <div className="text-gray-500">No upcoming lectures</div>
      ) : (
        <div className="space-y-4">
          {lectures.map((lec) => (
            <div
              key={lec._id}
              className={`border p-4 rounded shadow-sm ${
                lec.isCancelled ? "bg-red-100 text-red-800" : "bg-white"
              }`}
            >
              <div className="font-semibold text-lg">{lec.courseTitle}</div>
              <div className="text-sm">
                <strong>Hall:</strong> {lec.hall}
              </div>
              <div className="text-sm">
                <strong>Time:</strong>{" "}
                {new Date(lec.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(lec.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-sm">
                <strong>Date:</strong>{" "}
                {new Date(lec.startTime).toLocaleDateString()}
              </div>
              {lec.isCancelled && (
                <div className="text-xs mt-1">❌ Cancelled — {lec.remarks}</div>
              )}
              {!lec.isCancelled && (
                <button
                  onClick={() => handleCancel(lec._id)}
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancel Class
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
