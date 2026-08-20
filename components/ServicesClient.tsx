"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Car,
  Compass,
  Heart,
  Hotel,
  PlaneTakeoff,
  PlayCircle
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";

const contact = {
  whatsapp: "+94 (77) 666 1272",
  whatsappHref: "https://wa.me/94776661272"
};

const services = [
  {
    title: "Sri Lanka Tours",
    description:
      "Private and group journeys across Sri Lanka, planned around culture, wildlife, highlands, beaches and comfortable travel pace.",
    icon: Compass,
    image: "/images/services/core/pexels-marina-zvada-844583049-35606860.jpg",
    points: ["Islandwide route planning", "Comfortable pacing", "On-tour support"]
  },
  {
    title: "Outbound Tours",
    description:
      "Outbound holiday planning for Malaysia, Singapore, Thailand and the Maldives with clear routes, hotels and transfers.",
    icon: PlaneTakeoff,
    image: "/images/services/core/pexels-realcereal-15480459.jpg",
    points: ["Destination combinations", "Flight + transfer flow", "Family and group support"]
  },
  {
    title: "Hotel Bookings",
    description:
      "Stay recommendations matched to route, comfort level, budget and travel style so each night supports the journey.",
    icon: Hotel,
    image: "/images/services/core/pexels-stiven-gonzales-1176841953-27596377.jpg",
    points: ["City and resort options", "Flexible room categories", "Route-aware suggestions"]
  },
  {
    title: "Conference & Events",
    description:
      "Guest movement, accommodation and transport planning for meetings, conferences and business gatherings.",
    icon: BriefcaseBusiness,
    image: "/images/services/core/conference-events.jpeg",
    points: ["Venue travel coordination", "Group transport flow", "Clear timeline planning"]
  },
  {
    title: "Destination Weddings",
    description:
      "Travel coordination for wedding celebrations, including guest stays, airport transfers and celebration-day logistics.",
    icon: Heart,
    image: "/images/services/core/pexels-moralestorres98-37975395.jpg",
    points: ["Guest travel setup", "Hotel room blocks", "Celebration logistics"]
  },
  {
    title: "Transportation",
    description:
      "Cars, vans and coaches for airport pickups, islandwide tours, corporate travel and event transport.",
    icon: Car,
    image: "/images/services/services-hero-fleet.jpg",
    points: ["Airport pickup", "Private vehicles", "Islandwide transfers"]
  }
];

const process = [
  "Share dates, traveller count and service needs.",
  "Receive a practical plan with route and support structure.",
  "Confirm and travel with a single coordination point."
];

const heroHookSentence = "Professional travel and transport solutions.";
const servicesHeroImage =
  "/images/services/services-hero-fleet.jpg";

