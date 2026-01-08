"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c] text-white">
      
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Take the Next Step in Your{" "}
            <span className="text-teal-400">Career?</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Apply for exciting job opportunities and get shortlisted through our
            streamlined recruitment process.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            {/* APPLY NOW → Resume Upload */}
            <Link
              href="/resume-upload"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-600 transition font-semibold shadow-lg w-full sm:w-auto"
            >
              <FileText className="w-5 h-5" />
              Apply for Jobs
            </Link>

            {/* Contact Us → Contact Page */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 transition font-semibold w-full sm:w-auto"
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>

          <p className="mt-6 text-sm text-gray-400">
            Simple application process • Fast shortlisting • Transparent hiring
          </p>
        </div>
      </div>
    </section>
  );
}
