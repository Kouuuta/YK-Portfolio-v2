import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const KANJI =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const NAME = "Yuta Koike";

function ScrambleName() {
  const [display, setDisplay] = useState(() => NAME.split("").map(() => " "));
  const resolved = useRef<boolean[]>(NAME.split("").map(() => false));
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let elapsed = 0;
    const totalDuration = 1800;
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

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center px-gutter pt-20 pb-12 overflow-hidden bg-ink"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-vermilion/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-content mx-auto w-full relative z-10 flex flex-col items-start">
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
          <span className="text-caption text-ash uppercase tracking-widest flex items-center gap-2">
            Designer <span className="text-vermilion">×</span> Developer{" "}
            <span className="w-1 h-1 rounded-full bg-hairline mx-1" />{" "}
            Quezon City, Philippines
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
          className="text-display font-serif text-bone -ml-2 md:-ml-4 select-none"
        >
          <ScrambleName />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mt-8 text-subheading text-ash font-serif italic max-w-3xl"
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
          className="w-full flex flex-wrap justify-between gap-4 text-caption font-mono uppercase tracking-widest text-ash"
        >
          <span>Available — From 2026</span>
          <span>Fresh Graduate</span>
        </motion.div>

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
            <p className="text-body text-ash leading-relaxed">
              Building clean, thoughtful, and user-focused digital experiences
              with a passion for creativity and technology.
            </p>
          </div>
        </motion.div>
      </div>

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
