"use client";

import Link from "next/link";
import Sidebar from "@/components/user/Sidebar";

export default function UserDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* 💻 DESKTOP SIDEBAR (lg and up) */}
      <aside className="hidden lg:block w-80 bg-[#0b1c33] border-r border-white/10 shrink-0">
        <Sidebar className="h-full" />
      </aside>

      {/* 📱 MOBILE NAVIGATION (md and below) */}
      <div className="lg:hidden bg-[#0b1c33] sticky top-0 z-[40]">
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10">
          <h2 className="text-xl font-black text-white tracking-tighter uppercase leading-none">
            Command <br />{" "}
            <span className="text-teal-400 italic">Central.</span>
          </h2>
          <div className="flex gap-2">
            <Link
              href="/user/dashboard"
              className="px-4 py-2 bg-teal-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest"
            >
              Main
            </Link>
          </div>
        </div>
        <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { name: "Profile", href: "/user/dashboard/profile" },
            { name: "Jobs", href: "/user/dashboard/job-openings" },
            { name: "Applied", href: "/user/dashboard/applied-jobs" },
            { name: "Rejected", href: "/user/dashboard/rejected-jobs" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-2 whitespace-nowrap bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest hover:bg-teal-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
