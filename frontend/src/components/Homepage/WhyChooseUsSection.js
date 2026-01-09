"use client";

import { Check, TrendingUp, Clock, Users } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Increase Placement Rate",
    description:
      "Our clients see an average 40% increase in successful placements within the first 3 months.",
  },
  {
    icon: Clock,
    title: "Save Valuable Time",
    description:
      "Automate repetitive tasks and reduce time-to-hire by up to 50% with intelligent workflows.",
  },
  {
    icon: Users,
    title: "Better Candidate Experience",
    description:
      "Keep candidates engaged with automated updates and a streamlined application process.",
  },
];

const benefits = [
  "Intuitive drag-and-drop interface",
  "Real-time collaboration tools",
  "Customizable hiring workflows",
  "Advanced search and filtering",
  "Automated email templates",
  "Comprehensive reporting",
  "Integration with job boards",
  "Mobile-friendly design",
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative Background Element (Shared) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f8fafc] hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* 💻 DESKTOP VIEW (lg and up) */}
        <div className="hidden lg:grid grid-cols-2 gap-20 items-center">
          {/* Left Column: Narrative */}
          <div className="space-y-10">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-black uppercase tracking-widest mb-4">
                Why Choose Us
              </span>

              <h2 className="text-5xl xl:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
                Built for Modern <br />
                <span className="text-teal-500 underline decoration-teal-500/20 underline-offset-8">
                  Recruitment
                </span>
              </h2>

              <p className="text-xl text-gray-500 leading-relaxed font-medium max-w-lg">
                We understand the challenges of modern recruiting. Our platform
                adapts to your workflow — not the other way around.
              </p>
            </div>

            <div className="space-y-8">
              {reasons.map((reason) => (
                <div
                  key={reason.title}
                  className="group flex gap-6 hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    <reason.icon className="w-7 h-7 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Benefits Box */}
          <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-2xl shadow-gray-200/50 relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Check className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-10 pl-4 border-l-4 border-teal-500">
              What You’ll Get
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-teal-500 transition-colors">
                    <Check className="w-3 h-3 text-teal-600 group-hover:text-white" />
                  </div>
                  <span className="text-gray-700 font-bold text-sm tracking-tight">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📱 MOBILE VIEW (md and below) */}
        <div className="lg:hidden space-y-12">
          {/* Mobile Header */}
          <div className="text-center space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-xs font-bold uppercase tracking-widest">
              Standard for Excellence
            </span>
            <h2 className="text-4xl font-black text-gray-900 leading-tight">
              Built for <br />{" "}
              <span className="text-teal-500">Recruitment</span>
            </h2>
          </div>

          {/* Mobile Reasons List */}
          <div className="space-y-6">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-[#f8fafc] rounded-3xl p-6 border border-gray-100 transition-all active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center mb-4 shadow-md">
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Benefits Box */}
          <div className="bg-white rounded-3xl p-8 border-2 border-teal-50 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-white" />
              </div>
              What You’ll Get
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 py-1">
                  <Check className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-gray-700 font-bold text-sm">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
