'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", userId: "", email: "", contact: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/auth/login");
    else alert("Signup failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Join Our Heritage Community</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-orange-800">Full Name</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Your Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800">User ID</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Unique User ID"
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800">Email</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="email"
              placeholder="example@email.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800">Contact</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Mobile Number"
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-800">Password</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="password"
              placeholder="Choose a strong password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-orange-700">
          Already have an account? <a href="/auth/login" className="text-orange-600 underline">Log In</a>
        </p>
      </div>
    </div>
  );
}
