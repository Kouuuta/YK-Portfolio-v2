import React from "react";
export function Footer() {
  return (
    <footer className="py-12 px-6 bg-ink border-t border-hairline">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl tracking-widest text-bone">
            YK
          </span>
          <span className="w-[1px] h-4 bg-hairline"></span>
          <span className="text-[10px] font-mono tracking-widest text-ash uppercase">
            © {new Date().getFullYear()} Yuta Koike
          </span>
        </div>

        <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest text-ash">
          <span>Assisted by ClaudeAI</span>
          <span className="text-vermilion">×</span>
          <span>Built with React</span>
        </div>

        <div className="text-[10px] font-mono tracking-widest text-ash uppercase">
          Quezon City, Philippines{" "}
          <span className="text-vermilion ml-2">PHT</span>
        </div>
      </div>
    </footer>
  );
}
