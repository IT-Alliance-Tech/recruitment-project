"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { Calendar, User, ArrowLeft } from "lucide-react";

function ScheduleInterviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const candidateId = searchParams.get("candidateId");

  const [form, setForm] = useState({
    roundName: "HR",
    scheduledAt: "",
    interviewer: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= SUBMIT ================= */

  const scheduleInterview = async () => {
    if (!candidateId || !form.scheduledAt || !form.interviewer) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `https://recruitment-project-8tbs.onrender.com/api/candidates/${candidateId}/interview`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const json = await res.json();

      if (!json.success) {
        alert("Failed to schedule interview");
        setLoading(false);
        return;
      }

      alert("Interview scheduled successfully");
      router.push("/pipeline");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-[#0b1c33] -z-10" />

      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
        <div className="p-12 space-y-10">
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.back()}
              className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-gray-400 hover:text-teal-500 hover:bg-teal-50 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                Protocol <span className="text-teal-500">Scheduled.</span>
              </h1>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                Node Assignment: {candidateId?.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                Interview Phase
              </label>
              <select
                value={form.roundName}
                onChange={(e) =>
                  setForm({ ...form, roundName: e.target.value })
                }
                className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[2rem] font-bold text-gray-900 outline-none appearance-none transition-all"
              >
                <option value="HR">Alpha Round (HR)</option>
                <option value="Technical">Beta Round (Technical)</option>
                <option value="Managerial">Gamma Round (Managerial)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                  Temporal Node (Date & Time)
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                    size={20}
                  />
                  <input
                    type="datetime-local"
                    value={form.scheduledAt}
                    onChange={(e) =>
                      setForm({ ...form, scheduledAt: e.target.value })
                    }
                    className="w-full pl-14 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[2rem] font-bold text-gray-900 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                  Assigned Evaluator
                </label>
                <div className="relative">
                  <User
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-500"
                    size={20}
                  />
                  <input
                    placeholder="Identifier"
                    value={form.interviewer}
                    onChange={(e) =>
                      setForm({ ...form, interviewer: e.target.value })
                    }
                    className="w-full pl-14 pr-8 py-5 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-[2rem] font-bold text-gray-900 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={scheduleInterview}
              disabled={loading}
              className="w-full py-6 bg-[#0b1c33] text-white rounded-[2.5rem] font-black text-lg uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "TRANSMITTING..." : "ENGAGE DEPLOYMENT"}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden w-full space-y-12">
        <div className="text-center space-y-4 mb-4">
          <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em]">
            Interview Protocol Alpha
          </p>
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-[0.8]">
            Connect <br />{" "}
            <span className="text-teal-400 italic">Sequence.</span>
          </h1>
        </div>

        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-950/40 border border-slate-100 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">
                Round Phase
              </label>
              <select
                value={form.roundName}
                onChange={(e) =>
                  setForm({ ...form, roundName: e.target.value })
                }
                className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 focus:border-teal-500 focus:bg-white rounded-[2rem] font-black text-xs text-gray-900 outline-none appearance-none transition-all"
              >
                <option value="HR">Alpha Round (HR)</option>
                <option value="Technical">Beta Round (Technical)</option>
                <option value="Managerial">Gamma Round (Managerial)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">
                Temporal Node
              </label>
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) =>
                  setForm({ ...form, scheduledAt: e.target.value })
                }
                className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 focus:border-teal-500 focus:bg-white rounded-[2rem] font-black text-xs text-gray-900 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">
                Assigned Proctor
              </label>
              <input
                placeholder="Identifier"
                value={form.interviewer}
                onChange={(e) =>
                  setForm({ ...form, interviewer: e.target.value })
                }
                className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 focus:border-teal-500 focus:bg-white rounded-[2rem] font-black text-xs text-gray-900 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <button
              onClick={scheduleInterview}
              disabled={loading}
              className="w-full py-6 bg-[#0b1c33] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95 transition-all"
            >
              {loading ? "Transmitting..." : "Engage Deployment"}
            </button>
            <button
              onClick={() => router.back()}
              className="w-full py-6 bg-slate-50 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest active:bg-slate-100 transition-all"
            >
              Abort Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrap in Suspense boundary for useSearchParams
export default function ScheduleInterview() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ScheduleInterviewContent />
    </Suspense>
  );
}
