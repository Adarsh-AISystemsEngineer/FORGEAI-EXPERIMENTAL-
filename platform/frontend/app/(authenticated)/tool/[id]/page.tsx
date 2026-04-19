"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ToolDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [tool, setTool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    if (userData) setUser(JSON.parse(userData));
    fetchTool();
  }, [id]);

  const fetchTool = async () => {
    try {
      const response = await fetch(`http://localhost:8000/tools/${id}`);
      const data = await response.json();

      if (!response.ok) {
        setError("Tool not found");
        return;
      }

      setTool(data);
    } catch (err) {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <p className="text-orange-500 text-sm animate-pulse">
          [FORGE] Loading tool...
        </p>
      </main>
    );
  }

  if (error || !tool) {
    return (
      <main className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-sm mb-4">⚠ {error}</p>
          <Link
            href="/home"
            className="text-orange-500 hover:underline text-sm"
          >
            ← Back to store
          </Link>
        </div>
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

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Tool Header */}
        <div className="border border-orange-500/30 rounded-xl p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded font-bold uppercase">
                  {tool.category}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-bold ${
                    tool.is_approved
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {tool.is_approved ? "✓ VERIFIED" : "⏳ PENDING"}
                </span>
              </div>
              <h1 className="text-4xl font-black mb-2">{tool.name}</h1>
              <p className="text-gray-400 text-sm">
                by{" "}
                <span className="text-orange-500 font-bold">
                  {tool.developer_name}
                </span>
                {" · "}v{tool.version}
                {" · "}
                {tool.downloads} downloads
              </p>
            </div>

            {/* Price + Download */}
            <div className="text-right">
              <p className="text-3xl font-black text-orange-500 mb-3">
                {tool.is_free ? "FREE" : `$${tool.price}`}
              </p>
              <button className="bg-orange-500 text-black font-black px-8 py-3 rounded hover:bg-orange-400 transition-colors">
                {tool.is_free ? "INSTALL FREE →" : `BUY $${tool.price} →`}
              </button>
              {!tool.is_free && (
                <p className="text-xs text-gray-600 mt-1">One time purchase</p>
              )}
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed">{tool.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left — Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Platforms */}
            <div className="border border-orange-500/20 rounded-xl p-6">
              <h2 className="font-black text-sm text-orange-500 mb-3">
                SUPPORTED PLATFORMS
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.platforms.split(",").map((p: string) => (
                  <span
                    key={p}
                    className="border border-orange-500/30 text-gray-300 text-xs px-3 py-1.5 rounded font-bold uppercase"
                  >
                    {p.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="border border-orange-500/20 rounded-xl p-6">
              <h2 className="font-black text-sm text-orange-500 mb-3">
                HOW IT WORKS
              </h2>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 font-black">01</span>
                  <p>Click Install — tool downloads to your ForgeAI app</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 font-black">02</span>
                  <p>Click Run — tool launches in isolated sandbox</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 font-black">03</span>
                  <p>Use the tool — all processing happens on your device</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 font-black">04</span>
                  <p>Close — sandbox destroyed, nothing left behind</p>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="border border-orange-500/20 rounded-xl p-6">
              <h2 className="font-black text-sm text-orange-500 mb-3">
                SECURITY & PRIVACY
              </h2>
              <div className="space-y-2 text-xs text-gray-400">
                <p>✓ Runs in isolated WASM sandbox</p>
                <p>✓ Cannot access your files without permission</p>
                <p>✓ Cannot access internet without permission</p>
                <p>✓ All processing happens on your device</p>
                <p>✓ Open source — code is publicly auditable</p>
                <p>✓ Verified by ForgeAI security scan</p>
              </div>
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-4">
            {/* Tool Info */}
            <div className="border border-orange-500/20 rounded-xl p-5">
              <h2 className="font-black text-xs text-orange-500 mb-3">
                TOOL INFO
              </h2>
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-gray-600 mb-0.5">Version</p>
                  <p className="font-bold">{tool.version}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0.5">Category</p>
                  <p className="font-bold capitalize">{tool.category}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0.5">Developer</p>
                  <p className="font-bold text-orange-500">
                    {tool.developer_name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0.5">Downloads</p>
                  <p className="font-bold">{tool.downloads}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0.5">License</p>
                  <p className="font-bold">AGPL v3</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0.5">Status</p>
                  <p
                    className={`font-bold ${
                      tool.is_approved ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {tool.is_approved ? "Verified" : "Pending Review"}
                  </p>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="border border-orange-500/20 rounded-xl p-5">
              <h2 className="font-black text-xs text-orange-500 mb-3">
                PERMISSIONS
              </h2>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: "Network access", value: false },
                  { label: "File system", value: false },
                  { label: "Microphone", value: false },
                  { label: "Camera", value: false },
                  { label: "Background run", value: false },
                ].map((perm) => (
                  <div
                    key={perm.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-400">{perm.label}</span>
                    <span
                      className={
                        perm.value
                          ? "text-yellow-400 font-bold"
                          : "text-green-400 font-bold"
                      }
                    >
                      {perm.value ? "ALLOWED" : "BLOCKED"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Install CTA */}
            <button className="w-full bg-orange-500 text-black font-black py-4 rounded hover:bg-orange-400 transition-colors">
              {tool.is_free ? "INSTALL FREE →" : `BUY $${tool.price} →`}
            </button>

            <p className="text-center text-gray-600 text-xs">
              Runs locally · Privacy first · Open source
            </p>
          </div>
        </div>
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
