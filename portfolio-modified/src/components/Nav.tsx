import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["about", "experience", "stack", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const links = [
    { name: "About", id: "about", num: "01" },
    { name: "Experience", id: "experience", num: "02" },
    { name: "Stack", id: "stack", num: "03" },
    { name: "Projects", id: "projects", num: "04" },
    { name: "Contact", id: "contact", num: "05" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-hairline/60 py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-content mx-auto px-gutter flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={(e) => scrollTo(e as any, "top")}
        >
          <span className="font-serif text-2xl tracking-widest text-bone">
            YK
          </span>
          <span className="w-[1px] h-4 bg-hairline" />
          <span className="text-label text-ash uppercase hidden sm:block">
            Yuta Koike
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className="relative group flex items-baseline gap-1.5 py-2"
                aria-label={`Navigate to ${link.name}`}
              >
                <span className="text-[10px] font-mono text-vermilion">
                  {link.num}
                </span>
                <span
                  className={`text-sm font-medium transition-colors uppercase tracking-widest ${
                    isActive ? "text-bone" : "text-ash group-hover:text-bone"
                  }`}
                >
                  {link.name}
                </span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1px] bg-vermilion origin-left transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        <a
          href="/Yuta Koike_Resume.pdf"
          download="Yuta Koike_Resume.pdf"
          className="group flex items-center gap-2 border border-hairline rounded-full px-4 py-1.5 bg-surface/50 hover:border-vermilion hover:bg-vermilion/10 transition-all duration-300"
          aria-label="Download Resume PDF"
        >
          <motion.span
            className="text-vermilion text-xs"
            animate={{ y: [0, 1.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
          <span className="text-label text-bone font-medium group-hover:text-vermilion transition-colors uppercase">
            Resume
          </span>
        </a>
      </div>
    </motion.nav>
  );
}
