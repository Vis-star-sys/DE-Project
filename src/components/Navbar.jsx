"use client";

import { useState } from "react";
import { Menu, X, UserCircle, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const isLoggedIn = !!user && !loading;
  const router = useRouter();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const commonLinks = [
    { label: "Home", href: "/" },
    { label: "Monuments", href: "#monuments" },
    { label: "Culture", href: "#culture" },
  ];

  const guestLinks = [
    ...commonLinks,
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const userLinks = [
    { label: "Home", href: `/user/${user?.userId || "home"}` }, // ✅ FIXED
    { label: "Monuments", href: "/monuments" },
    { label: "Explore", href: "/explore" },
    { label: "My Bookings", href: "/my-bookings" },
  ];

  
  const navLinks = isLoggedIn ? userLinks : guestLinks;

  return (
    <header className="fixed w-full z-50 bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-orange-600">
          <Link href="/">
            Heritage<span className="text-gray-800 dark:text-white">India</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400 transition cursor-pointer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-orange-600 dark:text-gray-200 dark:hover:text-orange-400 transition"
              >
                {link.label}
              </Link>
            )
          )}

          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center space-x-1">
                <UserCircle className="w-6 h-6 text-orange-600 dark:text-white" />
                <span className="hidden md:inline text-sm">
                  {user?.userId || "Profile"}
                </span>
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-200 z-50">
                <Link href="/profile">
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Edit Profile
                  </div>
                </Link>
                <Link href="/settings">
                  <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                    Settings
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.push("/auth/login"); // ✅ redirect after logout
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <button className="px-4 py-1 rounded-md border text-sm hover:bg-orange-50 dark:hover:bg-orange-900 transition">
                  Login
                </button>
              </Link>
              <Link href="/auth/signup">
                <button className="px-4 py-1 rounded-md bg-orange-600 text-white text-sm hover:bg-orange-700 transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 px-4 pb-6 space-y-2">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block py-2 text-gray-800 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="block py-2 text-gray-800 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}

          <div className="mt-4 flex flex-col space-y-2">
            {isLoggedIn ? (
              <>
                <Link href="/profile/edit">
                  <button
                    className="w-full px-4 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Edit Profile
                  </button>
                </Link>
                <Link href="/settings">
                  <button
                    className="w-full px-4 py-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </button>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    router.push("/auth/login"); // ✅ redirect after logout (mobile)
                  }}
                  className="w-full px-4 py-2 text-left text-red-500 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <button
                    className="w-full px-4 py-2 rounded-md border text-sm hover:bg-orange-50 dark:hover:bg-orange-900 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button
                    className="w-full px-4 py-2 rounded-md bg-orange-600 text-white text-sm hover:bg-orange-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>                                                                                                                                                                                                                                                          
        </nav>
      )}
    </header>
  );
}
