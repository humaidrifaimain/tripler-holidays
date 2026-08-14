"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarRange,
  CheckCircle2,
  Clock3,
  Compass,
  Hotel,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Users
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import { sendWeb3FormData } from "@/lib/web3forms";

const cooperationOptions = [
  {
    title: "Destination Management Services",
    description:
      "Be a trusted DMC partner for international agencies with itinerary, transport, and accommodation coordination.",
    icon: Compass
  },
  {
    title: "Travel Agency Partnerships",
    description:
      "Collaborate with local and global agencies to sell curated Sri Lanka tour products confidently.",
    icon: Users
  },
  {
    title: "Corporate Travel Solutions",
    description:
      "Support business travel, MICE programs, and executive movement with tailored corporate planning.",
    icon: BriefcaseBusiness
  },
  {
    title: "Hotel & Resort Tie-ups",
    description:
      "Partner with hotels and resorts to unlock preferred rates and route-aligned stay options.",
    icon: Hotel
  },
  {
    title: "Affiliate Partnerships",
    description:
      "Work with creators and digital partners to promote Sri Lanka experiences to targeted audiences.",
    icon: Star
  },
  {
    title: "Custom Itinerary Support",
    description:
      "Build flexible package structures that match partner requirements, seasonal demand, and client preferences.",
    icon: ShieldCheck
  }
];

const benefits = [
  {
    title: "Licensed & Registered",
    description: "Accredited inbound operations with structured, reliable execution standards.",
    icon: CheckCircle2
  },
  {
    title: "Competitive Rates",
    description: "Strong local supplier relationships for value-based, partner-friendly pricing.",
    icon: CalendarRange
  },
  {
    title: "Wide Partner Network",
    description: "Established collaboration across transport, stays, activities, and local support.",
    icon: Users
  },
  {
    title: "24/7 Local Support",
    description: "Round-the-clock assistance for guests, groups, and corporate travel requests.",
    icon: Clock3
  },
  {
    title: "Flexible Options",
    description: "Adaptable route, hotel, and activity planning to match your customer profile.",
    icon: Compass
  },
  {
    title: "Dedicated Manager",
    description: "One clear point of contact for faster updates and smooth partner communication.",
    icon: ShieldCheck
  }
];

const partnershipSteps = [
  {
    title: "Submit Inquiry",
    description: "Fill out our partnership form with your company details and partnership goals."
  },
  {
    title: "Receive Proposal",
    description: "Get a customized proposal with route support, services, and competitive B2B rates."
  },
  {
    title: "Begin Collaboration",
    description: "Start working together while our local team manages operations and partner support."
  }
];

const contact = {
  phone: "+94 (77) 666 1272",
  phoneHref: "tel:+94776661272",
  whatsappHref: "https://wa.me/94767161937",
  email: "hello@triplerholidays.com",
  address: "173 A 1/2 Negombo Road, Wattala - Triple R Holidays",
  linkedinHref: "https://linkedin.com"
};

