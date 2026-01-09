"use client";

import Link from "next/link";
import { Users, Calendar, FileText, BarChart3 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c]">
      {/* Glow backgrounds (Shared) */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[120px]" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-20">
        {/* 💻 DESKTOP VIEW (lg and up) */}
        <div className="hidden lg:grid grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm font-medium text-teal-200 uppercase tracking-wider">
                Streamline Your Hiring
              </span>
            </div>

            <h1 className="text-5xl xl:text-7xl font-bold leading-[1.1]">
              Find Top Talent <span className="text-teal-400">Faster</span> Than
              Ever
            </h1>

            <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
              Our intelligent ATS streamlines recruitment with automated
              pipelines, client tracking, and seamless interview scheduling.
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/resume-upload"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-600 transition-all font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 active:translate-y-0"
              >
                <FileText className="w-5 h-5" />
                Apply Now
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {[
                { value: "500+", label: "Companies" },
                { value: "1200+", label: "Placements" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-teal-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right duration-1000">
            {[
              {
                icon: Users,
                title: "Candidate Pipeline",
                desc: "Track applicants through every stage",
              },
              {
                icon: BarChart3,
                title: "Client Tracking",
                desc: "Manage all your clients in one place",
              },
              {
                icon: FileText,
                title: "Resume Upload",
                desc: "Easy document management",
              },
              {
                icon: Calendar,
                title: "Interview Scheduling",
                desc: "Seamless calendar integration",
              },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group ${
                  idx % 2 === 1 ? "mt-8" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 📱 MOBILE VIEW (md and below) */}
        <div className="lg:hidden text-center space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-bold text-teal-200 uppercase tracking-widest">
                Trusted by 500+ Companies
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Scale Your Team <br />
              <span className="text-teal-400 underline decoration-teal-400/30 underline-offset-8">
                Faster
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-sm mx-auto leading-relaxed">
              The only recruitment platform that grows with you. Automate your
              pipeline today.
            </p>

            <div className="flex flex-col gap-4 px-4">
              <Link
                href="/resume-upload"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-teal-500 text-white font-bold shadow-xl shadow-teal-500/30 active:scale-95 transition-all text-lg"
              >
                <FileText className="w-5 h-5" />
                Start Applying
              </Link>
            </div>
          </div>

          {/* Mobile Stats Grid */}
          <div className="grid grid-cols-3 gap-2 py-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm mx-2">
            {[
              { value: "500+", label: "Brands" },
              { value: "1.2k+", label: "Hired" },
              { value: "98%", label: "Happy" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border-r last:border-0 border-white/10"
              >
                <div className="text-xl md:text-2xl font-black text-teal-400">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Simple Mobile Feature List */}
          <div className="grid grid-cols-1 gap-4 px-2">
            {[
              { icon: Users, title: "Smart Pipeline", color: "bg-teal-500" },
              { icon: FileText, title: "Resume Parser", color: "bg-blue-500" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-left"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center shadow-lg shrink-0`}
                >
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
