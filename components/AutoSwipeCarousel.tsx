"use client";

import React, { useRef, useEffect, useState, useCallback, ReactNode, RefObject } from "react";

interface AutoSwipeOptions {
  autoPlayInterval?: number;
  pauseOnInteraction?: boolean;
  enabledOnMobileOnly?: boolean;
}

export function useAutoSwipeSlider<T extends HTMLElement = HTMLDivElement>(
  options: AutoSwipeOptions = {}
): {
  containerRef: RefObject<T | null>;
  pauseAutoSwipe: () => void;
  resumeAutoSwipe: () => void;
  touchHandlers: {
    onTouchStart: () => void;
    onTouchEnd: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
} {
  const {
    autoPlayInterval = 3500,
    pauseOnInteraction = true,
    enabledOnMobileOnly = true,
  } = options;

  const containerRef = useRef<T | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrollingRef = useRef(false);

  const resetCooldownTimer = useCallback(() => {
    if (!pauseOnInteraction) return;
    setIsInteracting(true);
    isUserScrollingRef.current = true;
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
      isUserScrollingRef.current = false;
    }, 5000);
  }, [pauseOnInteraction]);

  const pauseAutoSwipe = useCallback(() => {
    resetCooldownTimer();
  }, [resetCooldownTimer]);

  const resumeAutoSwipe = useCallback(() => {
    resetCooldownTimer();
  }, [resetCooldownTimer]);

  // Attach native scroll listener to handle manual trackpad/touch/gesture scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let handleScrollTimeout: NodeJS.Timeout | null = null;
    const onContainerScroll = () => {
      // Whenever container is scrolled manually, pause auto-swipe
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
      setIsInteracting(true);
      isUserScrollingRef.current = true;

      if (handleScrollTimeout) clearTimeout(handleScrollTimeout);
      handleScrollTimeout = setTimeout(() => {
        touchTimerRef.current = setTimeout(() => {
          setIsInteracting(false);
          isUserScrollingRef.current = false;
        }, 5000);
      }, 150);
    };

    container.addEventListener("scroll", onContainerScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onContainerScroll);
      if (handleScrollTimeout) clearTimeout(handleScrollTimeout);
    };
  }, []);

  const scrollToNext = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (enabledOnMobileOnly && window.innerWidth >= 768) return;
    if (isUserScrollingRef.current) return;

    const childrenElements = container.children;
    if (childrenElements.length === 0) return;

    const firstChild = childrenElements[0] as HTMLElement;
    const itemWidth = firstChild.offsetWidth || 280;
    const gap = 12;
    const step = itemWidth + gap;

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (currentScroll >= maxScrollLeft - 24) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  }, [enabledOnMobileOnly]);

  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      scrollToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isInteracting, autoPlayInterval, scrollToNext]);

  return {
    containerRef,
    pauseAutoSwipe,
    resumeAutoSwipe,
    touchHandlers: {
      onTouchStart: pauseAutoSwipe,
      onTouchEnd: resumeAutoSwipe,
      onMouseEnter: pauseAutoSwipe,
      onMouseLeave: resumeAutoSwipe,
    },
  };
}

interface AutoSwipeCarouselProps extends AutoSwipeOptions {
  children: ReactNode;
  className?: string;
}

export default function AutoSwipeCarousel({
  children,
  className = "",
  autoPlayInterval = 3500,
  pauseOnInteraction = true,
  enabledOnMobileOnly = true,
}: AutoSwipeCarouselProps) {
  const { containerRef, touchHandlers } = useAutoSwipeSlider<HTMLDivElement>({
    autoPlayInterval,
    pauseOnInteraction,
    enabledOnMobileOnly,
  });

  return (
    <div
      ref={containerRef}
      {...touchHandlers}
      className={`hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth ${className}`}
    >
      {children}
    </div>
  );
}
