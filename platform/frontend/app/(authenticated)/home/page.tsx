"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { icon: "🏠", label: "IoT & Smart Home", value: "iot" },
  { icon: "🎮", label: "Gaming", value: "gaming" },
  { icon: "🌐", label: "Language & Voice", value: "language" },
  { icon: "📁", label: "Productivity", value: "productivity" },
  { icon: "🚁", label: "Drones", value: "drones" },
  { icon: "🎬", label: "Creative", value: "creative" },
  { icon: "📚", label: "Education", value: "education" },
  { icon: "🤖", label: "Automation", value: "automation" },
];

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tools, setTools] = useState<any[]>([]);
  const [toolsLoading, setToolsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
      return;
    }
    if (userData) setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedPlatform) params.append("platform", selectedPlatform);
        const response = await fetch(
          `http://localhost:8000/tools?${params.toString()}`,
        );
        const data = await response.json();
        setTools(data.tools);
      } catch (err) {
        console.error("Failed to fetch tools");
      } finally {
        setToolsLoading(false);
      }
    };
    fetchTools();
  }, [search, selectedCategory, selectedPlatform]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <p className="text-orange-500 text-sm animate-pulse">
          [FORGE] Authenticating...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-orange-500/30 sticky top-0 bg-black/95 backdrop-blur z-50">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="forgeai"
            width={36}
            height={36}
            className="object-contain invert"
          />
          <span className="text-orange-500 font-bold text-lg tracking-widest">
            FORGEAI
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 bg-gray-950 border border-orange-500/30 rounded px-4 py-2 w-96 focus-within:border-orange-500 transition-colors">
          <span className="text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Search AI tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm focus:outline-none w-full placeholder-gray-600"
          />
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/profile"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            {user?.username || "Profile"}
          </Link>
          <Link
            href="/developer"
            className="border border-orange-500 text-orange-500 px-3 py-1.5 rounded hover:bg-orange-500 hover:text-black transition-colors font-bold text-xs"
          >
            BECOME A DEV
          </Link>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-black text-sm">
            {user?.username?.[0]?.toUpperCase() || "U"}
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
            {/* ✅ Fixed — no cat.value outside map */}
            <button
              onClick={() => setSelectedCategory("")}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                selectedCategory === ""
                  ? "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                  : "text-gray-400 hover:text-white hover:bg-orange-500/5"
              }`}
            >
              ⚡ All Tools
            </button>

            {/* ✅ Fixed — using cat.value not string manipulation */}
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.value)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex justify-between items-center ${
                  selectedCategory === cat.value
                    ? "bg-orange-500/10 text-orange-500 border border-orange-500/30"
                    : "text-gray-400 hover:text-white hover:bg-orange-500/5"
                }`}
              >
                <span>
                  {cat.icon} {cat.label}
                </span>
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 mt-8">
            Platform
          </p>
          <div className="space-y-1">
            {["All", "Android", "Desktop", "Web", "IoT", "Drones"].map((p) => (
              <button
                key={p}
                onClick={() =>
                  setSelectedPlatform(p === "All" ? "" : p.toLowerCase())
                }
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  selectedPlatform === (p === "All" ? "" : p.toLowerCase())
                    ? "text-orange-500 bg-orange-500/10"
                    : "text-gray-400 hover:text-white hover:bg-orange-500/5"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.push("/login");
            }}
            className="mt-auto text-xs text-gray-600 hover:text-red-400 transition-colors text-left px-3 py-2"
          >
            → Logout
          </button>
        </aside>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8">
          <div className="bg-gray-950 border border-orange-500/30 rounded-xl p-6 mb-8 flex justify-between items-center">
            <div>
              <p className="text-xs text-orange-500 tracking-widest mb-1">
                [FORGE] Welcome back, {user?.username}
              </p>
              <h1 className="text-2xl font-black">
                What will you <span className="text-orange-500">forge</span>{" "}
                today?
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Discover AI tools built by the community.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/logo.png"
                alt="forgeai"
                width={80}
                height={80}
                className="object-contain invert opacity-20"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-black">
                🔥{" "}
                <span className="text-orange-500">
                  {search
                    ? `Results for "${search}"`
                    : selectedCategory
                      ? selectedCategory
                      : "Featured"}
                </span>{" "}
                Tools
              </h2>
              <span className="text-xs text-gray-500">
                {tools.length} tool{tools.length !== 1 ? "s" : ""}
              </span>
            </div>

            {toolsLoading ? (
              <p className="text-gray-500 text-sm animate-pulse">
                [FORGE] Loading tools...
              </p>
            ) : tools.length === 0 ? (
              <div className="border border-orange-500/20 rounded-xl p-8 text-center">
                <p className="text-gray-500 text-sm">
                  No tools found. Be the first to build one.
                </p>
                <Link
                  href="/developer/dashboard"
                  className="text-orange-500 text-xs hover:underline mt-2 block"
                >
                  → Become a developer
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/60 hover:bg-orange-500/5 transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold">
                        {tool.is_free ? "FREE" : `$${tool.price}`}
                      </span>
                      <span className="text-xs text-gray-600">
                        {tool.category}
                      </span>
                    </div>

                    <h3 className="font-black text-lg mb-1 group-hover:text-orange-500 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    <div className="flex gap-1 mb-4 flex-wrap">
                      {tool.platforms.split(",").map((p: string) => (
                        <span
                          key={p}
                          className="text-xs border border-orange-500/20 text-gray-500 px-2 py-0.5 rounded"
                        >
                          {p.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-600">
                          by{" "}
                          <span className="text-orange-500">
                            {tool.developer_name}
                          </span>
                        </p>
                        <p className="text-xs text-gray-600">
                          {tool.downloads} downloads
                        </p>
                      </div>
                      <button className="bg-orange-500 text-black text-xs font-black px-4 py-2 rounded hover:bg-orange-400 transition-colors">
                        {tool.is_free ? "FREE →" : `$${tool.price}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Categories Grid */}
          <div>
            <h2 className="text-lg font-black mb-4">
              Browse by <span className="text-orange-500">Category</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* ✅ Fixed — using cat.value */}
              {categories.map((cat) => (
                <div
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`border rounded-xl p-4 text-center transition-all cursor-pointer ${
                    selectedCategory === cat.value
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-orange-500/20 hover:border-orange-500 hover:bg-orange-500/5"
                  }`}
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <p className="text-xs text-gray-400">{cat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-orange-500/30 px-8 py-6 text-center text-sm text-gray-500 mt-8">
        <p>
          ⚒️ <span className="text-orange-500 font-bold">forgeai</span> · A
          BlackRails Technology Project · AGPL v3
        </p>
      </footer>
    </main>
  );
}
