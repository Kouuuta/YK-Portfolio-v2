import React, { useEffect, useRef, useState } from "react";
import { FadeIn } from "./FadeIn";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];

const projects = [
  {
    title: "Medimarc Trading",
    type: "Website",
    desc: "A full-stack inventory and trading platform built with Django and React. Features item tracking, sales invoicing, and automated report generation.",
    year: "2025",
    link: "https://medimarc-site.vercel.app/",
    color: "#DC2626",
  },
  {
    title: "Truckin Services",
    type: "Website",
    desc: "A logistics-focused web presence for a freight and trucking company. Clean editorial layout with service breakdowns and quote request flow.",
    year: "2025",
    link: "https://truckin-website2.vercel.app/",
    color: "#818cf8",
  },
  {
    title: "Thesis",
    type: "Machine Learning",
    desc: "Our thesis focused on developing a deep learning-based waste classification system using the TrashNet Dataset and TACO Dataset datasets. We implemented and compared CNN and ResNet-based models to classify different types of waste materials and analyze their performance in both controlled and real-world environments.",
    year: "2025",
    link: "https://huggingface.co/spaces/yutakoike/waste-detection/tree/main",
    color: "#4ade80",
  },
  {
    title: "First Portfolio Design",
    type: "Website",
    desc: "",
    year: "2025",
    link: "https://yuta-koike.vercel.app/",
    color: "#fb923c",
  },
];

// ── Animated year counter ─────────────────────────────────────────────────────
function AnimatedYear({ year }: { year: string }) {
  const [display, setDisplay] = useState("····");
  const ref = useRef<HTMLSpanElement>(null);
  const observed = useRef(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shouldReduce) {
      setDisplay(year);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !observed.current) {
          observed.current = true;
          const target = parseInt(year, 10);
          const start = target - 60;
          const duration = 1200;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(String(Math.round(start + (target - start) * eased)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [year, shouldReduce]);

  return (
    <span ref={ref} className="text-xs font-mono text-vermilion tabular-nums">
      {display}
    </span>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const springX = useSpring(imgX, { stiffness: 180, damping: 22 });
  const springY = useSpring(imgY, { stiffness: 180, damping: 22 });
  const [hovered, setHovered] = useState(false);
  const shouldReduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    imgX.set((e.clientX - (rect.left + rect.width / 2)) * 0.18);
    imgY.set((e.clientY - (rect.top + rect.height / 2)) * 0.18);
  };

  const handleClick = () => {
    window.open(project.link, "_blank", "noopener,noreferrer");
  };

  return (
    <FadeIn delay={index * 0.08}>
      <motion.div
        ref={cardRef}
        className="group relative flex flex-col h-full border border-hairline bg-paper/20 overflow-hidden cursor-pointer"
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          imgX.set(0);
          imgY.set(0);
        }}
        onClick={handleClick}
        whileTap={shouldReduce ? {} : { scale: 0.985 }}
        transition={{ duration: 0.12 }}
      >
        {/* ── Top accent bar — wipes left → right ── */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[2px] bg-vermilion origin-left z-20"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />

        {/* ── Cursor-following glow behind content ── */}
        {!shouldReduce && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            style={{ x: springX, y: springY }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-[-30px]"
              style={{
                background: `radial-gradient(ellipse at center, ${project.color}18 0%, transparent 65%)`,
                filter: "blur(30px)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(#F5F2EB 1px, transparent 1px), linear-gradient(90deg, #F5F2EB 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </motion.div>
        )}

        {/* ── Card background on hover ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          animate={{
            backgroundColor: hovered
              ? "rgba(26,20,18,0.6)"
              : "rgba(26,20,18,0)",
          }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 p-8 flex flex-col h-full">
          {/* Header row */}
          <div className="flex justify-between items-start mb-10">
            <motion.div
              className="text-[10px] font-mono uppercase tracking-widest border px-2 py-1"
              animate={{
                borderColor: hovered ? project.color : "#2A2A2A",
                color: hovered ? project.color : "#6B6B6B",
              }}
              transition={{ duration: 0.2 }}
            >
              {project.type}
            </motion.div>
            <AnimatedYear year={project.year} />
          </div>

          {/* Title */}
          <motion.h3
            className="font-serif text-3xl md:text-4xl mb-5 tracking-tight leading-tight"
            animate={{ color: hovered ? "#F5F2EB" : "#F5F2EB" }}
          >
            <motion.span
              style={{ display: "inline-block" }}
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              {project.title}
            </motion.span>
          </motion.h3>

          {/* Desc */}
          <p className="text-sm text-ash leading-relaxed mb-10 flex-1">
            {project.desc}
          </p>

          {/* ── "View Project" — the real CTA ── */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-hairline">
            <motion.span
              className="text-xs font-mono uppercase tracking-widest flex items-center gap-2"
              animate={{ color: hovered ? "#F5F2EB" : "#6B6B6B" }}
              transition={{ duration: 0.18 }}
            >
              View Project
              <motion.span
                className="text-vermilion inline-block"
                animate={{ x: hovered ? 5 : 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
              >
                ↗
              </motion.span>
            </motion.span>

            {/* Dot accent */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              animate={{
                backgroundColor: hovered ? project.color : "#2A2A2A",
                scale: hovered ? 1.5 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-ink">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="flex items-end justify-between mb-20 border-b border-hairline pb-6">
            <div className="flex items-end gap-4">
              <span className="text-vermilion text-sm font-medium tracking-widest">
                作品
              </span>
              <span className="text-ash text-xs font-mono uppercase tracking-widest">
                / 04 — Academic Projects
              </span>
            </div>
            <span className="text-[10px] font-mono text-ash uppercase tracking-widest hidden md:block">
              Click any card to open ↗
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
