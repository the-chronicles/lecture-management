import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function StudentDashboard() {
  const { user, loading, setUser, token } = useAuth(); // Ensure token and setUser exist in AuthContext
  const [department, setDepartment] = useState(user?.department || "");
  const [level, setLevel] = useState(user?.level || "");
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  if (loading) return <div>Loading...</div>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.patch(
        "http://localhost:3000/users/update-profile",
        { department, level },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data); // Update context
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
        <p>Email: {user?.email}</p>
        {!isEditing ? (
          <>
            <p>Department: {user?.department || "N/A"}</p>
            <p>Level: {user?.level || "N/A"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Edit
            </button>
          </>
        ) : (
          <div className="mt-4">
            <div>
              <label className="block">Department:</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="mt-2">
              <label className="block">Level:</label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
