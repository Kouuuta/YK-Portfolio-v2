import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
}

export function Marquee({ text, direction = 'left' }: MarqueeProps) {
  const repeatedText = Array(10).fill(text).join(' ・ ');

  return (
    <div className="w-full overflow-hidden border-y border-hairline py-6 bg-ink flex whitespace-nowrap">
      <motion.div
        className="font-serif italic text-4xl md:text-6xl text-bone tracking-tight pr-8"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {repeatedText}
      </motion.div>
      <motion.div
        className="font-serif italic text-4xl md:text-6xl text-bone tracking-tight pr-8"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        {repeatedText}
      </motion.div>
    </div>
  );
}
