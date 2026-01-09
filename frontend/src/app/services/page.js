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
    id: "candidate-pipeline",
    icon: Users,
    title: "Hiring Pipeline Management",
    description:
      "Manage and track candidates through every stage of the recruitment lifecycle with a structured hiring pipeline.",
    features: [
      "Applied, shortlisted, interviewed & hired stages",
      "Drag-and-drop candidate movement",
      "Clear candidate status tracking",
      "Centralized candidate profiles",
      "Recruiter collaboration support",
    ],
    link: "/pipeline",
  },
  {
    id: "job-client-management",
    icon: BarChart3,
    title: "Job & Client Management",
    description:
      "Handle recruitment clients and job requirements efficiently from a single admin dashboard.",
    features: [
      "Client-wise job requirement tracking",
      "Open and closed position management",
      "Hiring progress visibility",
      "Placement history tracking",
      "Client performance insights",
    ],
    link: "/clients",
  },
  {
    id: "resume-management",
    icon: FileText,
    title: "Resume Management",
    description:
      "Collect, store, and organize candidate resumes securely with easy access for recruiters.",
    features: [
      "Resume upload with PDF & DOC support",
      "Candidate resume linking",
      "Searchable resume database",
      "Secure resume storage",
      "Quick resume review access",
    ],
    link: "/resume-upload",
  },
  {
    id: "interview-management",
    icon: Calendar,
    title: "Interview Scheduling & Tracking",
    description:
      "Schedule and manage interview rounds smoothly with built-in interview planning tools.",
    features: [
      "HR, technical & managerial interview rounds",
      "Interview date & time scheduling",
      "Candidate interview status updates",
      "Easy rescheduling support",
      "Centralized interview calendar view",
    ],
    link: "/schedule",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        {/* Hero */}
        <section className="relative h-[65vh] flex items-center justify-center bg-[#0b1c33] overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-teal-500/10 rounded-full blur-3xl -mr-500 -mt-500" />
          <div className="relative z-10 max-w-5xl mx-auto px-12 text-center space-y-8">
            <span className="px-5 py-2 bg-teal-500/10 text-teal-400 text-xs font-black uppercase tracking-[0.4em] rounded-full border border-teal-500/20">
              Operational Arsenal
            </span>
            <h1 className="text-8xl font-black text-white leading-tight tracking-tighter uppercase">
              Recruitment <br />{" "}
              <span className="text-teal-400 italic">Redefined.</span>
            </h1>
            <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
              A neural-grade suite of recruitment intelligence tools designed
              for scale.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 gap-10">
            {services.map((s, i) => (
              <div
                key={i}
                id={s.id}
                className="group bg-slate-50 rounded-[3rem] p-12 border-2 border-transparent hover:border-teal-500 hover:bg-white transition-all duration-500 flex flex-col justify-between scroll-mt-32"
              >
                <div className="space-y-8">
                  <div className="w-20 h-20 rounded-3xl bg-teal-500 flex items-center justify-center text-white shadow-2xl shadow-teal-500/20 group-hover:scale-110 transition-transform duration-500">
                    <s.icon size={40} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
                      {s.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="text-gray-600 font-bold text-sm uppercase tracking-wide">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <Link
                    href={s.link}
                    className="inline-flex items-center gap-3 text-teal-600 font-black text-sm uppercase tracking-widest hover:gap-5 transition-all"
                  >
                    Initiate Sequence <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0b1c33] py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-teal-500/5 blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto px-12 text-center space-y-12">
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Ready for <br /> <span className="text-teal-400">Next-Gen</span>{" "}
              Hiring?
            </h2>
            <div className="flex gap-6 justify-center">
              <Link
                href="/resume-upload"
                className="px-12 py-5 bg-teal-500 text-white rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all"
              >
                Quick Apply
              </Link>
              <Link
                href="/contact"
                className="px-12 py-5 bg-white/10 text-white rounded-full font-black text-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        {/* Mobile Hero */}
        <section className="bg-[#0b1c33] px-8 pt-24 pb-32 text-center space-y-6 rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <span className="inline-block px-4 py-1.5 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-teal-500/20">
            Operational Suite
          </span>
          <h1 className="text-4xl font-black text-white tracking-tighter leading-none uppercase">
            Pure <br />{" "}
            <span className="text-teal-400 italic font-black">Recruit.</span>
          </h1>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest max-w-xs mx-auto">
            Neural-Speed Talent Discovery
          </p>
        </section>

        {/* Mobile Services */}
        <section className="px-6 -mt-16 space-y-8 pb-32">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-gray-200/50 border border-slate-50 space-y-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-white">
                <s.icon size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  {s.description}
                </p>
                <ul className="space-y-3 pt-2">
                  {s.features.slice(0, 3).map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center">
                        <Check size={10} className="text-teal-600" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={s.link}
                className="flex items-center justify-center w-full py-4 bg-[#0b1c33] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em]"
              >
                Deploy Now
              </Link>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
}
