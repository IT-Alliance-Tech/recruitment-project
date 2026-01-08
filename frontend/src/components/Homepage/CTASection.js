"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#125a6e] text-white">
      {/* Immersive Glows (Shared) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* 💻 DESKTOP VIEW (lg and up) */}
        <div className="hidden lg:block max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-5xl xl:text-6xl font-black leading-tight">
            Ready to Take the Next Step in Your{" "}
            <span className="text-teal-400 underline decoration-teal-400/30 underline-offset-8">
              Career?
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Apply for exciting job opportunities and get shortlisted through our
            streamlined recruitment process.
          </p>

          <div className="flex items-center justify-center gap-6">
            <Link
              href="/resume-upload"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-white font-black text-lg transition-all shadow-xl shadow-teal-500/20 hover:shadow-teal-400/40 hover:-translate-y-1 active:scale-95"
            >
              <FileText className="w-6 h-6" />
              Apply for Jobs Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl border-2 border-white/20 hover:border-white/50 hover:bg-white/5 transition-all font-bold text-lg"
            >
              Talk to Us
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-12 text-gray-400 font-bold text-sm tracking-widest uppercase">
            <span>Simple Process</span>
            <span className="w-2 h-2 rounded-full bg-teal-500/50" />
            <span>Fast Results</span>
            <span className="w-2 h-2 rounded-full bg-teal-500/50" />
            <span>Transparent</span>
          </div>
        </div>

        {/* 📱 MOBILE VIEW (md and below) */}
        <div className="lg:hidden text-center space-y-8">
          <h2 className="text-4xl font-black leading-tight">
            Start Your <br />{" "}
            <span className="text-teal-400">Dream Career</span>
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed px-4">
            Fast applications, instant tracking, and the best opportunities.
          </p>

          <div className="flex flex-col gap-4 px-4">
            <Link
              href="/resume-upload"
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-[2rem] bg-teal-500 text-white font-black text-xl shadow-2xl shadow-teal-500/30 active:scale-95 transition-all"
            >
              <FileText className="w-6 h-6" />
              Apply Now
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 px-8 py-5 rounded-[2rem] border-2 border-white/20 font-bold text-lg active:scale-95 transition-all"
            >
              Contact Support
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 px-2 pt-6 border-t border-white/10">
            <div className="text-[10px] font-black uppercase tracking-tighter text-teal-400">
              Simple
            </div>
            <div className="text-[10px] font-black uppercase tracking-tighter text-teal-400">
              Fast
            </div>
            <div className="text-[10px] font-black uppercase tracking-tighter text-teal-400">
              Trusted
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
