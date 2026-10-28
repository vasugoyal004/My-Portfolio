import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Shield, Terminal, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { isCream } = useTheme();

  const words = ["VASU", "GOYAL"];

  useEffect(() => {
    const duration = 2000;
    const stepTime = 25;
    const steps = duration / stepTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easedProgress = Math.min(1, Math.pow(progress, 1.8));
      const currentVal = Math.min(100, Math.round(easedProgress * 100));
      setCount(currentVal);

      if (currentStep >= steps) {
        clearInterval(interval);
        setCount(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 850);
        }, 350);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getStatusMessage = (val) => {
    if (val < 25) return 'INITIALIZING CORE ENGINE & SHADERS...';
    if (val < 60) return 'COMPILING LIQUID GLASS REFRACTIONS...';
    if (val < 90) return 'HYDRATING PORTFOLIO ARTIFACTS...';
    return 'SYSTEMS NOMINAL // WELCOME';
  };

  const circumference = 2 * Math.PI * 38; // radius 38
  const strokeDashoffset = circumference - (count / 100) * circumference;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[10000] select-none overflow-hidden pointer-events-auto"
        >
          {/* Top Half Shutter Curtain (Seamless, no center dividing line) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: '-100%',
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            }}
            className={`absolute top-0 left-0 right-0 h-1/2 z-10 transition-colors duration-500 ${isCream ? 'bg-[#FAF7F2]' : 'bg-[#050505]'
              }`}
          />

          {/* Bottom Half Shutter Curtain (Seamless, no center dividing line) */}
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: '100%',
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            }}
            className={`absolute bottom-0 left-0 right-0 h-1/2 z-10 transition-colors duration-500 ${isCream ? 'bg-[#FAF7F2]' : 'bg-[#050505]'
              }`}
          />

          {/* Main Floating Preloader Content Chamber */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 1.04,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-6xl mx-auto overflow-hidden"
          >
            {/* Top Telemetry Header Bar */}
            <div className="flex justify-between items-center text-xs tracking-widest uppercase font-heading pt-2">
              <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md ${isCream
                ? 'bg-white/80 border-black/10 text-neutral-800'
                : 'bg-white/[0.04] border-white/[0.08] text-[#A1A1AA]'
                }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
                    }`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
                    }`} />
                </span>
                <span className="font-semibold text-[11px]">
                  PORTFOLIO BOOT // 2026 EDITION
                </span>
              </div>

              <div className={`hidden sm:flex items-center gap-3 text-[11px] font-mono ${isCream ? 'text-neutral-500' : 'text-[#71717A]'
                }`}>
                <span>DELHI NCR // 28.6139° N</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Activity className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                  60 FPS ACTIVE
                </span>
              </div>
            </div>

            {/* Central Creative Holographic Stage */}
            <div className="my-auto py-6 sm:py-8 flex flex-col items-center text-center">
              {/* Circular Gauge with Live Digital Percentage */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-6">
                {/* SVG Progress Ring */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="38"
                    stroke={isCream ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)"}
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="38"
                    stroke={isCream ? "#15803D" : "#C6FF3D"}
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-100"
                  />
                </svg>

                {/* Center Monogram with live % badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                  <span className={`font-display font-black text-xl sm:text-2xl leading-none ${isCream ? 'text-neutral-900' : 'text-white'
                    }`}>
                    VG<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>.</span>
                  </span>
                  <span className={`text-[10px] font-mono font-bold mt-1 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                    }`}>
                    {count}%
                  </span>
                </div>
              </div>

              {/* Sub-label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-3"
              >
                <span className={`inline-flex items-center gap-2 text-xs sm:text-sm font-heading font-semibold uppercase tracking-[0.25em] ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                  }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>FULL-STACK SOFTWARE ENGINEER & WEB ARCHITECT</span>
                </span>
              </motion.div>

              {/* Full Name: GUARANTEED ZERO LETTER-WRAPPING! */}
              <div className="py-2 px-2 max-w-full overflow-hidden">
                <h1 className={`font-display font-black text-[clamp(2rem,5.8vw,4.6rem)] leading-none tracking-tight uppercase select-none flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 ${isCream ? 'text-neutral-900' : 'text-white'
                  }`}>
                  {words.map((word, wIdx) => (
                    <span key={wIdx} className="inline-flex whitespace-nowrap">
                      {word.split('').map((char, cIdx) => (
                        <motion.span
                          key={cIdx}
                          initial={{ y: 40, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            duration: 0.55,
                            delay: 0.15 + (wIdx * 4 + cIdx) * 0.04,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </h1>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`text-xs sm:text-sm font-heading max-w-lg mt-3 leading-relaxed ${isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                  }`}
              >
                Crafting high-throughput enterprise portals, liquid-glass aesthetics, and resilient web ecosystems.
              </motion.p>
            </div>

            {/* Bottom Sleek Progress Console */}
            <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 max-w-3xl mx-auto w-full ${isCream
              ? 'bg-white/85 border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] backdrop-blur-2xl'
              : 'bg-[#0D0D0D]/90 border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl'
              }`}>
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full animate-ping ${isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
                    }`} />
                  <span className={`text-[11px] font-mono font-bold tracking-wider ${isCream ? 'text-neutral-800' : 'text-white'
                    }`}>
                    {getStatusMessage(count)}
                  </span>
                </div>

                <div className={`text-xs font-mono font-bold ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                  }`}>
                  {count} / 100
                </div>
              </div>

              {/* Cyber Glowing Progress Track */}
              <div className={`relative w-full h-2 rounded-full overflow-hidden p-0.5 border ${isCream
                ? 'bg-neutral-100 border-black/5'
                : 'bg-white/[0.04] border-white/[0.06]'
                }`}>
                <motion.div
                  className={`h-full rounded-full relative transition-all duration-100 ${isCream
                    ? 'bg-emerald-700 shadow-[0_0_12px_rgba(21,128,61,0.5)]'
                    : 'bg-[#C6FF3D] shadow-[0_0_12px_rgba(198,255,61,0.6)]'
                    }`}
                  style={{ width: `${count}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </motion.div>
              </div>

              {/* Milestone Ticks */}
              <div className={`flex justify-between items-center mt-2 px-1 text-[10px] font-mono ${isCream ? 'text-neutral-400' : 'text-[#71717A]'
                }`}>
                <span>BOOT // 00</span>
                <span>COMPILED // 45</span>
                <span>HYDRATED // 80</span>
                <span className={count === 100 ? (isCream ? 'text-emerald-700 font-bold' : 'text-[#C6FF3D] font-bold') : ''}>
                  READY // 100
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
