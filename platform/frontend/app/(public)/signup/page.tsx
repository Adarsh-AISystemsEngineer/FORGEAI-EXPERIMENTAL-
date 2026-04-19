"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    role: "user",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");

    // Basic validation
    if (!form.email || !form.username || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Signup failed");
        return;
      }

      // Save token and user to localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to home
      router.push("/home");
    } catch (err) {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-orange-500/30">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="forgeai"
            width={40}
            height={40}
            className="object-contain invert"
          />
          <span className="text-orange-500 font-bold text-xl tracking-widest">
            FORGEAI
          </span>
        </Link>
      </nav>

      {/* Form */}
      <section className="flex items-center justify-center px-8 py-16">
        <div className="border border-orange-500/30 rounded-xl p-8 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="ForgeAI"
              width={80}
              height={80}
              className="object-contain invert"
            />
          </div>

          <h1 className="text-2xl font-black text-center mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Join <span className="text-orange-500">ForgeAI</span> — free forever
          </p>

          {/* Error message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 mb-4 text-red-400 text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-gray-950 border border-orange-500/30 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="your_username"
                className="w-full bg-gray-950 border border-orange-500/30 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="min 8 characters"
                  className="w-full bg-gray-950 border border-orange-500/30 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 transition-colors text-sm"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-orange-500 text-black font-black py-3 rounded hover:bg-orange-400 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange-500/30 px-8 py-6 text-center text-sm text-gray-500">
        <p>
          ⚒️ <span className="text-orange-500 font-bold">ForgeAI</span> ·
          BlackRails Technology
        </p>
      </footer>
    </main>
  );
}
