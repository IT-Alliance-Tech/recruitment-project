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
      "RecruitATS has transformed our hiring process. We've reduced our time-to-hire by 45% and the quality of candidates has improved significantly.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Talent Acquisition Lead",
    company: "Innovation Labs",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content:
      "The candidate pipeline feature is a game-changer. We can now track every applicant's journey and never lose sight of promising talent.",
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
    <section className="py-14 md:py-18 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-3">
            Testimonials
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Loved by{" "}
            <span className="text-teal-500">Recruiters Worldwide</span>
          </h2>

          <p className="text-lg text-gray-500">
            See what our customers have to say about their experience with RecruitATS.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-xl relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center shadow-md">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-teal-500 fill-teal-500"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                “{testimonial.content}”
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
