import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'view', 'text'
  const [isTouch, setIsTouch] = useState(true);

  // Smooth lerp coordinates for the lagging ring
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringSpringConfig = { damping: 28, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    };

    if (checkTouch()) {
      setIsTouch(true);
      return;
    }

    setIsTouch(false);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive elements
    const handleElementHover = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea, select, [role="button"]');
      if (!target) {
        setCursorType('default');
        return;
      }

      const customCursorData = target.getAttribute('data-cursor');
      if (customCursorData) {
        setCursorType(customCursorData);
      } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.getAttribute('role') === 'button') {
        setCursorType('pointer');
      } else if (target.tagName.toLowerCase() === 'input' || target.tagName.toLowerCase() === 'textarea') {
        setCursorType('text');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch) return null;

  const isView = cursorType === 'view';
  const isPointer = cursorType === 'pointer';
  const isText = cursorType === 'text';

  return (
    <>
      {/* Central Sharp Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible && !isView ? 1 : 0,
        }}
      >
        <div className="w-1.5 h-1.5 bg-[#C6FF3D] rounded-full shadow-[0_0_8px_#C6FF3D]" />
      </motion.div>

      {/* Lagging Ring / Magnetic Bubble */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center font-bold"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isView ? 88 : isPointer ? 54 : isText ? 4 : 34,
          height: isView ? 88 : isPointer ? 54 : isText ? 30 : 34,
          backgroundColor: isView
            ? '#C6FF3D'
            : isPointer
            ? 'rgba(198, 255, 61, 0.15)'
            : 'transparent',
          borderColor: isView
            ? '#C6FF3D'
            : isPointer
            ? '#C6FF3D'
            : 'rgba(255, 255, 255, 0.35)',
          borderWidth: isView ? 0 : 1.5,
          mixBlendMode: isView ? 'normal' : 'difference',
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.6
        }}
      >
        {isView && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-[#050505] font-display text-xs tracking-wider font-extrabold uppercase"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
