"use client";

import React, { useState } from "react";
import { Mail, Lock, Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(apiClient.login(formData.email, formData.password), {
        loading: "Logging in...",
        success: "Login successful!",
      });
      router.push("/dashboard"); // Redirect after login
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        {/* Logo */}
        <h2 className="text-3xl font-bold text-center text-blue-600">ReelPro</h2>
        <p className="text-center text-gray-600">Modern UI</p>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["email", "password"].map((field) => (
            <div key={field} className="relative">
              <label className="block text-sm font-medium text-gray-700">
                {field === "email" ? "Email" : "Password"}
              </label>
              <div className="relative flex items-center">
                {field === "email" ? (
                  <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                ) : (
                  <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                )}
                <input
                  type={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter your ${field}`}
                  required
                />
              </div>
            </div>
          ))}

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="/login/forgot" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center text-gray-500">Or continue with</div>
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
            <Mail className="w-5 h-5" /> Google
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-900">
            <Github className="w-5 h-5" /> GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
