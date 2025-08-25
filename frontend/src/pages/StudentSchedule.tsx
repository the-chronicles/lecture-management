import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getStudentSchedule } from "../api/schedule";

interface Lecture {
  _id: string;
  courseTitle: string;
  hall: string;
  startTime: string;
  endTime: string;
  isCancelled: boolean;
  remarks?: string;
}

export default function StudentSchedule() {
  const { user, token } = useAuth(); // ✅ use only this
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    if (user?.department && user?.level && token) {
      getStudentSchedule(user.department, user.level, token)
        .then(setLectures)
        .catch((err) => console.error("Error fetching schedule:", err));
    }
  }, [user, token]);

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-4">📅 Your Upcoming Classes</h2>
      {lectures.length === 0 ? (
        <div className="text-gray-500">No upcoming classes</div>
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
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
