"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            🧭 About <span className="text-orange-600">Heritage India</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
            Heritage India is a platform that celebrates the soul of Indian
            civilization—its history, traditions, art, and spiritual essence.
            From the architectural marvels of ancient kingdoms to the colorful
            festivals of modern times, we bring you closer to India’s timeless
            cultural legacy.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our mission is to preserve and promote the diverse heritage of
            India, one story at a time. Join us as we explore the depth of a
            nation woven with unity in diversity.
          </p>
          <Link href="#contact">
            <button className="mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md shadow-md transition">
              Contact Us
            </button>
          </Link>
        </div>

        {/* Image */}
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="./images/About.jpg"
            alt="Indian Heritage"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
