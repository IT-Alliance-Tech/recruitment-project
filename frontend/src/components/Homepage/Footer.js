"use client";

import Link from "next/link";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1c33] text-gray-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        {/* 💻 DESKTOP VIEW (lg and up) */}
        <div className="hidden lg:grid grid-cols-4 gap-16">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Recruit<span className="text-teal-400">ATS</span>
              </span>
            </Link>

            <p className="text-base leading-relaxed text-gray-400 font-medium">
              Streamline your recruitment process with our powerful ATS
              solution. Find the best talent faster and more efficiently than
              ever.
            </p>

            <div className="flex gap-4">
              {[Linkedin, Twitter, Facebook].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-teal-500 hover:scale-110 transition-all duration-300 border border-white/10"
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black text-white mb-8 border-l-4 border-teal-500 pl-4">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {["Home", "About Us", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "")}`
                    }
                    className="text-gray-400 hover:text-teal-400 transition-colors font-bold text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-black text-white mb-8 border-l-4 border-teal-500 pl-4">
              Our Services
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Candidate Pipeline", id: "candidate-pipeline" },
                { name: "Client Tracking", id: "client-tracking" },
                { name: "Resume Upload", id: "resume-upload" },
                { name: "Interview Scheduling", id: "interview-scheduling" },
              ].map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-gray-400 hover:text-teal-400 transition-colors font-bold text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-black text-white mb-8 border-l-4 border-teal-500 pl-4">
              Contact Us
            </h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <MapPin className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-gray-400 font-medium leading-relaxed">
                  123 Business Avenue, Suite 100
                  <br />
                  San Francisco, CA 94102
                </span>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Phone className="w-5 h-5 text-teal-400" />
                </div>
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-teal-400 transition-colors font-bold"
                >
                  +1 (234) 567-890
                </a>
              </li>

              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <a
                  href="mailto:hello@recruitats.com"
                  className="text-gray-400 hover:text-teal-400 transition-colors font-bold"
                >
                  hello@recruitats.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 📱 MOBILE VIEW (md and below) */}
        <div className="lg:hidden space-y-16">
          {/* Mobile Brand */}
          <div className="text-center space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-[1.25rem] bg-teal-500 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white">
                Recruit<span className="text-teal-400">ATS</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
              The modern standard for recruitment technology. Trusted by over
              500+ global brands.
            </p>
            <div className="flex justify-center gap-4">
              {[Linkedin, Twitter, Facebook].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10"
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Link Mobile Grid */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-teal-400 font-black uppercase tracking-widest text-xs">
                Explore
              </h4>
              <ul className="space-y-4">
                {["Home", "About", "Services", "Contact"].map((l) => (
                  <li key={l}>
                    <Link href="/" className="text-white font-bold text-sm">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-teal-400 font-black uppercase tracking-widest text-xs">
                Legal
              </h4>
              <ul className="space-y-4">
                {["Privacy", "Terms", "Cookies", "Support"].map((l) => (
                  <li key={l}>
                    <Link href="/" className="text-white font-bold text-sm">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Contact Information */}
          <div className="space-y-4 pt-10 border-t border-white/5">
            <a
              href="mailto:hello@recruitats.com"
              className="flex items-center justify-center gap-3 py-4 bg-white/5 rounded-2xl border border-white/10 text-white font-bold"
            >
              <Mail className="w-5 h-5 text-teal-400" />
              hello@recruitats.com
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center justify-center gap-3 py-4 bg-white/5 rounded-2xl border border-white/10 text-white font-bold"
            >
              <Phone className="w-5 h-5 text-teal-400" />
              +1 (234) 567-890
            </a>
          </div>
        </div>

        {/* Bottom Bar (Shared) */}
        <div className="border-t border-white/10 mt-20 pt-10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
            © 2025 Recruit<span className="text-teal-500/50">ATS</span>. All
            rights reserved.
          </p>
          <div className="flex gap-8 text-xs font-bold text-gray-500 uppercase tracking-tighter">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
