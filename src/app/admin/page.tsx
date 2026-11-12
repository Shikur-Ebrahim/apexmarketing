"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Users,
  Award,
  TrendingUp,
  PlusCircle,
  CheckCircle,
  LogOut,
  Mail,
  Lock,
  Loader2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { initialStudentEvidence, initialUserActivity } from "@/lib/data";
import { StudentEvidence, UserActivity } from "@/lib/types";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Admin Dashboard State
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "evidence">("overview");
  const [evidenceList, setEvidenceList] = useState<StudentEvidence[]>(initialStudentEvidence);
  const [studentActivities] = useState<UserActivity[]>(initialUserActivity);

  // New Evidence Form State
  const [newStudentName, setNewStudentName] = useState("");
  const [newMetric, setNewMetric] = useState("");
  const [newMetricType, setNewMetricType] = useState<"Revenue" | "ROAS" | "Growth" | "Leads">("Revenue");
  const [newResultTitle, setNewResultTitle] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("Meta Ads 2026: Blueprint");
  const [newTestimonial, setNewTestimonial] = useState("");
  const [newProofImage, setNewProofImage] = useState(
    "https://res.cloudinary.com/ujbsqmo3/image/upload/v1794472184/apexmarketing/logo.jpg"
  );
  const [formSuccess, setFormSuccess] = useState("");

  // Check existing session on mount
  useEffect(() => {
    fetch("/api/admin/verify")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || "Invalid admin credentials");
      }
    } catch {
      setLoginError("Failed to connect to authentication server");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newMetric || !newTestimonial) return;

    const newEvidence: StudentEvidence = {
      id: `ev-${Date.now()}`,
      studentName: newStudentName,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 500)}?w=120&auto=format&fit=crop&q=80`,
      resultTitle: newResultTitle || `${newMetric} Result`,
      metric: newMetric,
      metricType: newMetricType,
      courseTitle: newCourseTitle,
      testimonial: newTestimonial,
      proofImageUrl: newProofImage,
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      verified: true,
    };

    setEvidenceList([newEvidence, ...evidenceList]);
    setFormSuccess("New verified student proof added and published successfully!");

    // Reset Form
    setNewStudentName("");
    setNewMetric("");
    setNewResultTitle("");
    setNewTestimonial("");

    setTimeout(() => setFormSuccess(""), 4000);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
      </div>
    );
  }

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Control Portal</h1>
            <p className="text-xs text-slate-500 mt-1">
              Secured access for Apex Marketing Hub administrators
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="apexmarketinghub01@gmail.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                "Sign In to Admin Dashboard"
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-700 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to website
            </Link>
            <span>Apex Marketing Hub</span>
          </div>
        </div>
      </div>
    );
  }

  // Logged In Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200 bg-black">
                <Image src="/logo.jpg" alt="Logo" fill sizes="32px" className="object-cover" />
              </div>
              <span className="font-bold text-slate-900 text-sm">Apex Marketing Admin</span>
            </Link>
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              Live Production
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 hidden sm:inline"
            >
              View Public Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "students"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Student Activity Monitor ({studentActivities.length})
          </button>
          <button
            onClick={() => setActiveTab("evidence")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "evidence"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Manage Student Evidence & Proof ({evidenceList.length})
          </button>
        </div>

        {/* Tab 1: Overview & Stats */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Total Enrolled Students</span>
                  <Users className="w-4 h-4 text-sky-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">4,860</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  +14% from last month
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Verified Student Proofs</span>
                  <Award className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{evidenceList.length} Case Studies</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  Published on homepage
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Course Completion Rate</span>
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold text-slate-900">82.4%</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  +4.2% industry average
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-medium">Email Verification Status</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-emerald-600">Active (Resend)</div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  verify@apexmarketinget.com
                </div>
              </div>
            </div>

            {/* Quick Activity Table Preview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-4">
                Recent Student Activity Stream
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="pb-3">Student</th>
                      <th className="pb-3">Enrolled Course</th>
                      <th className="pb-3">Progress</th>
                      <th className="pb-3">Last Active</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentActivities.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50/60">
                        <td className="py-3 font-semibold text-slate-900">
                          <div>{student.name}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{student.email}</div>
                        </td>
                        <td className="py-3 text-slate-700">{student.course}</td>
                        <td className="py-3">
                          <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-sky-600 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                            {student.progress}%
                          </span>
                        </td>
                        <td className="py-3 text-slate-500">{student.lastActive}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              student.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-sky-50 text-sky-700 border border-sky-200"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Student Activity Monitor */}
        {activeTab === "students" && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Live Student Learning Monitor</h2>
                <p className="text-xs text-slate-500">
                  Track individual student progress, engagement, and course completions in real-time.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-slate-100 rounded-lg text-slate-700">
                Total Users: {studentActivities.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Student Name</th>
                    <th className="pb-3">Contact Email</th>
                    <th className="pb-3">Course</th>
                    <th className="pb-3">Progress</th>
                    <th className="pb-3">Joined Date</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentActivities.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="py-3.5 font-bold text-slate-900">{student.name}</td>
                      <td className="py-3.5 text-slate-600 font-mono">{student.email}</td>
                      <td className="py-3.5 text-slate-700">{student.course}</td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-sky-600 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-mono text-slate-700 font-semibold">
                            {student.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 text-slate-500">{student.joinedDate}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            student.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-sky-50 text-sky-700 border border-sky-200"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Manage Student Evidence & Proof */}
        {activeTab === "evidence" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form to Add New Evidence */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-sky-600" />
                Add Student Result Proof
              </h2>
              <p className="text-xs text-slate-500">
                Publish verified student earnings, ROAS screenshots, or metrics to the homepage.
              </p>

              <form onSubmit={handleAddEvidence} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="e.g. Samuel Kassa"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Metric Value
                    </label>
                    <input
                      type="text"
                      required
                      value={newMetric}
                      onChange={(e) => setNewMetric(e.target.value)}
                      placeholder="e.g. +$24,500 / mo"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Metric Type
                    </label>
                    <select
                      value={newMetricType}
                      onChange={(e) => setNewMetricType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-white"
                    >
                      <option value="Revenue">Revenue</option>
                      <option value="ROAS">ROAS</option>
                      <option value="Leads">Leads</option>
                      <option value="Growth">Growth</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Result Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={newResultTitle}
                    onChange={(e) => setNewResultTitle(e.target.value)}
                    placeholder="e.g. Scaled Dropshipping Brand in 45 Days"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enrolled Course
                  </label>
                  <select
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="Meta Ads 2026: Blueprint">Meta Ads 2026: Blueprint</option>
                    <option value="TikTok E-Commerce & Viral">TikTok E-Commerce & Viral</option>
                    <option value="Google Performance Max">Google Performance Max</option>
                    <option value="AI-Powered Marketing">AI-Powered Marketing</option>
                    <option value="Modern Dropshipping Brand">Modern Dropshipping Brand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Proof Screenshot / Cloudinary Image URL
                  </label>
                  <input
                    type="url"
                    value={newProofImage}
                    onChange={(e) => setNewProofImage(e.target.value)}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Testimonial / Review
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newTestimonial}
                    onChange={(e) => setNewTestimonial(e.target.value)}
                    placeholder="Describe their experience and how the course helped them achieve this result..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                {formSuccess && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium">
                    {formSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Publish Verified Evidence
                </button>
              </form>
            </div>

            {/* List of Published Evidence */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                Published Student Evidence ({evidenceList.length})
              </h2>

              <div className="space-y-4">
                {evidenceList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0 border border-slate-200">
                      <Image
                        src={item.avatar}
                        alt={item.studentName}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900">{item.studentName}</h3>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified Result
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                          {item.metric}
                        </span>
                      </div>

                      <h4 className="font-semibold text-xs text-slate-800">{item.resultTitle}</h4>
                      <p className="text-xs text-slate-600 italic">"{item.testimonial}"</p>

                      <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Course: {item.courseTitle}</span>
                        <span>Published: {item.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
