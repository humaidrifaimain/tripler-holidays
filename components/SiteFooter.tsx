"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const contact = {
  phone: "+94 (77) 666 1272",
  phoneHref: "tel:+94776661272",
  email: "hello@triplerholidays.com",
  address: "173 A 1/2 Negombo Road, Wattala - Triple R Holidays",
  facebookHref: "https://www.facebook.com/share/18yLyfMD4H/?mibextid=wwXIfr",
  instagramHref: "https://www.instagram.com/triplerholidays.lk?igsh=MXFpcWt4ZTliYjdwbw=="
};

const footerSections = [
  {
    title: "Tours",
    links: [
      { label: "Sri Lanka Tours", href: "/holiday-tours" },
      { label: "Outbound Tours", href: "/outbound-tours" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Cooperate", href: "/cooperate" }
    ]
  },
  {
    title: "Services & Contact",
    links: [
      { label: "Services", href: "/services" },
      { label: "Contact", href: "/about#contact" }
    ]
  }
];

// All links for desktop layout
const allNavLinks = [
  { label: "Sri Lanka Tours", href: "/holiday-tours" },
  { label: "Outbound Tours", href: "/outbound-tours" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/about#contact" }
];

function MobileFooterAccordion() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <div className="sm:hidden border-b border-white/10 py-2">
      {footerSections.map((section, i) => (
        <div key={section.title}>
          <button
            type="button"
            aria-expanded={openSection === i}
            onClick={() => setOpenSection(prev => prev === i ? null : i)}
            className="footer-accordion-btn"
          >
            {section.title}
            <motion.span
              animate={{ rotate: openSection === i ? 180 : 0 }}
              transition={{ duration: 0.22 }}
            >
              <ChevronDown className="h-4 w-4 text-white/50" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openSection === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="pb-3 pt-1">
                  {section.links.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block py-2.5 text-xs font-semibold uppercase tracking-wider text-white/65 transition hover:text-[#D98928] min-h-[44px] flex items-center"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function SiteFooter() {
  const imageBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <footer className="w-full border-t border-white/10 bg-footer-dark text-white shadow-2xl backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 sm:py-8">

        {/* Top Section */}
        <div className="flex flex-col items-center border-b border-white/10 pb-6 text-center">
          <Link
            href="/"
            className="rounded-lg p-1 transition-opacity hover:opacity-90"
          >
            <Image
              src={`${imageBasePath}/images/tripler-holidays-logo-trimmed.png`}
              alt="Triple R Holidays"
              width={240}
              height={116}
              className="h-10 w-auto brightness-0 invert sm:h-12"
            />
          </Link>
          <p className="mt-3 max-w-md text-[11px] leading-5 text-white/60">
            Seamless travel planning for Sri Lanka tours, outbound holidays, hotels,
            transport, events and destination weddings.
          </p>
        </div>

        {/* Mobile Accordion Navigation */}
        <MobileFooterAccordion />

        {/* Desktop Nav Links — hidden on mobile */}
        <div className="hidden flex-wrap justify-center gap-4 py-6 sm:flex sm:gap-8 sm:py-7">
          {allNavLinks.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-wider text-white/80 hover:text-[#D98928] transition duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Contact info grid */}
        <div className="grid gap-4 border-t border-white/5 pt-6 text-center text-[11px] text-white/50 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-bold uppercase tracking-widest text-[#D98928]">Call Us</p>
            <a href={contact.phoneHref} className="block mt-2 font-semibold hover:text-white transition">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest text-[#D98928]">Email Us</p>
            <a href={`mailto:${contact.email}`} className="block mt-2 font-semibold hover:text-white transition break-all">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest text-[#D98928]">Our Office</p>
            <p className="mt-2 font-semibold">{contact.address}</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href={contact.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/85 transition hover:border-[#D98928] hover:text-[#D98928]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M13.9 21.5v-8.7h2.9l.4-3.4h-3.3V7.3c0-1 .3-1.7 1.7-1.7h1.8v-3a24 24 0 0 0-2.7-.1c-2.7 0-4.5 1.6-4.5 4.6v2.6H7.2v3.4h3v8.7h3.7Z" />
              </svg>
            </a>
            <a
              href={contact.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/85 transition hover:border-[#D98928] hover:text-[#D98928]"
            >
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
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                <circle cx="12" cy="12" r="4.25" />
                <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 flex flex-col gap-2 border-t border-white/5 pt-6 text-center text-[10px] font-bold uppercase tracking-wider text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>Triple R Holidays Pvt Ltd. All Rights Reserved.</p>
          <p>Designed for seamless journeys across Sri Lanka and beyond.</p>
        </div>
      </div>
    </footer>
  );
}
