"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/hero-images");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to load images:", err);
      }
    };
    fetchImages();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const backgroundImage = images[currentIndex]?.image;

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-gray-900">
      {/* Background image carousel */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="opacity-200 transition-opacity duration-1000"
          unoptimized
        />
      )}

      {/* Overlay content */}
      <div className="relative z-10 max-w-3xl px-6 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Discover the Soul of{" "}
          <span className="text-orange-500">Heritage India</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Dive into ancient monuments, vibrant culture, and timeless traditions
          that shape India's identity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#monuments">
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md shadow transition">
              Explore Monuments
            </button>
          </Link>
          <Link href="/about">
            <button className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-md shadow transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" />
    </section>
  );
}
