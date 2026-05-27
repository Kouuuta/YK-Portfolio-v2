import React, { useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";
import { MagneticButton } from "./MagneticButton";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const socials = [
  { name: "Instagram", url: "https://instagram.com/yutakoike_design" },
  { name: "GitHub", url: "https://github.com/Kouuuta" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yuta-koike-1139b8301/",
  },
  { name: "Facebook", url: "https://facebook.com/yuta" },
];

// The four rotating adjectives — chosen to be visually distinct in length
const WORDS = ["exceptional", "memorable", "accurate", "unique"];
const INTERVAL = 2600; // ms

const EASE = [0.76, 0, 0.24, 1] as const;

function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      // after exit completes (320ms), swap word and re-enter
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 340);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const word = WORDS[index];

  // Reduced motion: just a quick opacity swap
  if (shouldReduce) {
    return (
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="italic text-ash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    );
  }

  return (
    // Overflow hidden clips the wipe — inline-block so it wraps naturally
    <span
      className="inline-block overflow-hidden align-baseline"
      style={{ verticalAlign: "baseline" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={word}
          className="inline-block italic"
          style={{ color: "#6B6B6B" }}
          initial={{
            clipPath: "inset(100% 0% 0% 0%)",
            y: "40%",
            opacity: 0,
          }}
          animate={{
            clipPath: "inset(0% 0% 0% 0%)",
            y: "0%",
            opacity: 1,
          }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            y: "-40%",
            opacity: 0,
          }}
          transition={{
            duration: 0.32,
            ease: EASE,
          }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// ── Glitch text ───────────────────────────────────────────────────────────────
function GlitchText({ text }: { text: string }) {
  return (
    <span className="glitch-wrap" data-text={text}>
      {text}
    </span>
  );
}

// ── Social row — stagger + precise hover ─────────────────────────────────────
function SocialLink({
  name,
  url,
  index,
}: {
  name: string;
  url: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-baseline justify-between gap-12 pb-4 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.4,
        delay: 0.1 + index * 0.07,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* Hairline — animates color */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        animate={{ backgroundColor: hovered ? "#DC2626" : "#2A2A2A" }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {/* Vermilion fill that wipes across from left on hover */}
      {!shouldReduce && (
        <motion.div
          className="absolute inset-0 bg-vermilion/5 origin-left"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
        />
      )}

      <motion.span
        className="relative font-serif text-2xl"
        animate={{ color: hovered ? "#DC2626" : "#F5F2EB", x: hovered ? 4 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        {name}
      </motion.span>

      <motion.span
        className="relative text-xs font-mono uppercase tracking-widest"
        animate={{
          color: hovered ? "#DC2626" : "#6B6B6B",
          x: hovered ? 4 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        ↗
      </motion.span>
    </motion.a>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="py-40 px-6 bg-paper border-t border-hairline"
    >
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="flex items-end gap-4 mb-20 border-b border-hairline pb-6">
            <span className="text-vermilion text-sm font-medium tracking-widest">
              連絡
            </span>
            <span className="text-ash text-xs font-mono uppercase tracking-widest">
              / 05 — Contact
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            {/* Headline with cycling word */}
            <h2 className="font-serif text-5xl md:text-7xl text-bone tracking-tighter leading-[1.1] mb-8">
              Let's build something <CyclingWord /> together.
            </h2>

            <p className="text-ash text-lg max-w-md mb-12">
              Currently accepting freelance projects and discussing full-time
              opportunities for Q3 2026.
            </p>

            <MagneticButton className="bg-bone text-ink px-8 py-4 font-medium hover:bg-vermilion hover:text-bone transition-colors uppercase tracking-widest text-sm">
              <a href="mailto:yuta.koike.cs@gmail.com">
                <GlitchText text="yuta.koike.cs@gmail.com" />
              </a>
            </MagneticButton>
          </FadeIn>

          <FadeIn
            delay={0.2}
            className="md:justify-self-end w-full md:max-w-sm"
          >
            <div className="flex flex-col">
              <span className="text-xs font-mono uppercase tracking-widest text-ash mb-6">
                Socials
              </span>
              {socials.map((s, i) => (
                <SocialLink key={s.name} name={s.name} url={s.url} index={i} />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        .glitch-wrap {
          position: relative;
          display: inline-block;
        }
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
        }
        .glitch-wrap::before {
          color: #DC2626;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          transform: translateX(-3px);
        }
        .glitch-wrap::after {
          color: #818cf8;
          clip-path: polygon(0 55%, 100% 55%, 100% 75%, 0 75%);
          transform: translateX(3px);
        }
        @media (hover: hover) and (pointer: fine) {
          .glitch-wrap:hover::before {
            opacity: 1;
            animation: glitch-before 0.4s steps(2) infinite;
          }
          .glitch-wrap:hover::after {
            opacity: 1;
            animation: glitch-after 0.4s steps(2) infinite 0.05s;
          }
        }
        @keyframes glitch-before {
          0%   { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translateX(-3px); }
          25%  { clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); transform: translateX(2px); }
          50%  { clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%); transform: translateX(-2px); }
          75%  { clip-path: polygon(0 70%, 100% 70%, 100% 90%, 0 90%); transform: translateX(3px); }
          100% { clip-path: polygon(0 35%, 100% 35%, 100% 55%, 0 55%); transform: translateX(-1px); }
        }
        @keyframes glitch-after {
          0%   { clip-path: polygon(0 50%, 100% 50%, 100% 65%, 0 65%); transform: translateX(3px); }
          25%  { clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%); transform: translateX(-3px); }
          50%  { clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%); transform: translateX(2px); }
          75%  { clip-path: polygon(0 40%, 100% 40%, 100% 60%, 0 60%); transform: translateX(-2px); }
          100% { clip-path: polygon(0 5%,  100% 5%,  100% 20%, 0 20%); transform: translateX(1px); }
        }
      `}</style>
    </section>
  );
}
