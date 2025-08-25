// AttendancePage.tsx
import { useAuth } from '../context/AuthContext';
import LecturerAttendance from './LecturerAttendance';
import StudentAttendance from './StudentAttendance';

export default function AttendancePage() {
  const { user } = useAuth();
  
  return user?.role === 'lecturer' ? <LecturerAttendance /> : <StudentAttendance />;
}