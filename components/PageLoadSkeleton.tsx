"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const skeletonRevealDelay = 450;
const maxSkeletonDuration = 2200;
const homeHeroVideoReadyEvent = "tripler:home-hero-video-ready";
const homeHeroVideoPlayingEvent = "tripler:home-hero-video-playing";
const homeHeroVideoErrorEvent = "tripler:home-hero-video-error";

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`skeleton-block ${className}`} />;
}

export default function PageLoadSkeleton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const routeKey = useRef(0);

  useEffect(() => {
    routeKey.current += 1;
    const activeRouteKey = routeKey.current;
    const isHomePage = pathname === "/";
    let isReady = false;
    let revealTimeoutId: ReturnType<typeof setTimeout>;
    let maxTimeoutId: ReturnType<typeof setTimeout>;

    const hide = () => {
      if (activeRouteKey !== routeKey.current) return;
      isReady = true;
      clearTimeout(revealTimeoutId);
      clearTimeout(maxTimeoutId);
      setVisible(false);
    };

    setVisible(false);
    revealTimeoutId = setTimeout(() => {
      if (!isReady && activeRouteKey === routeKey.current) {
        setVisible(true);
      }
    }, skeletonRevealDelay);
    maxTimeoutId = setTimeout(hide, maxSkeletonDuration);

    if (isHomePage) {
      if (
        document.readyState === "complete" ||
        (window as any).__triplerHomeHeroVideoReady ||
        (window as any).__triplerHomeHeroVideoPlaying
      ) {
        hide();
      } else {
        const onVideoReady = hide;
        const onLoad = hide;
        window.addEventListener(homeHeroVideoReadyEvent, onVideoReady, { once: true });
        window.addEventListener(homeHeroVideoPlayingEvent, onVideoReady, { once: true });
        window.addEventListener(homeHeroVideoErrorEvent, onVideoReady, { once: true });
        window.addEventListener("load", onLoad, { once: true });

        return () => {
          window.removeEventListener(homeHeroVideoReadyEvent, onVideoReady);
          window.removeEventListener(homeHeroVideoPlayingEvent, onVideoReady);
          window.removeEventListener(homeHeroVideoErrorEvent, onVideoReady);
          window.removeEventListener("load", onLoad);
          clearTimeout(revealTimeoutId);
          clearTimeout(maxTimeoutId);
        };
      }
    } else if (document.readyState === "complete") {
      hide();
    } else {
      const onLoad = () => hide();
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(revealTimeoutId);
        clearTimeout(maxTimeoutId);
      };
    }

    return () => {
      clearTimeout(revealTimeoutId);
      clearTimeout(maxTimeoutId);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[120] overflow-hidden bg-[#F5F1E8] transition duration-500 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div>
        <section className="hero-mobile header-safe-top relative w-full overflow-hidden bg-[#082B49] text-white">
          <div className="absolute -top-[15%] left-0 h-[130%] w-full bg-[#082B49]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#123B5D] via-[#082B49] to-[#111820]" />
            <div className="absolute inset-0 opacity-55">
              <div className="skeleton-video-shimmer h-full w-full" />
            </div>
          </div>
          <div className="absolute inset-0 bg-black/24" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082B49]/42 via-[#082B49]/26 to-[#082B49]/66" />
          <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#082B49]/90 via-[#082B49]/58 to-transparent" />

          <header className="absolute left-0 right-0 top-0 z-30 px-4 pt-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-10 w-10 rounded-full bg-white/28" />
                <SkeletonBlock className="hidden h-4 w-36 rounded-full bg-white/24 sm:block" />
              </div>
              <nav className="hidden items-center gap-3 lg:flex">
                <SkeletonBlock className="h-3 w-16 rounded-full bg-white/20" />
                <SkeletonBlock className="h-3 w-20 rounded-full bg-white/20" />
                <SkeletonBlock className="h-3 w-14 rounded-full bg-white/20" />
                <SkeletonBlock className="h-3 w-24 rounded-full bg-white/20" />
              </nav>
              <SkeletonBlock className="h-10 w-28 rounded-full bg-white/18" />
            </div>
          </header>

          <div className="absolute inset-0 z-20 flex items-end justify-center pb-10 text-center sm:pb-[14vh] lg:pb-[16vh]">
            <div className="w-full px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-4xl">
                <SkeletonBlock className="mx-auto h-9 w-64 rounded-xl bg-white/30 sm:h-12 sm:w-[420px]" />
                <SkeletonBlock className="mx-auto mt-3 h-9 w-52 rounded-xl bg-white/24 sm:h-12 sm:w-80" />
                <SkeletonBlock className="mx-auto mt-6 h-4 w-11/12 max-w-xl rounded-full bg-[#F5F1E8]/30" />
                <SkeletonBlock className="mx-auto mt-3 h-4 w-8/12 max-w-md rounded-full bg-[#F5F1E8]/22" />
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:mt-7 sm:gap-3">
                  <SkeletonBlock className="h-12 w-36 rounded-full bg-[#D98928]/48" />
                  <SkeletonBlock className="h-12 w-32 rounded-full border border-white/18 bg-white/14" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative -mt-1 overflow-hidden px-4 py-8 sm:px-6 sm:py-16">
          <div className="absolute inset-0 bg-[#F5F1E8]/54" />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {[0, 1, 2, 3].map(item => (
                <div key={item} className="rounded-2xl border border-[#111820]/14 bg-white/52 p-4 shadow-[0_18px_45px_rgba(17,24,32,0.08)] sm:p-6">
                  <SkeletonBlock className="h-8 w-16 rounded-full bg-[#D98928]/30 sm:h-10" />
                  <SkeletonBlock className="mt-4 h-3 w-24 rounded-full bg-[#111820]/12" />
                  <SkeletonBlock className="mt-2 h-3 w-16 rounded-full bg-[#111820]/9" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
