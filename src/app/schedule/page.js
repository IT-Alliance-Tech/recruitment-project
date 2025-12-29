"use client";

import Header from "../../components/Homepage/Header";
import Footer from "../../components/Homepage/Footer";
import { Calendar, Clock, Video, Users, CheckCircle } from "lucide-react";

const benefits = [
  "Personalized demo of our platform",
  "Answer all your questions",
  "Discuss your specific hiring needs",
  "No commitment required",
];

export default function Schedule() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#0b1c33] via-[#0f2f4f] to-[#0f4c5c] overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[140px]" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-teal-300 text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Book a Call
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Schedule Your{" "}
            <span className="text-teal-400">Free Consultation</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70">
            Let’s discuss how RecruitATS can transform your hiring process.
            Book a free 30-minute consultation with our team.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — INFO */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What to Expect
                </h2>
                <p className="text-gray-500">
                  During our call, we’ll walk you through our platform and
                  explain how it can simplify and speed up your recruitment workflow.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Call Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-teal-500" />
                    <span>30 minutes</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Video className="w-5 h-5 text-teal-500" />
                    <span>Google Meet / Zoom</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-teal-500" />
                    <span>With our product specialists</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — CALENDLY */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              <iframe
                src="https://calendly.com/gireeshma-italliancetech/30min"
                className="w-full h-[800px]"
                frameBorder="0"
                title="Schedule a consultation"
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
