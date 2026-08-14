"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type NavItem = {
  key: "home" | "tours" | "services" | "cooperate" | "about" | "testimonials";
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
};

const navItems: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  {
    key: "tours",
    label: "Tours",
    href: "/holiday-tours",
    children: [
      { label: "Sri Lanka Tours", href: "/holiday-tours" },
      { label: "Outbound Tours", href: "/outbound-tours" }
    ]
  },
  { key: "services", label: "Our Services", href: "/services" },
  { key: "cooperate", label: "Cooperate", href: "/cooperate" },
  { key: "testimonials", label: "Testimonials", href: "/testimonials" },
  { key: "about", label: "About Us", href: "/about" }
];

type SiteHeaderProps = {
  variant?: "transparent" | "solid";
  ctaLabel?: string;
  ctaHref?: string;
};

export default function SiteHeader({
  variant = "solid",
  ctaLabel = "Find a Tour",
  ctaHref = "/holiday-tours"
}: SiteHeaderProps) {
  const imageBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Portal can only render on the client, track mount state
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const transparent = variant === "transparent";

  useEffect(() => {
    setMounted(true);
  }, []);

  const normalizePath = (value: string | null | undefined) => {
    if (!value) return "/";
    const base = imageBasePath.replace(/\/+$/, "");
    let normalized = value;
    if (base && normalized.startsWith(base)) {
      normalized = normalized.slice(base.length) || "/";
    }
    if (!normalized.startsWith("/")) normalized = `/${normalized}`;
    if (normalized !== "/") normalized = normalized.replace(/\/+$/, "");
    return normalized || "/";
  };

  const normalizedPathname = normalizePath(pathname);
  const isToursRoute =
    normalizedPathname === "/holiday-tours" ||
    normalizedPathname === "/outbound-tours" ||
    normalizedPathname.startsWith("/package/");

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      if (transparent) {
        setScrolled(currentY > 20);
      }
      if (currentY > 80 && currentY > lastScrollY.current + 6) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setMobileToursOpen(false);
  }, [pathname]);

  // Body scroll lock
  useEffect(() => {
    if (!open) setMobileToursOpen(false);
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Sync header height CSS variable
  useEffect(() => {
    const syncHeight = () => {
      if (!headerRef.current) return;
      const h = Math.ceil(headerRef.current.getBoundingClientRect().height);
      if (h > 0) {
        document.documentElement.style.setProperty("--site-header-height", `${h}px`);
        document.documentElement.style.setProperty("--site-header-offset", `${h}px`);
      }
    };
    syncHeight();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncHeight) : null;
    if (headerRef.current) ro?.observe(headerRef.current);
    window.addEventListener("resize", syncHeight, { passive: true });
    return () => { ro?.disconnect(); window.removeEventListener("resize", syncHeight); };
  }, [pathname, transparent, ctaLabel]);

  const isItemActive = (item: NavItem) => {
    if (item.key === "tours") return isToursRoute;
    return normalizedPathname === normalizePath(item.href);
  };

  const headerBg =
    transparent && !open
      ? "border-b border-white/10 bg-[rgba(8,43,73,0.72)] shadow-none backdrop-blur-md"
      : "border-b border-white/10 bg-[rgba(8,43,73,0.72)] shadow-none backdrop-blur-md";

  // Mobile overlay rendered via portal to avoid React DOM insertion errors
  const mobileOverlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-nav-overlay"
          className="fixed inset-0 z-[70] md:hidden"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-[#020B16]/75 backdrop-blur-[3px] w-full h-full text-left"
            onClick={() => setOpen(false)}
          />

          {/* Right slide-in drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute right-0 top-0 bottom-0 flex h-full w-[min(74vw,300px)] flex-col justify-between overflow-hidden border-l border-white/10 bg-[#082B49]/98 shadow-[-10px_0_40px_rgba(2,8,23,0.45)] backdrop-blur-2xl"
          >
            {/* Ambient glows inside drawer */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#D98928]/14 blur-[80px]" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#1E7C8A]/14 blur-[80px]" />
            <div className="grain-overlay opacity-30" />

            {/* Header part */}
            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D98928]" />
                <p className="text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#F5F1E8]/70">TRIPLE R HOLIDAYS</p>
              </div>
              <button
                type="button"
                aria-label="Close mobile menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Nav content */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
              }}
              className="relative flex-1 overflow-y-auto px-5 py-6"
            >
              {navItems.map(item => {
                const active = isItemActive(item);
                if (!item.children) {
                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: 16 },
                        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
                      }}
                      className="mb-3"
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between py-1.5 text-[15px] font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                        onClick={() => setOpen(false)}
                      >
                        <span className={`transition-colors duration-300 ${active ? "text-[#F2B24D]" : "text-white/90 group-hover:text-[#D98928]"}`}>
                          {item.label}
                        </span>
                        {active ? (
                          <span className="h-2 w-2 rounded-full bg-[#D98928]" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-white/30 transition duration-300 group-hover:translate-x-1 group-hover:text-[#D98928]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.key}
                    variants={{
                      hidden: { opacity: 0, x: 16 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
                    }}
                    className="mb-3"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-1.5 text-left text-[15px] font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                      onClick={() => setMobileToursOpen(c => !c)}
                    >
                      <span className={`${active || mobileToursOpen ? "text-[#F2B24D]" : "text-white/90 hover:text-[#D98928]"}`}>
                        {item.label}
                      </span>
                      <motion.span
                        animate={{ rotate: mobileToursOpen ? 90 : 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-white/30" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileToursOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="mt-1 space-y-2 overflow-hidden border-l border-[#D98928]/30 pl-3"
                        >
                          {item.children?.map(child => {
                            const childActive = normalizedPathname === normalizePath(child.href);
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`flex items-center gap-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${
                                  childActive ? "text-[#F2B24D]" : "text-white/70 hover:text-[#D98928]"
                                }`}
                                onClick={() => setOpen(false)}
                              >
                                <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition ${childActive ? "bg-[#F2B24D]" : "bg-white/20"}`} />
                                {child.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Bottom Actions section */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              className="relative space-y-2.5 border-t border-white/10 bg-[#061F35]/45 px-5 py-3.5"
              style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom, 0px))" }}
            >
              <Link
                href={ctaHref}
                className="flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-[#D98928] px-5 text-[9.5px] font-bold uppercase tracking-[0.15em] text-[#111820] shadow-lg transition duration-300 hover:bg-[#F2B24D]"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              
              <Link
                href="/about#contact"
                className="flex min-h-9 w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-[9.5px] font-bold uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>

              <div className="flex items-center justify-center gap-1.5 pt-2 text-[8px] font-bold uppercase tracking-[0.16em] text-white/35">
                <span>Hotline:</span>
                <span className="text-white/60">+94 (77) 666 1272</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    // Single root element — no fragments — avoids React DOM insertBefore errors
    <div>
      {/* Fixed header bar */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${headerBg} ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="inline-flex shrink-0" onClick={() => setOpen(false)}>
            <Image
              src={`${imageBasePath}/images/tripler-holidays-logo-trimmed.png`}
              alt="Triple R Holidays"
              width={220}
              height={69}
              className="h-8 w-auto brightness-0 invert sm:h-9"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-9">
            {navItems.map(item => {
              const active = isItemActive(item);
              if (!item.children) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                      active ? "text-[#F2B24D]" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-[#F2B24D] transition-transform duration-300 ease-out ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              }
              return (
                <div key={item.key} className="group relative pb-2">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-label={`${item.label} menu`}
                    className={`relative inline-flex items-center gap-1 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                      active ? "text-[#F2B24D]" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-[#F2B24D] transition-transform duration-300 ease-out ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100"
                      }`}
                    />
                  </button>
                  <div className="pointer-events-none invisible absolute left-1/2 top-[calc(100%+4px)] z-50 w-56 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="rounded-2xl border border-white/20 bg-[rgba(8,43,73,0.96)] p-2 shadow-xl backdrop-blur-xl">
                      {item.children.map(child => {
                        const childActive =
                          normalizedPathname === normalizePath(child.href) ||
                          (child.href === "/holiday-tours" && normalizedPathname.startsWith("/package/"));
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-xl px-3.5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
                              childActive
                                ? "bg-white/16 text-white"
                                : "text-white/85 hover:bg-white/12 hover:text-white"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop CTA */}
            <Link
              href={ctaHref}
              className="hidden md:inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-white hover:text-[#082B49] lg:px-5"
            >
              {ctaLabel}
              <ArrowUpRight className="h-3 w-3" />
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/25 active:scale-95 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(c => !c)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="flex"
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="flex"
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay — portalled to document.body to avoid insertBefore DOM errors */}
      {mounted && createPortal(mobileOverlay, document.body)}
    </div>
  );
}
