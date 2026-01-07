"use client";

import Link from "next/link";
import { Users, Calendar, FileText, BarChart3 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden text-white bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c]">
      
      {/* Glow backgrounds */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[120px]" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm font-medium text-teal-200">
                Streamline Your Hiring Process
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Top Talent <span className="text-teal-400">Faster</span> Than Ever
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
              Our intelligent ATS streamlines recruitment with automated pipelines,
              client tracking, and seamless interview scheduling.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <Link
                href="/resume-upload"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-600 transition font-semibold shadow-lg w-full sm:w-auto"
              >
                <FileText className="w-5 h-5" />
                Apply Now
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              {[
                { value: "5XXX+", label: "Companies" },
                { value: "1XXX+", label: "Placements" },
                { value: "9XXX%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, title: "Candidate Pipeline", desc: "Track applicants through every stage" },
                { icon: BarChart3, title: "Client Tracking", desc: "Manage all your clients in one place" },
                { icon: FileText, title: "Resume Upload", desc: "Easy document management" },
                { icon: Calendar, title: "Interview Scheduling", desc: "Seamless calendar integration" },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center mb-4 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
