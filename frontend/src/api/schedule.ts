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