export default function ServicesClient() {

  return (
    <main className="scandi-page light-mode-travel min-h-screen text-[#111820] font-manrope">
      <SiteHeader variant="transparent" ctaLabel="Enquire Now" />

      <section
        className="photo-text-hero hero-mobile relative w-full overflow-hidden text-white"
        data-hero-pin
        data-hero-pin-distance="115"
      >
        <img
          src={servicesHeroImage}
          alt="Triple R Holidays transport fleet"
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          fetchPriority="high"
          data-parallax="12"
          data-hero-media
        />
        <div className="absolute inset-0 bg-[#082B49]/38" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/22 via-[#082B49]/26 to-[#082B49]/48" />
        <div className="grain-overlay" />

        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl items-end justify-center px-6 pb-14 sm:px-8 sm:pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-center"
            data-hero-content
          >
            <h1 className="font-space text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)]">
              OUR SERVICES
            </h1>
            <p className="mt-4 text-sm font-semibold tracking-[0.08em] text-white/90 sm:text-base">
              {heroHookSentence}
            </p>
          </motion.div>
        </div>
      </section>

      <section id="services-core" className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 max-w-2xl sm:mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B96B16]">TRIPLE R HOLIDAYS</span>
            <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">What We Offer</h2>
            <p className="mt-5 text-sm font-medium leading-8 text-[#111820]/84 sm:text-base">From Sri Lanka tours to outbound holidays, hotel stays, transport and event travel, our team keeps every detail practical, personal and easy to follow.</p>
          </motion.div>
          {/* Mobile: simple card stack | Desktop: left/right alternating with vertical line */}
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#D98928]/30 via-[#111820]/15 to-transparent hidden lg:block" />
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative mb-10 last:mb-0 lg:mb-28 lg:grid lg:grid-cols-2 lg:gap-16">
                  {/* Desktop dot on the line */}
                  <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 hidden lg:block">
                    <div className="relative">
                      <span className="block h-3.5 w-3.5 rounded-full bg-[#D98928] shadow-[0_0_12px_rgba(166,94,53,0.4)]" />
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#D98928]/30" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                  {/* Mobile: image first, then content */}
                  <div className="lg:hidden">
                    <div className="relative overflow-hidden rounded-2xl border border-[#111820]/12 shadow-md">
                      <img src={service.image} alt={service.title} className="w-full aspect-[16/10] object-cover" loading="lazy" decoding="async" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8]/50 via-transparent to-transparent" />
                      <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-xl border border-[#111820]/18 bg-[#F5F1E8]/80 text-[#D98928] backdrop-blur-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="mt-4 scandi-soft-card border border-[#111820]/10 p-4">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B96B16]">Service {String(index + 1).padStart(2, '0')}</span>
                      <h3 className="font-space mt-2 text-xl font-bold uppercase tracking-tight text-[#111820]">{service.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-[#111820]/84">{service.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.points.map(point => (
                          <span key={point} className="inline-flex items-center gap-1.5 rounded-full border border-[#111820]/18 bg-white/55 px-3 py-1.5 text-[11px] font-bold text-[#111820]/86">{point}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Desktop: alternating left/right layout */}
                  <div className={`hidden lg:block ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:col-start-2'}`}>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B96B16]">Service {String(index + 1).padStart(2, '0')}</span>
                    <h3 className="font-space mt-3 text-3xl font-bold uppercase tracking-tight text-[#111820] sm:text-4xl">{service.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-8 text-[#111820]/84 max-w-md" style={{ marginLeft: isEven ? 'auto' : undefined }}>{service.description}</p>
                    <div className={`mt-5 flex flex-wrap gap-2 ${isEven ? 'lg:justify-end' : ''}`}>
                      {service.points.map(point => (
                        <span key={point} className="inline-flex items-center gap-1.5 rounded-full border border-[#111820]/18 bg-white/55 px-3 py-1.5 text-[11px] font-bold text-[#111820]/86">{point}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`hidden lg:block mt-8 lg:mt-0 ${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1 lg:pr-16'}`}>
                    <div className="relative">
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="relative overflow-hidden rounded-2xl border border-[#111820]/12 shadow-[0_24px_60px_rgba(17,24,32,0.15)]">
                        <img src={service.image} alt={service.title} className="w-full aspect-[16/10] object-cover" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F1E8]/50 via-transparent to-transparent" />
                        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-xl border border-[#111820]/18 bg-[#F5F1E8]/80 text-[#D98928] backdrop-blur-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }} className={`absolute -bottom-6 w-28 h-28 overflow-hidden rounded-xl border-4 border-[#F5F1E8] shadow-xl ${isEven ? '-left-4' : '-right-4'}`}>
                        <img src={service.image} alt="" className="h-full w-full object-cover scale-[1.6]" style={{ objectPosition: index % 3 === 0 ? 'top right' : index % 3 === 1 ? 'center' : 'bottom left' }} loading="lazy" decoding="async" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 max-w-lg">
            <p className="text-sm font-medium leading-8 text-[#111820]/84">No need to worry about routes, schedules, or finding places — everything is already organized. We&apos;ll show you where to go, what to see, and where to stay, so you can simply <span className="italic text-[#B96B16] font-bold">enjoy the journey.</span></p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 lg:py-28 overflow-hidden bg-gradient-to-b from-[#F5F1E8] via-[#F5F1E8] to-[#F5F1E8]">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B96B16]">Our Process</span>
            <h2 className="font-space fluid-title mt-4 font-bold uppercase text-[#111820]">How We Deliver</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-8 text-[#111820]/84">Travel execution built with practical planning and a single coordination rhythm.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }} className="relative mx-auto max-w-5xl">
            <div className="flex items-end justify-center gap-4 sm:gap-5">
              <motion.div variants={{ hidden: { opacity: 0, y: 30, rotate: -3 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="w-24 sm:w-32 shrink-0 self-end">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-[#111820]/8 aspect-square"><img src={services[0].image} alt="Inbound" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="w-28 sm:w-36 shrink-0">
                <div className="overflow-hidden rounded-2xl shadow-lg bg-[#D98928] p-1 aspect-[3/4]"><img src={services[1].image} alt="Outbound" className="h-full w-full object-cover rounded-xl transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 14 } } }} className="w-48 sm:w-64 shrink-0">
                <div className="overflow-hidden rounded-3xl shadow-2xl border border-[#111820]/10 aspect-square"><img src={services[2].image} alt="Hotels" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="hidden sm:block w-28 sm:w-32 shrink-0">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-[#111820]/8 aspect-[3/4]"><img src={services[3].image} alt="Events" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30, rotate: 3 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="hidden md:block w-24 sm:w-28 shrink-0 self-start mt-6">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-[#111820]/8 aspect-square"><img src={services[4].image} alt="Weddings" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
            </div>
            <div className="flex items-start justify-center gap-4 sm:gap-5 mt-4 sm:mt-5">
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="hidden sm:block w-28 sm:w-36 shrink-0">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-[#111820]/8 aspect-[4/3]"><img src={services[5].image} alt="Transport" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="w-24 sm:w-28 shrink-0 mt-4">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-[#111820]/8 aspect-square"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80" alt="Travel" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="w-32 sm:w-40 shrink-0">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-[#111820]/8 aspect-[3/4]"><img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80" alt="Beach" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="w-28 sm:w-36 shrink-0 mt-2">
                <div className="overflow-hidden rounded-2xl shadow-lg border border-[#111820]/8 aspect-[4/5]"><img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=600&q=80" alt="Nature" className="h-full w-full object-cover transition duration-500 hover:scale-105" /></div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 30, rotate: 2 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } }} className="hidden md:block w-28 sm:w-32 shrink-0">
                <div className="overflow-hidden rounded-2xl shadow-lg bg-[#D98928] p-1 aspect-square"><img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80" alt="Mountains" className="h-full w-full object-cover rounded-xl transition duration-500 hover:scale-105" /></div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }} className="mt-20 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {process.map((step, index) => (
              <motion.div key={step} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } }} className="text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D98928]/28 bg-[#D98928]/10 text-[#B96B16] font-space text-lg font-bold">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-4 text-sm font-medium leading-7 text-[#111820]/86 max-w-xs mx-auto">{step}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <a href={contact.whatsappHref} className="inline-flex items-center gap-3 bg-[#111820] hover:bg-[#D98928] text-white pl-7 pr-2 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 shadow-lg group">
              Plan your trip
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#111820] transition-transform duration-300 group-hover:rotate-45"><ArrowRight className="h-4 w-4" /></span>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
