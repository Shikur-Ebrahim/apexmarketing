"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  PlayCircle,
  CheckCircle,
  Clock,
  BookOpen,
  Award,
  Download,
  ArrowLeft,
  Flame,
  FileText,
} from "lucide-react";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"enrolled" | "certificates" | "resources">("enrolled");
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  const enrolledCourse = {
    title: "Meta Ads 2026: Facebook & Instagram Scaling Blueprint",
    instructor: "Alex Vance (Ex-Meta Ad Strategist)",
    progress: 68,
    totalLessons: 38,
    completedLessons: 26,
    currentModule: "Module 2: Campaign Structure & Media Buying",
    lessons: [
      { id: "1", title: "Hook Psychology & Scripting Frameworks", duration: "18m", done: true },
      { id: "2", title: "UGC That Converts: Briefing Creators", duration: "24m", done: true },
      { id: "3", title: "Fast-Paced Editing Techniques for Meta", duration: "22m", done: true },
      { id: "4", title: "Advantage+ Shopping Campaigns Decoded", duration: "31m", done: true },
      { id: "5", title: "Testing Sandboxes vs Scaling Campaigns", duration: "28m", done: false },
      { id: "6", title: "Daily Budget Pacing & Bid Caps Mastery", duration: "25m", done: false },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb & Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Courses
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Student Learning Portal
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back! You are making great progress towards marketing mastery.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">5-Day Study Streak</div>
              <div className="text-[11px] text-slate-500">Keep up the daily momentum</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 my-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab("enrolled")}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "enrolled"
                ? "border-sky-600 text-sky-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            My Courses (1)
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "resources"
                ? "border-sky-600 text-sky-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Actionable Resources & Templates
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "certificates"
                ? "border-sky-600 text-sky-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            Certificates
          </button>
        </div>

        {/* Tab 1: Enrolled Course View */}
        {activeTab === "enrolled" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player Preview & Current Lesson */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-black rounded-2xl overflow-hidden shadow-md aspect-video relative flex flex-col justify-end p-6 border border-slate-800 group">
                {/* Simulated Video Player */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                  <button
                    onClick={() => setActiveLesson("Testing Sandboxes vs Scaling Campaigns")}
                    className="w-16 h-16 rounded-full bg-sky-600/90 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  >
                    <PlayCircle className="w-10 h-10 ml-0.5" />
                  </button>
                </div>

                <div className="relative z-10 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-bold bg-sky-500 px-2.5 py-0.5 rounded text-white inline-block mb-2">
                    Now Playing &bull; Lesson 5
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Testing Sandboxes vs Scaling Campaigns
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Duration: 28 mins &bull; Instructor: Alex Vance
                  </p>
                </div>
              </div>

              {/* Course Overview Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{enrolledCourse.title}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{enrolledCourse.instructor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                      {enrolledCourse.progress}% Completed
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-sky-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${enrolledCourse.progress}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  In this core lesson, you will learn how to structure your Meta Ad accounts into two distinct silos: an isolated Creative Testing Sandbox and an automated CBO Scaling Campaign to avoid budget cannibalization.
                </p>
              </div>
            </div>

            {/* Curriculum Checklist Sidebar */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center justify-between">
                  <span>Curriculum Progress</span>
                  <span className="text-xs font-normal text-slate-500">
                    {enrolledCourse.completedLessons} / {enrolledCourse.totalLessons} lessons
                  </span>
                </h3>

                <div className="space-y-2 mt-4">
                  {enrolledCourse.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson.title)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer ${
                        lesson.title === activeLesson
                          ? "bg-sky-50 border-sky-300 text-sky-900"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {lesson.done ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <PlayCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        )}
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Actionable Resources */}
        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Meta Ads 2026 Creative Brief Template",
                type: "PDF & Notion Template",
                size: "2.4 MB",
              },
              {
                title: "High-Converting UGC Script Framework",
                type: "Google Docs Checklist",
                size: "1.1 MB",
              },
              {
                title: "Daily ROAS & Budget Calculator Spreadsheet",
                type: "Google Sheets",
                size: "850 KB",
              },
              {
                title: "Hook Library: 100 Viral E-commerce Hooks",
                type: "PDF Resource",
                size: "4.8 MB",
              },
            ].map((res, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{res.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{res.type} &bull; {res.size}</p>
                </div>
                <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-500 cursor-pointer">
                  <Download className="w-3.5 h-3.5" /> Download Asset
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Certificates */}
        {activeTab === "certificates" && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-3">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Certificate of Completion</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Complete remaining lessons (82% required) to unlock your official verified Apex Marketing Hub Certificate.
            </p>
            <div className="mt-5 w-full bg-slate-100 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "68%" }} />
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block">68% / 100% completed</span>
          </div>
        )}
      </main>
    </div>
  );
}
