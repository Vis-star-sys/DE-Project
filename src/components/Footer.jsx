"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* Logo and Intro */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600">
            Heritage<span className="text-gray-800 dark:text-white">India</span>
          </h2>
          <p className="mt-4 text-sm">
            Explore India's timeless heritage, rich culture, and iconic monuments that tell stories of the past and inspire the future.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-600">Home</Link></li>
            <li><Link href="#monuments" className="hover:text-orange-600">Monuments</Link></li>
            <li><Link href="#culture" className="hover:text-orange-600">Culture</Link></li>
            <li><Link href="/about" className="hover:text-orange-600">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-orange-600">Contact</Link></li>
          </ul>
        </div>

        {/* Contact and Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={16} /> heritageindia@email.com</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-orange-600"><Facebook size={20} /></a>
            <a href="#" className="hover:text-orange-600"><Twitter size={20} /></a>
            <a href="#" className="hover:text-orange-600"><Instagram size={20} /></a>
            <a href="#" className="hover:text-orange-600"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm border-t pt-4 border-gray-300 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Heritage India. All rights reserved <span className="text-red-500">&#x2764;</span>	By Vishal Suthar.
      </div>
    </footer>
  );
}
