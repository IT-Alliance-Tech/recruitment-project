"use client";

import Header from "../../components/Homepage/Header";
import Footer from "../../components/Homepage/Footer";
import Link from "next/link";
import {
  Users,
  FileText,
  Calendar,
  BarChart3,
  ArrowRight,
  Check,
} from "lucide-react";

/* ================= DATA ================= */

const services = [
  {
    icon: Users,
    title: "Candidate Pipeline Management",
    description:
      "Track every candidate from application to placement with our intuitive visual pipeline.",
    features: [
      "Drag-and-drop kanban boards",
      "Automated status updates",
      "Candidate scoring system",
      "Custom pipeline stages",
      "Team collaboration tools",
    ],
    link: "/pipeline",
  },
  {
    icon: BarChart3,
    title: "Client Tracking",
    description:
      "Manage all your recruitment clients and their requirements in one centralized dashboard.",
    features: [
      "Client portfolio management",
      "Job requirement tracking",
      "Placement history",
      "Performance analytics",
      "Custom reporting",
    ],
    link: "/clients",
  },
  {
    icon: FileText,
    title: "Resume Collection",
    description:
      "Streamline resume collection with our easy-to-use upload forms and document management.",
    features: [
      "PDF & DOC support",
      "Resume parsing",
      "Searchable database",
      "Bulk upload option",
      "Secure storage",
    ],
    link: "/resume-upload",
  },
  {
    icon: Calendar,
    title: "Interview Scheduling",
    description:
      "Book interviews seamlessly with integrated calendar scheduling and automated reminders.",
    features: [
      "Calendar integration",
      "Automated reminders",
      "Time zone support",
      "Video call links",
      "Rescheduling tools",
    ],
    link: "/schedule",
  },
];

export default function Services() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c]">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium mb-6">
            Our Services
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Complete Recruitment <span className="text-teal-400">Solutions</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to manage your recruitment process efficiently,
            all in one powerful platform.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-14 md:py-18 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center shrink-0">
                    <service.icon className="w-8 h-8 text-teal-600" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-500 mb-6">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link href={service.link}>
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition">
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>

          <p className="text-gray-500 mb-8">
            Book a free consultation to see how RecruitATS can transform your hiring process.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/schedule">
              <button className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl">
                Book Consultation
              </button>
            </Link>

            <Link href="/contact">
              <button className="px-8 py-4 border border-gray-300 text-gray-900 rounded-xl hover:bg-gray-100 flex items-center gap-2">
                Contact Sales
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
