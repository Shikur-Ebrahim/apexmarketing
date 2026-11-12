"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import TestimonyModal from "@/components/TestimonyModal";
import { initialCourses, initialStudentEvidence } from "@/lib/data";
import { Course, StudentEvidence } from "@/lib/types";
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Zap,
  Users,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Smartphone,
  Briefcase,
  Layers,
  Award,
} from "lucide-react";

export default function Home() {
  const [courses] = useState<Course[]>(initialCourses);
  const [evidenceList] = useState<StudentEvidence[]>(initialStudentEvidence);

  // Filter States
  const [audienceFilter, setAudienceFilter] = useState<"All" | "Beginner" | "Business">("All");
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // Active Testimony Modal State
  const [activeTestimony, setActiveTestimony] = useState<StudentEvidence | null>(null);

  const platforms = [
    "All",
    "TikTok",
    "Facebook & Instagram",
    "E-Commerce",
    "Telegram & WhatsApp",
    "YouTube",
    "AI Marketing",
  ];

  const getBadgeColor = (category: string) => {
    switch (category) {
      case "TikTok":
        return "text-rose-700 bg-rose-50 border-rose-200";
      case "Facebook & Instagram":
        return "text-blue-700 bg-blue-50 border-blue-200";
      case "E-Commerce":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "Telegram & WhatsApp":
        return "text-sky-700 bg-sky-50 border-sky-200";
      case "YouTube":
        return "text-red-700 bg-red-50 border-red-200";
      case "AI Marketing":
        return "text-purple-700 bg-purple-50 border-purple-200";
      default:
        return "text-slate-700 bg-slate-50 border-slate-200";
    }
  };

  const filteredCourses = courses.filter((course) => {
    // Audience match
    const matchAudience =
      audienceFilter === "All"
        ? true
        : audienceFilter === "Beginner"
        ? course.targetAudience === "For Beginners (Zero Capital)" || course.targetAudience === "For Both"
        : course.targetAudience === "For Business Owners" || course.targetAudience === "For Both";

    // Platform match
    const matchPlatform =
      platformFilter === "All" ? true : course.category === platformFilter;

    return matchAudience && matchPlatform;
  });

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Hero Section (Mobile-First) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pt-10 pb-14 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>Monetize TikTok, Facebook, Instagram, YouTube & Telegram</span>
          </div>

          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl leading-tight sm:leading-none">
            Make Money & Scale With{" "}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Social Media in Ethiopia
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Whether you want to <strong>start from scratch with zero capital</strong> using just your smartphone, or you are a <strong>business owner scaling to 100K+ ETB monthly profit</strong>: Learn practical, battle-tested monetization frameworks.
          </p>

          {/* Quick Dual-Track Buttons (Mobile Screen First) */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto max-w-md sm:max-w-none">
            <button
              onClick={() => {
                setAudienceFilter("Beginner");
                const el = document.getElementById("courses");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              I Have No Business (Start from Zero)
            </button>

            <button
              onClick={() => {
                setAudienceFilter("Business");
                const el = document.getElementById("courses");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-sky-400" />
              I Have a Business (Scale My Sales)
            </button>
          </div>

          {/* Live Platform Counters (Mobile-first grid) */}
          <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200/80 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <div className="text-xl sm:text-3xl font-black text-slate-900">60+</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">Masterclass Programs</div>
            </div>
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <div className="text-xl sm:text-3xl font-black text-sky-600">2,500 ETB</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">All-Access Tuition</div>
            </div>
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <div className="text-xl sm:text-3xl font-black text-slate-900">4,800+</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">Enrolled Students</div>
            </div>
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <div className="text-xl sm:text-3xl font-black text-emerald-600">4.9 / 5.0</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5">Verified Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section id="courses" className="py-12 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 mb-2">
              <Layers className="w-3.5 h-3.5 text-sky-600" /> Choose Your Path
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Social Media Monetization Programs
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Every course is engineered with actionable step-by-step videos, copy-paste templates, and direct monetization strategies.
            </p>
          </div>

          {/* Track Filter Toggle (Beginner vs Business Owner) */}
          <div className="max-w-2xl mx-auto p-1.5 bg-slate-200/70 rounded-2xl flex items-center justify-between gap-1 mb-6 shadow-inner">
            <button
              onClick={() => setAudienceFilter("All")}
              className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                audienceFilter === "All"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🔥 All Programs <span className="text-[11px] opacity-75 font-semibold">({courses.length})</span>
            </button>
            <button
              onClick={() => setAudienceFilter("Beginner")}
              className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                audienceFilter === "Beginner"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🚀 Start from Zero <span className="text-[11px] opacity-90 font-semibold">({courses.filter(c => c.targetAudience === "For Beginners (Zero Capital)" || c.targetAudience === "For Both").length})</span>
            </button>
            <button
              onClick={() => setAudienceFilter("Business")}
              className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                audienceFilter === "Business"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              💼 Scale Business <span className="text-[11px] opacity-90 font-semibold">({courses.filter(c => c.targetAudience === "For Business Owners" || c.targetAudience === "For Both").length})</span>
            </button>
          </div>

          {/* Platform Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
            {platforms.map((plat) => {
              const count = courses.filter((c) => {
                const matchAudience =
                  audienceFilter === "All"
                    ? true
                    : audienceFilter === "Beginner"
                    ? c.targetAudience === "For Beginners (Zero Capital)" || c.targetAudience === "For Both"
                    : c.targetAudience === "For Business Owners" || c.targetAudience === "For Both";
                const matchPlatform = plat === "All" ? true : c.category === plat;
                return matchAudience && matchPlatform;
              }).length;

              return (
                <button
                  key={plat}
                  onClick={() => setPlatformFilter(plat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    platformFilter === plat
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span>{plat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      platformFilter === plat
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourse === course.id;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    {/* Top Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeColor(course.category)}`}>
                        {course.platformBadge}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {course.targetAudience}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h3>

                    {/* Earning Potential Callout */}
                    <div className="my-3 p-2.5 bg-gradient-to-r from-sky-50 to-blue-50/50 rounded-xl border border-sky-200/60 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-sky-600 flex-shrink-0" />
                      <div className="text-[11px] sm:text-xs font-semibold text-slate-700">
                        Earning Potential:{" "}
                        <strong className="text-sky-800 font-extrabold">
                          {course.earningPotential}
                        </strong>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {course.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 mt-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{course.rating}</span>
                        <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.lessonsCount} lessons</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{course.instructor}</div>
                        <div className="text-[10px] text-slate-400">{course.instructorRole}</div>
                      </div>
                    </div>

                    {/* Collapsible Curriculum Preview */}
                    <div className="mt-4 pt-2">
                      <button
                        onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                        className="w-full text-left flex items-center justify-between text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors py-1 cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Curriculum" : "View Curriculum Modules"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs animate-in fade-in duration-150">
                          {course.modules.map((mod, i) => (
                            <div key={i} className="space-y-1">
                              <span className="font-bold text-slate-800 text-[11px]">{mod.title}</span>
                              <ul className="pl-3 space-y-0.5 text-slate-600 text-[11px]">
                                {mod.lessons.map((lesson, idx) => (
                                  <li key={idx} className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-sky-500 flex-shrink-0" />
                                    {lesson}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pricing & CTA Button (Mobile-first large button) */}
                  <div className="p-5 sm:p-6 pt-0 mt-auto">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-black text-slate-900">
                          {course.price.toLocaleString()} ETB
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {course.originalPrice.toLocaleString()} ETB
                        </span>
                      </div>

                      <Link
                        href="/dashboard"
                        className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 text-center"
                      >
                        Enroll Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Evidence & Success Proof Section (With Actionable How-They-Did-It Modals) */}
      <section id="evidence" className="py-14 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Earnings Evidence
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Student Results & Earnings Proof
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Click any case study below to inspect the step-by-step blueprint of exactly how they made it!
            </p>
          </div>

          {/* Evidence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {evidenceList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Metric Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm sm:text-base font-black text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                      {item.metric}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.platform}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mb-2 leading-snug">
                    {item.resultTitle}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed italic mb-4 line-clamp-3">
                    "{item.testimonial}"
                  </p>
                </div>

                <div>
                  {/* Actionable Button to View How They Made It */}
                  <button
                    onClick={() => setActiveTestimony(item)}
                    className="w-full mb-3 py-2 px-3 rounded-xl bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200/80"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    How They Made It & Blueprint
                  </button>

                  {/* Student Info */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-200">
                        <Image
                          src={item.avatar}
                          alt={item.studentName}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.studentName}</div>
                        <div className="text-[10px] text-slate-400">{item.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apex Marketing Hub Features */}
      <section id="features" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Apex Marketing Hub?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Built specifically for ambitious students, creators, and business owners looking for measurable financial returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Zero-Capital Monetization
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Learn how to generate real daily income with just a smartphone through viral content creation, theme pages, and affiliate deals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Business Scaling Blueprints
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Scale your local store, boutique, or service business with Meta Advantage+ Ads and automated WhatsApp order funnels.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Verified Certificate & Support
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive an official certificate upon graduation, with direct support and answers to your campaign questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Mobile-first Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 bg-black">
              <Image src="/logo.jpg" alt="Apex Logo" fill sizes="36px" className="object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">Apex Marketing Hub</div>
              <div className="text-[11px] text-slate-400">Social Media Monetization & Growth Platform</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-slate-500">
            <a href="#courses" className="hover:text-slate-900 font-semibold">Courses (2,500 ETB)</a>
            <a href="#evidence" className="hover:text-slate-900 font-semibold">Student Proof</a>
            <Link href="/dashboard" className="hover:text-slate-900 font-semibold">Student Portal</Link>
            <a href="mailto:apexmarketinghub01@gmail.com" className="hover:text-slate-900">Support</a>
          </div>

          <div className="text-xs text-slate-400">
            &copy; 2026 Apex Marketing Hub &bull; All Rights Reserved
          </div>
        </div>
      </footer>

      {/* Interactive Testimony & Blueprint Modal */}
      <TestimonyModal
        evidence={activeTestimony}
        onClose={() => setActiveTestimony(null)}
      />
    </div>
  );
}
