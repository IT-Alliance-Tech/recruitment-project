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
      iconBg: "bg-teal-100"
    },
    {
      icon: Users,
      label: "Active Clients",
      value: clients.filter((c) => c.status === "active").length,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100"
    },
    {
      icon: Briefcase,
      label: "Open Positions",
      value: clients.reduce((s, c) => s + c.activePositions, 0),
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100"
    },
    {
      icon: TrendingUp,
      label: "Total Placements",
      value: clients.reduce((s, c) => s + c.totalPlacements, 0),
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HEADER */}
      <section className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-teal-600 mb-2">
                Client Management
              </h1>
              <p className="text-gray-600 text-lg">
                Track and manage your recruitment clients effectively
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus size={20} /> Add Client
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`${s.color} p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl font-bold mb-1">{s.value}</div>
                    <div className="text-sm font-medium opacity-80">{s.label}</div>
                  </div>
                  <div className={`${s.iconBg} p-3 rounded-xl`}>
                    <s.icon size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Clients ({filteredClients.length})
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter size={16} /> Filter
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-500">Loading clients...</p>
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="mx-auto mb-4 text-gray-300" size={48} />
                <p className="text-gray-500 text-lg">No clients found</p>
                <p className="text-gray-400 text-sm mt-2">
                  {searchTerm ? "Try adjusting your search" : "Add your first client to get started"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact Person
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Industry
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredClients.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center text-white font-semibold">
                              {c.companyName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {c.companyName}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <Mail size={12} /> {c.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 font-medium">
                            {c.contactPerson}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
                            {c.industry}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold border rounded-full ${statusColors[c.status]}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>
                            {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteClient(c.id)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ADD CLIENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Add New Client</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  placeholder="Enter contact person name"
                  value={form.contactPerson}
                  onChange={(e) =>
                    setForm({ ...form, contactPerson: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry *
                </label>
                <input
                  placeholder="e.g., Technology, Healthcare"
                  value={form.industry}
                  onChange={(e) =>
                    setForm({ ...form, industry: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="prospect">Prospect</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addClient}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}