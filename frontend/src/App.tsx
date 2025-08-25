import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import BookSchedule from "./pages/BookSchedule";
import LecturerSchedule from "./pages/LecturerSchedule";
import StudentSchedule from "./pages/StudentSchedule";
import LecturerAttendance from "./pages/LecturerAttendance"; // Add this import
import StudentAttendance from "./pages/StudentAttendance"; // Add this import

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Lecturer Routes */}
          <Route
            path="/lecturer/dashboard"
            element={
              <ProtectedRoute role="lecturer">
                <LecturerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lecturer/schedule/book"
            element={
              <ProtectedRoute role="lecturer">
                <BookSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lecturer/schedule"
            element={
              <ProtectedRoute role="lecturer">
                <LecturerSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lecturer/attendance"
            element={
              <ProtectedRoute role="lecturer">
                <LecturerAttendance />
              </ProtectedRoute>
            }
          />

          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/schedule"
            element={
              <ProtectedRoute role="student">
                <StudentSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/attendance"
            element={
              <ProtectedRoute role="student">
                <StudentAttendance />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
