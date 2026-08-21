"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ExternalLink, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { useAutoSwipeSlider } from "@/components/AutoSwipeCarousel";

/* ── Facebook & Google brand icons (inline SVG) ── */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/* ── Testimonial data ── */
const testimonials = [
  {
    name: "Frame Glimmer",
    initials: "FG",
    platform: "Facebook" as const,
    rating: 5,
    review:
      "I highly recommend Triple R Holidays for anyone traveling in Sri Lanka. Their service is reliable, professional and very friendly. They offer safe transportation, well-planned tours, and great customer support throughout.",
    color: "#D98928"
  },
  {
    name: "Vibuddha Vidarshana",
    initials: "VV",
    platform: "Facebook" as const,
    rating: 5,
    review:
      "Loved the experience with Triple R Holidays! From transport to hotels, everything was smooth and well organized. Perfect for anyone looking to explore Sri Lanka stress-free.",
    color: "#2F5D50"
  },
  {
    name: "Maheesha Perera",
    initials: "MP",
    platform: "Google" as const,
    rating: 5,
    review:
      "I came across Triple R Holidays recently and honestly, I'm so glad I did! Their website is super easy to use and I can tell they've put real effort into making the booking experience smooth.",
    color: "#1E7C8A"
  }
];

const stats = [
  { value: "5/5", label: "Five-Star Rating" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "50+", label: "Happy Travelers" }
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, damping: 14 }
  }
};

/* ── Truncation helpers ── */
const TRUNCATE_LENGTH = 130;

