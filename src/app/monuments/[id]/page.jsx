import { notFound } from "next/navigation";

// Fetch function
async function getMonument(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/monuments/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Page Component
export default async function MonumentDetailPage({ params }) {
  const monument = await getMonument(params.id);
  if (!monument) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-white">
      
      {/* Hero Section with Background Image */}
      <div className="relative w-full aspect-[3/2] md:aspect-[16/7] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${monument.image})`,
            backgroundPosition: "top", // helps vertical images
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Hero Text */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-400">{monument.name}</h1>
          <p className="text-lg text-gray-200 mt-1">📍 {monument.location}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        
        {/* About Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">📜 About {monument.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {monument.description || "No description provided."}
          </p>
        </section>

        {/* Details Grid */}
        <section className="grid gap-6 sm:grid-cols-2 mb-12">
          <DetailCard title="🕰️ Timings" value={monument.timings || "9:00 AM - 5:00 PM"} />
          <DetailCard title="💰 Entry Fee" value={monument.entryFee || "₹50 for Indians, ₹500 for Foreigners"} />
          <DetailCard title="📅 Established" value={monument.established || "Not mentioned"} />
          <DetailCard title="👷 Architect" value={monument.architect || "Unknown"} />
          <DetailCard title="🏛️ Architecture Style" value={monument.architectureStyle || "Not mentioned"} />
        </section>

        {/* History */}
        {monument.history && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">📖 History</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {monument.history}
            </p>
          </section>
        )}

        {/* Significance */}
        {monument.significance && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">🌟 Significance</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {monument.significance}
            </p>
          </section>
        )}

        {/* Gallery */}
        {Array.isArray(monument.gallery) && monument.gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">🖼️ Gallery</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {monument.gallery.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`${monument.name} gallery ${idx}`}
                  className="w-full h-56 object-cover object-top rounded-lg shadow"
                />
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="text-center mt-14">
          <a
            href="/#monuments"
            className="inline-block bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
          >
            🔙 Back to Monuments
          </a>
        </div>
      </div>
    </main>
  );
}

// 👇 Detail Card Helper Component
function DetailCard({ title, value }) {
  return (
    <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold text-orange-600">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{value}</p>
    </div>
  );
}
