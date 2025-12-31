"use client";

import Link from "next/link";
import { Users, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1c33] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Recruit<span className="text-teal-400">ATS</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Streamline your recruitment process with our powerful ATS solution.
              Find the best talent faster and more efficiently.
            </p>

            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-teal-500 transition"
                >
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-teal-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-teal-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-400 hover:text-teal-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-teal-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-400">Candidate Pipeline</li>
              <li className="text-sm text-gray-400">Client Tracking</li>
              <li className="text-sm text-gray-400">Resume Upload</li>
              <li>
                <Link
                  href="/schedule"
                  className="text-sm text-gray-400 hover:text-teal-400 transition"
                >
                  Interview Scheduling
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                <span className="text-gray-400">
                  123 Business Avenue, Suite 100<br />
                  San Francisco, CA 94102
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 hover:text-teal-400 transition"
                >
                  +1 (234) 567-890
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400" />
                <a
                  href="mailto:hello@recruitats.com"
                  className="text-gray-400 hover:text-teal-400 transition"
                >
                  hello@recruitats.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 RecruitATS. All rights reserved.
          </p>

         
        </div>

      </div>
    </footer>
  );
}
