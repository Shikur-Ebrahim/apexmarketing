"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LogIn, UserPlus, Shield, LayoutDashboard, Menu, X } from "lucide-react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-black flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="Apex Marketing Hub"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                Apex Marketing
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-sky-600 -mt-1">
                Hub Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#courses" className="hover:text-slate-900 transition-colors">
              Courses
            </a>
            <a href="#evidence" className="hover:text-slate-900 transition-colors">
              Student Evidence
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Why Apex
            </a>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-slate-700 hover:text-sky-600 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-sky-500" />
              Student Portal
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200/80"
              title="Admin Monitor & Evidence Manager"
            >
              <Shield className="w-3.5 h-3.5 text-slate-600" />
              Admin Portal
            </Link>

            <button
              onClick={() => openAuth("login")}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-slate-500" />
              Log In
            </button>

            <button
              onClick={() => openAuth("signup")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <a
              href="#courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-sky-600"
            >
              Courses
            </a>
            <a
              href="#evidence"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-sky-600"
            >
              Student Evidence & Proof
            </a>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium text-slate-700 hover:text-sky-600"
            >
              <LayoutDashboard className="w-4 h-4 text-sky-500" />
              Student Portal Dashboard
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-sm font-medium text-slate-700 hover:text-sky-600"
            >
              <Shield className="w-4 h-4 text-slate-500" />
              Admin Portal
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => openAuth("login")}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 text-slate-800 font-medium text-sm text-center"
              >
                Log In
              </button>
              <button
                onClick={() => openAuth("signup")}
                className="w-full py-2.5 px-4 rounded-lg bg-sky-600 text-white font-medium text-sm text-center shadow-sm"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
