//Deveopers page

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DeveloperPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [becoming, setBecoming] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [tools, setTools] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);

      if (parsed.role === "developer" || parsed.role === "admin") {
        fetchDeveloperData(token);
      }
    }

    setLoading(false);
  }, [router]);

  const fetchDeveloperData = async (token: string) => {
    try {
      const [statsRes, toolsRes] = await Promise.all([
        fetch("http://localhost:8000/developer/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:8000/developer/tools", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const statsData = await statsRes.json();
      const toolsData = await toolsRes.json();

      setStats(statsData);
      setTools(toolsData.tools);
    } catch (err) {
      console.error("Failed to fetch developer data");
    }
  };

  const handleBecomeDeveloper = async () => {
    setError("");
    setBecoming(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8000/auth/become-developer",
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to become developer");
        return;
      }

      // Update token and user in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      // Fetch developer data
      fetchDeveloperData(data.access_token);
    } catch (err) {
      setError("Could not connect to server");
    } finally {
      setBecoming(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <p className="text-orange-500 text-sm animate-pulse">
          [FORGE] Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-orange-500/30 sticky top-0 bg-black/95 backdrop-blur z-50">
        <Link href="/home" className="flex items-center gap-3">
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
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/home"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            ← Back to Store
          </Link>
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-black text-sm">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Not a developer yet */}
        {user?.role === "user" && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <Image
              src="/logo.png"
              alt="forgeai"
              width={100}
              height={100}
              className="object-contain invert opacity-30 mb-8"
            />

            <h1 className="text-4xl font-black mb-4">
              Become a <span className="text-orange-500">Developer</span>
            </h1>

            <p className="text-gray-500 max-w-lg mb-4 leading-relaxed">
              Join the ForgeAI developer community. Build AI tools, publish them
              to the platform, and earn from every download. Free forever. Open
              source always.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl w-full">
              {[
                {
                  icon: "⚒️",
                  title: "Build Tools",
                  desc: "Create AI tools using our SDK",
                },
                {
                  icon: "🚀",
                  title: "Publish",
                  desc: "One click publish to the store",
                },
                {
                  icon: "💰",
                  title: "Earn",
                  desc: "80% revenue on paid tools",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-orange-500/20 rounded-xl p-5 text-center"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="font-black text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 mb-4 text-red-400 text-sm">
                ⚠ {error}
              </div>
            )}

            <button
              onClick={handleBecomeDeveloper}
              disabled={becoming}
              className="bg-orange-500 text-black font-black px-10 py-4 rounded hover:bg-orange-400 transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {becoming ? "UPGRADING..." : "BECOME A DEVELOPER →"}
            </button>

            <p className="text-gray-600 text-xs mt-4">
              Free forever · No approval needed · Instant access
            </p>
          </div>
        )}

        {/* Developer Dashboard */}
        {(user?.role === "developer" || user?.role === "admin") && (
          <div>
            {/* Header */}
            <div className="mb-8">
              <p className="text-xs text-orange-500 tracking-widest mb-1">
                [FORGE] Developer Dashboard
              </p>
              <h1 className="text-3xl font-black">
                Welcome,{" "}
                <span className="text-orange-500">{user?.username}</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Build it. Forge it. Free it.
              </p>
            </div>

            {/* Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    label: "Total Tools",
                    value: stats.total_tools,
                    icon: "⚒️",
                  },
                  {
                    label: "Approved",
                    value: stats.approved_tools,
                    icon: "✅",
                  },
                  {
                    label: "Pending",
                    value: stats.pending_tools,
                    icon: "⏳",
                  },
                  {
                    label: "Downloads",
                    value: stats.total_downloads,
                    icon: "📥",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-orange-500/20 rounded-xl p-5 text-center"
                  >
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p className="text-2xl font-black text-orange-500">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Link
                href="/developer/upload"
                className="bg-orange-500 text-black font-black px-6 py-3 rounded hover:bg-orange-400 transition-colors text-sm"
              >
                + UPLOAD NEW TOOL
              </Link>
              <Link
                href="/developer/docs"
                className="border border-orange-500 text-orange-500 font-black px-6 py-3 rounded hover:bg-orange-500/10 transition-colors text-sm"
              >
                SDK DOCS →
              </Link>
            </div>

            {/* My Tools */}
            <div>
              <h2 className="text-lg font-black mb-4">
                My <span className="text-orange-500">Tools</span>
              </h2>

              {tools.length === 0 ? (
                <div className="border border-orange-500/20 rounded-xl p-10 text-center">
                  <p className="text-gray-500 text-sm mb-4">
                    No tools yet. Build your first one.
                  </p>
                  <Link
                    href="/developer/upload"
                    className="bg-orange-500 text-black font-black px-6 py-3 rounded hover:bg-orange-400 transition-colors text-sm"
                  >
                    + CREATE FIRST TOOL
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/60 transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold ${
                            tool.is_approved
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {tool.is_approved ? "✓ APPROVED" : "⏳ PENDING"}
                        </span>
                        <span className="text-xs text-gray-600">
                          v{tool.version}
                        </span>
                      </div>

                      <h3 className="font-black text-lg mb-1">{tool.name}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">
                        {tool.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-600">
                            {tool.downloads} downloads
                          </p>
                          <p className="text-xs text-gray-600">
                            {tool.category}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="border border-orange-500/30 text-orange-500 text-xs px-3 py-1.5 rounded hover:bg-orange-500/10 transition-colors">
                            Edit
                          </button>
                          <button className="border border-red-500/30 text-red-400 text-xs px-3 py-1.5 rounded hover:bg-red-500/10 transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Developer Info */}
            <div className="mt-10 border border-orange-500/20 rounded-xl p-6">
              <h2 className="text-sm font-black mb-4 text-orange-500">
                [FORGE] Developer Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Username</p>
                  <p className="font-bold">{user?.username}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Role</p>
                  <p className="font-bold text-orange-500 uppercase">
                    {user?.role}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Revenue Share</p>
                  <p className="font-bold text-green-400">80% of sales</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">License</p>
                  <p className="font-bold">AGPL v3</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-orange-500/30 px-8 py-6 text-center text-sm text-gray-500 mt-8">
        <p>
          ⚒️ <span className="text-orange-500 font-bold">forgeai</span> · A
          BlackRails Technology Project · AGPL v3
        </p>
      </footer>
    </main>
  );
}
