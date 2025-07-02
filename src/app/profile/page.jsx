'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error('Not logged in:', err);
        router.push('/login');
      }
    };
    fetchUser();
  }, [router]);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10 px-4 bg-orange-50 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6 relative">
        {/* Back Button inside card */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-orange-600 hover:text-orange-800 font-medium flex items-center gap-1"
        >
          <IoArrowBack className="text-lg" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 pt-6">
          <FaUserCircle className="text-5xl text-orange-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">@{user.userId}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-4 text-sm pt-2">
          <div>
            <label className="block text-gray-500 font-medium">Email</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <label className="block text-gray-500 font-medium">Contact</label>
            <p className="text-gray-800">{user.contact}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="pt-4">
          <button
            onClick={() => router.push('/profile/edit')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
