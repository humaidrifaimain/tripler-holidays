"use client";

import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  Car,
  CheckCircle2,
  Compass,
  CreditCard,
  Hotel,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Users
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import CountUpStat from "@/components/CountUpStat";
import AccordionFAQ from "@/components/AccordionFAQ";
import { useAutoSwipeSlider } from "@/components/AutoSwipeCarousel";

const heroImage =
  "/images/about/triple-r-team-office-hero.jpg";
const storyImage =
  "/images/about/triple-r-office-consultation-clean-optimized.jpg";

const contact = {
  phone: "+94 (77) 666 1272",
  phoneHref: "tel:+94776661272",
  whatsappHref: "https://wa.me/94776661272",
  email: "hello@triplerholidays.com",
  address: "2nd Floor, 173a Negombo Road, Wattala"
};

const trustPoints = [
  "Personal planning with one direct coordination team",
  "Over a decade of practical tourism and hospitality experience",
  "Reliable execution for leisure, business and group travel",
  "Clear communication from inquiry to return transfer"
];

const faqs = [
  {
    q: "How soon should I contact you before travel?",
    a: "We recommend reaching out at least 2-4 weeks before travel for better routing and stay options."
  },
  {
    q: "Can you plan both Sri Lanka and outbound trips?",
    a: "Yes. We handle both in-country routes and outbound packages with hotel and transport coordination."
  },
  {
    q: "Do you support group travel and events?",
    a: "Yes. We coordinate conferences, group movements and destination wedding travel logistics."
  }
];

const whatWeDoCards = [
  {
    title: "Handpicked Accommodations",
    description:
      "From luxury beachfront resorts to charming boutique villas and eco-lodges, we curate stays to match your style and budget.",
    icon: Hotel
  },
  {
    title: "Personalized Itineraries",
    description:
      "Your dream trip, your way. We design travel plans around your interests, budget and preferred pace.",
    icon: CalendarDays
  },
  {
    title: "Complete Ground Handling",
    description:
      "From arrival to departure, we manage transport, hotel coordination and activity flow for a seamless journey.",
    icon: Car
  },
  {
    title: "Themed & Special Interest Tours",
    description:
      "Go deeper with focused journeys for nature, culture, spiritual retreats, trekking and photography lovers.",
    icon: Compass
  },
  {
    title: "Expert Local Guides",
    description:
      "Explore with knowledgeable local guides who bring Sri Lanka’s culture, history and hidden gems to life.",
    icon: Users
  },
  {
    title: "Authentic Local Experiences",
    description:
      "Discover village moments, local food culture and real community interactions beyond the usual tourist path.",
    icon: Sparkles
  }
];

const whyTravelersChooseUsCards = [
  {
    title: "Local Expertise",
    description: "Our team knows Sri Lanka deeply and guides you to experiences that feel truly authentic.",
    icon: MapPin
  },
  {
    title: "Transparent Pricing",
    description: "Clear, upfront pricing with no hidden costs.",
    icon: CheckCircle2
  },
  {
    title: "Vetted Partners",
    description: "We work with carefully selected hotels, transport providers, and local specialists across our destinations.",
    icon: ShieldCheck
  },
  {
    title: "Responsive Support",
    description: "Direct support before, during, and throughout your journey.",
    icon: Phone
  },
  {
    title: "Flexible Options",
    description: "Every itinerary can be tailored to your interests, schedule, and travel style.",
    icon: Compass
  },
  {
    title: "Proven Track Record",
    description: "Trusted by travelers who return and recommend us.",
    icon: Star
  }
];

const travelerReviewCards = [
  {
    platform: "TripAdvisor Reviews",
    rating: "4.8/5",
    reviewCount: "1,277 reviews",
    initials: "TA",
    ctaLabel: "Read All TripAdvisor Reviews",
    ctaHref: "/testimonials",
    quotes: [
      "\"Exceptional service and authentic experiences. Triple R made our Sri Lanka dream trip a reality!\"",
      "\"Professional, reliable and incredibly knowledgeable guides. Highly recommended!\""
    ]
  },
  {
    platform: "Google Reviews",
    rating: "4.8/5",
    reviewCount: "1,277 reviews",
    initials: "G",
    ctaLabel: "Read All Google Reviews",
    ctaHref: "/testimonials",
    quotes: [
      "\"Excellent route planning and smooth handovers across every city we visited.\"",
      "\"Strong communication and great support before and during our holiday.\""
    ]
  },
  {
    platform: "Facebook Reviews",
    rating: "4.8/5",
    reviewCount: "1,277 reviews",
    initials: "f",
    ctaLabel: "Read All Facebook Reviews",
    ctaHref: "/testimonials",
    quotes: [
      "\"Very friendly team with practical guidance for hotels, transport and timing.\"",
      "\"Everything was coordinated exactly as promised. We felt supported throughout.\""
    ]
  }
];

