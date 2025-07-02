"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CultureSection() {
  const [cultureItems, setCultureItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const res = await fetch("/api/culture");
        const data = await res.json();
        setCultureItems(data);
      } catch (err) {
        setError("Failed to fetch culture data");
      } finally {
        setLoading(false);
      }
    };

    fetchCulture();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading culture...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section
      id="culture"
      className="bg-gray-100 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
          🎨 Indian Culture & Traditions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Dive into India’s colorful traditions, art forms, festivals, and
          timeless spiritual practices that unite the country’s vast diversity.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {cultureItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-lg font-semibold text-orange-600 group-hover:text-orange-700 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4">
                <Link href={`/cultures/${item._id}`}>
                  <button className="mt-2 w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-md shadow transition">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
