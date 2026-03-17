"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    const email = localStorage.getItem("reset_email");

    if (!email) {
      router.push("/forgot-password");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Invalid OTP");
        return;
      }

      router.push("/reset-password");
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

          <h1 className="text-2xl font-black text-center mb-2">Enter OTP</h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Check your email for the 6 digit code
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded px-4 py-3 mb-4 text-red-400 text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                maxLength={6}
                className="w-full bg-gray-950 border border-orange-500/30 rounded px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors text-center text-2xl tracking-widest"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-orange-500 text-black font-black py-3 rounded hover:bg-orange-400 transition-colors disabled:opacity-50"
            >
              {loading ? "VERIFYING..." : "VERIFY OTP →"}
            </button>

            <button
              onClick={() => router.push("/forgot-password")}
              className="w-full border border-orange-500/30 text-gray-400 py-3 rounded hover:border-orange-500 hover:text-orange-500 transition-colors text-sm"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
