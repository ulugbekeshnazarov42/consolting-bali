"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_TIMEOUT_OFFSET = 100;
const MIN_SCROLL_INTERVAL = 300;
const SCROLL_THRESHOLD = 20;
const TOUCH_SCROLL_THRESHOLD = 100;
const SCALE_FACTOR = 0.08;
const MIN_SCALE = 0.08;
const MAX_SCALE = 2;
const HOVER_SCALE_MULTIPLIER = 1.02;
/** Kartadan keyingi joy + pastki navigatsiya uchun */
const CARD_PADDING = 148;

interface CardItem {
  avatar: string;
  handle: string;
  href: string;
  id: string;
  image: string;
  name: string;
}

export interface ScrollableCardStackProps {
  cardHeight?: number;
  /** Kartaning kengligi (Tailwind klasslari), masalan responsive min() */
  cardWidthClassName?: string;
  className?: string;
  items: CardItem[];
  perspective?: number;
  transitionDuration?: number;
  /** Oldingi / keyingi tugmalari (dots ustida) */
  showArrowNav?: boolean;
}

const defaultCardWidth =
  "w-[min(100vw-2rem,640px)] sm:w-[min(100vw-2.5rem,700px)] md:w-[min(100vw-3rem,760px)] lg:w-[min(100vw-4rem,880px)]";

/** Orqa kartalarning yuqori chetidagi rang — stek chuqurligi */
const CARD_STACK_RIM = [
  "border-t-teal-500/55",
  "border-t-sky-400/50",
  "border-t-rose-400/48",
  "border-t-amber-400/45",
  "border-t-emerald-500/48",
] as const;

