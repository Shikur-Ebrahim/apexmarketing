"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Lock, User, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simulate account creation or login and send verification
    try {
      if (mode === "signup") {
        // Trigger live email verification to student's email via Resend
        await fetch("/api/send-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        setMessage({
          type: "success",
          text: `Account created! We've sent a verification email to ${email}.`,
        });

        setTimeout(() => {
          onClose();
          router.push("/dashboard");
        }, 1500);
      } else {
        setMessage({
          type: "success",
          text: "Login successful! Redirecting to student dashboard...",
        });

        setTimeout(() => {
          onClose();
          router.push("/dashboard");
        }, 800);
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-6 pt-7 pb-4 text-center">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl mb-4">
            <button
              onClick={() => {
                setMode("login");
                setMessage(null);
              }}
              className={`px-6 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setMessage(null);
              }}
              className={`px-6 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === "signup"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Create Account
            </button>
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            {mode === "login" ? "Welcome back to Apex" : "Start your learning journey"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === "login"
              ? "Access your enrolled digital marketing courses"
              : "Join over 4,800+ marketers and e-commerce entrepreneurs"}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 text-slate-900"
              />
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {message.type === "success" && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : mode === "login" ? (
              <>
                Sign In to Dashboard
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Create Account & Get Started
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setEmail("student@apexmarketinget.com");
                setPassword("DemoStudent2026!");
              }}
              className="text-[11px] text-slate-400 hover:text-sky-600 underline"
            >
              Click here to fill demo credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
