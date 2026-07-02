import React from "react";
import { FadeIn } from "./FadeIn";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Developer Intern",
    company: "Mind You",
    period: "May 2026 — Present",
    desc: "",
    tech: ["Figma", "React", "Tailwind", "Framer Motion"],
  },
  {
    role: "SAP Academy Delegate",
    company: "Accenture PH",
    period: "Feb 2026 — May 2026",
    desc: "Completed intensive training in SAP BTP, gaining hands-on experience in development, integration, and cloud-based solutions while applying SAP S/4HANA concepts such as Procure-to-Pay (P2P) and Materials Management (MM), along with cloud architecture and data integration strategies.",
    tech: ["SAP", "Postman"],
  },
  {
    role: "Full Stack Developer",
    company: "Medimarc Trading",
    period: "Jan 2024 — May 2025",
    desc: "Developed a full-stack inventory system with item tracking, sales invoicing, and automated reporting, while also designing a static company website and applying SEO best practices to improve online visibility and client credibility.",
    tech: ["Django", "React", "Vite", "JavaScript"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-section px-gutter bg-ink">
      <div className="max-w-content mx-auto">
        <FadeIn>
          <div className="flex items-end gap-4 mb-20 border-b border-hairline pb-6">
            <span className="text-vermilion text-sm font-medium tracking-widest">
              経歴
            </span>
            <span className="text-caption text-ash font-mono uppercase tracking-widest">
              / 02 — Experience & Academic
            </span>
          </div>
        </FadeIn>

        <div className="flex flex-col relative">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <motion.div
                className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-12 border-b border-hairline hover:bg-surface/40 transition-colors -mx-6 px-6 md:mx-0 md:px-6 relative"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="md:col-span-3 flex flex-col gap-2">
                  <div className="text-caption font-mono text-ash uppercase tracking-widest">
                    {exp.period}
                  </div>
                  <div className="text-sm font-medium text-bone-dark">
                    {exp.company}
                  </div>
                </div>

                <div className="md:col-span-6 flex flex-col gap-4">
                  <h3 className="font-serif text-3xl text-bone group-hover:text-vermilion transition-colors tracking-tight">
                    {exp.role}
                  </h3>
                  {exp.desc && (
                    <p className="text-body text-ash leading-relaxed max-w-lg">
                      {exp.desc}
                    </p>
                  )}
                </div>

                <div className="md:col-span-3 flex flex-wrap gap-2 content-start">
                  {exp.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-label font-mono text-ash border border-hairline px-2.5 py-1 uppercase tracking-widest bg-ink rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
