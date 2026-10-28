import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { personalData } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from './MagneticButton';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoText, setLogoText] = useState('VG.');

  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { isCream } = useTheme();

  // Scroll detection for hide-on-scroll-down, reveal-on-scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 180) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;

      // Update active section when on homepage
      if (location.pathname === '/') {
        const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
        const scrollPosition = currentScrollY + 250;

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && scrollPosition >= section.offsetTop) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Logo Glitch / Shuffle effect on hover
  const handleLogoHover = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let iteration = 0;
    const target = 'VG.';
    const interval = setInterval(() => {
      setLogoText(
        target
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return target[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= target.length) {
        clearInterval(interval);
        setLogoText('VG.');
      }
      iteration += 1 / 2;
    }, 40);
  };

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Centered Pill Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <nav
          className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border transition-all duration-300 ${
            isCream
              ? 'bg-white/80 border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-2xl'
              : 'bg-[#0D0D0D]/85 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-2xl'
          } ${
            isScrolled ? 'py-1.5 px-3.5 sm:py-2 sm:px-6' : 'py-2.5 px-4 sm:py-3 sm:px-7'
          }`}
        >
          {/* Logo with glitch shuffle */}
          <div
            onMouseEnter={handleLogoHover}
            onClick={() => handleNavClick('hero')}
            className={`cursor-pointer font-display font-extrabold text-xl sm:text-2xl tracking-tighter select-none flex items-center gap-1 group transition-colors duration-200 ${
              isCream ? 'text-neutral-900 hover:text-emerald-700' : 'text-white hover:text-[#C6FF3D]'
            }`}
          >
            <span>{logoText}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full group-hover:scale-150 transition-transform ${
                isCream ? 'bg-emerald-600 shadow-[0_0_8px_rgba(22,163,74,0.6)]' : 'bg-[#C6FF3D] shadow-[0_0_8px_#C6FF3D]'
              }`}
            />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredNav === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative px-3.5 py-1.5 text-xs uppercase tracking-widest font-heading transition-colors duration-200 rounded-full z-10 ${
                    isActive
                      ? isCream
                        ? 'text-white font-semibold'
                        : 'text-[#050505] font-semibold'
                      : isCream
                      ? 'text-neutral-600 hover:text-black'
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {/* Sliding Active Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isCream
                          ? 'bg-neutral-900 shadow-sm'
                          : 'bg-[#C6FF3D] shadow-[0_0_15px_rgba(198,255,61,0.4)]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover Pill Background if not active */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="hoverNavIndicator"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isCream ? 'bg-black/5' : 'bg-white/[0.06]'
                      }`}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}

                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Area: Liquid Glass Theme Switcher + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Liquid Glass Theme Toggle */}
            <ThemeToggle showLabel={true} />

            {/* Let's Talk Magnetic CTA */}
            <MagneticButton strength={0.4}>
              <button
                onClick={() => handleNavClick('contact')}
                className={`hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 group border ${
                  isCream
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 shadow-sm'
                    : 'bg-white/[0.06] hover:bg-[#C6FF3D] text-white hover:text-[#050505] border-white/[0.1] hover:border-[#C6FF3D]'
                }`}
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors focus:outline-none ${
                isCream ? 'text-neutral-900 hover:text-emerald-700' : 'text-white hover:text-[#C6FF3D]'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className={`w-5 h-5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen Mobile Menu with Circle Clip-path Reveal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-40 flex flex-col justify-between p-8 sm:p-12 md:hidden ${
              isCream
                ? 'bg-[#FAF7F2]/95 backdrop-blur-2xl text-neutral-900'
                : 'bg-[#050505]/95 backdrop-blur-2xl text-white'
            }`}
          >
            {/* Top Close Bar with Theme Switcher */}
            <div className="flex justify-between items-center pt-4">
              <span className="font-display font-extrabold text-2xl">
                VG<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>.</span>
              </span>

              <div className="flex items-center gap-3">
                <ThemeToggle showLabel={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-full ${
                    isCream ? 'bg-black/5 text-black' : 'bg-white/[0.05] text-white'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Staggered Navigation Links */}
            <div className="flex flex-col gap-5 my-auto">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`text-3xl sm:text-4xl font-display font-black tracking-tight text-left flex items-baseline gap-4 group transition-colors ${
                      isCream
                        ? 'text-neutral-900 hover:text-emerald-700'
                        : 'text-white hover:text-[#C6FF3D]'
                    }`}
                  >
                    <span className="text-xs font-heading font-normal text-[#71717A]">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Bottom Info & Socials */}
            <div className={`pt-6 border-t flex flex-col gap-4 ${isCream ? 'border-black/10' : 'border-white/[0.08]'}`}>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors ${isCream ? 'hover:text-emerald-700 text-neutral-600' : 'hover:text-[#C6FF3D] text-[#A1A1AA]'}`}
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className={`transition-colors ${isCream ? 'hover:text-emerald-700 text-neutral-600' : 'hover:text-[#C6FF3D] text-[#A1A1AA]'}`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:vasugoyal536@gmail.com"
                  className={`transition-colors ${isCream ? 'hover:text-emerald-700 text-neutral-600' : 'hover:text-[#C6FF3D] text-[#A1A1AA]'}`}
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="text-xs text-[#71717A] uppercase tracking-wider font-heading">
                {personalData.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
