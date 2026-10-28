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
            {/* Minimal Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border backdrop-blur-md mb-8 ${isCream ? 'bg-black/5 border-black/10 text-neutral-700' : 'bg-white/[0.03] border-white/[0.08] text-[#A1A1AA]'
                }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
                  }`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
                  }`} />
              </span>
              <span className="text-xs font-heading font-medium tracking-wider uppercase">
                {personalData.availability}
              </span>
            </motion.div>

            {/* Giant Name & Title */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display font-extrabold text-[clamp(2.5rem,6.8vw,6.2rem)] leading-[0.96] tracking-tight uppercase select-none ${isCream ? 'text-neutral-900' : 'text-white'
                  }`}
              >
                VASU GOYAL
              </motion.h1>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display font-bold text-2xl sm:text-4xl mt-2 uppercase tracking-tight ${isCream
                    ? 'text-neutral-800'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#A1A1AA]'
                  }`}
              >
                CRAFTING{' '}
                <span className={isCream ? 'text-emerald-700 font-extrabold' : 'text-[#C6FF3D] text-glow-accent'}>
                  FAST & BEAUTIFUL
                </span>{' '}
                WEB SYSTEMS
              </motion.div>
            </div>

            {/* Minimalist Rotating Role Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`flex items-center gap-2 text-sm sm:text-base font-heading mb-8 ${isCream ? 'text-neutral-500' : 'text-[#71717A]'
                }`}
            >
              <span className="uppercase tracking-widest text-xs">FOCUSED ON:</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`font-display font-bold pb-0.5 text-sm sm:text-base tracking-wide border-b ${isCream
                      ? 'text-neutral-900 border-emerald-700'
                      : 'text-white border-[#C6FF3D]'
                    }`}
                >
                  {personalData.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Clean Description with Breathing Room */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className={`text-sm sm:text-base leading-relaxed max-w-xl mb-10 font-normal ${isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                }`}
            >
              {personalData.shortBio}
            </motion.p>

            {/* Prominent, Spacious CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <MagneticButton strength={0.35}>
                <button
                  onClick={() => scrollToSection('projects')}
                  data-cursor="pointer"
                  className={`group px-8 py-4 rounded-full font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 active:scale-95 ${isCream
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-700/20'
                      : 'bg-[#C6FF3D] text-[#050505] shadow-[0_0_25px_rgba(198,255,61,0.35)] hover:shadow-[0_0_45px_rgba(198,255,61,0.55)]'
                    }`}
                >
                  <span>VIEW PROJECTS</span>
                  <Sparkles className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.35}>
                <button
                  onClick={() => scrollToSection('contact')}
                  data-cursor="pointer"
                  className={`group px-8 py-4 rounded-full font-heading font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 active:scale-95 border ${isCream
                      ? 'bg-black/5 hover:bg-black/10 text-neutral-900 border-black/10'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border-white/[0.12] hover:border-[#C6FF3D]/50'
                    }`}
                >
                  <span>LET'S TALK</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
