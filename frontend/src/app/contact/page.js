"use client";

import { useState } from "react";
import Header from "../../components/Homepage/Header";
import Footer from "../../components/Homepage/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent successfully");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 💻 DESKTOP VIEW (lg and up) */}
      <div className="hidden lg:block">
        {/* Hero */}
        <section className="relative h-[60vh] flex items-center justify-center bg-[#0b1c33] overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full -mr-400 -mt-400 blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto px-12 text-center space-y-8">
            <span className="px-5 py-2 bg-teal-500/10 text-teal-400 text-xs font-black uppercase tracking-[0.4em] rounded-full border border-teal-500/20">
              Operational Relay
            </span>
            <h1 className="text-7xl font-black text-white leading-none tracking-tighter uppercase">
              Initiate <br />{" "}
              <span className="text-teal-400 italic">Conversation.</span>
            </h1>
            <p className="text-gray-400 font-medium text-xl max-w-2xl mx-auto leading-relaxed">
              Direct synchronization with our team of talent architecture
              specialists.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-12 grid grid-cols-12 gap-24 items-start">
            {/* Info Column */}
            <div className="col-span-5 space-y-12">
              <div className="space-y-4">
                <span className="text-teal-500 font-black text-[10px] uppercase tracking-[0.3em]">
                  Direct Links
                </span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                  Global Presence
                </h2>
                <p className="text-gray-400 font-medium text-sm leading-relaxed">
                  Available for strategic consulting and technical
                  synchronization during global peak hours.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Neural Link (Email)",
                    val: "hello@recruitats.com",
                  },
                  {
                    icon: Phone,
                    label: "Voice Frequency (Phone)",
                    val: "+1 (234) 567-890",
                  },
                  {
                    icon: MapPin,
                    label: "HQ Coordinates (Address)",
                    val: "123 Business Avenue, San Francisco, CA",
                  },
                  {
                    icon: Clock,
                    label: "Operational Uptime (Hours)",
                    val: "Mon – Fri: 9:00 AM – 6:00 PM",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 group cursor-default"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-lg shadow-gray-100 group-hover:shadow-teal-500/20">
                      <item.icon size={24} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-gray-900 font-black text-lg tracking-tight">
                        {item.val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Column */}
            <div className="col-span-7 bg-white rounded-[3rem] p-12 border-2 border-slate-50 shadow-2xl shadow-gray-200/50">
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                    ENCRYPTED BRIDGE
                  </h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Submit your inquiries via the matrix
                  </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                        Identifier
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                        Relay Node
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                      Frequency (Phone)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">
                      Inquiry Brief
                    </label>
                    <textarea
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message..."
                      className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-teal-500 focus:bg-white outline-none transition-all font-bold text-gray-900 resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-6 bg-[#0b1c33] text-white rounded-[2rem] font-black text-lg shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-4 uppercase tracking-[0.2em]"
                  >
                    Transmit Data <Send size={24} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 📱 MOBILE VIEW (md and below) */}
      <div className="lg:hidden">
        {/* Mobile Hero */}
        <section className="bg-[#0b1c33] px-8 pt-24 pb-32 text-center space-y-6 rounded-b-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <span className="inline-block px-4 py-1.5 bg-teal-500/10 text-teal-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-teal-500/20">
            Operational
          </span>
          <h1 className="text-4xl font-black text-white tracking-tighter leading-none uppercase">
            Get in <br /> <span className="text-teal-400 italic">Touch.</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm mx-auto max-w-xs uppercase tracking-widest">
            Neural Link Initiated
          </p>
        </section>

        {/* Mobile Info Cards */}
        <section className="px-6 -mt-16 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Mail, val: "Email" },
              { icon: Phone, val: "Phone" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-slate-50 text-center space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white mx-auto shadow-lg shadow-teal-500/20">
                  <item.icon size={20} />
                </div>
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
                  {item.val}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Form */}
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl shadow-gray-200/50 border border-slate-50 space-y-8 pb-32">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                Message Us
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Bridge to support
              </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold text-gray-900 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold text-gray-900 outline-none"
                required
              />
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Inquiry..."
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl font-bold text-gray-900 outline-none resize-none"
                required
              />
              <button
                type="submit"
                className="w-full py-5 bg-[#0b1c33] text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
              >
                Send <Send size={16} />
              </button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
