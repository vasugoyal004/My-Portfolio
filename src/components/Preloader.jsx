import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const name = "VASU GOYAL";

  useEffect(() => {
    // Counter animation from 0 to 100
    const duration = 2000; // ms
    const stepTime = 20; // update frequency
    const steps = duration / stepTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Exponential curve for realistic counter feel
      const easedProgress = Math.pow(progress, 2.2);
      const currentVal = Math.min(100, Math.round(easedProgress * 100));
      setCount(currentVal);

      if (currentStep >= steps) {
        clearInterval(interval);
        setCount(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }, 300);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
          className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Info */}
          <div className="flex justify-between items-center text-xs tracking-widest uppercase text-[#71717A] font-heading z-10">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping" />
              SYSTEM LOAD // PORTFOLIO 2026
            </span>
            <span>EDITION 3.5+</span>
          </div>

          {/* Center Name Letter-by-Letter Reveal */}
          <div className="my-auto z-10">
            <div className="overflow-hidden mb-4">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tighter text-[#FFFFFF] flex flex-wrap">
                {name.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1 + index * 0.07,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={char === ' ' ? 'mr-4' : ''}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xs sm:text-sm font-heading tracking-widest text-[#C6FF3D] uppercase"
            >
              FULL-STACK DEVELOPER & WEB ARCHITECT
            </motion.p>
          </div>

          {/* Bottom Counter & Progress Bar */}
          <div className="z-10">
            <div className="flex justify-between items-end mb-4">
              <div className="font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-white tabular-nums">
                {count < 10 ? `0${count}` : count}
                <span className="text-2xl sm:text-4xl text-[#C6FF3D] font-normal ml-1">%</span>
              </div>
              <div className="text-right text-xs tracking-widest text-[#71717A] uppercase font-heading hidden sm:block">
                PREPARING FLUID EXPERIENCE
              </div>
            </div>

            {/* Accent Progress Line */}
            <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#C6FF3D] shadow-[0_0_12px_#C6FF3D]"
                style={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
