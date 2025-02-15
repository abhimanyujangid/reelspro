"use client";

import React from "react";
import { Mail, Lock, Github, MailIcon } from "lucide-react";
import Link from "next/link";

const Login = () => {

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        {/* Logo */}
        <h2 className="text-3xl font-bold text-center text-blue-600">ReelPro</h2>
        <p className="text-center text-gray-600">Modern UI</p>

        {/* Login Form */}
        <form className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Sign In
          </button>
        </form>

        {/* Social Login */}
        <div className="text-center text-gray-500">Or continue with</div>
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
            <MailIcon className="w-5 h-5" /> Google
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
