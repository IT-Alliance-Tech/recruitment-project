"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  FileText,
  Users,
  LogIn,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    const token = localStorage.getItem("token");

    setIsAdmin(admin === "true");
    setIsUser(!!token);
  }, []);

  /* ---------- LOGOUT HANDLERS ---------- */
  const handleAdminLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    router.push("/login");
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    setIsUser(false);
    router.push("/user/signup");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
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
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            {/* Apply Now */}
            <Link
              href="/resume-upload"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition shadow-md"
            >
              <FileText className="w-4 h-4" />
              Apply Now
            </Link>

            {/* LOGIN / SIGNUP */}
            {!isUser && !isAdmin && (
              <Link
                href="/user/signup"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                <LogIn className="w-4 h-4" />
                Login / Signup
              </Link>
            )}

            {/* USER ACTIONS */}
            {isUser && (
              <>
                <Link
                  href="/user/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <button
                  onClick={handleUserLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}

            {/* ADMIN ACTIONS (NO ADMIN LOGIN BUTTON) */}
            {isAdmin && (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>

                <button
                  onClick={handleAdminLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
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

              <Link
                href="/resume-upload"
                className="mx-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition shadow-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="w-4 h-4" />
                Apply Now
              </Link>

              {!isUser && !isAdmin && (
                <Link
                  href="/user/signup"
                  className="mx-4 mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Login / Signup
                </Link>
              )}

              {isUser && (
                <button
                  onClick={() => {
                    handleUserLogout();
                    setIsMenuOpen(false);
                  }}
                  className="mx-4 mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
