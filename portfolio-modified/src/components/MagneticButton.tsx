import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function MagneticButton({
  children,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    const max = 4;
    const x = Math.max(-max, Math.min(max, middleX * 0.15));
    const y = Math.max(-max, Math.min(max, middleY * 0.15));
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
