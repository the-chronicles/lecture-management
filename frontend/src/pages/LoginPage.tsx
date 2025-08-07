// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password);

//       const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

//       if (storedUser.role === "admin") {
//         navigate("/admin/dashboard");
//       } else if (storedUser.role === "lecturer") {
//         navigate("/lecturer/dashboard");
//       } else {
//         navigate("/student/dashboard");
//       }
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <input
//           type="email"
//           className="w-full mb-4 p-2 border rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className="w-full mb-4 p-2 border rounded"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, BookOpen } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "lecturer" | "student">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (storedUser.role === "admin") {
        navigate("/admin/dashboard");
      } else if (storedUser.role === "lecturer") {
        navigate("/lecturer/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const roleIcons = {
    admin: Users,
    lecturer: BookOpen,
    student: GraduationCap,
  };

  const roleLabels = {
    admin: "Administrator",
    lecturer: "Lecturer",
    student: "Student",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">University Portal</h1>
          <p className="text-muted-foreground">Attendance Management System</p>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-sm text-red-500 bg-red-100 px-3 py-2 rounded">
                  {error}
                </p>
              )}

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([value, label]) => {
                      const Icon =
                        roleIcons[value as "admin" | "lecturer" | "student"];
                      return (
                        <SelectItem key={value} value={value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            {label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
