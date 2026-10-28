import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, Sparkles, Layers, ShieldCheck, Clock } from 'lucide-react';
import { personalData } from '../data/content';
import HeroScene from '../components/HeroScene';
import MagneticButton from '../components/MagneticButton';
import { useMousePosition } from '../hooks/useMousePosition';

export default function HeroSection({ isLoaded }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef(null);
  const mouse = useMousePosition();

  // Scroll parallax & fade
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

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
      className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 md:px-12 overflow-hidden bg-[#050505]"
    >
      {/* 3D Fiber Particle / Geometry Background */}
      <HeroScene />

      {/* Mouse Follow Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(750px circle at ${mouse.x}px ${mouse.y}px, rgba(198, 255, 61, 0.08), transparent 70%)`,
        }}
      />

      {/* Faint Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Content with Parallax Fade/Scale on Scroll */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center mt-6"
      >
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#0D0D0D]/80 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF3D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6FF3D]"></span>
          </span>
          <span className="text-xs font-heading font-medium tracking-wider text-[#A1A1AA] uppercase">
            {personalData.availability}
          </span>
        </motion.div>

        {/* Massive Headline with Masked Line Reveals */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold tracking-tight text-white text-[clamp(2.5rem,7vw,7rem)] leading-[0.98] uppercase select-none"
          >
            I BUILD <span className="text-[#C6FF3D] text-glow-accent">FAST</span>, SCALABLE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#A1A1AA]">
              & BEAUTIFUL
            </span>{' '}
            <span className="underline decoration-[#C6FF3D]/40 decoration-wavy decoration-2 underline-offset-8">
              WEB
            </span>{' '}
            EXPERIENCES
          </motion.h1>
        </div>

        {/* Rotating Role Text */}
        <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden mb-6">
          <span className="text-xs sm:text-sm font-heading uppercase tracking-widest text-[#71717A] mr-3">
            SPECIALIZING IN
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-sm sm:text-base md:text-lg text-[#C6FF3D] tracking-wider uppercase border-b border-[#C6FF3D]/30 pb-0.5"
            >
              {personalData.roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Subtext description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-[#A1A1AA] leading-relaxed mb-10 font-normal"
        >
          {personalData.shortBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Primary View Projects Button */}
          <MagneticButton strength={0.35}>
            <button
              onClick={() => scrollToSection('projects')}
              data-cursor="pointer"
              className="relative group px-8 py-4 rounded-full bg-[#C6FF3D] text-[#050505] font-heading font-bold text-xs uppercase tracking-widest shadow-[0_0_28px_rgba(198,255,61,0.35)] hover:shadow-[0_0_45px_rgba(198,255,61,0.55)] transition-all duration-300 transform active:scale-95 flex items-center gap-2.5 overflow-hidden"
            >
              <span className="relative z-10">VIEW PROJECTS</span>
              <Sparkles className="w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </MagneticButton>

          {/* Secondary Download Resume Button */}
          <MagneticButton strength={0.35}>
            <a
              href={personalData.resumeUrl}
              download="Vasu_Goyal_Resume.pdf"
              data-cursor="pointer"
              className="relative group px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.12] hover:border-[#C6FF3D]/50 font-heading font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 overflow-hidden active:scale-95"
            >
              <span>DOWNLOAD RESUME</span>
              <Download className="w-4 h-4 text-[#C6FF3D] group-hover:translate-y-0.5 transition-transform duration-200" />
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Floating Glass Stat Badges (Desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="hidden lg:flex absolute left-8 xl:left-14 bottom-28 z-20 items-center gap-3 p-3.5 rounded-2xl glass-card animate-float-slow"
      >
        <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/20 flex items-center justify-center text-[#C6FF3D]">
          <Clock className="w-5 h-5" />
        </div>
        <div className="text-left pr-2">
          <div className="font-display font-black text-xl text-white">3.5+ Years</div>
          <div className="text-[11px] font-heading uppercase tracking-wider text-[#A1A1AA]">
            Proven Experience
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hidden lg:flex absolute right-8 xl:right-14 bottom-36 z-20 items-center gap-3 p-3.5 rounded-2xl glass-card animate-float-delayed"
      >
        <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/20 flex items-center justify-center text-[#C6FF3D]">
          <Layers className="w-5 h-5" />
        </div>
        <div className="text-left pr-2">
          <div className="font-display font-black text-xl text-white">15+ Portals</div>
          <div className="text-[11px] font-heading uppercase tracking-wider text-[#A1A1AA]">
            Production Deployed
          </div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        onClick={() => scrollToSection('about')}
        data-cursor="pointer"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] font-heading uppercase tracking-widest text-[#71717A] group-hover:text-[#C6FF3D] transition-colors">
          SCROLL
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#C6FF3D] p-1 flex justify-center transition-colors">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-1.5 bg-[#C6FF3D] rounded-full shadow-[0_0_6px_#C6FF3D]"
          />
        </div>
      </motion.div>
    </section>
  );
}
