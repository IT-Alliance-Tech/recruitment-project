"use client";

import {
  Users,
  FileText,
  Calendar,
  BarChart3,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Candidate Management",
    description:
      "Manage and track candidates across multiple hiring stages including applied, shortlisted, interviewed, selected, and rejected with a structured pipeline.",
  },
  {
    icon: BarChart3,
    title: "Client & Job Tracking",
    description:
      "Track recruitment clients, job openings, and hiring requirements in one centralized dashboard with real-time status updates.",
  },
  {
    icon: FileText,
    title: "Resume Collection & Parsing",
    description:
      "Upload and organize resumes effortlessly with support for PDF, DOC, and DOCX formats, making candidate shortlisting faster and easier.",
  },
  {
    icon: Calendar,
    title: "Interview Scheduling",
    description:
      "Schedule HR, technical, and managerial interview rounds seamlessly with calendar-based scheduling and reminders.",
  },
  {
    icon: Zap,
    title: "Automated Hiring Workflow",
    description:
      "Reduce manual work with automated candidate flow, status updates, and streamlined hiring actions to speed up recruitment cycles.",
  },
  {
    icon: Shield,
    title: "Data Security & Compliance",
    description:
      "Ensure candidate and client data is securely stored with role-based access, encryption, and compliance with data protection standards.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header (Shared but responsive padding) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-bold uppercase tracking-widest mb-4">
            Our Features
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Everything You Need to{" "}
            <span className="text-teal-500">Recruit Efficiently</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
            End-to-end recruitment tools designed to simplify candidate hiring,
            interview management, and client coordination.
          </p>
        </div>

        {/* 💻 DESKTOP GRID (lg and up) */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-white rounded-[2rem] p-8 border border-gray-100 hover:border-teal-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />

              <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center mb-8 shadow-lg shadow-teal-500/30 group-hover:rotate-6 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* 📱 MOBILE VIEW (md and below) */}
        <div className="lg:hidden space-y-6 px-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm active:scale-[0.98] transition-all flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center mb-6 shadow-md">
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
