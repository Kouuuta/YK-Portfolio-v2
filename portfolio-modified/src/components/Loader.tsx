import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
interface LoaderProps {
  onComplete: () => void;
}
export function Loader({ onComplete }: LoaderProps) {
  const [count, setCount] = useState(0);
  const name = "YUTA KOIKE";
  const nameChars = name.split("");
  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.floor(v)),
      onComplete: () => {
        setTimeout(onComplete, 400);
      },
    });
    return controls.stop;
  }, [onComplete]);
  return (
    <motion.div
      className="fixed inset-0 z-[99999] bg-ink flex flex-col justify-between p-6 md:p-12 overflow-hidden"
      initial={{
        y: 0,
      }}
      exit={{
        y: "-100%",
      }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Top row */}
      <div className="flex justify-between items-start w-full">
        <div className="text-bone text-xs md:text-sm uppercase tracking-widest font-mono">
          PORTFOLIO 2026 — Please Wait..
        </div>
        <div className="text-vermilion text-xs tracking-widest writing-vertical">
          ようこそ
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex justify-between items-end w-full mb-4">
        <div className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-tighter text-bone flex">
          {nameChars.map((char, index) => {
            const threshold = (index / nameChars.length) * 100;
            const isVisible = count >= threshold;
            return (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  y: isVisible ? 0 : 20,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={char === " " ? "w-4 md:w-8" : ""}
              >
                {char}
              </motion.span>
            );
          })}
        </div>
        <div className="font-serif text-6xl md:text-8xl text-bone flex items-baseline">
          {count.toString().padStart(2, "0")}
          <span className="text-2xl md:text-4xl ml-1">%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-vermilion"
        style={{
          width: `${count}%`,
        }}
      />
    </motion.div>
  );
}
