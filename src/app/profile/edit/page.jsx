"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    profileImage: null,
    userId: "",
  });
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setForm({
            name: data.name || "",
            email: data.email || "",
            contact: data.contact || "",
            profileImage: null,
            userId: data.userId,
          });
          setPreview(data.image || "");
        } else {
          setMessage({ type: "error", text: data.error || "Failed to load user." });
        }
      } catch (err) {
        setMessage({ type: "error", text: "An error occurred while loading profile." });
      }
    };

    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setForm({ ...form, profileImage: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setMessage({ type: "error", text: "Please upload a valid image file." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("contact", form.contact);
    if (form.profileImage) formData.append("image", form.profileImage);

    try {
      const res = await fetch("/api/user/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => {
          router.push(`/user/${form.userId}`);
        }, 1500);
      } else {
        setMessage({ type: "error", text: data.error || "Update failed." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 py-10 flex items-center justify-center">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-8 border border-orange-200">
        <h2 className="text-3xl font-extrabold text-orange-600 text-center mb-6">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-orange-300">
              <img
                src={preview || "/default-avatar.png"}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="mt-3 text-orange-700 font-medium cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              Change Photo
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-orange-800">
              Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-orange-800">
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold text-orange-800">
              Contact
            </label>
            <input
              required
              type="tel"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-bold py-2 rounded-md transition ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

          {/* Message */}
          {message.text && (
            <p
              className={`text-center text-sm font-semibold ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
