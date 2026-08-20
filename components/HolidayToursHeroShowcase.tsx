"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ShowcaseSlide = {
  id: number;
  country: string;
  description: string;
  cardTitle: string;
  cardSubtitle: string;
  image: string;
  exploreHref: string;
};

const slides: ShowcaseSlide[] = [
  {
    id: 1,
    country: "MALDIVES",
    description: "A calm ocean escape with turquoise lagoons, resort comfort, coral-life moments, and smooth island transfers.",
    cardTitle: "Fihalhohi, Maldives",
    cardSubtitle: "Ocean Dreams & Island Escape",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=84",
    exploreHref: "#maldives-packages"
  },
  {
    id: 2,
    country: "MALAYSIA",
    description: "A balanced Malaysia route with Kuala Lumpur city energy, Genting cool weather, family attractions, and easy transfer planning.",
    cardTitle: "Kuala Lumpur, Malaysia",
    cardSubtitle: "City Lights & Highland Nights",
    image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1200&q=84",
    exploreHref: "#malaysia-packages"
  },
  {
    id: 3,
    country: "SINGAPORE",
    description: "A polished Singapore city break with iconic skyline stops, Gardens by the Bay, Sentosa fun, and family-friendly pacing.",
    cardTitle: "Sentosa, Singapore",
    cardSubtitle: "Skyline & City Lights",
    image: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?auto=format&fit=crop&w=1200&q=84",
    exploreHref: "#singapore-packages"
  },
  {
    id: 4,
    country: "THAILAND",
    description: "A lively Thailand plan combining Bangkok nightlife, cultural stops, Phuket beaches, and tropical island experiences.",
    cardTitle: "Bangkok, Thailand",
    cardSubtitle: "Night Pulse & Tropical Escape",
    image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=84",
    exploreHref: "#thailand-packages"
  }
];

const scrollDistanceMultiplier = 3.15;
const mobileScrollDistanceMultiplier = 3.45;

