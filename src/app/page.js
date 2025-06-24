"use client";

import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CultureSection from "@/components/CultureSection";
import HeroSection from "@/components/HeroSection";
import MonumentSection from "@/components/MonumentSection";

export default function HomePage() {
  return (
    <main className="bg-white text-gray-800">
      <HeroSection />
      <MonumentSection />
      <CultureSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
