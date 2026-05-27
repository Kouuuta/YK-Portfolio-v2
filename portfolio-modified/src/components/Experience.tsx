import React from "react";
import { FadeIn } from "./FadeIn";
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
    period: "Feb 2026 - May 2026 ",
    desc: "Completed intensive training in SAP BTP, gaining hands-on experience in development, integration, and cloud-based solutions while applying SAP S/4HANA concepts such as Procure-to-Pay (P2P) and Materials Management (MM), along with cloud architecture and data integration strategies.",
    tech: ["SAP", "Postman"],
  },
  {
    role: "Full Stack Developer",
    company: "Medimarc Trading",
    period: "Jan 2024 - May 2025",
    desc: "Developed a full-stack inventory system with item tracking, sales invoicing, and automated reporting, while also designing a static company website and applying SEO best practices to improve online visibility and client credibility.",
    tech: ["Django", "React", "Vite", "javascript"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-ink">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="flex items-end gap-4 mb-20 border-b border-hairline pb-6">
            <span className="text-vermilion text-sm font-medium tracking-widest">
              経歴
            </span>
            <span className="text-ash text-xs font-mono uppercase tracking-widest">
              / 02 — Experience & Academic
            </span>
          </div>
        </FadeIn>

        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 py-12 border-b border-hairline hover:bg-paper/30 transition-colors -mx-6 px-6 md:mx-0 md:px-4">
                {/* Period & Company */}
                <div className="md:col-span-3 flex flex-col gap-2">
                  <div className="text-xs font-mono text-ash uppercase tracking-widest">
                    {exp.period}
                  </div>
                  <div className="text-sm font-medium text-bone">
                    {exp.company}
                  </div>
                </div>

                {/* Role & Desc */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  <h3 className="font-serif text-3xl text-bone group-hover:text-vermilion transition-colors tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-ash text-sm leading-relaxed max-w-lg">
                    {exp.desc}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="md:col-span-3 flex flex-wrap gap-2 content-start">
                  {exp.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-ash border border-hairline px-2 py-1 uppercase tracking-widest bg-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
