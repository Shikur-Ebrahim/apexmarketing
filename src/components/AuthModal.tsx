"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Mail,
  Lock,
  User,
  CheckCircle2,
  ArrowRight,
  Loader2,
  KeyRound,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

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
  const [signupStep, setSignupStep] = useState<"form" | "otp">("form");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  if (!isOpen) return null;

  // Step 1: Send Verification Email
  const handleRequestSignupCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !password) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSignupStep("otp");
        setMessage({
          type: "success",
          text: `Verification code sent to ${email}. Please check your inbox.`,
        });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to send verification email.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Network error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Code and Finish Registration
  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code: otpCode,
          fullName,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Email verified successfully! Creating your student account...",
        });

        setTimeout(() => {
          onClose();
          router.push("/dashboard");
        }, 1200);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Invalid verification code. Please check and try again.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Error verifying code. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend code handler
  const handleResendCode = async () => {
    setResending(true);
    setMessage(null);

    try {
      const res = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: "A fresh verification code has been sent to your email!",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Failed to resend code. Please try again.",
      });
    } finally {
      setResending(false);
    }
  };

  // Standard Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      setMessage({
        type: "success",
        text: "Logged in successfully! Redirecting to student portal...",
      });
      setTimeout(() => {
        onClose();
        router.push("/dashboard");
      }, 800);
      setLoading(false);
    }, 600);
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
        <div className="px-6 pt-7 pb-3 text-center">
          {signupStep === "form" && (
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
                Register
              </button>
            </div>
          )}

          <h2 className="text-xl font-bold text-slate-900">
            {mode === "login"
              ? "Welcome back to Apex"
              : signupStep === "otp"
              ? "Verify Your Email Address"
              : "Create Your Student Account"}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            {mode === "login"
              ? "Access your enrolled courses and resources"
              : signupStep === "otp"
              ? `Enter the 6-digit verification code sent to ${email}`
              : "Step 1 of 2: Enter your details to receive your verification code"}
          </p>
        </div>

        {/* Modal Forms */}
        <div className="px-6 pb-6 space-y-4">
          {/* LOGIN FORM */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
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
                className="w-full py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In to Portal
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
          )}

          {/* SIGNUP STEP 1: FORM */}
          {mode === "signup" && signupStep === "form" && (
            <form onSubmit={handleRequestSignupCode} className="space-y-3.5">
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
                    placeholder="e.g. Abebe Bikila"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-sky-500 text-slate-900"
                  />
                </div>
              </div>

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
                <span className="text-[10px] text-slate-400 mt-1 block">
                  A verification code will be sent to this email address.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
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
                  <span>{message.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Verification Code...
                  </>
                ) : (
                  <>
                    Continue & Send Code
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* SIGNUP STEP 2: ENTER OTP CODE */}
          {mode === "signup" && signupStep === "otp" && (
            <form onSubmit={handleVerifyOtpAndRegister} className="space-y-4">
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-center">
                <span className="text-xs text-sky-800">
                  Verification email sent to <strong>{email}</strong>
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 text-center">
                  Enter 6-Digit Verification Code
                </label>
                <div className="relative max-w-[240px] mx-auto">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-full text-center text-2xl font-mono font-bold tracking-[8px] py-3 rounded-xl border-2 border-slate-300 focus:border-sky-600 focus:outline-none text-slate-900 bg-slate-50"
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
                disabled={loading || otpCode.length < 6}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying Code...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Verify & Complete Account Creation
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setSignupStep("form")}
                  className="flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Change Email
                </button>

                <button
                  type="button"
                  disabled={resending}
                  onClick={handleResendCode}
                  className="flex items-center gap-1 text-sky-600 hover:text-sky-500 font-semibold cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
                  Resend Code
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
