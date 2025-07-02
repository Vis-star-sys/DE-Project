'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function CultureDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [culture, setCulture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const res = await fetch(`/api/cultures/${id}`);
        const data = await res.json();
        setCulture(data);
      } catch (err) {
        console.error("Failed to fetch culture:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCulture();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-orange-600 text-lg font-semibold animate-pulse">Loading culture...</p>
      </div>
    );
  }

  if (!culture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-orange-600 text-lg font-semibold">Culture not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20">
      {/* Full-width top image */}
      <div className="relative w-full h-[420px] md:h-[420px] overflow-hidden">
        <img
          src={culture.image}
          alt={culture.title}
          className="w-full h-full object-fit"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 text-orange-600 hover:text-orange-800 font-medium"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-orange-700 mb-4">{culture.title}</h1>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{culture.description}</p>
        </section>

        {/* History */}
        {culture.history && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">History</h2>
            <p className="text-gray-700 leading-relaxed">{culture.history}</p>
          </section>
        )}

        {/* Significance */}
        {culture.significance && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">Cultural Significance</h2>
            <p className="text-gray-700 leading-relaxed">{culture.significance}</p>
          </section>
        )}

        {/* Gallery */}
        {culture.gallery && culture.gallery.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {culture.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-48 object-cover rounded-xl border border-orange-100 shadow-sm hover:scale-105 transition"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
