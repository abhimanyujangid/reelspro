"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { apiClient } from "@/lib/api-client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      toast.promise(apiClient.forgotPassword(email), {
        loading: "Sending reset link...",
        success: "Reset link sent successfully",
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Try again.");
    } finally {
      toast.success("Reset link sent successfully");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">ReelPro</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-3">
                <Mail className="w-5 h-5 text-gray-500" />
              </span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
