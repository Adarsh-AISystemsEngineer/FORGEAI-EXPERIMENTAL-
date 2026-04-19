"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserProfile {
  username: string;
  email: string;
  role: "user" | "developer" | "admin";
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic Auth Check & Data Fetching
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (!res.ok) {
          console.error(
            "Failed to fetch profile: ",
            res.status,
            await res.text(),
          );
          return;
        }

        const data = await res.json();

        if (data) {
          setUser({
            username: data.username,
            email: data.email,
            role: data.role,
            created_at: data.created_at,
          });
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen bg-black text-orange-500 font-mono flex items-center justify-center">
        LOADING_IDENTITY...
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white font-mono p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 border-b border-orange-500/20 pb-6">
          <h1 className="text-4xl font-bold text-orange-500 tracking-tighter mb-2">
            {user?.username}
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar / Avatar */}
          <div className="space-y-6">
            <div className="relative w-full aspect-square bg-orange-500/5 border border-orange-500/20 rounded-xl overflow-hidden flex items-center justify-center group hover:border-orange-500/60 transition-all">
              <div className="text-orange-500 opacity-20 group-hover:opacity-100 transition-opacity">
                {/* Placeholder for Profile Image */}
                <svg
                  width="80"
                  height="80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">ACCESS_LEVEL</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-orange-500 font-bold uppercase">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Account Details */}
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/60 transition-all">
              <h2 className="text-lg text-orange-500 mb-6 flex items-center">
                <span className="mr-2"> {">"} </span> USER_PROFILE
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-orange-500/10 pb-2">
                  <span className="text-gray-500">USERNAME</span>
                  <span className="text-white">{user?.username}</span>
                </div>
                <div className="flex justify-between border-b border-orange-500/10 pb-2">
                  <span className="text-gray-500">EMAIL_ADDRESS</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                <div className="flex justify-between border-b border-orange-500/10 pb-2">
                  <span className="text-gray-500">JOINED_DATE</span>
                  <span className="text-white">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => router.push("/developer")}
                className="bg-orange-500 text-black font-bold py-3 px-4 rounded-xl hover:bg-orange-400 transition-colors flex items-center justify-center gap-2"
              >
                DEVELOPER_DASHBOARD
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
                className="bg-transparent border border-orange-500/20 text-orange-500 py-3 px-4 rounded-xl hover:bg-orange-500/5 hover:border-orange-500/60 transition-all"
              >
                TERMINATE_SESSION
              </button>
            </div>

            {/* Security Notice */}
            <div className="p-4 border border-orange-500/10 bg-orange-500/5 rounded-xl">
              <p className="text-[10px] text-gray-600 leading-relaxed">
                NOTICE: FORGEAI SECURITY PROTOCOL IS ACTIVE. YOUR SESSION IS
                ENCRYPTED USING HS256. DO NOT SHARE YOUR JWT_TOKEN WITH
                UNAUTHORIZED ENTITIES.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
