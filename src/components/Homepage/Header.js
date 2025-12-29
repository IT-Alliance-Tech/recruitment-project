"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Users, Calendar, FileText, BarChart3 } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const dashboardLinks = [
    { name: "Pipeline", icon: Users },
    { name: "Clients", icon: BarChart3 },
    { name: "Resume Upload", icon: FileText },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO → HOME */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-md">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              Recruit<span className="text-teal-500">ATS</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-px h-6 bg-gray-300 mx-2" />

            {dashboardLinks.map((link) => (
              <button
                key={link.name}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition flex items-center gap-2"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </button>
            ))}
          </nav>

          {/* DESKTOP CTA → SCHEDULE PAGE */}
          <div className="hidden md:flex items-center">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition shadow-md"
            >
              <Calendar className="w-4 h-4" />
              Book Consultation
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* MOBILE NAV */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-gray-200 my-2" />

              {dashboardLinks.map((link) => (
                <button
                  key={link.name}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </button>
              ))}

              <div className="h-px bg-gray-200 my-2" />

              {/* MOBILE CTA → SCHEDULE PAGE */}
              <Link
                href="/schedule"
                className="mt-2 mx-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <Calendar className="w-4 h-4" />
                Book Consultation
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
