"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function ScheduleInterview() {
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
        `http://localhost:5000/api/candidates/${candidateId}/interview`,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Schedule Interview
          </h1>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          {/* ROUND */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interview Round
            </label>
            <select
              value={form.roundName}
              onChange={(e) =>
                setForm({ ...form, roundName: e.target.value })
              }
              className="w-full border-2 border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="HR">HR Round</option>
              <option value="Technical">Technical Round</option>
              <option value="Managerial">Managerial Round</option>
            </select>
          </div>

          {/* DATE & TIME */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interview Date & Time
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="datetime-local"
                value={form.scheduledAt}
                onChange={(e) =>
                  setForm({ ...form, scheduledAt: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* INTERVIEWER */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Interviewer Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="e.g. John HR"
                value={form.interviewer}
                onChange={(e) =>
                  setForm({ ...form, interviewer: e.target.value })
                }
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={scheduleInterview}
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? "Scheduling..." : "Schedule Interview"}
        </button>
      </div>
    </div>
  );
}
