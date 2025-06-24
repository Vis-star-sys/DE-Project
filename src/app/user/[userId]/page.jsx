'use client';
import { use } from "react";
import { useEffect, useState } from "react";
import { Sparkles, Landmark, BookOpen, ArrowRightCircle } from "lucide-react";

export default function UserPage({ params }) {
  const { userId } = use(params); // ✅ Fix for Next.js 15

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUserName(data.name);
      } catch (err) {
        console.error("Failed to load user info:", err);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-50 px-6">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-orange-200 transition-all duration-300">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-2 flex justify-center items-center gap-2">
            <Sparkles className="text-orange-500 w-8 h-8" />
            Welcome, {userName || userId}!
          </h1>
          <p className="text-gray-600 text-lg">
            Dive into India’s rich heritage and cultural wonders curated just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <section className="bg-orange-100 p-6 rounded-2xl border border-orange-200 shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-orange-700 flex items-center gap-2 mb-4">
              <Landmark className="text-orange-600" /> Recommended Monuments
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="bg-white rounded-xl px-4 py-3 shadow hover:bg-orange-50 transition">🏛️ Taj Mahal</li>
              <li className="bg-white rounded-xl px-4 py-3 shadow hover:bg-orange-50 transition">🕌 Qutub Minar</li>
              <li className="bg-white rounded-xl px-4 py-3 shadow hover:bg-orange-50 transition">🕉️ Konark Sun Temple</li>
            </ul>
          </section>

          <section className="bg-orange-100 p-6 rounded-2xl border border-orange-200 shadow hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-orange-700 flex items-center gap-2 mb-4">
              <BookOpen className="text-orange-600" /> Your Saved Places
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="bg-white rounded-xl px-4 py-3 shadow hover:bg-orange-50 transition">🏯 Jaipur City Palace</li>
              <li className="bg-white rounded-xl px-4 py-3 shadow hover:bg-orange-50 transition">🕍 Mysore Palace</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full text-lg font-semibold hover:bg-orange-600 transition"
          >
            Explore More <ArrowRightCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
