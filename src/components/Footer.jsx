import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';
import { personalData } from '../data/content';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const [scrollPercent, setScrollPercent] = useState(0);

  // Scroll Progress computation for the Back to Top circle ring
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const circumference = 2 * Math.PI * 22; // radius 22
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] overflow-hidden select-none">
      {/* 1. Scrolling Marquee Strip Above Footer */}
      <div className="py-4 bg-[#0D0D0D] border-b border-white/[0.06] overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8 items-center font-heading text-xs uppercase tracking-[0.25em] text-[#C6FF3D] font-bold">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              <span>AVAILABLE FOR FREELANCE & FULL-TIME</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
              <span>LET'S WORK TOGETHER</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
              <span>CRAFTING THE MODERN WEB</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-12">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Col 1: Bio & Mission */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white flex items-center gap-1.5">
              <span>VASU GOYAL</span>
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D]" />
            </span>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-sm font-heading">
              Full-Stack Software Developer dedicated to engineering resilient, scalable web portals and high-impact digital experiences.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-heading text-[#71717A] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#C6FF3D]" />
                Based in India // Available Worldwide
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-[#71717A] mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-heading font-medium text-[#A1A1AA] uppercase">
              {['about', 'skills', 'projects', 'experience', 'services', 'contact'].map((sec) => (
                <li key={sec}>
                  <a
                    href={`/#${sec}`}
                    className="hover:text-[#C6FF3D] transition-colors flex items-center gap-1.5"
                  >
                    <span>{sec}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Links & Contact */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-heading font-semibold text-xs uppercase tracking-widest text-[#71717A] mb-4">
                CONNECT & NETWORK
              </h4>
              <div className="flex flex-wrap gap-3">
                {personalData.socials.map((social) => (
                  <MagneticButton key={social.name} strength={0.35}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-[#C6FF3D] border border-white/[0.08] hover:border-[#C6FF3D] flex items-center justify-center text-white hover:text-[#050505] transition-all"
                      aria-label={social.name}
                    >
                      {social.name === 'Github' && <Github className="w-4 h-4" />}
                      {social.name === 'Linkedin' && <Linkedin className="w-4 h-4" />}
                      {social.name === 'Twitter' && <Twitter className="w-4 h-4" />}
                      {social.name === 'Email' && <Mail className="w-4 h-4" />}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Back to Top with Animated SVG Progress Ring */}
            <div className="pt-6 flex items-center justify-start md:justify-end">
              <MagneticButton strength={0.4}>
                <button
                  onClick={scrollToTop}
                  className="relative w-14 h-14 rounded-full flex items-center justify-center group focus:outline-none"
                  aria-label="Back to top"
                >
                  {/* SVG Circular Progress Track */}
                  <svg className="w-14 h-14 -rotate-90">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="2.5"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      stroke="#C6FF3D"
                      strokeWidth="2.5"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-150"
                    />
                  </svg>
                  <ArrowUp className="w-5 h-5 text-white group-hover:text-[#C6FF3D] absolute group-hover:-translate-y-1 transition-all" />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* 2. Massive "VASU GOYAL" Parallax Wordmark */}
        <div className="py-8 sm:py-14 overflow-hidden border-b border-white/[0.08] text-center">
          <motion.h2
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            className="font-display font-black text-[clamp(2.5rem,11vw,11rem)] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/40 to-white/5 uppercase tracking-tighter select-none"
          >
            VASU GOYAL
          </motion.h2>
        </div>

        {/* Bottom Copyright & Tech Stack Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-heading text-[#71717A]">
          <div>
            © 2026 {personalData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with precision in</span>
            <span className="text-white font-medium">React, GSAP & Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
