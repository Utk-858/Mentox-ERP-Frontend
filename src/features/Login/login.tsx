import React, { useState } from "react";
import { User, Lock, Users, Eye, EyeOff } from "lucide-react";
import axios from "../../api/axios"; // Adjust the import path based on your project structure
import { useNavigate } from "react-router-dom"; // Adjust import based on your routing setup

interface LoginFormData {
  username: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

type UserRole = "Admin" | "Faculty" | "Student" | "Librarian";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<UserRole | "">("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    setError("");
    setIsLoading(true);

    // Validation
    if (!username || !password || !role) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      // Real API call
      const response = await axios.post<LoginResponse>(
        "/auth/login", 
        {
          username,
          password,
          role
        } as LoginFormData
      );
      
      const { token } = response.data;
      
      if (token) {
        // Store token and navigate on successful login
        localStorage.setItem("token", token);
        navigate("/");
        console.log("Login successful:", { username, role });
      } else {
        setError("Invalid credentials. Please try again.");
      }
      
    } catch (err: unknown) {
      console.error("Login failed", err);
      if (err instanceof Error) {
        setError(err.message || "Invalid credentials. Please try again.");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ): void => {
    setter(value);
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleRoleChange = (value: string): void => {
    setRole(value as UserRole | "");
    if (error) setError(""); // Clear error when user selects role
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-gray-600 text-lg">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-purple-100">
          <div className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 outline-none bg-purple-50/30 hover:bg-purple-50/50"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    handleInputChange(setUsername, e.target.value)
                  }
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 outline-none bg-purple-50/30 hover:bg-purple-50/50"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    handleInputChange(setPassword, e.target.value)
                  }
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors disabled:cursor-not-allowed"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <select
                  id="role"
                  className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 outline-none appearance-none bg-purple-50/30 hover:bg-purple-50/50 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  value={role}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                    handleRoleChange(e.target.value)
                  }
                  required
                  disabled={isLoading}
                >
                  <option value="">Select your role</option>
                  <option value="admin">Administrator</option>
                  <option value="Faculty">Faculty</option>
                  <option value="employee">Employee</option>
                  <option value="client">Client</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    console.log("Remember me:", e.target.checked);
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button 
                type="button"
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={() => alert("Forgot password functionality would be implemented here")}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition-all duration-300 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25"
              }`}
              type="button"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                type="button"
                className="text-purple-600 hover:text-purple-800 font-medium transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={isLoading}
                onClick={() => alert("Sign up functionality would be implemented here")}
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-purple-100">
            <span className="text-xs text-gray-600">🔒 Your information is secure and encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;