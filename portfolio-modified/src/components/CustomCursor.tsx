import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const TRAIL_COUNT = 8;

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Trail dots — each springs off the one before it
  const trailX = Array.from({ length: TRAIL_COUNT }, (_, i) =>
    useSpring(useMotionValue(-100), { damping: 20 + i * 5, stiffness: 300 - i * 25, mass: 0.4 + i * 0.08 })
  );
  const trailY = Array.from({ length: TRAIL_COUNT }, (_, i) =>
    useSpring(useMotionValue(-100), { damping: 20 + i * 5, stiffness: 300 - i * 25, mass: 0.4 + i * 0.08 })
  );

  // Main cursor spring (fast)
  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.forEach(x => x.set(e.clientX));
      trailY.forEach(y => y.set(e.clientY));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(
        t.tagName === 'A' || t.tagName === 'BUTTON' ||
        !!t.closest('a') || !!t.closest('button') ||
        t.getAttribute('role') === 'button'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Ink trail dots */}
      {trailX.map((x, i) => {
        const size = Math.max(3, 10 - i * 1.1);
        const opacity = 1 - i / TRAIL_COUNT;
        return (
          <motion.div
            key={i}
            className="fixed top-0 left-0 rounded-full pointer-events-none mix-blend-difference"
            style={{
              x,
              y: trailY[i],
              translateX: '-50%',
              translateY: '-50%',
              width: size,
              height: size,
              backgroundColor: i === 0 ? '#DC2626' : '#F5F2EB',
              opacity: opacity * 0.6,
              zIndex: 9990 + i,
            }}
          />
        );
      })}

      {/* Sharp dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-bone rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering ? '#DC2626' : 'transparent',
          border: isHovering ? 'none' : '1px solid #F5F2EB',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
