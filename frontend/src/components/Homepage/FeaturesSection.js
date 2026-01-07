"use client";

import { Users, FileText, Calendar, BarChart3, Zap, Shield } from "lucide-react";

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
    <section className="py-16 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-4">
            Features
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to{" "}
            <span className="text-teal-500">Recruit Efficiently</span>
          </h2>

          <p className="text-lg text-gray-500">
            End-to-end recruitment tools designed to simplify candidate hiring,
            interview management, and client coordination.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center mb-6 shadow-lg">
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
