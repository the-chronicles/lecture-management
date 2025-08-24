import axios from 'axios';

export async function getLecturerSchedule(lecturerId: string) {
  const token = localStorage.getItem('token');

  const res = await axios.get(`http://localhost:3000/schedule/lecturer/${lecturerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}


export async function createSchedule(scheduleData: {
  courseTitle: string;
  hall: string;
  startTime: string;
  endTime: string;
  lecturer: string;
}) {
  const token = localStorage.getItem('token');

  const res = await axios.post('http://localhost:3000/schedule/book', scheduleData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}


