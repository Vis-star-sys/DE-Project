"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      setStatus("Error sending message.");
      console.error(err);
    }
  };

  return (
    <section id="contact" className="bg-white dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            📬 Get in Touch With Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Have questions or want to collaborate? Reach out and let’s preserve our culture together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-800 dark:text-gray-100">
            <div className="flex items-start gap-4">
              <MapPin className="text-orange-600" />
              <div>
                <h4 className="font-semibold">Office Address</h4>
                <p>Heritage India Foundation, Jaipur, Rajasthan, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-orange-600" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-orange-600" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>contact@heritageindia.org</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your message..."
                className="w-full px-4 py-2 rounded-md border dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md transition"
            >
              Send Message
            </button>
            {status && (
              <p className="text-sm text-center text-orange-600 dark:text-orange-400">{status}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