const businessRegistrationNumber = "P V 00359539";

export default function AboutClient() {
  const valuesSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3600 });
  const teamSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 3800 });
  const highlightsSlider = useAutoSwipeSlider<HTMLDivElement>({ autoPlayInterval: 4000 });

  return (
    <main className="scandi-page light-mode-travel min-h-screen text-[#111820] font-manrope">
      <SiteHeader variant="transparent" ctaLabel="Enquire Now" />

      <section
        className="photo-text-hero hero-mobile relative w-full overflow-hidden text-white"
        data-hero-pin
        data-hero-pin-distance="108"
      >
        <img
          src={heroImage}
          alt="Triple R Holidays team at the office"
          className="absolute inset-0 h-full w-full object-cover object-[52%_center] sm:object-center"
          decoding="async"
          fetchPriority="high"
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.55 }}
              className="font-space mt-5 text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)]"
            >
              More Than A
              <br />
              <span className="text-[#D98928]">Travel Company</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.55 }}
              className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/90 sm:text-base sm:leading-8"
            >
              For us, travel is personal. Every itinerary, transfer, and tour is planned with the same care we&apos;d expect for our own journey.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl rounded-[20px] border border-[#111820]/12 bg-white/86 px-6 py-8 text-center shadow-[0_24px_60px_rgba(17,24,32,0.12)] backdrop-blur-md sm:px-10 sm:py-10 lg:px-14"
          >
            <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D98928]">
              <span className="h-px w-8 bg-[#D98928]" />
              Company Profile
              <span className="h-px w-8 bg-[#D98928]" />
            </span>
            <h2 className="font-['Playfair_Display'] fluid-title font-bold text-[#111820]">
              Who We Are
            </h2>
            <div className="mx-auto mt-5 max-w-3xl space-y-4 text-center text-sm leading-8 text-[#111820]/78 sm:text-base">
              <p>
                Triple R Holidays (Pvt) Ltd is a Sri Lankan travel company specializing in tailor-made holidays and travel services across Sri Lanka, with selected destinations in Asia.
              </p>
              <p>
                Backed by our team with 23+ years of combined experience in the travel and tourism industry, we work closely with every client to design journeys that match their interests, travel style, and budget. Our local knowledge and hands-on approach ensure every journey is carefully planned from start to finish.
              </p>
              <p>
                We provide customized itineraries, hotel bookings, private transportation, guided tours, airport transfers, and complete travel planning for individuals, families, groups, and corporate travelers. Whether you’re exploring Sri Lanka for the first time or returning to discover more, our team takes care of every detail so you can enjoy your trip without the stress of planning.
              </p>
              <p>
                At Triple R Holidays, we believe great travel starts with understanding our clients. We focus on providing reliable service, honest advice, and thoughtfully planned experiences that create lasting memories. Our goal is simple: to make every journey smooth, enjoyable, and memorable.
              </p>
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="mt-10 rounded-[20px] border border-[#111820]/16 bg-[#F5F1E8]/90 p-6 shadow-[0_20px_46px_rgba(17,24,32,0.14)] sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#D98928]">Why Travelers Trust Us</span>
                <div className="mt-5 space-y-3">
                  {trustPoints.map(point => (
                    <div
                      key={point}
                      className="flex items-start gap-3 border-b border-[#111820]/12 pb-3 last:border-b-0 last:pb-0"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D98928]" />
                      <p className="text-sm leading-7 text-[#111820]/84">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <CountUpStat value={72} suffix="+" label="Destinations" />
                <CountUpStat value={10} suffix="+" label="Daily Tours" delay={0.05} />
                <CountUpStat value={20} suffix="+" label="Events Per Month" delay={0.1} />
                <CountUpStat value={10000} suffix="+" label="Happy Travelers" delay={0.15} />
              </div>
            </div>
          </motion.article>

        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-space fluid-title font-bold uppercase text-[#111820]">
              What We <span className="text-[#D98928]">Do</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#111820]/78 sm:text-base">
              We offer comprehensive travel solutions designed to make your Sri Lankan adventure unforgettable.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 xl:grid-cols-3"
            ref={valuesSlider.containerRef}
            {...valuesSlider.touchHandlers}
          >
            {whatWeDoCards.map(item => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                  }}
                  className="scandi-soft-card relative min-w-[88vw] snap-start overflow-hidden border border-[#111820]/12 p-4 md:min-w-0 md:p-6"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#D98928]/12 blur-2xl" />
                  <span className="relative z-10 grid h-11 w-11 place-items-center rounded-[10px] bg-[#D98928]/20 text-[#D98928]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="relative z-10 mt-4 text-2xl font-extrabold leading-tight text-[#111820]">{item.title}</h3>
                  <p className="relative z-10 mt-3 text-sm leading-7 text-[#111820]/78">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-space fluid-title font-bold uppercase text-[#111820]">
              Why Travelers <span className="text-[#D98928]">Choose Us</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#111820]/78 sm:text-base">
              Discover the Triple R difference. We are committed to making your Sri Lankan journey exceptional.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 xl:grid-cols-3"
            ref={teamSlider.containerRef}
            {...teamSlider.touchHandlers}
          >
            {whyTravelersChooseUsCards.map(item => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                  }}
                  className="scandi-soft-card min-w-[88vw] snap-start border border-[#111820]/12 p-4 text-center md:min-w-0 md:p-6"
                >
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#D98928]/18 text-[#D98928]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-2xl font-extrabold text-[#111820]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#111820]/78">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-space fluid-title font-bold uppercase text-[#111820]">
              Trust & <span className="text-[#D98928]">Recognition</span>
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#111820]/78 sm:text-base">
              Your peace of mind is our priority. We maintain high standards of professionalism and reliability.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Licensed & Registered Card */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center justify-between text-center rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#111820]/08 relative overflow-hidden"
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#0a2b49]/8 text-[#D98928] ring-8 ring-[#0a2b49]">
                  <Award className="h-10 w-10 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-[#111820] leading-snug">
                  Licensed & Registered
                </h3>
                <div className="mt-2.5 h-1 w-7 rounded-full bg-[#D98928]" />
                <p className="mt-5 text-sm leading-relaxed text-[#111820]/70">
                  Officially registered in Sri Lanka and licensed by SLTDA, ensuring trusted, compliant, and professional travel services for every journey.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#111820]/08 w-full text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111820]/04 px-3.5 py-1.5 text-xs font-semibold text-[#111820]/70">
                  BR No: {businessRegistrationNumber}
                </span>
              </div>
            </motion.article>

            {/* Verified Partner Card */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center justify-between text-center rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#111820]/08 relative overflow-hidden"
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#0a2b49]/8 text-[#D98928] ring-8 ring-[#0a2b49]">
                  <BadgeCheck className="h-10 w-10 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-[#111820] leading-snug">
                  Verified & Recommended
                </h3>
                <div className="mt-2.5 h-1 w-7 rounded-full bg-[#D98928]" />
                <p className="mt-5 text-sm leading-relaxed text-[#111820]/70">
                  Endorsed by hundreds of happy travelers with top-rated reviews across TripAdvisor, Google, and major booking platforms.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#111820]/08 w-full text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111820]/04 px-3.5 py-1.5 text-xs font-semibold text-[#111820]/70">
                  4.8★ Rated Service
                </span>
              </div>
            </motion.article>

            {/* Safe & Secure Card */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center justify-between text-center rounded-[28px] bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#111820]/08 relative overflow-hidden sm:col-span-2 lg:col-span-1"
            >
              <div className="flex flex-col items-center">
                <div className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-[#0a2b49]/8 text-[#D98928] ring-8 ring-[#0a2b49]">
                  <ShieldCheck className="h-10 w-10 stroke-[2.2]" />
                </div>
                <h3 className="text-xl font-bold text-[#111820] leading-snug">
                  Safe & Guaranteed
                </h3>
                <div className="mt-2.5 h-1 w-7 rounded-full bg-[#D98928]" />
                <p className="mt-5 text-sm leading-relaxed text-[#111820]/70">
                  100% secure payment options, encrypted data privacy, and transparent booking policies for completely worry-free travel.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#111820]/08 w-full text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111820]/04 px-3.5 py-1.5 text-xs font-semibold text-[#111820]/70">
                  24/7 On-Ground Support
                </span>
              </div>
            </motion.article>
          </div>

          <section className="relative mt-12 overflow-hidden">
            <div className="relative mx-auto max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="mb-10 text-center"
              >
                <div className="flex items-center justify-center gap-3">
                  <CreditCard className="h-6 w-6 text-[#D98928]" />
                  <h3 className="text-lg font-bold uppercase tracking-wider text-[#111820]">
                    Secure Payment Processing
                  </h3>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid items-center gap-8 md:grid-cols-2"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
                  }}
                  className="space-y-4"
                >
                  <div className="scandi-soft-card flex items-center gap-4 border border-[#111820]/14 p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2F5D50]/15 text-[#2F5D50]">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-bold text-[#111820]">100% Secure Online Payments</p>
                  </div>
                  <div className="scandi-soft-card flex items-center gap-4 border border-[#111820]/14 p-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D98928]/15 text-[#D98928]">
                      <Lock className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-bold text-[#111820]">SSL Encrypted Transactions</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 24 },
                    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
                  }}
                  className="text-center"
                >
                  <p className="mb-5 text-base font-bold text-[#111820]">We Accept</p>
                  <div className="flex flex-wrap items-center justify-center gap-5">
                    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-[#D98928]/30 bg-[#D98928]/10 px-4 py-3">
                      <span className="text-lg font-extrabold text-[#D98928]">50%</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#D98928]">Advance Payment</span>
                    </div>

                    <div className="flex h-14 w-20 items-center justify-center rounded-xl border border-[#111820]/10 bg-white p-2 shadow-sm">
                      <img src="/images/payment/visa.svg" alt="Visa" className="h-7 w-auto object-contain" />
                    </div>

                    <div className="flex h-14 w-20 items-center justify-center rounded-xl border border-[#111820]/10 bg-white p-2 shadow-sm">
                      <img src="/images/payment/mastercard.svg" alt="Mastercard" className="h-9 w-auto object-contain" />
                    </div>

                    <div className="flex h-14 w-20 items-center justify-center rounded-xl border border-[#111820]/10 bg-white p-2 shadow-sm">
                      <img src="/images/payment/american-express.svg" alt="American Express" className="h-10 w-auto object-contain" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-space fluid-title font-bold uppercase text-[#111820]">
              What Our Travelers <span className="text-[#D98928]">Say</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3"
            ref={highlightsSlider.containerRef}
            {...highlightsSlider.touchHandlers}
          >
            {travelerReviewCards.map(card => (
              <motion.article
                key={card.platform}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 15 } }
                }}
                className="scandi-soft-card min-w-[88vw] snap-start border border-[#111820]/12 p-4 md:min-w-0 md:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#D98928]/16 text-lg font-black text-[#D98928]">
                    {card.initials}
                  </span>
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#111820]">{card.platform}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#111820]/80">
                      {card.rating} ({card.reviewCount})
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {card.quotes.map(quote => (
                    <p key={quote} className="text-sm italic leading-7 text-[#111820]/80">
                      {quote}
                    </p>
                  ))}
                </div>

                <a
                  href={card.ctaHref}
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#111820]/16 bg-white/70 px-5 text-xs font-bold uppercase tracking-[0.16em] text-[#111820] transition hover:border-[#D98928] hover:text-[#D98928]"
                >
                  {card.ctaLabel}
                </a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 85, damping: 15 }}
          className="mx-auto grid max-w-7xl items-center gap-8 rounded-[24px] border border-[#111820]/16 bg-[#F5F1E8]/92 p-7 shadow-[0_22px_50px_rgba(17,24,32,0.14)] lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div>
            <h2 className="font-['Playfair_Display'] fluid-title font-bold text-[#111820]">
              Let&apos;s Plan Your Next Journey
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#111820]/76 sm:text-base">
              Share your destination, dates and travel style. We will map out a premium,
              practical itinerary built around your goals.
            </p>
            <a
              href={contact.whatsappHref}
              className="premium-cta mt-6 inline-flex min-h-11 items-center justify-center px-6 text-sm font-bold uppercase tracking-wide transition"
              data-cursor-magnetic
            >
              Talk To Our Team
            </a>
          </div>
          <div className="expand-image overflow-hidden rounded-[18px] border border-[#111820]/12" data-expand-image>
            <img
              src={storyImage}
              alt="Triple R Holidays branded consultation folder in the company office"
              className="h-[300px] w-full object-cover sm:h-[360px]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </motion.div>
      </section>

      <section id="contact" className="px-4 py-8 sm:px-6 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 }
              }
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <motion.article 
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="scandi-soft-card p-5"
            >
              <a href={contact.phoneHref} className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#D98928]/12 text-[#D98928]">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#111820]/58">Hotline</span>
                  <span className="block text-base font-bold">{contact.phone}</span>
                </span>
              </a>
            </motion.article>

            <motion.article 
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="scandi-soft-card p-5"
            >
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#D98928]/12 text-[#D98928]">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#111820]/58">Email</span>
                  <span className="block text-base font-bold break-all">{contact.email}</span>
                </span>
              </a>
            </motion.article>

            <motion.article 
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="scandi-soft-card p-5"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#D98928]/12 text-[#D98928]">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#111820]/58">Office</span>
                  <span className="block text-base font-bold leading-7">{contact.address}</span>
                </span>
              </div>
            </motion.article>

            <motion.article 
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="scandi-soft-card p-5"
            >
              <a href={contact.whatsappHref} className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#D98928]/12 text-[#D98928]">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#111820]/58">Fast support</span>
                  <span className="block text-base font-bold">WhatsApp priority response</span>
                </span>
              </a>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-8 sm:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-space fluid-title font-bold uppercase">Quick Answers</h2>
          <AccordionFAQ
            items={faqs}
            className="mt-6"
          />
        </div>
      </section>
    </main>
  );
}