export default function HolidayToursHeroShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const lastDesktopWheelMoveAtRef = useRef(0);
  const wheelUnlockTimerRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchIntentRef = useRef<"vertical" | "horizontal" | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = slides.length;

  const scrollToSlide = (index: number) => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const clampedIndex = Math.min(total - 1, Math.max(0, index));
    const pinTrigger = pinTriggerRef.current;
    const startScroll = pinTrigger?.start ?? containerRef.current.offsetTop;
    const endScroll = pinTrigger?.end ?? startScroll + window.innerHeight * scrollDistanceMultiplier;
    const scrollHeight = Math.max(1, endScroll - startScroll);
    const targetScroll = startScroll + (clampedIndex / (total - 1)) * scrollHeight;

    const lenisScroll = (window as any).__lenis;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (lenisScroll && typeof lenisScroll.scrollTo === "function") {
      lenisScroll.scrollTo(targetScroll, {
        duration: isDesktop ? 0.36 : 0.42,
        lerp: isDesktop ? 0.18 : 0.16,
        lock: true
      });
      return;
    }

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !trackRef.current) return;

    let pinTrigger: ScrollTrigger | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let resizeFrame = 0;
    let lastMeasuredWidth = 0;

    const createTrigger = () => {
      if (pinTrigger) pinTrigger.kill();
      if (timeline) timeline.kill();

      const bgBanners = gsap.utils.toArray<HTMLElement>(".bg-banner-image", containerRef.current);
      const textBlocks = gsap.utils.toArray<HTMLElement>(".text-details-block", containerRef.current);
      const cardItems = gsap.utils.toArray<HTMLElement>(".destination-card-item", containerRef.current);
      const trackEl = trackRef.current;

      if (bgBanners.length === 0 || textBlocks.length === 0 || cardItems.length === 0 || !trackEl) return;

      const isMobile = window.innerWidth < 1024;
      const containerWidth = trackEl.parentElement ? trackEl.parentElement.offsetWidth : 0;
      if (containerWidth === 0) return; // Wait until container size is known

      const cardWidth = cardItems[0].offsetWidth || (isMobile ? 220 : 280);
      const gap = isMobile ? 16 : 24;
      // Center active card if container is wider than the card, otherwise use small default offset
      const alignOffset = containerWidth > cardWidth ? (containerWidth - cardWidth) / 2 : 16;

      // Calculate track translation positions to align the active card at offset from viewport start
      const positions = slides.map((_, i) => {
        return alignOffset - i * (cardWidth + gap);
      });
      const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrollDistance =
        viewportHeight * (isMobile ? mobileScrollDistanceMultiplier : scrollDistanceMultiplier);

      // Set initial state
      gsap.set(bgBanners, { opacity: 0 });
      gsap.set(bgBanners[0], { opacity: 1 });

      gsap.set(textBlocks, { opacity: 0, y: 30, display: "none" });
      gsap.set(textBlocks[0], { opacity: 1, y: 0, display: "flex" });

      gsap.set(cardItems, { opacity: 0.5, scale: 0.92 });
      gsap.set(cardItems[0], { opacity: 1, scale: 1.08 });

      gsap.set(trackEl, { x: positions[0] });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      timeline = tl;

      pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: isMobile ? 0.18 : 0.28,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: false,
        onUpdate: (self) => {
          const currentIndex = Math.min(total - 1, Math.max(0, Math.round(self.progress * (total - 1))));
          activeIndexRef.current = currentIndex;
          setActiveIndex(previous => (previous === currentIndex ? previous : currentIndex));
        }
      });
      pinTriggerRef.current = pinTrigger;

      // Add timeline tweens for smooth scrubbing transitions
      for (let i = 0; i < total - 1; i++) {
        const transStart = i;

        // Translate track
        tl.to(trackEl, {
          x: positions[i + 1],
          ease: "power2.inOut",
          duration: 1
        }, transStart);

        // Cross-fade backgrounds
        tl.to(bgBanners[i], { opacity: 0, duration: 1 }, transStart)
          .to(bgBanners[i + 1], { opacity: 1, duration: 1 }, transStart);

        // Slide and fade texts with timeline-native display toggling for perfect reversibility
        tl.to(textBlocks[i], { opacity: 0, y: -26, duration: 0.42 }, transStart)
          .set(textBlocks[i], { display: "none" }, transStart + 0.42)
          .set(textBlocks[i + 1], { display: "flex" }, transStart + 0.18)
          .to(textBlocks[i + 1], { opacity: 1, y: 0, duration: 0.72 }, transStart + 0.18);

        // Update card styles
        tl.to(cardItems[i], { opacity: 0.5, scale: 0.92, duration: 1 }, transStart)
          .to(cardItems[i + 1], { opacity: 1, scale: 1.08, duration: 1 }, transStart);
      }
    };

    createTrigger();

    // Rebuild only for meaningful width changes. Mobile browser chrome can change height while
    // scrolling, and rebuilding on those changes is what makes the pinned showcase appear to skip.
    const resizeObserver = new ResizeObserver(() => {
      if (!trackRef.current?.parentElement) return;

      const nextWidth = trackRef.current.parentElement.offsetWidth;
      if (Math.abs(nextWidth - lastMeasuredWidth) < 8) return;
      lastMeasuredWidth = nextWidth;

      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(createTrigger);
    });

    if (trackRef.current && trackRef.current.parentElement) {
      lastMeasuredWidth = trackRef.current.parentElement.offsetWidth;
      resizeObserver.observe(trackRef.current.parentElement);
    }

    const isWithinPinnedRange = () => {
      const pinTrigger = pinTriggerRef.current;
      if (!pinTrigger) return false;

      const scrollY = window.scrollY || window.pageYOffset;
      return scrollY >= pinTrigger.start - 2 && scrollY <= pinTrigger.end + 2;
    };

    const moveByDirection = (direction: 1 | -1) => {
      const currentIndex = activeIndexRef.current;
      const targetIndex = Math.min(total - 1, Math.max(0, currentIndex + direction));
      if (targetIndex === currentIndex) return false;

      if (wheelLockRef.current) {
        return true;
      }

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const now = Date.now();
      if (isDesktop && now - lastDesktopWheelMoveAtRef.current < 900) {
        return true;
      }

      wheelLockRef.current = true;
      if (isDesktop) lastDesktopWheelMoveAtRef.current = now;
      activeIndexRef.current = targetIndex;
      setActiveIndex(targetIndex);
      scrollToSlide(targetIndex);
      scheduleWheelUnlock(isDesktop ? 520 : 560);
      return true;
    };

    const canMoveByDirection = (direction: 1 | -1) => {
      const currentIndex = activeIndexRef.current;
      return direction > 0 ? currentIndex < total - 1 : currentIndex > 0;
    };

    const scheduleWheelUnlock = (delay = 420) => {
      if (wheelUnlockTimerRef.current) window.clearTimeout(wheelUnlockTimerRef.current);
      wheelUnlockTimerRef.current = window.setTimeout(() => {
        wheelLockRef.current = false;
      }, delay);
    };

    const handleWheel = (event: WheelEvent) => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const minDelta = isDesktop ? 16 : 6;
      if (!isWithinPinnedRange() || Math.abs(event.deltaY) < minDelta) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const didMove = moveByDirection(direction);
      if (!didMove) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch || !isWithinPinnedRange()) return;

      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      touchIntentRef.current = null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const start = touchStartRef.current;
      const touch = event.touches[0];
      if (!start || !touch || !isWithinPinnedRange()) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      if (!touchIntentRef.current && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 12) {
        touchIntentRef.current = Math.abs(deltaY) > Math.abs(deltaX) ? "vertical" : "horizontal";
      }

      const direction = deltaY < 0 ? 1 : -1;
      if (touchIntentRef.current === "vertical" && canMoveByDirection(direction) && event.cancelable) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const start = touchStartRef.current;
      const touch = event.changedTouches[0];
      touchStartRef.current = null;

      if (!start || !touch || touchIntentRef.current !== "vertical" || !isWithinPinnedRange()) return;

      const deltaY = touch.clientY - start.y;
      if (Math.abs(deltaY) < 34) return;

      const didMove = moveByDirection(deltaY < 0 ? 1 : -1);
      if (!didMove) return;

      if (event.cancelable) event.preventDefault();
      event.stopPropagation();
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false, capture: true });

    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      window.removeEventListener("touchend", handleTouchEnd, { capture: true });
      if (wheelUnlockTimerRef.current) window.clearTimeout(wheelUnlockTimerRef.current);
      wheelLockRef.current = false;
      if (pinTrigger) pinTrigger.kill();
      if (timeline) timeline.kill();
      pinTriggerRef.current = null;
      resizeObserver.disconnect();
    };
  }, [total]);

  const nextSlide = () => {
    const nextIdx = Math.min(activeIndex + 1, total - 1);
    scrollToSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = Math.max(activeIndex - 1, 0);
    scrollToSlide(prevIdx);
  };

  return (
    <div ref={containerRef} className="relative w-full bg-[#082B49]">
      <div ref={stickyRef} className="hero-screen header-safe-top relative flex w-full items-start overflow-hidden font-jakarta lg:items-center">
        
        {/* Background Slide Images Stack */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.country}
              className="bg-banner-image absolute inset-0 h-full w-full object-cover"
            />
          ))}
        </div>

        <div className="cinematic-dark-overlay pointer-events-none absolute inset-0 z-10" />
        <div className="grain-overlay z-10" />

        {/* Left Vertical Timeline Dots Rail */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20 hidden md:flex pointer-events-auto">
          <div className="relative w-px h-64 bg-white/15 flex flex-col justify-between items-center py-2">
            {slides.map((_, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSlide(i)}
                  className="relative group focus:outline-none flex items-center justify-center h-4 w-4 pointer-events-auto"
                >
                  {isActive ? (
                    <motion.div
                      layoutId="activeDotOutline"
                      className="absolute h-9 w-9 rounded-full border border-white/25 bg-white/10 flex items-center justify-center text-[10px] font-bold text-white z-10 shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {i + 1}
                    </motion.div>
                  ) : null}
                  <span
                    className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                      isActive ? "bg-transparent scale-0" : "bg-white/40 group-hover:bg-white group-hover:scale-125"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Inner Content Grid */}
        <div className="relative z-20 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-7 px-5 pb-[250px] pt-9 min-[380px]:pb-[280px] min-[380px]:pt-12 sm:px-8 sm:pb-[330px] sm:pt-14 md:pl-20 md:pr-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12 lg:p-0 lg:px-8 lg:pl-16 lg:pr-12">
          
          {/* Left Columns Destination Text Details Stack */}
          <div className="relative flex min-h-[270px] w-full max-w-[min(88vw,520px)] items-start min-[380px]:min-h-[300px] sm:min-h-[330px] lg:min-h-[360px] lg:max-w-[560px] lg:items-center">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="text-details-block absolute inset-x-0 flex flex-col justify-start text-white lg:justify-center"
              >
                {/* Active Destination Headline */}
                <h1 className="font-space max-w-full whitespace-nowrap text-[clamp(2.15rem,10.2vw,4.15rem)] font-black uppercase leading-[0.9] tracking-normal sm:text-[clamp(3rem,7.2vw,5rem)] lg:text-[clamp(3.55rem,4.65vw,5.35rem)]">
                  {slide.country}
                </h1>

                {/* Description Text */}
                <p className="mt-3 max-w-[300px] text-[13px] font-medium leading-6 text-[#F5F1E8] opacity-80 min-[380px]:max-w-[340px] min-[380px]:text-sm min-[380px]:leading-7 sm:max-w-md lg:mt-4 lg:text-base lg:leading-relaxed">
                  {slide.description}
                </p>

                {/* Explore Teal CTA Button */}
                <div className="relative z-30 mt-4 lg:mt-8">
                  <Link
                    href={slide.exploreHref}
                    className="group pointer-events-auto inline-flex min-h-10 items-center gap-2 rounded-[8px] bg-[#D98928] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-xl transition duration-300 hover:bg-[#D98928] min-[380px]:min-h-11 min-[380px]:px-5 min-[380px]:text-xs lg:px-7 lg:py-3.5"
                  >
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 lg:h-4 lg:w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Spacer to reserve vertical space for mobile layout stacking and desktop column spacing */}
          <div className="h-[130px] min-[380px]:h-[160px] sm:h-[210px] lg:h-[450px]" />

        </div>

        {/* Right Horizontal Cards Viewport (stretching from center to screen edge) */}
        <div 
          className="destinations-viewport-mask absolute bottom-[9.75rem] left-0 right-0 z-20 block h-[205px] overflow-hidden pointer-events-none min-[380px]:bottom-[10.25rem] min-[380px]:h-[245px] sm:bottom-32 sm:h-[300px] lg:bottom-auto lg:left-[50%] lg:top-1/2 lg:h-[450px] lg:-translate-y-1/2"
        >
          <div ref={trackRef} className="flex gap-4 lg:gap-6 items-center pointer-events-auto h-full">
            {slides.map((slide, i) => (
              <div key={slide.id} className="destination-card-item flex flex-col gap-2 lg:gap-3 shrink-0">
                <span className="hidden pl-2 text-[11px] font-bold uppercase tracking-wider text-white/50 lg:block">
                  {slide.cardTitle}
                </span>
                <motion.div
                  onClick={() => scrollToSlide(i)}
                  className="relative h-[180px] w-[140px] shrink-0 cursor-pointer overflow-hidden rounded-[16px] border border-white/10 bg-[#082B49]/80 text-left transition pointer-events-auto min-[380px]:h-[210px] min-[380px]:w-[164px] sm:h-[260px] sm:w-[200px] lg:h-[370px] lg:w-[280px] lg:rounded-[24px]"
                >
                  <img
                    src={slide.image}
                    alt={slide.cardTitle}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-black lg:right-4 lg:top-4 lg:h-9 lg:w-9"
                  >
                    <Bookmark className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 text-white lg:bottom-5 lg:left-5 lg:right-5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#D98928] min-[380px]:text-[10px] lg:text-xs">
                      {slide.cardSubtitle}
                    </p>
                    <p className="font-space mt-0.5 text-sm font-extrabold uppercase leading-tight min-[380px]:text-base lg:mt-1 lg:text-lg">
                      {slide.country}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar Controls & Progress */}
        <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center gap-3 pointer-events-none min-[380px]:bottom-8 sm:bottom-10 sm:left-8 sm:right-8 md:left-28 md:right-12">
          <div className="flex shrink-0 items-center gap-2 pointer-events-auto sm:gap-3">
            <button
              onClick={prevSlide}
              disabled={activeIndex === 0}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/5 disabled:hover:text-white min-[380px]:h-9 min-[380px]:w-9 sm:h-10 sm:w-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={activeIndex === total - 1}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/5 disabled:hover:text-white min-[380px]:h-9 min-[380px]:w-9 sm:h-10 sm:w-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4 md:max-w-72 md:flex-none md:basis-72">
            <span className="min-w-5 text-center text-[11px] font-extrabold leading-none tracking-wider text-white/60 [font-variant-numeric:tabular-nums] sm:text-xs">0{activeIndex + 1}</span>
            <div className="relative flex-1 h-0.5 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#D98928] rounded-full"
                animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="min-w-5 text-center text-[11px] font-extrabold leading-none tracking-wider text-white/60 [font-variant-numeric:tabular-nums] sm:text-xs">0{total}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
