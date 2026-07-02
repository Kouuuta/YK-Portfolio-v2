import React, { useEffect, useState } from "react";
import { FadeIn } from "./FadeIn";
import { MagneticButton } from "./MagneticButton";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const socials = [
  { name: "Instagram", url: "https://www.instagram.com/ykoike_/" },
  { name: "GitHub", url: "https://github.com/Kouuuta" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/yuta-koike-1139b8301/",
  },
  { name: "Facebook", url: "https://www.facebook.com/yuta.koike.14811/" },
];

const WORDS = ["exceptional", "memorable", "accurate", "unique"];
const INTERVAL = 2600;

function CyclingWord() {
  const [index, setIndex] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const word = WORDS[index];

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
    <span className="inline-block overflow-hidden align-baseline">
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
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        animate={{ backgroundColor: hovered ? "#DC2626" : "#2A2A2A" }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

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
        className="relative text-caption font-mono uppercase tracking-widest"
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
      className="py-section px-gutter bg-surface border-t border-hairline"
    >
      <div className="max-w-content mx-auto">
        <FadeIn>
          <div className="flex items-end gap-4 mb-20 border-b border-hairline pb-6">
            <span className="text-vermilion text-sm font-medium tracking-widest">
              連絡
            </span>
            <span className="text-caption text-ash font-mono uppercase tracking-widest">
              / 05 — Contact
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-5xl md:text-7xl text-bone tracking-tighter leading-[1.1] mb-8">
              Let's build something <CyclingWord /> together.
            </h2>

            <p className="text-body text-ash max-w-md mb-12">
              Currently accepting freelance projects and discussing full-time
              opportunities for Q3 2026.
            </p>

            <MagneticButton className="bg-bone text-ink px-8 py-4 font-medium hover:bg-vermilion hover:text-bone transition-colors uppercase tracking-widest text-sm rounded-lg">
              <a
                href="mailto:yuta.koike.cs@gmail.com"
                className="block"
              >
                yuta.koike.cs@gmail.com
              </a>
            </MagneticButton>
          </FadeIn>

          <FadeIn
            delay={0.2}
            className="md:justify-self-end w-full md:max-w-sm"
          >
            <div className="flex flex-col">
              <span className="text-caption font-mono uppercase tracking-widest text-ash mb-6">
                Socials
              </span>
              {socials.map((s, i) => (
                <SocialLink key={s.name} name={s.name} url={s.url} index={i} />
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
