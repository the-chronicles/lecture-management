import axios from "axios";

export interface GenerateCodeRequest {
  lecturerId: string;
  scheduleId: string;
  durationMinutes?: number;
}

export interface CheckInRequest {
  studentId: string;
  code: string;
}

export const generateAttendanceCode = async (data: GenerateCodeRequest) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:3000/attendance/generate-code",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const checkInAttendance = async (data: CheckInRequest) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    "http://localhost:3000/attendance/check-in",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getStudentAttendanceLogs = async (studentId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:3000/attendance/student/${studentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
