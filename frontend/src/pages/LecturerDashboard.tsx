import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";

export default function LecturerDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold mb-4">👤 Lecturer Profile</h2>
      <div className="bg-white p-6 rounded shadow-md space-y-2">
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Department:</strong> {user?.department || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {user?.role}
        </p>
      </div>
    </DashboardLayout>
  );
}
