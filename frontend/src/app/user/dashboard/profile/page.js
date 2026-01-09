"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, FileCheck } from "lucide-react";
import { apiFetch } from "@/utils/api";

export default function ProfilePage() {
  const [counts, setCounts] = useState({
    applied: 0,
    rejected: 0,
    selected: 0,
  });

  useEffect(() => {
    // ✅ FIX: Use /candidates/me to fetch all applications from Candidate model
    // ✅ CRITICAL: Disable cache to ensure fresh counts are always displayed
    apiFetch("/candidates/me", { cache: "no-store" })
      .then((res) => {
        const apps = res.candidates || [];

        setCounts({
          // Count ALL applications as 'Applied' (including those in progress)
          applied: apps.length,
          // Count specifically REJECTED status
          rejected: apps.filter((a) => a.status === "REJECTED").length,
          // Count specifically SELECTED status
          selected: apps.filter((a) => a.status === "SELECTED").length,
        });
      })
      .catch(console.error);
  }, []);

  const statCards = [
    {
      label: "Applied",
      value: counts.applied,
      icon: FileCheck,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      label: "Selected",
      value: counts.selected,
      icon: CheckCircle2,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      label: "Rejected",
      value: counts.rejected,
      icon: XCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      badgeColor: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="space-y-12">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block space-y-10">
        <div className="flex items-end justify-between border-b-2 border-slate-50 pb-8">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">
              Profile Stats
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
              Aggregated Performance Metrics
            </p>
          </div>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">
              Live Sync Active
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="group bg-white rounded-[2.5rem] p-8 border-2 border-slate-50 shadow-xl shadow-gray-200/40 hover:border-teal-100 transition-all"
              >
                <div className="flex justify-between items-start mb-8">
                  <div
                    className={`${card.iconColor} w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-teal-50 transition-colors`}
                  >
                    <Icon size={28} />
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest pt-2">
                    Metric .01
                  </span>
                </div>
                <p className="text-5xl font-black text-gray-900 tracking-tighter mb-1">
                  {card.value}
                </p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {card.label} Volume
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Overview
          </h1>
          <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
            Application Summary
          </p>
        </div>

        <div className="space-y-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-[2rem] p-6 border-2 border-slate-50 shadow-xl shadow-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`${card.iconColor} w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {card.label}
                    </p>
                    <p className="text-2xl font-black text-gray-900">
                      {card.value}
                    </p>
                  </div>
                </div>
                <div className="h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${card.iconColor.replace(
                      "text",
                      "bg"
                    )} w-2/3`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#0b1c33] p-8 rounded-[2.5rem] text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
          <p className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-2">
            Pro Tip
          </p>
          <p className="text-sm font-medium leading-relaxed italic">
            "Regularly updating your profile details increases your visibility
            to top recruiters by 65%"
          </p>
        </div>
      </div>
    </div>
  );
}