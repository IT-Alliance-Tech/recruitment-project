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
    title: "Review & Screen",
    description:
      "Review applications in your pipeline. Filter, sort, and move candidates through stages with drag-and-drop.",
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
    <section className="py-14 md:py-18 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-3">
            How It Works
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Simple Steps to{" "}
            <span className="text-teal-500">Successful Hiring</span>
          </h2>

          <p className="text-lg text-gray-500">
            Our streamlined process makes recruitment effortless from start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl h-full">

                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 px-3 py-1 bg-teal-500 rounded-full text-white text-sm font-bold shadow-md">
                    {step.step}
                  </div>

                  <div className="pt-6">
                    <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-5">
                      <step.icon className="w-7 h-7 text-teal-600" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
