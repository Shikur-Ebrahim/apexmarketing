"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { initialCourses, initialStudentEvidence } from "@/lib/data";
import { Course, StudentEvidence } from "@/lib/types";
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Target,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

export default function Home() {
  const [courses] = useState<Course[]>(initialCourses);
  const [evidenceList] = useState<StudentEvidence[]>(initialStudentEvidence);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // Email verification test state
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const categories = [
    "All",
    "Social Media Ads",
    "Search & PPC",
    "E-Commerce",
    "AI Marketing",
    "Strategy",
  ];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const handleSendVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyEmail) return;

    setVerifyLoading(true);
    setVerifyStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: verifyEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setVerifyStatus({
          type: "success",
          message: `Verification code sent to ${verifyEmail}! Delivered from verify@apexmarketinget.com`,
        });
      } else {
        setVerifyStatus({
          type: "error",
          message: data.error || "Failed to send email verification",
        });
      }
    } catch {
      setVerifyStatus({
        type: "error",
        message: "An error occurred while sending.",
      });
    } finally {
      setVerifyLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>The Premier Marketing & E-Commerce Learning Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-tight sm:leading-none">
            Master Digital Marketing.{" "}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Scale Brands Predictably.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Step-by-step masterclasses built on $15M+ in verified ad spend. Learn Meta Ads, TikTok Shop, Google Performance Max, and AI marketing workflows from active practitioners.
          </p>

          {/* Call to actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href="#courses"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Browse All Courses <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#evidence"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              View Student Results & Proof
            </a>
          </div>

          {/* Social Proof Counters */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4,800+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Active Students</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9 / 5.0</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Average Rating (1,400+ reviews)</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">150M+ ETB</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Ad Spend Tested Frameworks</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Practical Case Studies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Catalog Section */}
      <section id="courses" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Curated Courses for High-Impact Growth
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Each course is designed with real-world campaign workflows, downloadable creative templates, and direct action checklists.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourse === course.id;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6">
                    {/* Category & Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        {course.category}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
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
                        <div className="text-[11px] text-slate-400">{course.instructorRole}</div>
                      </div>
                    </div>

                    {/* Collapsible Curriculum Preview */}
                    <div className="mt-4 pt-2">
                      <button
                        onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                        className="w-full text-left flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors py-1 cursor-pointer"
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
                                    <span className="w-1 h-1 rounded-full bg-sky-500" />
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

                  {/* Pricing & CTA Button */}
                  <div className="p-6 pt-0 mt-auto">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-slate-900">{course.price.toLocaleString()} ETB</span>
                        <span className="text-xs text-slate-400 line-through">
                          {course.originalPrice.toLocaleString()} ETB
                        </span>
                      </div>

                      <Link
                        href="/dashboard"
                        className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        Enroll Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Evidence & Success Proof Section */}
      <section id="evidence" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Verified Student Results
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Real Case Studies & Earnings Evidence
              </h2>
              <p className="mt-2 text-sm text-slate-500 max-w-xl">
                See verified results from students who implemented our ad strategies, creative blueprints, and funnel optimization systems.
              </p>
            </div>

            <Link
              href="/admin"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200"
            >
              <Shield className="w-3.5 h-3.5 text-slate-500" /> Admin: Add New Evidence
            </Link>
          </div>

          {/* Evidence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {evidenceList.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Metric Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-extrabold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                      {item.metric}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      <Check className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {item.resultTitle}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                    "{item.testimonial}"
                  </p>
                </div>

                {/* Student Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200">
                      <Image
                        src={item.avatar}
                        alt={item.studentName}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{item.studentName}</div>
                      <div className="text-[10px] text-slate-400">{item.courseTitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apex Marketing Hub Section */}
      <section id="features" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Apex Marketing Hub?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Unlike generic courses filled with outdated theories, our curriculum is engineered for immediate execution and measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Battle-Tested $15M+ Ad Playbooks
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Step-by-step account structures that scale without burning budget or triggering algorithmic plateaus.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                AI & Automation Workflows
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Learn how to generate 50+ high-converting creative hooks and test variations in minutes using direct-response AI frameworks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Private Student Growth Community
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Network with high-growth store owners, agency founders, and media buyers sharing real-time winning strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Verification Live Testing Card */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Test Email Verification Delivery
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto mb-6">
            Enter your email below to receive a live verification email sent directly from our verified domain <code className="text-slate-800 font-mono font-bold">verify@apexmarketinget.com</code> into your Primary Inbox.
          </p>

          <form onSubmit={handleSendVerification} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              value={verifyEmail}
              onChange={(e) => setVerifyEmail(e.target.value)}
              placeholder="e.g. your.email@gmail.com"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={verifyLoading}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {verifyLoading ? "Sending..." : "Send Verification"}
            </button>
          </form>

          {verifyStatus.message && (
            <div
              className={`mt-4 p-3 rounded-xl text-xs max-w-md mx-auto border ${
                verifyStatus.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {verifyStatus.message}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 bg-black">
              <Image src="/logo.jpg" alt="Apex Logo" fill sizes="36px" className="object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-slate-900">Apex Marketing Hub</div>
              <div className="text-[11px] text-slate-400">Next-Generation Marketing Education</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#courses" className="hover:text-slate-900">Courses</a>
            <a href="#evidence" className="hover:text-slate-900">Student Proof</a>
            <Link href="/dashboard" className="hover:text-slate-900">Student Portal</Link>
            <Link href="/admin" className="hover:text-slate-900 font-semibold text-slate-700">Admin Portal</Link>
            <a href="mailto:apexmarketinghub01@gmail.com" className="hover:text-slate-900">Support</a>
          </div>

          <div className="text-xs text-slate-400">
            &copy; 2026 Apex Marketing Hub &bull; All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
