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
  { icon: Target, title: "Excellence", description: "We strive for excellence in everything we do, from product development to customer support." },
  { icon: Heart, title: "Integrity", description: "We operate with transparency and honesty, building trust with our clients and candidates." },
  { icon: Lightbulb, title: "Innovation", description: "We continuously innovate to stay ahead of industry trends and provide cutting-edge solutions." },
  { icon: Users, title: "Collaboration", description: "We believe in the power of teamwork and partnership to achieve extraordinary results." },
];

const stats = [
  { value: "500+", label: "Companies Trust Us" },
  { value: "10,000+", label: "Successful Placements" },
  { value: "50+", label: "Countries Served" },
  { value: "98%", label: "Client Satisfaction" },
];

const team = [
  { name: "David Mitchell", role: "CEO & Founder", image: david },
  { name: "Jennifer Lee", role: "Chief Product Officer", image: jennifer },
  { name: "Robert Garcia", role: "Head of Engineering", image: robert },
  { name: "Amanda Foster", role: "Head of Customer Success", image: amanda },
];

export default function About() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c] overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium mb-6">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforming How Companies <span className="text-teal-400">Find Talent</span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            We're on a mission to make recruitment smarter, faster, and more human.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-12 md:py-14 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium">
              Our Story
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built by Recruiters, for Recruiters
            </h2>

            <div className="space-y-4 text-gray-500">
              <p>
                RecruitATS was founded in 2020 by a team of HR professionals and software
                engineers who experienced firsthand the challenges of modern recruiting.
              </p>
              <p>
                We saw talented candidates getting lost in outdated systems, recruiters
                drowning in spreadsheets, and hiring managers frustrated with slow processes.
              </p>
              <p>
                Today, RecruitATS powers recruitment for hundreds of companies worldwide,
                helping place over 10,000 candidates in their dream roles.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-xl grid grid-cols-2 gap-10 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-teal-500">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-12 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-4">
            Our Values
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Drives Us Forward
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our core values guide everything we do.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="bg-[#f8fafc] p-10 rounded-2xl border border-gray-200 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-teal-100 flex items-center justify-center">
                <value.icon className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-sm text-gray-500">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-12 md:py-14 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet the People Behind RecruitATS
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="relative aspect-square">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c] text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Join Our Journey?
        </h2>
        <p className="text-white/70 mb-8">
          Let's work together to transform your recruitment process.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            href="/resume-upload"
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl"
          >
            Apply now
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 border border-white/30 text-white rounded-xl hover:bg-white/10 flex items-center gap-2"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
