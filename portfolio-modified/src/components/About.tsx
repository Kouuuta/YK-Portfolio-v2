import React, { useRef } from "react";
import { FadeIn } from "./FadeIn";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function About() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  const letterSpacing = useTransform(
    scrollYProgress,
    [0.2, 0.7],
    ["0em", "0.04em"],
  );

  return (
    <section id="about" className="py-section px-gutter bg-ink">
      <div className="max-w-content mx-auto">
        <FadeIn>
          <div className="flex items-end gap-4 mb-20 border-b border-hairline pb-6">
            <span className="text-vermilion text-sm font-medium tracking-widest">
              自己紹介
            </span>
            <span className="text-caption text-ash font-mono uppercase tracking-widest">
              / 01 — About
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <FadeIn delay={0.1}>
              <div className="font-serif text-2xl md:text-3xl lg:text-4xl text-bone leading-[1.4] tracking-tight space-y-8">
                <p>
                  Yuta is a Japanese-Filipino creative developer and a fresh
                  graduate of Computer Science specializing in Data from the
                  University of Santo Tomas, currently based in the Philippines.
                  He enjoys building modern digital experiences that combine
                  creativity, functionality, and thoughtful design.
                </p>
                <p className="text-ash">
                  Passionate about both design and development, he loves turning
                  ideas into user-friendly experiences while solving real-world
                  problems through technology. He is also interested in machine
                  learning and continuously exploring new technologies and
                  modern frameworks to grow his skills.
                </p>
                <p className="text-ash">
                  Outside of coding, he enjoys playing online games, watching
                  anime, listening to music, and going to the gym regularly to
                  maintain both physical and mental well-being.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5">
            <FadeIn delay={0.2}>
              <div className="flex flex-col">
                <FactRow label="Location" value="Quezon City, Philippines" />
                <FactRow
                  label="Currently"
                  value="Freelancing & open to other roles"
                />
                <FactRow
                  label="Focus"
                  value="Full Stack Development, Creative Designs, AI & ML"
                />
                <FactRow
                  label="Speaks"
                  value="Japanese (fluent), English (conversational), Tagalog (native)"
                />
                <FactRow label="Hobbies" value="Gym, Gaming, Anime, Trading" />
              </div>
            </FadeIn>
          </div>
        </div>

        <div
          ref={quoteRef}
          className="mt-32 pt-16 border-t border-hairline text-center overflow-hidden"
        >
          <motion.div style={{ y }}>
            <motion.h3
              className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-bone tracking-tight max-w-4xl mx-auto leading-tight"
              style={{ letterSpacing }}
            >
              "Design is not just what it looks like and feels like. Design is
              how it works."
            </motion.h3>
            <motion.div
              className="mt-8 text-caption font-mono text-ash uppercase"
              style={{ letterSpacing }}
            >
              — Steve Jobs
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="group grid grid-cols-3 gap-4 py-6 border-t border-hairline items-start transition-colors hover:bg-surface/40 px-4 -mx-4">
      <div className="col-span-1 text-caption font-mono uppercase tracking-widest text-ash pt-1">
        {label}
      </div>
      <div className="col-span-2 text-sm text-bone leading-relaxed text-right md:text-left group-hover:text-bone-dark transition-colors">
        {value}
      </div>
    </div>
  );
}