const ScrollableCardStack: React.FC<ScrollableCardStackProps> = ({
  items,
  cardHeight = 384,
  cardWidthClassName,
  perspective = 1000,
  transitionDuration = 180,
  className,
  showArrowNav = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useMotionValue(0);
  const lastScrollTime = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Calculate the total number of items
  const totalItems = items.length;
  const maxIndex = totalItems - 1;

  // Constants for visual effects - matching reference code exactly
  const FRAME_OFFSET = -30;
  const FRAMES_VISIBLE_LENGTH = 3;
  const SNAP_DISTANCE = 50;

  // Clamp function from reference code - memoized to prevent recreation
  const clamp = useCallback(
    (val: number, [min, max]: [number, number]): number =>
      Math.min(Math.max(val, min), max),
    []
  );

  // Controlled scroll function to move exactly one card
  const scrollToCard = useCallback(
    (direction: 1 | -1) => {
      if (isScrolling) {
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      if (timeSinceLastScroll < MIN_SCROLL_INTERVAL) {
        return;
      }

      const newIndex = clamp(currentIndex + direction, [0, maxIndex]);

      if (newIndex !== currentIndex) {
        lastScrollTime.current = now;
        setIsScrolling(true);
        setCurrentIndex(newIndex);
        scrollY.set(newIndex * SNAP_DISTANCE);

        setTimeout(() => {
          setIsScrolling(false);
        }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
      }
    },
    [currentIndex, maxIndex, scrollY, isScrolling, transitionDuration, clamp]
  );

  // Handle scroll events with improved responsiveness
  const handleScroll = useCallback(
    (deltaY: number) => {
      if (isDragging || isScrolling) {
        return;
      }

      if (Math.abs(deltaY) < SCROLL_THRESHOLD) {
        return;
      }

      const scrollDirection = deltaY > 0 ? 1 : -1;
      scrollToCard(scrollDirection);
    },
    [isDragging, isScrolling, scrollToCard]
  );

  // Handle wheel events
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    },
    [handleScroll]
  );

  // Handle keyboard navigation - improved with reference code logic
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isScrolling) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft": {
          e.preventDefault();
          scrollToCard(-1);
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          e.preventDefault();
          scrollToCard(1);
          break;
        }
        case "Home": {
          e.preventDefault();
          if (currentIndex !== 0) {
            setIsScrolling(true);
            setCurrentIndex(0);
            scrollY.set(0);
            setTimeout(() => {
              setIsScrolling(false);
            }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        case "End": {
          e.preventDefault();
          if (currentIndex !== maxIndex) {
            setIsScrolling(true);
            setCurrentIndex(maxIndex);
            scrollY.set(maxIndex * SNAP_DISTANCE);
            setTimeout(() => {
              setIsScrolling(false);
            }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
          }
          break;
        }
        default: {
          // No action for other keys
          break;
        }
      }
    },
    [
      currentIndex,
      maxIndex,
      scrollY,
      isScrolling,
      scrollToCard,
      transitionDuration,
    ]
  );

  // Handle touch events for mobile
  const touchStartY = useRef(0);
  const touchStartIndex = useRef(0);
  const touchStartTime = useRef(0);
  const touchMoved = useRef(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartIndex.current = currentIndex;
      touchStartTime.current = Date.now();
      touchMoved.current = false;
      setIsDragging(true);
    },
    [currentIndex]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || isScrolling) {
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      if (Math.abs(deltaY) > TOUCH_SCROLL_THRESHOLD && !touchMoved.current) {
        const scrollDirection = deltaY > 0 ? 1 : -1;
        scrollToCard(scrollDirection);
        touchMoved.current = true;
      }
    },
    [isDragging, isScrolling, scrollToCard]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchMoved.current = false;
  }, []);

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // Snap to current index when not dragging
  useEffect(() => {
    if (!isDragging) {
      scrollY.set(currentIndex * SNAP_DISTANCE);
    }
  }, [currentIndex, isDragging, scrollY]);

  // Calculate transform for each card based on the reference code
  const getCardTransform = useCallback(
    (index: number) => {
      const offsetIndex = index - currentIndex;

      // Apply blur effect for cards behind the current one - matching reference exactly
      const isBehindCurrent = currentIndex > index;
      const blur = !shouldReduceMotion && isBehindCurrent ? 2 : 0;

      // Opacity based on distance - improved logic from reference
      const opacity = currentIndex > index ? 0 : 1;

      // Scale with improved calculation inspired by reference - using clamp function
      const scale = shouldReduceMotion
        ? 1
        : clamp(1 - offsetIndex * SCALE_FACTOR, [MIN_SCALE, MAX_SCALE]);

      // Vertical offset with improved calculation - matching reference exactly
      const y = shouldReduceMotion
        ? 0
        : clamp(offsetIndex * FRAME_OFFSET, [
            FRAME_OFFSET * FRAMES_VISIBLE_LENGTH,
            Number.POSITIVE_INFINITY,
          ]);

      // Z-index for proper layering - matching reference pattern
      const zIndex = items.length - index;

      return {
        y,
        scale,
        opacity,
        blur,
        zIndex,
      };
    },
    [currentIndex, items.length, clamp, shouldReduceMotion]
  );

  return (
    <section
      aria-atomic="true"
      aria-label="Scrollable card stack"
      aria-live="polite"
      className={cn(
        "relative mx-auto h-fit w-fit min-w-[300px] overflow-visible pb-6",
        className
      )}
    >
      {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Interactive scrollable widget requires event handlers */}
      <div
        aria-label="Scrollable card container"
        className="h-full w-full overflow-visible"
        onKeyDown={handleKeyDown}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        ref={containerRef}
        role="application"
        style={{
          minHeight: `${cardHeight + CARD_PADDING}px`, // Add some padding for the card stack effect
          perspective: `${perspective}px`,
          perspectiveOrigin: "center 60%",
          touchAction: "none",
        }}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Required for keyboard navigation
        tabIndex={0}
      >
        {items.map((item, i) => {
          const transform = getCardTransform(i);
          const isActive = i === currentIndex;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              animate={
                shouldReduceMotion
                  ? { x: "-50%" }
                  : {
                      y: `calc(-50% + ${transform.y}px)`,
                      scale: transform.scale,
                      x: "-50%",
                    }
              }
              aria-hidden={!isActive}
              className={cn(
                "absolute top-1/2 left-1/2 max-w-[min(100vw-1rem,900px)] overflow-hidden rounded-[1.35rem] border border-border/55 bg-background shadow-[0_20px_50px_-24px_color-mix(in_oklch,var(--foreground)_35%,transparent)]",
                isActive
                  ? "rounded-[1.45rem] border-border/50 shadow-2xl shadow-primary/15 ring-1 ring-white/12 dark:ring-white/8"
                  : cn(
                      "border-t-[3px]",
                      CARD_STACK_RIM[i % CARD_STACK_RIM.length]
                    ),
                cardWidthClassName ?? defaultCardWidth
              )}
              data-active={isActive}
              initial={false}
              key={`scrollable-card-${item.id}`}
              onBlur={() => setHoveredIndex(null)}
              onFocus={() => isActive && setHoveredIndex(i)}
              onMouseEnter={() => isActive && setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                height: `${cardHeight}px`,
                zIndex: transform.zIndex,
                pointerEvents: isActive ? "auto" : "none",
                transformOrigin: "center center",
                willChange: shouldReduceMotion
                  ? undefined
                  : "transform, opacity",
                filter: `blur(${transform.blur}px)`,
                opacity: transform.opacity,
                transitionProperty: shouldReduceMotion
                  ? "none"
                  : "opacity, filter",
                transitionDuration: shouldReduceMotion ? "0ms" : "200ms",
                transitionTimingFunction:
                  "cubic-bezier(0.645, 0.045, 0.355, 1)",
                // Dynamic border width based on scale - from reference code
                borderWidth: `${2 / transform.scale}px`,
              }}
              tabIndex={isActive ? 0 : -1}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring" as const,
                      stiffness: 250,
                      damping: 20,
                      mass: 0.5,
                      duration: 0.25,
                    }
              }
              whileHover={
                shouldReduceMotion || !isActive
                  ? {}
                  : {
                      scale: transform.scale * HOVER_SCALE_MULTIPLIER,
                      transition: {
                        type: "spring" as const,
                        stiffness: 250,
                        damping: 20,
                        mass: 0.5,
                        duration: 0.25,
                      },
                    }
              }
            >
              {/* Card Content */}
              <div
                className={cn(
                  "flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[inherit] bg-background transition-[box-shadow] duration-300",
                  isHovered && isActive && "shadow-inner",
                  isScrolling && isActive && "ring-2 ring-primary/45 ring-offset-2 ring-offset-background"
                )}
                style={{ height: `${cardHeight}px` }}
              >
                {isScrolling && isActive && (
                  <div className="absolute top-2 left-1/2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_color-mix(in_oklch,var(--primary)_70%,transparent)]" />
                )}

                <div className="relative w-full flex-1 overflow-hidden">
                  <img
                    alt={`${item.name}'s card`}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out",
                      isActive && isHovered && "scale-[1.03]"
                    )}
                    decoding="async"
                    draggable={false}
                    height={cardHeight}
                    src={item.image}
                    style={{
                      zIndex: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                    width={960}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/55 via-black/10 to-transparent dark:from-black/65"
                    aria-hidden
                  />
                </div>

                <a
                  aria-label={`${item.name} — batafsil`}
                  className={cn(
                    "relative z-[3] flex min-h-[3.25rem] items-center gap-3 border-t border-white/10 px-4 py-3.5 no-underline",
                    "bg-gradient-to-t from-foreground via-foreground/96 to-foreground/92 text-background",
                    "transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.99]"
                  )}
                  href={item.href}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                >
                  <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-background/15 ring-2 ring-background/25">
                    <img
                      alt=""
                      aria-hidden
                      className="size-full object-cover"
                      decoding="async"
                      height={36}
                      src={item.avatar}
                      width={36}
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate font-heading text-sm font-bold tracking-tight">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-medium text-background/75">
                      {item.handle}
                    </span>
                  </span>
                </a>
              </div>
            </motion.div>
          );
        })}

        {/* Oldingi / keyingi + nuqtalar — kartadan pastroq */}
        <div
          className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 translate-y-[55%] flex-col items-center gap-3 sm:translate-y-[60%]"
        >
          {showArrowNav && (
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                aria-label="Oldingi kartochka"
                disabled={currentIndex <= 0 || isScrolling}
                onClick={() => scrollToCard(-1)}
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-card/90 text-foreground shadow-lg backdrop-blur-md transition-all sm:size-11",
                  "hover:border-primary/45 hover:bg-primary/10 hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "disabled:pointer-events-none disabled:opacity-30"
                )}
              >
                <ChevronLeft className="size-5" aria-hidden strokeWidth={2.25} />
              </button>
              <button
                type="button"
                aria-label="Keyingi kartochka"
                disabled={currentIndex >= maxIndex || isScrolling}
                onClick={() => scrollToCard(1)}
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full border border-border/60 bg-card/90 text-foreground shadow-lg backdrop-blur-md transition-all sm:size-11",
                  "hover:border-primary/45 hover:bg-primary/10 hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "disabled:pointer-events-none disabled:opacity-30"
                )}
              >
                <ChevronRight className="size-5" aria-hidden strokeWidth={2.25} />
              </button>
            </div>
          )}
          <div
            aria-label="Card navigation"
            className="flex flex-wrap justify-center gap-2.5 px-2"
            role="tablist"
          >
            {Array.from({ length: items.length }, (_, i) => (
              <motion.button
                aria-label={`Go to card ${i + 1} of ${items.length}`}
                aria-selected={i === currentIndex}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  i === currentIndex
                    ? "w-8 bg-primary shadow-[0_0_14px_-2px_color-mix(in_oklch,var(--primary)_60%,transparent)] sm:w-9"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                key={`scrollable-indicator-${items[i]?.id || i}`}
                onClick={() => {
                  if (i !== currentIndex && !isScrolling) {
                    setIsScrolling(true);
                    setCurrentIndex(i);
                    scrollY.set(i * SNAP_DISTANCE);
                    setTimeout(() => {
                      setIsScrolling(false);
                    }, transitionDuration + SCROLL_TIMEOUT_OFFSET);
                  }
                }}
                role="tab"
                transition={{
                  type: "spring" as const,
                  stiffness: 250,
                  damping: 20,
                  mass: 0.5,
                }}
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Instructions for screen readers */}
        <div aria-live="polite" className="sr-only">
          {`Card ${currentIndex + 1} of ${items.length} selected. Use the previous and next buttons, arrow keys, or the dots below.`}
        </div>
      </div>
    </section>
  );
};

export default ScrollableCardStack;
