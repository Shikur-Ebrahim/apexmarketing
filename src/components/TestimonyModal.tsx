"use client";

import Image from "next/image";
import Link from "next/link";
import { X, CheckCircle, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { StudentEvidence } from "@/lib/types";

interface TestimonyModalProps {
  evidence: StudentEvidence | null;
  onClose: () => void;
}

export default function TestimonyModal({ evidence, onClose }: TestimonyModalProps) {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-xs text-slate-500 hover:text-slate-900 shadow-xs transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 pb-4 bg-gradient-to-b from-sky-50/70 to-white border-b border-slate-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-xs">
              <Image
                src={evidence.avatar}
                alt={evidence.studentName}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-slate-900">
                  {evidence.studentName}
                </h3>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">{evidence.courseTitle}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <span className="text-xl sm:text-2xl font-black text-sky-700 bg-white px-3 py-1 rounded-xl border border-sky-100 shadow-xs">
              {evidence.metric}
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              {evidence.platform}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Headline & Testimonial */}
          <div>
            <h4 className="font-extrabold text-base text-slate-900 mb-2">
              {evidence.resultTitle}
            </h4>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "{evidence.testimonial}"
            </div>
          </div>

          {/* Actionable Breakdown: How They Made It */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Step-by-Step Blueprint (How They Did It):</span>
            </div>

            <div className="space-y-2.5">
              {(evidence.howTheyDidIt && evidence.howTheyDidIt.length > 0
                ? evidence.howTheyDidIt
                : [
                    "Followed the core video training modules step-by-step",
                    "Implemented creative templates and copy frameworks",
                    "Launched targeted social campaigns and optimized daily",
                    "Scaled results while maintaining consistent profit margins",
                  ]
              ).map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs text-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience Badge */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800">
            <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Best suited for: <strong>{evidence.targetAudience}</strong>
            </span>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-[11px] text-slate-400 block">Course Tuition:</span>
            <span className="text-base font-extrabold text-slate-900">2,500 ETB</span>
          </div>

          <Link
            href="/dashboard"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 text-center"
          >
            Enroll in This Course (2,500 ETB) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
