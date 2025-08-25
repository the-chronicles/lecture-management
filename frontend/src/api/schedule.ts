import axios from "axios";

export async function getLecturerSchedule(lecturerId: string) {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `http://localhost:3000/schedule/lecturer/${lecturerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export async function createSchedule(scheduleData: {
  courseTitle: string;
  hall: string;
  startTime: string;
  endTime: string;
  lecturer: string;
  department: string;
  level: string;
}) {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:3000/schedule/book",
    scheduleData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export const cancelLecture = async (lectureId: string, remarks: string) => {
  const token = localStorage.getItem('token');
  await axios.put(
    `http://localhost:3000/schedule/cancel/${lectureId}`,
    { remarks },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};


export const getStudentSchedule = async (department: string, level: string, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/schedule/student?department=${encodeURIComponent(department)}&level=${encodeURIComponent(level)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching student schedule:', error);
    throw error;
  }
};
