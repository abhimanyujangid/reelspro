"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await toast.promise(apiClient.register(formData.email, formData.password), {
        loading: "Registering...",
        success: "Registration successful!",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600">ReelPro</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { label: "Email", type: "email", name: "email", icon: <Mail className="w-5 h-5 text-gray-500" /> },
            { label: "Password", type: "password", name: "password", icon: <Lock className="w-5 h-5 text-gray-500" /> },
            { label: "Confirm Password", type: "password", name: "confirmPassword", icon: <Lock className="w-5 h-5 text-gray-500" /> },
          ].map(({ label, type, name, icon }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <div className="relative flex items-center">
                <span className="absolute left-3">{icon}</span>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  required
                />
              </div>
            </div>
          ))}

          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

       

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
