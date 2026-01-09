"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Inc.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content:
      "RecruitATS has transformed our hiring process. We&apos;ve reduced our time-to-hire by 45% and the quality of candidates has improved significantly.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Talent Acquisition Lead",
    company: "Innovation Labs",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content:
      "The candidate pipeline feature is a game-changer. We can now track every applicant&apos;s journey and never lose sight of promising talent.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Recruitment Manager",
    company: "Global Solutions",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    content:
      "Easy to use, powerful features, and excellent support. The interview scheduling integration alone has saved us countless hours.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header (Shared) */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-black uppercase tracking-widest mb-4">
            Testimonials
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Loved by <span className="text-teal-500">Recruiters Worldwide</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
            See what our customers have to say about their experience with
            RecruitATS.
          </p>
        </div>

        {/* 💻 DESKTOP GRID (lg and up) */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="group bg-[#f8fafc] rounded-3xl p-10 border border-gray-100 hover:border-teal-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2 relative"
            >
              <div className="absolute -top-6 left-10 w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                <Quote className="w-6 h-6 text-white" />
              </div>

              <div className="flex gap-1 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-teal-500 fill-teal-500"
                  />
                ))}
              </div>

              <p className="text-gray-700 text-lg font-medium mb-10 leading-relaxed italic">
                “{testimonial.content}”
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-gray-200/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white"
                />
                <div>
                  <div className="font-black text-gray-900 text-lg">
                    {testimonial.name}
                  </div>
                  <div className="text-sm font-bold text-teal-600">
                    {testimonial.role} @ {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 📱 MOBILE VIEW (md and below) */}
        <div className="lg:hidden space-y-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-[2.5rem] p-8 border-2 border-teal-50 shadow-xl text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-3xl bg-teal-500 flex items-center justify-center mb-8 shadow-lg">
                <Quote className="w-8 h-8 text-white" />
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-teal-500 fill-teal-500"
                  />
                ))}
              </div>

              <p className="text-gray-900 font-bold mb-8 leading-relaxed">
                “{testimonial.content}”
              </p>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-[2rem] object-cover mb-4 border-4 border-teal-50"
              />
              <div className="font-extrabold text-gray-900 text-xl">
                {testimonial.name}
              </div>
              <div className="text-sm font-bold text-teal-600 mt-1 uppercase tracking-wider">
                {testimonial.role}
              </div>
              <div className="text-xs font-semibold text-gray-400 mt-1 underline decoration-teal-200">
                {testimonial.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
