"use client";

import { Users, FileText, Calendar, BarChart3, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Candidate Pipeline",
    description:
      "Track candidates through every stage of the hiring process with visual kanban boards and automated status updates.",
  },
  {
    icon: BarChart3,
    title: "Client Tracking",
    description:
      "Manage all your recruitment clients in one place. Track requirements, positions, and placement success rates.",
  },
  {
    icon: FileText,
    title: "Resume Upload",
    description:
      "Easily collect and organize resumes with our intuitive upload system. Support for PDF, DOC, and DOCX formats.",
  },
  {
    icon: Calendar,
    title: "Interview Scheduling",
    description:
      "Seamless integration with calendars for easy interview scheduling. Automated reminders for all parties.",
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    description:
      "Reduce time-to-hire by up to 50% with automated workflows and intelligent candidate matching.",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description:
      "Enterprise-grade security with GDPR compliance. Your data is encrypted and protected at all times.",
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
            <span className="text-teal-500">Hire Smarter</span>
          </h2>

          <p className="text-lg text-gray-500">
            Powerful tools designed to streamline your recruitment process from
            sourcing to placement.
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
