"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Verification email sent! Check your inbox.",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send email.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "An error occurred while sending.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between p-4 sm:p-6 font-sans">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* Top Logo */}
        <div className="w-full max-w-[320px] rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-black mt-2">
          <Image
            src="/logo.jpg"
            alt="Apex Marketing Hub Logo"
            width={320}
            height={180}
            priority
            style={{ width: "100%", height: "auto" }}
            className="object-cover"
          />
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Apex Marketing Hub
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Firebase &bull; Cloudinary &bull; Resend Email Verification
        </p>

        {/* Services Status Badges - Compact Row */}
        <div className="w-full grid grid-cols-3 gap-2.5 my-4">
          <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-900">Firebase</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">Database & Auth</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-900">Cloudinary</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">Image Storage</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-center shadow-xs">
            <div className="flex items-center justify-center gap-1.5 mb-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-900">Resend</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">Verification Active</p>
          </div>
        </div>

        {/* Verification Card */}
        <div className="w-full bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Send Email Verification
            </h2>
            <span className="text-[11px] text-slate-400">
              Reply-To: apexmarketinghub01@gmail.com
            </span>
          </div>

          <form onSubmit={handleSendTestEmail} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. shikurebrahim3828@gmail.com"
              className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              {loading ? "Sending..." : "Send Verification"}
            </button>
          </form>

          {status.message && (
            <div
              className={`mt-3 p-2.5 rounded-lg text-xs font-medium border ${
                status.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="text-center text-[11px] text-slate-400 py-2">
        Apex Marketing Hub &copy; 2026 &bull; Powered by Next.js 16
      </footer>
    </div>
  );
}