export default function CooperateClient() {
  return (
    <main className="scandi-page flex min-h-screen flex-col text-[#111820] font-manrope">
      <SiteHeader variant="transparent" ctaLabel="Partner With Us" ctaHref="/cooperate#contact" />

      <section className="photo-text-hero hero-mobile relative w-full overflow-hidden text-white">
        <img
          src="/images/cooperate/handshake-linkedin-article.jpg"
          alt="Business partners shaking hands"
          className="absolute inset-0 h-full w-full object-cover object-center"
          data-hero-media
        />
        <div className="absolute inset-0 bg-[#082B49]/38" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/22 via-[#082B49]/28 to-[#082B49]/48" />
        <div className="grain-overlay" />
        <div className="absolute inset-0 z-10 mx-auto flex w-full max-w-7xl items-end justify-center px-6 pb-14 sm:px-8 sm:pb-16 lg:pb-20">
          <div className="max-w-3xl text-center" data-hero-content>
            <h1 className="font-space text-3xl font-extrabold uppercase leading-tight sm:text-4xl lg:text-5xl text-white drop-shadow-[0_4px_12px_rgba(8,43,73,0.5)]">
              Corporate Travel Solutions
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/90 sm:text-base sm:leading-8">
              Your trusted partner for business travel.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-space fluid-title font-bold uppercase text-[#111820]">
              Partnership Options
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#111820]/78 sm:text-base">
              Explore our range of partnership opportunities tailored to travel professionals.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {cooperationOptions.map(item => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                  }}
                  className="scandi-soft-card border border-[#111820]/14 p-6 text-center"
                >
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#D98928]/22 text-[#D98928]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-[#111820]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#111820]/78">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="contact" className="order-last px-4 pb-12 sm:px-6 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Contact info cards — order-2 on mobile (below form), order-1 on desktop (left column) */}
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
            className="grid gap-4 order-2 lg:order-1"
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

            <motion.article
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="scandi-soft-card p-5"
            >
              <a href={contact.linkedinHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-[10px] bg-[#D98928]/12 text-[#D98928]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.18em] text-[#111820]/58">LinkedIn</span>
                  <span className="block text-base font-bold">Corporate profile</span>
                </span>
              </a>
            </motion.article>
          </motion.div>

          {/* Form — order-1 on mobile (shown first), order-2 on desktop (right column) */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            onSubmit={async (event) => {
              event.preventDefault();
              const form = event.currentTarget;
              try {
                await sendWeb3FormData(
                  "Partnership Inquiry - Triple R Holidays",
                  "Corporate Partnership Form",
                  new FormData(form)
                );
                form.reset();
                window.alert("Thank you. Your partnership inquiry has been sent.");
              } catch {
                window.alert("Sorry, we could not send your inquiry. Please try again or contact us on WhatsApp.");
              }
            }}
            className="scandi-soft-card p-6 sm:p-8 order-1 lg:order-2"
          >
            <h2 className="font-space fluid-title font-bold uppercase">Corporate Inquiry Form</h2>
            <p className="mt-3 text-sm leading-7 scandi-text-muted">
              Complete the form below and our team will get back to you shortly.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
              <label className="text-sm font-bold text-[#111820] sm:col-span-2">
                Company name
                <input
                  name="Company name"
                  className="mt-2 min-h-12 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                  placeholder="Company or agency name"
                />
              </label>
              <label className="text-sm font-bold text-[#111820] sm:col-span-2">
                Partnership type
                <input
                  name="Partnership type"
                  className="mt-2 min-h-12 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                  placeholder="DMC / agency / partner / hotel / affiliate"
                />
              </label>
              <label className="text-sm font-bold text-[#111820] sm:col-span-2">
                Message
                <textarea
                  name="Message"
                  className="mt-2 min-h-36 w-full rounded-[10px] border border-[#111820]/22 bg-[#F5F1E8]/70 px-4 py-3 text-sm text-[#111820] outline-none placeholder:text-[#111820]/46 focus:border-[#D98928]"
                  placeholder="Tell us your goals, preferred services and timelines."
                />
              </label>
            </div>

            <button
              type="submit"
              className="premium-cta mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 px-6 text-sm font-bold uppercase tracking-wide transition"
              data-cursor-magnetic
            >
              Send Partnership Inquiry
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="font-space fluid-title font-bold uppercase text-[#111820]">
              Why Partner With Triple R Holidays
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#111820]/78 sm:text-base">
              Discover the advantages of collaborating with a dependable Sri Lanka travel partner.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } }
            }}
            className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {benefits.map(item => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                  }}
                  className="scandi-soft-card border border-[#111820]/14 p-6 text-center"
                >
                  <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#111820]/8 text-[#D98928]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold text-[#111820]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#111820]/78">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-[24px] border border-[#111820]/12 bg-white/62 px-6 py-12 shadow-[0_20px_48px_rgba(17,24,32,0.08)] backdrop-blur-sm sm:px-10">
          <div className="text-center">
            <h2 className="font-space text-4xl font-black uppercase text-[#111820] sm:text-5xl">
              <span className="text-[#D98928]">How</span> It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#111820]/72 sm:text-base">
              Simple steps to start a successful partnership with us
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-12 right-12 top-7 hidden h-[3px] bg-gradient-to-r from-[#D98928]/30 via-[#D98928] to-[#D98928]/30 md:block" />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid gap-10 md:grid-cols-3"
            >
              {partnershipSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 95, damping: 15 } }
                  }}
                  className="relative text-center"
                >
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#D98928]/55 bg-[#D98928] text-2xl font-black text-white shadow-[0_12px_30px_rgba(217,137,40,0.32)]">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold leading-tight text-[#111820] sm:text-3xl">{step.title}</h3>
                  <p className="mx-auto mt-3 max-w-[220px] text-sm leading-7 text-[#111820]/72 sm:text-base">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
