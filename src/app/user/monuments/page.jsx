"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MonumentsSearchPage() {
  const [monuments, setMonuments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [era, setEra] = useState("");
  const [location, setLocation] = useState("");

  const observer = useRef();

  const fetchMonuments = async () => {
    setLoading(true);
    const res = await fetch(`/api/monuments?page=${page}&limit=9`);
    const data = await res.json();
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setMonuments((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMonuments();
  }, []);

  useEffect(() => {
    const results = monuments.filter((monument) => {
      return (
        monument.name.toLowerCase().includes(search.toLowerCase()) &&
        (state === "" || monument.state === state) &&
        (era === "" || monument.era === era) &&
        (location === "" ||
          monument.location.toLowerCase().includes(location.toLowerCase()))
      );
    });
    setFiltered(results);
  }, [search, state, era, location, monuments]);

  const lastMonumentRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMonuments();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const uniqueStates = [...new Set(monuments.map((m) => m.state))];
  const uniqueEras = [...new Set(monuments.map((m) => m.era))];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-white flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 p-6 bg-white shadow-md rounded-r-2xl">
        <h2 className="text-2xl font-bold text-orange-600 mb-6">
          Filter Monuments
        </h2>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="🔍 Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl"
            >
              <option value="">All States</option>
              {uniqueStates.map((s, idx) => (
                <option key={`state-${idx}`} value={s}>
                  {s || "Unknown"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Era</label>
            <select
              value={era}
              onChange={(e) => setEra(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-xl"
            >
              <option value="">All Eras</option>
              {uniqueEras.map((e, idx) => (
                <option key={`era-${idx}`} value={e}>
                  {e || "Unknown"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city or area"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
        </div>
      </aside>

      {/* Monument Grid */}
      <main className="w-full lg:w-3/4 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-orange-700 mb-8">
          Explore Monuments
        </h1>

        {filtered.length === 0 ? (
          <p className="text-gray-500">😕 No monuments found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((monument, idx) => {
                const isLast = idx === filtered.length - 1;
                return (
                  <motion.div
                    key={monument._id}
                    ref={isLast ? lastMonumentRef : null}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group flex flex-col"
                  >
                    <div className="overflow-hidden h-48">
                      <img
                        src={monument.image}
                        alt={monument.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-orange-600 mb-1">
                          {monument.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          📍 {monument.location}, {monument.state}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                          {monument.description}
                        </p>
                      </div>
                      <div className="mt-4">
                        <a
                          href={`/monuments/${monument._id}`}
                          className="inline-block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
                        >
                          Explore →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {loading && (
          <p className="text-center text-orange-500 mt-6 animate-pulse">
            🔄 Loading more monuments...
          </p>
        )}
        {!hasMore && (
          <p className="text-center text-gray-500 mt-6">
            🎉 You’ve reached the end.
          </p>
        )}
      </main>
    </div>
  );
}
