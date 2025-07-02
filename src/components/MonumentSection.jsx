"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MonumentsSection() {
  const [monuments, setMonuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(undefined); // undefined: loading, null: guest, object: logged in

  useEffect(() => {
    const fetchUserAndMonuments = async () => {
      try {
        // Check user login status
        const res = await fetch("/api/auth/me", { cache: "no-store" });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData); // Logged-in user

          // Fetch full monuments list
          const monumentRes = await fetch("/api/monuments");
          const data = await monumentRes.json();
          setMonuments(data);
        } else {
          setUser(null); // Guest user

          // Fetch only 4 monuments
          const monumentRes = await fetch("/api/monuments?limit=4");
          const data = await monumentRes.json();
          setMonuments(data);
        }
      } catch (err) {
        setError("Failed to fetch monuments.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndMonuments();
  }, []);

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading monuments...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <section
      id="monuments"
      className="bg-white dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          🏛️ Famous Indian Monuments
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Discover iconic landmarks that represent India’s rich cultural heritage and glorious history.
        </p>

        {/* Monument Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {monuments.map((monument) => (
            <div
              key={monument._id}
              className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-white dark:bg-gray-900"
            >
              <img
                src={monument.image}
                alt={monument.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold text-orange-600 group-hover:text-orange-700">
                  {monument.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{monument.location}</p>
                <Link href={`/monuments/${monument._id}`}>
                  <button className="mt-3 px-4 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Login Prompt for Guests */}
        {user === null && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
              🔐 You’re seeing a preview. Login to explore all monuments!
            </p>
            <Link href="/auth/login">
              <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition">
                Login to View More
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
