"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Briefcase,
  Users,
  TrendingUp,
} from "lucide-react";

/* ================= STAGES ================= */

const stages = [
  { id: "applied", label: "Applied", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { id: "screening", label: "Screening", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { id: "interview", label: "Interview", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { id: "offer", label: "Offer", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { id: "hired", label: "Hired", color: "bg-green-100 text-green-700 border-green-200" },
];

export default function Pipeline() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    position: "",
    status: "applied",
    appliedDate: "",
  });

  /* ================= FETCH ================= */

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/candidates");
      const json = await res.json();

      if (!json.success) {
        setCandidates([]);
        setLoading(false);
        return;
      }

      setCandidates(
        json.data.candidates.map((c) => ({
          id: c._id,
          name: c.fullName,
          email: c.email,
          position: c.position || "Not specified",
          status: c.status,
          appliedDate: c.appliedDate || c.createdAt,
        }))
      );

      setLoading(false);
    } catch (error) {
      setCandidates([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  /* ================= SEARCH ================= */

  const filtered = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.position.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= ADD / EDIT ================= */

  const openAdd = () => {
    setEditingCandidate(null);
    setForm({
      fullName: "",
      email: "",
      position: "",
      status: "applied",
      appliedDate: "",
    });
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditingCandidate(c);
    setForm({
      fullName: c.name,
      email: c.email,
      position: c.position === "Not specified" ? "" : c.position,
      status: c.status,
      appliedDate: c.appliedDate?.slice(0, 10),
    });
    setShowModal(true);
  };

  const saveCandidate = async () => {
    if (!form.fullName || !form.email || !form.position || !form.appliedDate) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch(
        editingCandidate
          ? `http://localhost:5000/api/candidates/${editingCandidate.id}`
          : "http://localhost:5000/api/candidates",
        {
          method: editingCandidate ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            status: form.status.toLowerCase(),
          }),
        }
      );

      const json = await res.json();
      if (!json.success) {
        alert("Failed to save candidate");
        return;
      }

      setShowModal(false);
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= DELETE ================= */

  const deleteCandidate = async (id) => {
    if (!confirm("Are you sure you want to delete this candidate?")) return;

    const res = await fetch(
      `http://localhost:5000/api/candidates/${id}`,
      { method: "DELETE" }
    );

    const json = await res.json();
    if (json.success) fetchCandidates();
  };

  const getStageInfo = (status) =>
    stages.find((s) => s.id === status) || stages[0];

  /* ================= STATS ================= */

  const stats = [
    { label: "Total Candidates", value: candidates.length, icon: Users, color: "bg-blue-500" },
    { label: "Active Interviews", value: candidates.filter(c => c.status === "interview").length, icon: TrendingUp, color: "bg-purple-500" },
    { label: "Hired", value: candidates.filter(c => c.status === "hired").length, icon: Briefcase, color: "bg-green-500" },
  ];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HEADER */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Candidate Pipeline
              </h1>
              <p className="text-gray-600 text-lg">
                Track and manage candidates through your hiring process
              </p>
            </div>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Plus size={20} /> Add Candidate
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-xl`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, position, or email..."
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Users className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 text-lg">No candidates found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filtered.map((c) => {
                    const stage = getStageInfo(c.status);
                    return (
                      <tr key={c.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Briefcase size={16} className="text-gray-500" />
                            <span className="font-medium">{c.position}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={16} className="text-gray-500" />
                            <span className="text-sm">{c.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold border ${stage.color}`}>
                            {stage.label}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar size={16} className="text-gray-500" />
                            <span className="text-sm">
                              {new Date(c.appliedDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => openEdit(c)} 
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                              title="Edit candidate"
                            >
                              <Pencil size={18} className="text-gray-600 group-hover:text-blue-600" />
                            </button>
                            <button 
                              onClick={() => deleteCandidate(c.id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                              title="Delete candidate"
                            >
                              <Trash2 size={18} className="text-gray-600 group-hover:text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {editingCandidate ? "Edit Candidate" : "Add New Candidate"}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  placeholder="John Doe"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  placeholder="Software Engineer"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Applied Date *
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.appliedDate}
                  onChange={(e) =>
                    setForm({ ...form, appliedDate: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                >
                  {stages.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={saveCandidate}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              {editingCandidate ? "Update Candidate" : "Add Candidate"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}