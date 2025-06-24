'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ userId: "", password: "" });
  const router = useRouter();
  const { login } = useAuth(); // ✅ Add this

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      login(data); // ✅ Store user + token in context + localStorage
      router.push(`/user/${data.userId}`); // ✅ Redirect to personalized page
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-orange-800">User ID</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your User ID"
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-orange-700">
          Don’t have an account? <a href="/auth/signup" className="text-orange-600 underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
