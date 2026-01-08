"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Profile", href: "/user/dashboard/profile" },
    { name: "Job Openings", href: "/user/dashboard/job-openings" },
    { name: "Applied Jobs", href: "/user/dashboard/applied-jobs" },
    { name: "Rejected Jobs", href: "/user/dashboard/rejected-jobs" },
  ];

  return (
    <div className="h-full flex flex-col p-10 space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
          Command <br /> <span className="text-teal-400 italic">Central.</span>
        </h2>
        <p className="text-[10px] font-black text-teal-500/50 uppercase tracking-[0.4em]">
          Node Protocol Alpha
        </p>
      </div>

      <nav className="flex-1 space-y-4">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-8 py-5 rounded-[2rem] font-black font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                isActive
                  ? "bg-teal-500 text-white shadow-2xl shadow-teal-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-white animate-pulse" : "bg-transparent"
                }`}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-10 border-t border-white/5">
        <div className="bg-white/5 rounded-[2rem] p-6 space-y-4">
          <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest text-center leading-relaxed">
            Authorized Session Only. <br /> Encryption Active.
          </p>
        </div>
      </div>
    </div>
  );
}
