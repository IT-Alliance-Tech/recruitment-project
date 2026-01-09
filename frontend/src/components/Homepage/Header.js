"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();
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
  }, [pathname]);

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
        {/* 💻 DESKTOP VIEW (Visible on lg and up) */}
        <div className="hidden lg:flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-md">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              Recruit<span className="text-teal-500">ATS</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === link.href
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth/Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/resume-upload"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition shadow-md whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              Apply Now
            </Link>

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition whitespace-nowrap"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleAdminLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : isUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/user/dashboard"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition whitespace-nowrap"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleUserLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-300 text-red-600 font-medium hover:bg-red-50 transition whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/user/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition whitespace-nowrap"
                >
                  <LogIn className="w-4 h-4" />
                  User Login
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition whitespace-nowrap"
                >
                  <LogIn className="w-4 h-4" />
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 📱 MOBILE VIEW (Visible on up to md/lg) */}
        <div className="lg:hidden flex items-center justify-between h-16">
          {/* Compact Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-sm">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">
              Recruit<span className="text-teal-500">ATS</span>
            </span>
          </Link>

          {/* Menu Trigger */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* MOBILE DRAWER (Only visible when open) */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-gray-200 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)]">
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition ${
                    pathname === link.href
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-gray-100 my-2 mx-4" />

              {/* Primary Mobile Action */}
              <Link
                href="/resume-upload"
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-teal-500 text-white font-bold shadow-lg shadow-teal-500/20 active:scale-95 transition-all mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <FileText className="w-5 h-5" />
                Apply for Jobs
              </Link>

              {/* Mobile Auth Sections */}
              <div className="space-y-3 px-1 pb-4">
                {isAdmin ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleAdminLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-red-50 text-red-600 font-bold hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Log Out
                    </button>
                  </>
                ) : isUser ? (
                  <>
                    <Link
                      href="/user/dashboard"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      My Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleUserLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-red-50 text-red-600 font-bold hover:bg-red-50 transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/user/login"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5" />
                      User Login
                    </Link>
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border-2 border-gray-100 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="w-5 h-5" />
                      Admin Login
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