export default function TestimonialsClient() {
  const testimonialsSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3800 });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  function toggleExpand(index: number) {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <main className="scandi-page light-mode-travel min-h-screen text-[#111820] font-manrope">
      <SiteHeader variant="transparent" ctaLabel="Enquire Now" />

      {/* ── Hero Section ── */}
      <section
        className="photo-text-hero hero-mobile relative w-full overflow-hidden text-white"
        data-hero-pin
        data-hero-pin-distance="108"
      >
        <img
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2200&q=84"
          alt="Traveler at a scenic mountain viewpoint"
          className="absolute inset-0 h-full w-full object-cover"
          data-parallax="12"
          data-hero-media
        />
        <div className="absolute inset-0 bg-[#082B49]/38" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/22 via-[#082B49]/28 to-[#082B49]/48" />
        <div className="grain-overlay" />

        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl items-end justify-center px-6 pb-14 sm:px-8 sm:pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-center"
            data-hero-content
          >
            <h1 className="font-space text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)]">
              What our clients say
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/90 sm:text-base sm:leading-8">
              Genuine feedback from travelers who trusted Triple R Holidays with their journeys.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Section (below hero on all screens) ── */}
      <section className="relative overflow-hidden border-b border-[#111820]/8 bg-[#F5F1E8]/50 px-4 py-6 sm:px-6">
        <div className="mx-auto grid grid-cols-3 gap-2 sm:hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center px-1 text-center">
              <p className="font-space text-xl font-bold text-[#D98928]">{stat.value}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-[#111820]/60 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto hidden w-full max-w-3xl flex-nowrap items-center justify-center gap-4 overflow-x-auto rounded-full border border-[#111820]/18 bg-white/45 px-4 py-4 backdrop-blur-sm sm:flex sm:gap-10 sm:px-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex shrink-0 items-center gap-4 sm:gap-10">
              <div className="text-center">
                <p className="font-space text-2xl font-bold text-[#D98928] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-[#111820]/68">
                  {stat.label}
                </p>
              </div>
              {i < stats.length - 1 && <div className="h-10 w-px bg-[#111820]/18" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonial Cards Grid ── */}
      <section className="relative px-4 py-12 sm:px-6 lg:py-24">
        {/* Background accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#D98928]/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="hide-scrollbar snap-carousel flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 sm:grid sm:gap-8 sm:overflow-visible sm:pb-0 md:grid-cols-2 lg:grid-cols-3"
            ref={testimonialsSlider.containerRef}
            {...testimonialsSlider.touchHandlers}
          >
            {testimonials.map((testimonial, index) => {
              const isExpanded = expandedCards.has(index);
              const needsTruncation =
                testimonial.review.length > TRUNCATE_LENGTH;
              const displayText =
                needsTruncation && !isExpanded
                  ? testimonial.review.slice(0, TRUNCATE_LENGTH) + "..."
                  : testimonial.review;

              return (
                <motion.article
                  key={testimonial.name}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 200,
                    damping: 20
                  }}
                  className="scandi-soft-card group relative flex min-w-[88vw] snap-start flex-col overflow-hidden p-5 sm:min-w-0 sm:p-7"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-[#D98928]/[0.06] transition-all duration-500 group-hover:scale-150 group-hover:bg-[#D98928]/[0.1]" />

                  {/* Quote icon */}
                  <div className="mb-5">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#D98928]/10">
                      <Quote className="h-4.5 w-4.5 text-[#D98928]" />
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="mb-4 flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#D98928] text-[#D98928]"
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#111820]/40">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="flex-1 text-sm leading-7 text-[#111820]/72">
                    &ldquo;{displayText}&rdquo;
                  </p>
                  {needsTruncation && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-bold text-[#D98928] transition-colors hover:text-[#111820]"
                    >
                      {isExpanded ? "Show less" : "Read more →"}
                    </button>
                  )}

                  {/* Divider */}
                  <div className="my-5 h-px w-full bg-[#111820]/8" />

                  {/* Author info */}
                  <div className="flex items-center gap-3.5">
                    {/* Avatar */}
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-md"
                      style={{ backgroundColor: testimonial.color }}
                    >
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#111820]">
                        {testimonial.name}
                      </p>
                      <p className="text-[11px] font-semibold text-[#D98928]">
                        Experience with Triple R Holidays
                      </p>
                    </div>
                    {/* Platform badge */}
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                        testimonial.platform === "Facebook"
                          ? "border-[#2F5D50]/20 bg-[#2F5D50]/8 text-[#2F5D50]"
                          : "border-[#1E7C8A]/20 bg-[#1E7C8A]/8 text-[#1E7C8A]"
                      }`}
                    >
                      {testimonial.platform === "Facebook" ? (
                        <FacebookIcon className="h-3 w-3" />
                      ) : (
                        <GoogleIcon className="h-3 w-3" />
                      )}
                      {testimonial.platform}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative px-4 pb-20 sm:px-6 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
          className="mx-auto max-w-4xl rounded-[24px] border border-[#111820]/12 bg-gradient-to-br from-[#111820] via-[#082B49] to-[#111820] px-6 py-14 text-center shadow-[0_30px_80px_rgba(17,24,32,0.25)] sm:px-12 sm:py-20"
        >
          {/* Decorative glow */}
          <div className="absolute inset-0 overflow-hidden rounded-[24px] pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 bg-[#D98928]/15 blur-3xl rounded-full" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D98928]">
              <Sparkles className="h-3.5 w-3.5" />
              Ready to travel?
            </span>
            <h2 className="font-space mt-6 text-3xl font-bold uppercase text-white sm:text-4xl lg:text-5xl">
              Start Your <span className="text-[#D98928]">Journey</span> Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
              Join our growing family of happy travelers. Let us plan your
              perfect Sri Lanka experience with the care and attention
              you deserve.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <a
                href="/holiday-tours#tour-quote"
                className="premium-cta inline-flex min-h-[52px] w-full items-center justify-center gap-2 px-7 text-sm font-bold uppercase tracking-wide transition sm:w-auto"
                data-cursor-magnetic
              >
                Plan your trip
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="/about"
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/20 bg-white/8 px-7 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#111820] sm:w-auto"
                data-cursor-magnetic
              >
                Learn About Us
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
