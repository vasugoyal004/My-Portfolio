import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Download, Sparkles, Code2, Terminal, CheckCircle2 } from 'lucide-react';
import { personalData } from '../data/content';
import MagneticButton from '../components/MagneticButton';

// Word-by-Word Scroll Highlight Component
function WordHighlight({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ['#52525b', '#ffffff']);

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-1.5 transition-colors duration-150 font-medium"
    >
      {children}
    </motion.span>
  );
}

// Animated Counter Component
function StatCounter({ target, suffix = '', label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numeric = parseFloat(target);
    const isDecimal = target.includes('.');
    const duration = 1800; // ms
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = (step / steps) * numeric;
      if (step >= steps) {
        clearInterval(timer);
        setValue(numeric);
      } else {
        setValue(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="p-4 sm:p-5 rounded-2xl glass-card border border-white/[0.08] relative group">
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C6FF3D]/40 group-hover:bg-[#C6FF3D] transition-colors" />
      <div className="font-display font-black text-3xl sm:text-4xl text-white mb-1 flex items-baseline">
        <span>{value}</span>
        <span className="text-[#C6FF3D] ml-0.5">{target.includes('+') ? '+' : ''}{suffix}</span>
      </div>
      <div className="text-xs font-heading font-medium tracking-wider text-[#A1A1AA] uppercase">
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // 3D Tilt State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Scroll Progress for Word-by-word reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  const bioText = personalData.fullBio.join(' ');
  const words = bioText.split(' ');

  // 3D Card tilt handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* Background Accent Spotlight */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>01 // ABOUT THE ENGINEER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
              ARCHITECTING ROBUST <br className="hidden sm:inline" />
              DIGITAL EXPERIENCES
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-heading text-[#71717A] uppercase tracking-wider mt-4 sm:mt-0">
            JODHPUR, RAJASTHAN, INDIA // REMOTE WORLDWIDE
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: 3D Tilt Card with Rotating Border & Reveal */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: 1000,
              }}
              className="relative w-full max-w-sm sm:max-w-md group"
            >
              {/* Animated Rotating Gradient Glow Border */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-75 blur-md group-hover:opacity-100 transition duration-700 pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 180deg at 50% 50%, #C6FF3D 0deg, rgba(198,255,61,0.1) 120deg, transparent 240deg, #C6FF3D 360deg)',
                  animation: 'spin 8s linear infinite',
                }}
              />

              {/* Tilted Inner Card */}
              <motion.div
                animate={{
                  rotateX,
                  rotateY,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="relative rounded-2xl bg-[#0D0D0D] border border-white/[0.1] p-3 sm:p-4 overflow-hidden shadow-2xl"
              >
                {/* Photo with Clip-path Reveal */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#121212]">
                  <img
                    src={personalData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
                    alt={personalData.name}
                    className="w-full h-full object-cover object-top contrast-[1.08] group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle Accent Tint Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/[0.1] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-pulse" />
                    <span className="text-[11px] font-heading font-medium tracking-wider text-white uppercase">
                      Vasu Goyal
                    </span>
                  </div>

                  {/* Bottom Role Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0D0D0D]/85 backdrop-blur-md border border-white/[0.08]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-display font-bold text-white uppercase">
                          Lead Software Developer
                        </p>
                        <p className="text-[11px] font-heading text-[#A1A1AA]">
                          3.5+ Years Production Craft
                        </p>
                      </div>
                      <Code2 className="w-5 h-5 text-[#C6FF3D]" />
                    </div>
                  </div>
                </div>

                {/* Status bar */}
                <div className="mt-3 flex items-center justify-between px-2 text-[11px] font-heading text-[#71717A] uppercase">
                  <span>SPECIALIZATION: FULL-STACK</span>
                  <span className="text-[#C6FF3D] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Scroll-Linked Word Bio + Stats + Resume CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Word-by-word reveal text */}
            <div className="mb-10 text-lg sm:text-2xl md:text-3xl leading-relaxed sm:leading-relaxed font-heading select-none">
              {words.map((word, index) => {
                const start = index / words.length;
                const end = start + 1 / words.length;
                return (
                  <WordHighlight key={index} range={[start, end]} progress={scrollYProgress}>
                    {word}
                  </WordHighlight>
                );
              })}
            </div>

            {/* Core Values Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-xl bg-[#0D0D0D]/60 border border-white/[0.06] flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C6FF3D] mt-2 shrink-0 shadow-[0_0_8px_#C6FF3D]" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-1">
                    Enterprise Reliability
                  </h4>
                  <p className="text-xs text-[#A1A1AA] leading-normal">
                    ACID transaction compliance, role-based security & sub-second API speeds.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0D0D0D]/60 border border-white/[0.06] flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#C6FF3D] mt-2 shrink-0 shadow-[0_0_8px_#C6FF3D]" />
                <div>
                  <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-1">
                    Awwwards Aesthetics
                  </h4>
                  <p className="text-xs text-[#A1A1AA] leading-normal">
                    Fluid GSAP choreography, responsive micro-animations, and ultra-high contrast dark UI.
                  </p>
                </div>
              </div>
            </div>

            {/* Counter Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
              <StatCounter target="3.5" suffix="+" label="Years Craft" />
              <StatCounter target="15" suffix="+" label="Web Portals" />
              <StatCounter target="18" suffix="+" label="Core Tech" />
              <StatCounter target="100" suffix="%" label="Dedication" />
            </div>

            {/* Download Resume Button */}
            <div>
              <MagneticButton strength={0.35}>
                <a
                  href={personalData.resumeUrl}
                  download="Vasu_Goyal_Resume.pdf"
                  data-cursor="pointer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#050505] hover:bg-[#C6FF3D] font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(198,255,61,0.4)] group"
                >
                  <span>DOWNLOAD COMPLETE CV / RESUME</span>
                  <Download className="w-4 h-4 text-[#050505] group-hover:translate-y-0.5 transition-transform duration-200" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
