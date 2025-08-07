import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaBook, FaUsers } from 'react-icons/fa';


interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems: { label: string; href: string }[] = [
    { label: 'Dashboard', href: `/${user?.role}/dashboard` },
    { label: 'Schedule', href: `/${user?.role}/schedule` },
    { label: 'Attendance', href: `/${user?.role}/attendance` },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">LMS</h2>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block py-2 px-3 rounded hover:bg-blue-700"
          >
            {item.label}
          </a>
        ))}
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
          <span className="text-sm text-gray-600 capitalize">
            Role: {user?.role}
          </span>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
}
