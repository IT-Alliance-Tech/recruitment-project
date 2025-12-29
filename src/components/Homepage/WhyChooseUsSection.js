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
    <section className="py-16 md:py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-14 items-center">

          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-4">
                Why Choose Us
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Built for Modern{" "}
                <span className="text-teal-500">Recruitment</span>
              </h2>

              <p className="text-lg text-gray-500">
                We understand the challenges of modern recruiting. That’s why we’ve built
                a platform that adapts to your workflow — not the other way around.
              </p>
            </div>

            <div className="space-y-5">
              {reasons.map((reason) => (
                <div key={reason.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                    <reason.icon className="w-6 h-6 text-teal-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {reason.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              What You’ll Get
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
