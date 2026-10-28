import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';
import { personalData } from '../data/content';
import MagneticButton from './MagneticButton';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const { isCream } = useTheme();

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
    <footer className={`relative transition-colors duration-500 overflow-hidden select-none border-t ${
      isCream
        ? 'bg-[#FAF7F2] border-emerald-950/10'
        : 'bg-[#050505] border-white/[0.08]'
    }`}>
      {/* 1. Scrolling Marquee Strip Above Footer */}
      <div className={`py-4 border-b overflow-hidden flex whitespace-nowrap transition-colors duration-500 ${
        isCream
          ? 'bg-[#EFE9DF]/80 border-emerald-950/10'
          : 'bg-[#0D0D0D] border-white/[0.06]'
      }`}>
        <div className={`animate-marquee flex gap-8 items-center font-heading text-xs uppercase tracking-[0.25em] font-bold ${
          isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
        }`}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              <span>AVAILABLE FOR FREELANCE & FULL-TIME</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isCream ? 'bg-[#15803D]' : 'bg-[#C6FF3D]'}`} />
              <span>LET'S WORK TOGETHER</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isCream ? 'bg-[#15803D]' : 'bg-[#C6FF3D]'}`} />
              <span>CRAFTING THE MODERN WEB</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isCream ? 'bg-[#15803D]' : 'bg-[#C6FF3D]'}`} />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16 pb-10">
        {/* Main Footer Row */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b ${
          isCream ? 'border-black/[0.08]' : 'border-white/[0.08]'
        }`}>
          {/* Col 1: Bio & Mission */}
          <div className="md:col-span-5 space-y-3">
            <span className={`font-display font-extrabold text-xl sm:text-2xl tracking-tight flex items-center gap-1.5 ${
              isCream ? 'text-[#0F172A]' : 'text-white'
            }`}>
              <span>VASU GOYAL</span>
              <span className={`w-2 h-2 rounded-full ${isCream ? 'bg-[#15803D]' : 'bg-[#C6FF3D]'}`} />
            </span>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm font-heading ${
              isCream ? 'text-[#475569]' : 'text-[#A1A1AA]'
            }`}>
              Full-Stack Software Developer dedicated to engineering resilient, scalable web portals and high-impact digital experiences.
            </p>
            <div className="pt-1">
              <span className={`inline-flex items-center gap-2 text-[11px] font-heading uppercase tracking-wider ${
                isCream ? 'text-[#64748B]' : 'text-[#71717A]'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isCream ? 'bg-[#15803D]' : 'bg-[#C6FF3D]'}`} />
                Delhi NCR // Available Worldwide
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className={`font-heading font-semibold text-xs uppercase tracking-widest mb-4 ${
              isCream ? 'text-[#64748B]' : 'text-[#71717A]'
            }`}>
              NAVIGATION
            </h4>
            <ul className={`space-y-2.5 text-xs font-heading font-medium uppercase ${
              isCream ? 'text-[#334155]' : 'text-[#A1A1AA]'
            }`}>
              {['about', 'skills', 'projects', 'experience', 'services', 'contact'].map((sec) => (
                <li key={sec}>
                  <a
                    href={`/#${sec}`}
                    className={`transition-colors flex items-center gap-1.5 ${
                      isCream ? 'hover:text-[#15803D]' : 'hover:text-[#C6FF3D]'
                    }`}
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
              <h4 className={`font-heading font-semibold text-xs uppercase tracking-widest mb-4 ${
                isCream ? 'text-[#64748B]' : 'text-[#71717A]'
              }`}>
                CONNECT & NETWORK
              </h4>
              <div className="flex flex-wrap gap-3">
                {personalData.socials.map((social) => (
                  <MagneticButton key={social.name} strength={0.35}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isCream
                          ? 'bg-black/[0.04] hover:bg-[#15803D] border border-black/[0.08] hover:border-[#15803D] text-[#0F172A] hover:text-white'
                          : 'bg-white/[0.04] hover:bg-[#C6FF3D] border border-white/[0.08] hover:border-[#C6FF3D] text-white hover:text-[#050505]'
                      }`}
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
                      stroke={isCream ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}
                      strokeWidth="2.5"
                      fill="transparent"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      stroke={isCream ? "#15803D" : "#C6FF3D"}
                      strokeWidth="2.5"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-150"
                    />
                  </svg>
                  <ArrowUp className={`w-5 h-5 absolute group-hover:-translate-y-1 transition-all ${
                    isCream
                      ? 'text-[#0F172A] group-hover:text-[#15803D]'
                      : 'text-white group-hover:text-[#C6FF3D]'
                  }`} />
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack Credits */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-heading ${
          isCream ? 'text-[#64748B]' : 'text-[#71717A]'
        }`}>
          <div>
            © 2026 {personalData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with precision in</span>
            <span className={`font-medium ${isCream ? 'text-[#0F172A]' : 'text-white'}`}>
              React, GSAP & Three.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
