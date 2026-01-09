"use client";

import { UserPlus, FileSearch, Calendar, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Upload Resumes",
    description:
      "Candidates submit their resumes through your custom application form. We support PDF, DOC, and DOCX formats.",
  },
  {
    icon: FileSearch,
    step: "02",
    title: "Shortlist Candidates",
    description:
      "Evaluate applications, shortlist suitable candidates, and move them through the recruitment pipeline with clear status updates.",
  },
  {
    icon: Calendar,
    step: "03",
    title: "Schedule Interviews",
    description:
      "Book interviews with integrated calendar scheduling. Candidates pick times that work for everyone.",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Make the Hire",
    description:
      "Send offers, track acceptances, and celebrate successful placements. All in one platform.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header (Shared) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-black uppercase tracking-widest mb-4">
            Our Process
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Simple Steps to{" "}
            <span className="text-teal-500">Successful Hiring</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
            Our streamlined process makes recruitment effortless from start to
            finish.
          </p>
        </div>

        {/* 💻 DESKTOP FLOW (lg and up) */}
        <div className="hidden lg:block relative">
          {/* Central Connection Line */}
          <div className="absolute top-[70px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0" />

          <div className="grid grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <div key={step.step} className="relative group text-center">
                {/* Step Number Circle */}
                <div className="w-16 h-16 rounded-3xl bg-teal-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-teal-500/30 relative z-20 group-hover:rotate-[360deg] transition-all duration-700">
                  <span className="text-xl font-black text-white">
                    {step.step}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex p-4 rounded-2xl bg-white border border-gray-100 shadow-sm group-hover:border-teal-500/30 transition-all group-hover:-translate-y-2">
                    <step.icon className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📱 MOBILE VIEW (md and below) */}
        <div className="lg:hidden space-y-12">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="flex flex-col items-center text-center group"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-px h-12 bg-teal-100" />
                <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">
                    {step.step}
                  </span>
                </div>
                <div className="w-px h-12 bg-teal-100" />
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md w-full relative">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4 border border-teal-100">
                  <step.icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
