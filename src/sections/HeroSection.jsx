import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, ArrowDown, Download, Check, Copy } from 'lucide-react';
import { personalData } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import HeroScene from '../components/HeroScene';
import MagneticButton from '../components/MagneticButton';
import { useMousePosition } from '../hooks/useMousePosition';

export default function HeroSection({ isLoaded }) {
  const { isCream } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const mouse = useMousePosition();

  // Scroll parallax & fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);

  // Subtle 3D Tilt for Portrait Card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -10,
      y: ((x - centerX) / centerX) * 10,
    });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Rotating roles
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalData.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-4 sm:px-8 md:px-16 overflow-hidden transition-colors duration-500 ${isCream ? 'bg-[#FAF7F2]' : 'bg-[#050505]'
        }`}
    >
      {/* Interactive 3D Cyber Particles Background */}
      <HeroScene />

      {/* Subtle Mouse-Follow Ambient Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x}px ${mouse.y}px, ${isCream ? 'rgba(21, 128, 61, 0.08)' : 'rgba(198, 255, 61, 0.08)'}, transparent 70%)`,
        }}
      />

      {/* Main Spacious Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 max-w-6xl mx-auto w-full my-auto py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT: Clean, High-Impact Brand Typography (7 Cols) ================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill with 3.5 Yrs & 10+ Products Headline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-md mb-6 ${
                isCream
                  ? 'bg-sky-50 border-sky-200 text-sky-900'
                  : 'bg-blue-500/10 border-blue-400/20 text-blue-300'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isCream ? 'bg-sky-600' : 'bg-blue-400'
                }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isCream ? 'bg-sky-600' : 'bg-blue-400'
                }`} />
              </span>
              <span className="text-xs font-heading font-semibold tracking-wide">
                3.5+ YRS EXPERIENCE &bull; 10+ FULL-STACK PRODUCTS DELIVERED
              </span>
            </motion.div>

            {/* Clear, High-Readability Name & Title */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display font-extrabold text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1] tracking-tight uppercase select-none ${
                  isCream ? 'text-slate-900' : 'text-white'
                }`}
              >
                VASU GOYAL
              </motion.h1>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`font-heading font-bold text-xl sm:text-2xl mt-2 tracking-tight ${
                  isCream ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                FULL-STACK SOFTWARE DEVELOPER &bull;{' '}
                <span className={isCream ? 'text-sky-700 font-extrabold' : 'text-blue-400 font-extrabold'}>
                  BLG FULL STACK DEV
                </span>
              </motion.div>
            </div>

            {/* Crisp 10-Second Recruiter Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal ${
                isCream ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              I build and deliver mission-critical web portals, enterprise HRMS systems, and end-to-end full-stack web products. From complex database schema to high-concurrency APIs and intuitive frontend interfaces.
            </motion.p>

            {/* Quick Strong Pointers (Why Hire Me in 10s) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-xl mb-8"
            >
              {[
                { label: '3.5+ Years Production Experience', sub: 'End-to-end architecture & live delivery' },
                { label: '10+ Products Built & Shipped', sub: 'ERP, HRMS, University & E-Procurement' },
                { label: 'Production Tech Stack', sub: 'React, Next.js, Node.js, TypeScript, PostgreSQL' },
                { label: 'High Reliability & Code Quality', sub: '99.9% uptime, clean scalable architecture' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                    isCream
                      ? 'bg-white border-slate-200 shadow-xs text-slate-800'
                      : 'bg-slate-900/60 border-slate-800 text-slate-200'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    isCream ? 'bg-sky-100 text-sky-700' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <div>
                    <p className="text-xs font-heading font-bold leading-tight">{item.label}</p>
                    <p className={`text-[11px] leading-tight mt-0.5 ${
                      isCream ? 'text-slate-500' : 'text-slate-400'
                    }`}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Prominent CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton strength={0.35}>
                <button
                  onClick={() => scrollToSection('projects')}
                  data-cursor="pointer"
                  className={`group px-7 py-3.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 active:scale-95 shadow-md ${
                    isCream
                      ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20'
                      : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/25'
                  }`}
                >
                  <span>EXPLORE 10+ PROJECTS</span>
                  <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.35}>
                <button
                  onClick={() => scrollToSection('about')}
                  data-cursor="pointer"
                  className={`group px-7 py-3.5 rounded-full font-heading font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 active:scale-95 border ${
                    isCream
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                      : 'bg-slate-900/60 hover:bg-slate-800 text-white border-slate-700 hover:border-blue-400/50'
                  }`}
                >
                  <span>WHY HIRE ME</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </MagneticButton>
            </motion.div>
          </div>

          {/* ================= RIGHT: Clean, Breathable Portrait Centerpiece (5 Cols) ================= */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient Background Aura */}
            <div className={`absolute w-[340px] h-[340px] rounded-full blur-[100px] pointer-events-none ${isCream ? 'bg-emerald-500/15' : 'bg-[#C6FF3D]/10'
              }`} />

            {/* Elegant 3D Tilt Portrait Card */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: tilt.x,
                rotateY: tilt.y,
              }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 20,
              }}
              style={{ perspective: 1000 }}
              className={`relative w-full max-w-[340px] sm:max-w-[380px] rounded-3xl p-4 transition-all duration-300 group ${isCream
                  ? 'bg-white/80 border border-white/80 shadow-[0_20px_45px_rgba(0,0,0,0.06)] backdrop-blur-2xl'
                  : 'bg-[#0D0D0D]/80 border border-white/[0.1] shadow-2xl backdrop-blur-xl'
                }`}
            >
              {/* Photo Frame */}
              <div className={`relative rounded-2xl overflow-hidden aspect-[4/5] border ${isCream ? 'bg-neutral-100 border-black/5' : 'bg-[#141414] border-white/[0.06]'
                }`}>
                <img
                  src={personalData.avatar || "/my_photo.png"}
                  alt={personalData.name}
                  className="w-full h-full object-cover object-top contrast-[1.06] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Vignette gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${isCream ? 'from-black/60 via-transparent to-transparent' : 'from-[#050505] via-transparent to-transparent opacity-70'
                  }`} />

                {/* Clean Bottom Overlay Tag */}
                <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md border flex items-center justify-between ${isCream ? 'bg-white/90 border-white text-neutral-900 shadow-sm' : 'bg-[#050505]/80 border-white/[0.08] text-white'
                  }`}>
                  <div>
                    <div className="text-xs font-display font-bold uppercase tracking-wider">
                      {personalData.name}
                    </div>
                    <div className={`text-[11px] font-heading ${isCream ? 'text-emerald-700 font-semibold' : 'text-[#C6FF3D]'}`}>
                      Full-Stack Developer
                    </div>
                  </div>
                  <span className={`w-2 h-2 rounded-full animate-ping ${isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'}`} />
                </div>
              </div>

              {/* Floating Stat Badge 1 (Top Right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-4 -right-4 px-4 py-2.5 rounded-2xl border shadow-xl backdrop-blur-xl ${isCream ? 'bg-white/95 border-black/5 text-neutral-900 shadow-[0_10px_25px_rgba(0,0,0,0.08)]' : 'bg-[#0D0D0D]/95 border-white/[0.1] text-white'
                  }`}
              >
                <div className="font-display font-extrabold text-lg">
                  3.5<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>+</span>
                </div>
                <div className={`text-[10px] font-heading uppercase tracking-wider ${isCream ? 'text-neutral-500' : 'text-[#A1A1AA]'}`}>
                  Years Craft
                </div>
              </motion.div>

              {/* Floating Stat Badge 2 (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`absolute -bottom-4 -left-4 px-4 py-2.5 rounded-2xl border shadow-xl backdrop-blur-xl ${isCream ? 'bg-white/95 border-black/5 text-neutral-900 shadow-[0_10px_25px_rgba(0,0,0,0.08)]' : 'bg-[#0D0D0D]/95 border-white/[0.1] text-white'
                  }`}
              >
                <div className="font-display font-extrabold text-lg">
                  15<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>+</span>
                </div>
                <div className={`text-[10px] font-heading uppercase tracking-wider ${isCream ? 'text-neutral-500' : 'text-[#A1A1AA]'}`}>
                  Portals Shipped
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Minimal Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={() => scrollToSection('about')}
        data-cursor="pointer"
        className="relative z-10 flex flex-col items-center gap-2 cursor-pointer group select-none max-w-6xl mx-auto"
      >
        <span className={`text-[10px] font-heading uppercase tracking-widest transition-colors ${isCream
            ? 'text-neutral-500 group-hover:text-emerald-700'
            : 'text-[#71717A] group-hover:text-[#C6FF3D]'
          }`}>
          SCROLL
        </span>
        <div className={`w-5 h-8 rounded-full p-1 flex justify-center transition-colors border ${isCream
            ? 'border-neutral-300 group-hover:border-emerald-700'
            : 'border-white/20 group-hover:border-[#C6FF3D]'
          }`}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-1 h-1.5 rounded-full ${isCream
                ? 'bg-emerald-700 shadow-[0_0_6px_rgba(21,128,61,0.5)]'
                : 'bg-[#C6FF3D] shadow-[0_0_6px_#C6FF3D]'
              }`}
          />
        </div>
      </motion.div>
    </section>
  );
}
