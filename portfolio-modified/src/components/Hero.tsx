import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const KANJI =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const NAME = "Yuta Koike";

function ScrambleName() {
  const [display, setDisplay] = useState(() => NAME.split("").map(() => " "));
  const resolved = useRef<boolean[]>(NAME.split("").map(() => false));
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let elapsed = 0;
    const totalDuration = 1800; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);

      setDisplay(
        NAME.split("").map((char, i) => {
          const charThreshold = (i / NAME.length) * 0.85;
          if (char === " ") return " ";
          if (progress >= charThreshold && !resolved.current[i]) {
            resolved.current[i] = true;
          }
          if (resolved.current[i]) return char;
          return KANJI[Math.floor(Math.random() * KANJI.length)];
        }),
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    // Delay scramble start slightly so it hits after fade-in begins
    const timeout = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, 500);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <span className="inline-flex flex-wrap -ml-1">
      {display.map((char, i) => (
        <span
          key={i}
          className={char === " " ? "inline-block w-[0.35em]" : "inline-block"}
          style={{
            color: NAME[i] !== char ? "#DC262688" : "#F5F2EB",
            transition: NAME[i] === char ? "color 0.1s" : "none",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

function MagneticLetter({ char, index }: { char: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 140;

      if (dist < radius) {
        const force = (1 - dist / radius) * 28;
        x.set((dx / dist) * force * -1);
        y.set((dy / dist) * force * -1);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (char === " ") return <span className="inline-block w-[0.3em]" />;

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x: springX, y: springY }}
    >
      {char}
    </motion.span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 overflow-hidden bg-ink"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-vermilion/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex flex-col items-start">
        {/* Top Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mb-8 flex justify-between w-full items-start"
        >
          <span className="text-xs font-medium text-ash uppercase tracking-widest flex items-center gap-2">
            Designer <span className="text-vermilion">×</span> Developer{" "}
            <span className="w-1 h-1 rounded-full bg-hairline mx-1"></span>{" "}
            Quezon City, Philppines
          </span>
          <span className="text-vermilion text-xs tracking-widest writing-vertical opacity-60 hidden md:block">
            小池 ユウタ
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="text-[15vw] md:text-[12rem] lg:text-[14rem] font-serif leading-[0.85] tracking-tighter text-bone -ml-2 md:-ml-4 select-none"
        >
          <ScrambleName />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mt-8 text-2xl md:text-3xl lg:text-4xl text-ash font-serif italic max-w-3xl"
        >
          I enjoy building things that look good and actually work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="w-full h-[1px] bg-hairline mt-16 mb-6 origin-left"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="w-full flex flex-wrap justify-between gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-ash"
        >
          <span>Available — From 2026</span>
          <span>Fresh Graduate</span>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mt-24 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
        >
          <a
            href="#projects"
            className="group flex items-center gap-4 cursor-pointer w-max"
          >
            <span className="font-serif text-3xl md:text-5xl text-bone group-hover:text-vermilion transition-colors tracking-tight">
              See selected work
            </span>
            <motion.span
              className="text-3xl md:text-5xl text-vermilion font-serif"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </a>

          <div className="md:justify-self-end max-w-sm">
            <p className="text-sm text-ash leading-relaxed">
              Building clean, thoughtful, and user-focused digital experiences
              with a passion for creativity and technology.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-6 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-16 bg-hairline relative overflow-hidden">
          <motion.div
            className="w-full h-1/3 bg-vermilion absolute top-0 left-0"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
