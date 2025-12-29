"use client";

import Header from "../../components/Homepage/Header";
import Footer from "../../components/Homepage/Footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c]">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium mb-6">
            Contact Us
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Let’s Start a <span className="text-teal-400">Conversation</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70">
            Have questions? We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">

          {/* CONTACT INFO */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-500">
                Reach out to us anytime. We’re here to help you understand how
                RecruitATS can simplify your hiring process.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-500">hello@recruitats.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-500">+1 (234) 567-890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-500">
                    123 Business Avenue<br />San Francisco, CA 94102
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Business Hours</h4>
                  <p className="text-gray-500">
                    Mon – Fri: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM (UI ONLY) */}
          <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
