'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";

export default function EditProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", contact: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || ""
        });
      } catch (err) {
        console.error("Not logged in:", err);
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.userId) return;

    const res = await fetch(`/api/user/${user.userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Profile updated!");
      router.push("/profile");
    } else {
      alert("❌ Error updating profile.");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8 md:p-10 relative">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 text-orange-600 hover:text-orange-800 font-medium flex items-center gap-1"
        >
          <IoArrowBack className="text-lg" />
          Back
        </button>

        {/* Heading */}
        <div className="flex items-center gap-3 mb-8 mt-2 pl-8">
          <FiEdit className="text-4xl text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800">Edit Your Profile</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
