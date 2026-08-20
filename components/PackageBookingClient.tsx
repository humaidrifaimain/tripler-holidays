"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  Clock3,
  Hotel,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  Users
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { sendWeb3FormData } from "@/lib/web3forms";

const contact = {
  phone: "+94 (77) 666 1272",
  phoneHref: "tel:+94776661272",
  whatsappHref: "https://wa.me/94776661272",
  email: "hello@triplerholidays.com"
};

const summary = [
  { label: "Duration", value: "14 nights / 15 days", icon: Clock3 },
  { label: "Best for", value: "Groups and first-time visitors", icon: Users },
  { label: "Route type", value: "Private multi-city tour", icon: Car },
  { label: "Hotel style", value: "Custom category options", icon: Hotel }
];

const itinerary = [
  {
    day: "Day 01",
    title: "Arrival and Veyangoda",
    details: "Airport meet and assist, private transfer, hotel check-in and rest after arrival."
  },
  {
    day: "Day 02",
    title: "Pinnawala and Sigiriya",
    details: "Elephant orphanage, village experience and optional jeep safari depending on timing."
  },
  {
    day: "Days 03-04",
    title: "Sigiriya and Trincomalee",
    details: "Sigiriya Rock, hot wells, Koneswaram Temple, Pigeon Island and Nilaveli beach time."
  },
  {
    day: "Day 05",
    title: "Dambulla to Kandy",
    details: "Cave Temple, spice and herbal garden, evening cultural show and Kandy overnight."
  },
  {
    day: "Days 06-07",
    title: "Kandy and Nuwara Eliya",
    details: "Temple of the Tooth, gem visit, Ramboda Falls, tea factory, Gregory Lake and gardens."
  },
  {
    day: "Day 08",
    title: "Ella and Yala",
    details: "Rama Seetha Temple, Nine Arch Bridge, Ravana Falls and transfer toward Yala."
  },
  {
    day: "Days 09-10",
    title: "Yala and Mirissa",
    details: "Morning jeep safari, Hiriketiya, Coconut Tree Hill, whale watching and beach leisure."
  },
  {
    day: "Days 11-12",
    title: "Galle, Hikkaduwa and Bentota",
    details: "Turtle beach, Unawatuna, Galle Fort, corals, water sports and Madu River safari."
  },
  {
    day: "Days 13-15",
    title: "Colombo and departure",
    details: "Colombo city highlights, shopping time and transfer to the airport for departure."
  }
];

const included = [
  "Accommodation options arranged to the requested hotel category",
  "Sightseeing plan based on the confirmed program",
  "Private transport from arrival to departure",
  "English-speaking chauffeur driver support",
  "Driver route coordination and travel support"
];

const notIncluded = [
  "Entrance tickets paid directly at attractions",
  "Personal extras outside the confirmed basis",
  "Flights, visa fees or insurance unless requested",
  "Meals or activities not listed in the confirmed quotation"
];

const routeNotes = [
  "This sample package covers multiple Sri Lanka cities in one route.",
  "Jaffna, Pasikudah and Arugam Bay are not included in this sample route.",
  "Prices are shared only after dates, traveller count and hotel category are confirmed."
];

const timelineShots = [
  "/images/tours/sri-lanka-grand-multi-city-tour.jpg",
  "/images/tours/cultural-triangle-kandy.jpg",
  "/images/tours/hill-country-scenic-escape.jpg",
  "/images/holiday-tours/south-coast-beach-trail-4k.jpg"
];

