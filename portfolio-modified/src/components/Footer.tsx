import React from "react";

export function Footer() {
  return (
    <footer className="py-12 px-gutter bg-ink border-t border-hairline">
      <div className="max-w-content mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="font-serif text-2xl tracking-widest text-bone">
            YK
          </span>
          <span className="w-[1px] h-4 bg-hairline" />
          <span className="text-caption font-mono tracking-widest text-ash uppercase">
            © {new Date().getFullYear()} Yuta Koike
          </span>
        </div>

        <div className="text-caption font-mono tracking-widest text-ash uppercase">
          Built with React
        </div>

        <div className="text-caption font-mono tracking-widest text-ash uppercase">
          Quezon City, Philippines{" "}
          <span className="text-vermilion ml-2">PHT</span>
        </div>
      </div>
    </footer>
  );
}
