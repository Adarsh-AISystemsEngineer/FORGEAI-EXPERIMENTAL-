import Image from "next/image";
import Link from "next/link";

// Temporary mock data until backend is ready
const categories = [
  { icon: "🏠", label: "IoT & Smart Home", count: 0 },
  { icon: "🎮", label: "Gaming", count: 0 },
  { icon: "🌐", label: "Language & Voice", count: 0 },
  { icon: "📁", label: "Productivity", count: 0 },
  { icon: "🚁", label: "Drones", count: 0 },
  { icon: "🎬", label: "Creative", count: 0 },
  { icon: "📚", label: "Education", count: 0 },
  { icon: "🤖", label: "Automation", count: 0 },
];

const mockTools = [
  {
    id: "1",
    name: "WebForge",
    description:
      "AI web auditor — paste a URL, get a full report on issues, performance and fixes.",
    category: "Developer",
    platform: ["Web", "Linux"],
    developer: "BlackRails",
    rating: 5.0,
    downloads: 0,
    isFree: true,
    price: 0,
    badge: "NEW",
  },
  {
    id: "2",
    name: "Climate AI",
    description:
      "Smart IoT temperature control that learns your schedule and saves energy.",
    category: "IoT & Smart Home",
    platform: ["Android", "Linux"],
    developer: "BlackRails",
    rating: 0,
    downloads: 0,
    isFree: true,
    price: 0,
    badge: "COMING SOON",
  },
  {
    id: "3",
    name: "GameCoach",
    description:
      "Real-time AI gaming assistant. Analyzes gameplay and suggests improvements live.",
    category: "Gaming",
    platform: ["Android", "Desktop"],
    developer: "BlackRails",
    rating: 0,
    downloads: 0,
    isFree: true,
    price: 0,
    badge: "COMING SOON",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-orange-500/30 sticky top-0 bg-black/95 backdrop-blur z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ForgeAI"
            width={36}
            height={36}
            className="object-contain invert"
          />
          <span className="text-orange-500 font-bold text-lg tracking-widest">
            FORGEAI
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-950 border border-orange-500/30 rounded px-4 py-2 w-96 focus-within:border-orange-500 transition-colors">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Search AI tools..."
            className="bg-transparent text-white text-sm focus:outline-none w-full placeholder-gray-600"
          />
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/profile"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            Profile
          </Link>
          <Link
            href="/developer/dashboard"
            className="border border-orange-500 text-orange-500 px-3 py-1.5 rounded hover:bg-orange-500 hover:text-black transition-colors font-bold text-xs"
          >
            BECOME A DEV
          </Link>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-black text-sm">
            U
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-orange-500/30 min-h-screen px-4 py-6 sticky top-16 h-screen">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
            Categories
          </p>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded text-sm bg-orange-500/10 text-orange-500 border border-orange-500/30">
              ⚡ All Tools
            </button>
            {categories.map((cat) => (
              <button
                key={cat.label}
                className="w-full text-left px-3 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-orange-500/5 transition-colors flex justify-between items-center"
              >
                <span>
                  {cat.icon} {cat.label}
                </span>
                <span className="text-xs text-gray-600">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Platform Filter */}
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 mt-8">
            Platform
          </p>
          <div className="space-y-1">
            {["All", "Android", "Desktop", "Web", "IoT", "Drones"].map((p) => (
              <button
                key={p}
                className="w-full text-left px-3 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-orange-500/5 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8">
          {/* Welcome Banner */}
          <div className="bg-gray-950 border border-orange-500/30 rounded-xl p-6 mb-8 flex justify-between items-center">
            <div>
              <p className="text-xs text-orange-500 tracking-widest mb-1">
                [FORGE] Welcome back
              </p>
              <h1 className="text-2xl font-black">
                What will you <span className="text-orange-500">forge</span>{" "}
                today?
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Discover AI tools built by the community. Free forever.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/logo.png"
                alt="ForgeAI"
                width={80}
                height={80}
                className="object-contain invert opacity-20"
              />
            </div>
          </div>

          {/* Featured / New Tools */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black">
                🔥 <span className="text-orange-500">Featured</span> Tools
              </h2>
              <button className="text-xs text-gray-500 hover:text-orange-500 transition-colors">
                View all →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTools.map((tool) => (
                <div
                  key={tool.id}
                  className="border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/60 hover:bg-orange-500/5 transition-all cursor-pointer group"
                >
                  {/* Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">
                      {tool.badge}
                    </span>
                    <span className="text-xs text-gray-600">
                      {tool.category}
                    </span>
                  </div>

                  {/* Tool Info */}
                  <h3 className="font-black text-lg mb-1 group-hover:text-orange-500 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* Platforms */}
                  <div className="flex gap-1 mb-4">
                    {tool.platform.map((p) => (
                      <span
                        key={p}
                        className="text-xs border border-orange-500/20 text-gray-500 px-2 py-0.5 rounded"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-600">
                        by{" "}
                        <span className="text-orange-500">
                          {tool.developer}
                        </span>
                      </p>
                      <p className="text-xs text-gray-600">
                        {tool.downloads} downloads
                      </p>
                    </div>
                    <button className="bg-orange-500 text-black text-xs font-black px-4 py-2 rounded hover:bg-orange-400 transition-colors">
                      {tool.isFree ? "FREE →" : `$${tool.price}`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Categories Grid */}
          <div>
            <h2 className="text-lg font-black mb-4">
              Browse by <span className="text-orange-500">Category</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  className="border border-orange-500/20 rounded-xl p-4 text-center hover:border-orange-500 hover:bg-orange-500/5 transition-all cursor-pointer"
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <p className="text-xs text-gray-400">{cat.label}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {cat.count} tools
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-orange-500/30 px-8 py-6 text-center text-sm text-gray-500 mt-8">
        <p>
          ⚒️ <span className="text-orange-500 font-bold">ForgeAI</span> · A
          BlackRails Technology Project · AGPL v3
        </p>
      </footer>
    </main>
  );
}