export default function PackageBookingClient() {
  return (
    <main className="scandi-page light-mode-travel min-h-screen text-[#111820]">
      <div className="scandi-panel">
        <SiteHeader variant="transparent" ctaLabel="Book Now" />

        <section
          className="photo-text-hero hero-mobile relative w-full overflow-hidden text-white"
          data-hero-pin
          data-hero-pin-distance="108"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/tours/sri-lanka-grand-multi-city-tour.jpg)" }}
            data-hero-media
          />
          <div className="absolute inset-0 bg-[#082B49]/38" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/22 via-[#082B49]/28 to-[#082B49]/48" />
          <div className="grain-overlay" />
          
          <div
            className="relative mx-auto grid h-full max-w-7xl items-end justify-center px-6 pb-14 sm:px-8 sm:pb-16 lg:pb-20 lg:grid-cols-[1.05fr_0.95fr] gap-10"
            data-hero-content
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.15 }
                }
              }}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="inline-flex items-center gap-2 rounded-[6px] border border-white/20 bg-white/12 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D98928]"
              >
                Package 01
              </motion.span>
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 85, damping: 15 } }
                }}
                className="font-space text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)] mt-5"
              >
                <span className="block">
                  Sri Lanka Grand Multi-City Tour
                </span>
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                }}
                className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/90 sm:text-base sm:leading-8"
              >
                A complete inbound journey across culture, east coast beaches, Kandy,
                hill country, wildlife, south coast leisure, Bentota and Colombo.
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <a href="#booking" className="premium-cta inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-bold uppercase tracking-wide transition" data-cursor-magnetic>
                  Booking Inquiry
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/holiday-tours"
                  className="inline-flex items-center justify-center min-h-12 px-6 rounded-full border border-white/20 bg-white/10 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-[#082B49]"
                  data-cursor-magnetic
                >
                  Back to Tours
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 75, damping: 14, delay: 0.3 }}
              className="scandi-soft-card p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                {summary.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-[10px] border border-[#111820]/15 bg-black/5 p-4">
                      <Icon className="h-5 w-5 text-[#D98928]" />
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#111820]/55">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-extrabold leading-6 text-[#111820]">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-transparent px-4 py-20 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid gap-4 lg:grid-cols-3"
            >
              {routeNotes.map(note => (
                <motion.div 
                  key={note} 
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                  }}
                  whileHover={{ y: -4 }}
                  className="scandi-soft-card p-5"
                >
                  <ShieldCheck className="h-6 w-6 text-[#D98928]" />
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#111820]/78">{note}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                  <span className="h-px w-9 bg-[#D98928]" />
                  About the tour
                </span>
                <h2 className="font-space fluid-title mt-4 font-bold uppercase tracking-normal">
                  The route at a glance
                </h2>
                <p className="mt-6 text-base leading-8 text-[#111820]/76">
                  The itinerary follows a clean multi-city flow across culture, coast,
                  wildlife and city highlights. Timing and stop durations can be adjusted
                  before confirmation.
                </p>
              </motion.div>

              <div className="relative space-y-4 md:space-y-5">
                <div className="absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-white/20 md:block" />
                {itinerary.map((item, index) => {
                  const shot = timelineShots[index % timelineShots.length];
                  const placeLeft = index % 2 === 0;

                  return (
                    <motion.div 
                      key={item.day} 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-80px" }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.08 }
                        }
                      }}
                      className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center"
                    >
                      <motion.article
                        variants={{
                          hidden: { opacity: 0, x: placeLeft ? -24 : 24 },
                          visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 90, damping: 14 } }
                        }}
                        className={`scandi-soft-card p-4 ${
                          placeLeft ? "" : "md:order-3"
                        }`}
                      >
                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D98928]">
                          {item.day}
                        </p>
                        <h3 className="mt-2 text-lg font-extrabold text-[#111820]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#111820]/72">{item.details}</p>
                      </motion.article>

                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, scale: 0.5 },
                          visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150 } }
                        }}
                        className="mx-auto hidden h-3 w-3 rounded-full border border-[#111820]/30 bg-[#D98928] md:block" 
                      />

                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, x: placeLeft ? 24 : -24, scale: 0.95 },
                          visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 14 } }
                        }}
                        className={`expand-image overflow-hidden rounded-[10px] ${placeLeft ? "md:order-3" : ""}`} 
                        data-expand-image
                      >
                        <img src={shot} alt={`${item.title} location`} className="h-24 w-full object-cover md:h-28" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-16">
              <h2 className="font-space fluid-title font-bold uppercase tracking-normal">
                What&apos;s included
              </h2>
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
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {included.map(item => (
                  <motion.div 
                    key={item} 
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                    }}
                    whileHover={{ y: -4 }}
                    className="scandi-soft-card p-4"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#D98928]" />
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#111820]/80">{item}</p>
                  </motion.div>
                ))}
              </motion.div>

              <h3 className="mt-10 text-sm font-black uppercase tracking-[0.2em] text-[#D98928]">
                Not included
              </h3>
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
                className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                {notIncluded.map(item => (
                  <motion.div 
                    key={item} 
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                    }}
                    whileHover={{ y: -4 }}
                    className="rounded-[12px] border border-[#111820]/12 bg-[#F5F1E8]/60 p-4 backdrop-blur-sm"
                  >
                    <Star className="h-4 w-4 text-[#D98928]" />
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#111820]/74">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="booking" className="scroll-mt-24 bg-transparent px-4 pb-20 sm:px-6 lg:pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="mx-auto grid max-w-7xl gap-10 rounded-[18px] border border-white/20 bg-navy-glass p-6 shadow-[0_24px_72px_rgba(2,6,23,0.35)] backdrop-blur-sm text-white lg:grid-cols-[0.9fr_1.1fr] lg:p-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D98928]">
                <span className="h-px w-9 bg-[#D98928]" />
                Booking inquiry
              </span>
              <h2 className="font-space fluid-title mt-4 font-bold uppercase tracking-normal">
                Send your travel details
              </h2>
              <p className="mt-5 text-base leading-8 text-white/76">
                Share your expected dates, traveller count and hotel preference. Triple R
                Holidays will prepare a tailored quotation with no public price shown on
                the website.
              </p>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
                  }
                }}
                className="mt-8 space-y-4"
              >
                <motion.a
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  href={contact.phoneHref}
                  className="flex items-center gap-4 rounded-[10px] border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#D98928] text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/56">
                      Hotline
                    </span>
                    <span className="block text-sm font-extrabold text-white">{contact.phone}</span>
                  </span>
                </motion.a>
                <motion.a
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 rounded-[10px] border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#D98928] text-white">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/56">
                      Email
                    </span>
                    <span className="block break-all text-sm font-extrabold text-white">{contact.email}</span>
                  </span>
                </motion.a>
              </motion.div>
            </div>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                const form = event.currentTarget;
                try {
                  await sendWeb3FormData(
                    "Package Quote Inquiry - Triple R Holidays",
                    "Package Quote Form",
                    new FormData(form)
                  );
                  form.reset();
                  window.alert("Thank you. Your package inquiry has been sent.");
                } catch {
                  window.alert("Sorry, we could not send your inquiry. Please try again or contact us on WhatsApp.");
                }
              }}
              className="scandi-soft-card p-5 sm:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-bold text-[#111820]">
                  Full name
                  <input
                    name="Full name"
                    className="mt-2 min-h-12 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                    placeholder="Your name"
                  />
                </label>
                <label className="text-sm font-bold text-[#111820]">
                  Phone / WhatsApp
                  <input
                    name="Phone"
                    className="mt-2 min-h-12 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                    placeholder="Contact number"
                  />
                </label>
                <label className="text-sm font-bold text-[#111820]">
                  Travel month
                  <input
                    name="Travel month"
                    className="mt-2 min-h-12 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                    placeholder="June / July"
                  />
                </label>
                <label className="text-sm font-bold text-[#111820]">
                  Travellers
                  <input
                    name="Travellers"
                    className="mt-2 min-h-12 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                    placeholder="Adults / children"
                  />
                </label>
                <label className="text-sm font-bold text-[#111820] sm:col-span-2">
                  Message
                  <textarea
                    name="Message"
                    className="mt-2 min-h-36 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 py-3 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                    placeholder="Tell us hotel preference, arrival date, and any must-see places."
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button type="submit" className="premium-cta inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 text-sm font-bold uppercase tracking-wide transition" data-cursor-magnetic>
                  Send Inquiry
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={contact.whatsappHref}
                  className="premium-cta-secondary inline-flex min-h-12 flex-1 items-center justify-center gap-2 px-6 text-sm font-bold uppercase tracking-wide transition"
                  data-cursor-magnetic
                >
                  WhatsApp Instead
                </a>
              </div>
            </form>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
