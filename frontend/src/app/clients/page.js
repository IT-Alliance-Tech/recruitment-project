"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  Mail,
  Trash2,
  X,
  Filter,
} from "lucide-react";

/* ================= STATUS COLORS ================= */

const statusColors = {
  active: "bg-green-100 text-green-700 border-green-200",
  inactive: "bg-gray-100 text-gray-700 border-gray-200",
  prospect: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Add Client modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    industry: "",
    status: "active",
  });

  /* ================= FETCH CLIENTS (UPDATED FOR NEW RESPONSE) ================= */

  const fetchClients = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/clients");
      const json = await res.json();

      if (!json.success) {
        console.error("API Error:", json.error);
        setClients([]);
        setLoading(false);
        return;
      }

      const backendClients = json.data.clients;

      const formatted = backendClients.map((c) => ({
        id: c._id,
        companyName: c.companyName,
        contactPerson: c.contactPerson || "-",
        email: c.email || "-",
        industry: c.industry || "-",
        status: c.status,
        activePositions: 0,
        totalPlacements: 0,
        lastContact: c.createdAt,
      }));

      setClients(formatted);
      setLoading(false);
    } catch (error) {
      console.error("Fetch clients failed:", error);
      setClients([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  /* ================= ADD CLIENT ================= */

  const addClient = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!json.success) {
        alert("Failed to add client");
        return;
      }

      setShowModal(false);
      setForm({
        companyName: "",
        contactPerson: "",
        email: "",
        industry: "",
        status: "active",
      });

      fetchClients();
    } catch (error) {
      console.error("Add client error:", error);
    }
  };

  /* ================= DELETE CLIENT ================= */

  const deleteClient = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "DELETE",
      });
      fetchClients();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* ================= FILTER + STATS ================= */

  const filteredClients = clients.filter(
    (c) =>
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    {
      icon: Building2,
      label: "Total Clients",
      value: clients.length,
      color: "bg-teal-50 text-teal-600",
      iconBg: "bg-teal-100",
    },
    {
      icon: Users,
      label: "Active Clients",
      value: clients.filter((c) => c.status === "active").length,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100",
    },
    {
      icon: Briefcase,
      label: "Open Positions",
      value: clients.reduce((s, c) => s + c.activePositions, 0),
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      icon: TrendingUp,
      label: "Total Placements",
      value: clients.reduce((s, c) => s + c.totalPlacements, 0),
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        <section className="bg-[#0b1c33] pb-32 pt-12 px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-3xl -mr-400 -mt-400" />
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <span className="px-4 py-1.5 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-teal-500/20">
                  Executive Suite
                </span>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase">
                  Client <br />{" "}
                  <span className="text-teal-400 italic">Portfolio.</span>
                </h1>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    placeholder="Search entities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-14 pr-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:bg-white/10 focus:border-teal-500 transition-all w-80 font-bold"
                  />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-10 py-5 bg-teal-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-teal-500/20 hover:scale-105 transition-all flex items-center gap-3"
                >
                  <Plus size={20} /> Add Enterprise
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-3xl font-black text-white">
                        {s.value}
                      </p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                        {s.label}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:rotate-12 transition-transform">
                      <s.icon size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-12 -mt-16 pb-32">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                GLOBAL LEDGER{" "}
                <span className="text-teal-500 ml-2">
                  [{filteredClients.length}]
                </span>
              </h2>
              <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-teal-500 transition-colors">
                <Filter size={14} /> Refine Parameters
              </button>
            </div>

            {loading ? (
              <div className="p-32 text-center animate-pulse">
                <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="mt-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  Synchronizing Data Matrix...
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Enterprise
                    </th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Protocol Liaison
                    </th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Industry Segment
                    </th>
                    <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Unit Status
                    </th>
                    <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Override
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredClients.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-[#0b1c33] flex items-center justify-center text-teal-400 font-black text-xl shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform">
                            {c.companyName.charAt(0)}
                          </div>
                          <div className="space-y-0.5">
                            <div className="font-black text-gray-900 text-lg tracking-tight uppercase">
                              {c.companyName}
                            </div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                              <Mail size={10} /> {c.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="font-bold text-gray-800">
                          {c.contactPerson}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          {c.industry}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <span
                          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                            statusColors[c.status]
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button
                          onClick={() => deleteClient(c.id)}
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        <section className="bg-[#0b1c33] px-8 pt-16 pb-32 text-center rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em] mb-2">
            Asset Management
          </p>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-8">
            Global <br />{" "}
            <span className="text-teal-400 italic">Portfolio.</span>
          </h1>
          <div className="space-y-4">
            <div className="relative bg-white/10 rounded-2xl border border-white/20 p-1">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-400/50"
                size={18}
              />
              <input
                placeholder="Search entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-transparent text-white font-bold outline-none placeholder:text-white/20"
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="w-full py-5 bg-teal-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-teal-500/20 active:scale-95 transition-all"
            >
              Add New Enterprise
            </button>
          </div>
        </section>

        <section className="px-6 -mt-16 space-y-8 pb-32 relative z-20">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-slate-50 text-center space-y-1 active:scale-95 transition-all"
              >
                <p className="text-3xl font-black text-gray-900">{s.value}</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-black text-gray-900 px-4 tracking-tight uppercase">
              Secure Ledger
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="py-20 text-center bg-white rounded-[3rem] shadow-xl border border-slate-50">
                  <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              ) : filteredClients.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-[3rem] shadow-xl border border-slate-50 space-y-4">
                  <Building2 size={48} className="mx-auto text-slate-100" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    No matching assets
                  </p>
                </div>
              ) : (
                filteredClients.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-gray-200/50 border border-slate-50 space-y-8"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#0b1c33] flex items-center justify-center text-teal-400 font-black text-2xl uppercase shadow-lg shadow-blue-900/20">
                          {c.companyName.charAt(0)}
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="font-black text-gray-900 tracking-tight text-xl uppercase leading-none">
                            {c.companyName}
                          </h3>
                          <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">
                            {c.industry}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border-2 ${
                          statusColors[c.status]
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-2xl p-4 space-y-1">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                          Protocol Liaison
                        </p>
                        <p className="text-xs font-black text-gray-900 truncate">
                          {c.contactPerson}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 space-y-1">
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                          Digital Relay
                        </p>
                        <p className="text-xs font-black text-gray-900 truncate">
                          {c.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteClient(c.id)}
                      className="w-full py-4 bg-rose-50 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-rose-100 active:bg-rose-500 active:text-white transition-all"
                    >
                      Decommission Node
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* MODAL (Unified) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="bg-[#0b1c33] p-10 flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                  Initialize Enterprise
                </h2>
                <p className="text-[10px] font-black text-teal-400 uppercase tracking-[0.4em]">
                  Node Protocol Alpha
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-teal-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Company Name
                  </label>
                  <input
                    placeholder="Entity identifier"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({ ...form, companyName: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Contact Person
                  </label>
                  <input
                    placeholder="Primary Liaison"
                    value={form.contactPerson}
                    onChange={(e) =>
                      setForm({ ...form, contactPerson: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Relay Node (Email)
                  </label>
                  <input
                    type="email"
                    placeholder="email@enterprise.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                    Industry Segment
                  </label>
                  <input
                    placeholder="Sector"
                    value={form.industry}
                    onChange={(e) =>
                      setForm({ ...form, industry: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                  Priority Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-teal-500 focus:bg-white rounded-2xl font-bold text-gray-900 transition-all outline-none appearance-none"
                >
                  <option value="active">Active Sequence</option>
                  <option value="inactive">Suspended</option>
                  <option value="prospect">Future Asset</option>
                </select>
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
                >
                  Abort
                </button>
                <button
                  onClick={addClient}
                  className="flex-[2] py-5 bg-[#0b1c33] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-black transition-all"
                >
                  Engage Deployment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
