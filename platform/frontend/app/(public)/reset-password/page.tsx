"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });

  const handleReset = async () => {
    setError("");
    const email = localStorage.getItem("reset_email");

    if (!email) {
      router.push("/forgot-password");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            new_password: form.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Reset failed");
        return;
      }

      // Clear reset email
      localStorage.removeItem("reset_email");

      // Go to login with success
      router.push("/login?reset=success");
    } catch (err) {
      setError("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-mono">
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

      <section className="flex items-center justify-center px-8 py-16">
        <div className="border border-orange-500/30 rounded-xl p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="forgeai"
              width={80}
              height={80}
              className="object-contain invert"
            />
          </div>

          <h1 className="text-2xl font-black text-center mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Enter your new password
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 mb-4 text-red-400 text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="min 8 characters"
                  className="w-full bg-gray-950 border border-orange-500/30 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 text-xs"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  placeholder="repeat password"
                  className="w-full bg-gray-950 border border-orange-500/30 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 text-xs"
                >
                  {showConfirm ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full bg-orange-500 text-black font-black py-3 rounded hover:bg-orange-400 transition-colors disabled:opacity-50"
            >
              {loading ? "RESETTING..." : "RESET PASSWORD →"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
