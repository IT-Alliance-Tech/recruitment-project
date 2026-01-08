"use client";

import Header from "../../components/Homepage/Header";
import Footer from "../../components/Homepage/Footer";
import Image from "next/image";
import Link from "next/link";
import { Target, Heart, Lightbulb, Users, ArrowRight } from "lucide-react";

/* TEAM IMAGES */
import david from "../../../public/team1.png";
import jennifer from "../../../public/team2.png";
import robert from "../../../public/team3.png";
import amanda from "../../../public/team4.png";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in everything we do, from product development to customer support.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We operate with transparency and honesty, building trust with our clients and candidates.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We continuously innovate to stay ahead of industry trends and provide cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and partnership to achieve extraordinary results.",
  },
];

const stats = [
  { value: "5xxx+", label: "Companies Trust Us" },
  { value: "1yyy+", label: "Successful Placements" },
  { value: "5zz+", label: "Countries Served" },
  { value: "9xx%", label: "Client Satisfaction" },
];

const team = [
  { name: "David Mitchell", role: "CEO & Founder", image: david },
  { name: "Jennifer Lee", role: "Chief Product Officer", image: jennifer },
  { name: "Robert Garcia", role: "Head of Engineering", image: robert },
  { name: "Amanda Foster", role: "Head of Customer Success", image: amanda },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        {/* Hero */}
        <section className="relative h-[80vh] flex items-center justify-center bg-[#0b1c33] overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-teal-500/10 rounded-full -mr-500 -mt-500 blur-3xl" />
          <div className="relative z-10 max-w-5xl mx-auto px-12 text-center space-y-8">
            <span className="px-5 py-2 bg-teal-500/10 text-teal-400 text-xs font-black uppercase tracking-[0.4em] rounded-full border border-teal-500/20">
              The Genesis
            </span>
            <h1 className="text-8xl font-black text-white leading-none tracking-tighter uppercase">
              Architecting <br />{" "}
              <span className="text-teal-400 italic">Talent Matrix.</span>
            </h1>
            <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
              We&apos;re on a mission to bridge the gap between human ambition
              and organizational excellence through neural-speed matching.
            </p>
          </div>
        </section>

        {/* Stats / Story */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-12 grid grid-cols-12 gap-24 items-center">
            <div className="col-span-6 space-y-10">
              <div className="space-y-4">
                <span className="text-teal-500 font-black text-[10px] uppercase tracking-[0.3em]">
                  Our Trajectory
                </span>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                  ENGINEERED BY <br /> INDUSTRY ORACLE.
                </h2>
              </div>
              <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-medium">
                <p>
                  Founded in 2020, RecruitATS emerged from the intersection of
                  high-stakes recruitment and advanced software architecture.
                </p>
                <p>
                  We eliminated the friction of legacy systems, replacing chaos
                  with precision. Today, we propel thousands of careers into the
                  stratosphere monthly.
                </p>
              </div>
            </div>
            <div className="col-span-6 grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-[2.5rem] p-10 border-2 border-transparent hover:border-teal-500 transition-all group"
                >
                  <p className="text-5xl font-black text-gray-900 group-hover:text-teal-500 transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-32 bg-[#0b1c33]">
          <div className="max-w-7xl mx-auto px-12 space-y-20">
            <div className="text-center space-y-4">
              <span className="text-teal-400 font-black text-[10px] uppercase tracking-[0.4em]">
                Core Protocols
              </span>
              <h2 className="text-5xl font-black text-white tracking-tighter">
                OUR OPERATIONAL DNA
              </h2>
            </div>
            <div className="grid grid-cols-4 gap-10">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-[3rem] p-12 border border-white/10 hover:bg-white/10 transition-all space-y-8 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-2xl shadow-teal-500/20 group-hover:scale-110 transition-transform">
                    <v.icon size={32} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      {v.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-12 space-y-20">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <span className="text-teal-500 font-black text-[10px] uppercase tracking-[0.3em]">
                  The Vanguard
                </span>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter text-left">
                  ARCHITECTS OF <br /> THE SYSTEM.
                </h2>
              </div>
              <p className="text-gray-400 font-bold max-w-sm text-sm uppercase tracking-widest text-right">
                Leading the charge in global recruitment transformation with
                strategic precision.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-8">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="group relative rounded-[3rem] overflow-hidden aspect-[4/5] bg-slate-100"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <h3 className="text-2xl font-black text-white">
                      {member.name}
                    </h3>
                    <p className="text-teal-400 font-black text-xs uppercase tracking-widest">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#0b1c33] py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto px-12 text-center space-y-12">
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase">
              Ready to enter <br /> the matrix?
            </h2>
            <div className="flex gap-6 justify-center">
              <Link
                href="/resume-upload"
                className="px-12 py-5 bg-teal-500 text-white rounded-full font-black text-lg shadow-2xl shadow-teal-500/30 hover:scale-105 transition-all"
              >
                Begin Deployment
              </Link>
              <Link
                href="/contact"
                className="px-12 py-5 bg-white/10 text-white rounded-full font-black text-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                Request Briefing
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        {/* Mobile Hero */}
        <section className="bg-[#0b1c33] px-8 pt-24 pb-32 text-center space-y-8 rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <span className="inline-block px-4 py-1.5 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-teal-500/20">
            Alpha Project
          </span>
          <h1 className="text-5xl font-black text-white tracking-tighter leading-none uppercase">
            Pure <br /> Talent <br />{" "}
            <span className="text-teal-400 italic font-black">Velocity.</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm leading-relaxed mx-auto max-w-xs">
            Bridging human ambition and excellence at neural speed.
          </p>
        </section>

        {/* Mobile Story / Stats */}
        <section className="px-8 py-20 space-y-12 bg-white">
          <div className="space-y-4">
            <span className="text-teal-600 font-black text-[10px] uppercase tracking-widest">
              Our Genesis
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              Built for <br /> the Elite.
            </h2>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">
              Propelling careers and organizations into the future with
              systematic precision since 2020.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.slice(0, 4).map((stat, i) => (
              <div
                key={i}
                className="bg-slate-50 p-6 rounded-3xl border border-slate-100"
              >
                <p className="text-2xl font-black text-gray-900">
                  {stat.value}
                </p>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Values */}
        <section className="bg-[#0b1c33] px-8 py-20 rounded-[3rem] space-y-12 mx-4">
          <div className="text-center space-y-2">
            <span className="text-teal-400 font-black text-[10px] uppercase tracking-widest">
              Protocols
            </span>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
              Our DNA
            </h2>
          </div>
          <div className="space-y-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 flex items-start gap-6"
              >
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-teal-500 flex items-center justify-center text-white">
                  <v.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">{v.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Team */}
        <section className="px-8 py-20 space-y-12">
          <div className="space-y-2">
            <span className="text-teal-600 font-black text-[10px] uppercase tracking-widest">
              Vanguard
            </span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
              Architects
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {team.map((m, i) => (
              <div key={i} className="space-y-4">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-100">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="px-2">
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                    {m.name}
                  </h4>
                  <p className="text-[8px] font-black text-teal-600 uppercase tracking-widest">
                    {m.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile CTA */}
        <section className="px-8 pb-32 pt-10 text-center space-y-10">
          <h2 className="text-4xl font-black text-gray-900 leading-none uppercase tracking-tighter">
            Ready for <br /> Deploy?
          </h2>
          <div className="flex flex-col gap-4">
            <Link
              href="/resume-upload"
              className="w-full py-5 bg-teal-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-500/20"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="w-full py-5 bg-[#0b1c33] text-white rounded-2xl font-black text-sm uppercase tracking-widest"
            >
              Contact
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
