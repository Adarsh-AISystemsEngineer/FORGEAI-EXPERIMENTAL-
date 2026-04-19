"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to send OTP");
        return;
      }

      // Save email for next page
      localStorage.setItem("reset_email", email);
      router.push("/verify-otp");
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
        <Link
          href="/login"
          className="text-gray-500 text-sm hover:text-orange-500"
        >
          Back to Login
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
            Forgot Password
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Enter your email and we will send you an OTP to reset your password.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 mb-4 text-red-400 text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-gray-950 border border-orange-500/30 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-orange-500 text-black font-black py-3 rounded hover:bg-orange-400 transition-colors disabled:opacity-50"
            >
              {loading ? "SENDING OTP..." : "SEND OTP →"}
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Remember your password?{" "}
            <Link href="/login" className="text-orange-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
