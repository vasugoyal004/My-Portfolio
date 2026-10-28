import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Download, Sparkles, Code2, Terminal, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { personalData } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from '../components/MagneticButton';

// Word-by-Word Scroll Highlight Component
function WordHighlight({ children, range, progress, isCream }) {
  const opacity = useTransform(progress, range, [0.28, 1]);
  const color = useTransform(
    progress,
    range,
    isCream ? ['#9CA3AF', '#111827'] : ['#52525B', '#FFFFFF']
  );

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
function StatCounter({ target, suffix = '', label, isCream }) {
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
    <div
      ref={ref}
      className={`p-4 sm:p-5 rounded-2xl border relative group transition-all duration-300 ${
        isCream
          ? 'bg-white/80 border-black/5 shadow-sm hover:border-emerald-600'
          : 'bg-[#0D0D0D] border-white/[0.08] hover:border-[#C6FF3D]/40'
      }`}
    >
      <div
        className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-colors ${
          isCream
            ? 'bg-emerald-600/40 group-hover:bg-emerald-600'
            : 'bg-[#C6FF3D]/40 group-hover:bg-[#C6FF3D]'
        }`}
      />
      <div
        className={`font-display font-black text-3xl sm:text-4xl mb-1 flex items-baseline ${
          isCream ? 'text-neutral-900' : 'text-white'
        }`}
      >
        <span>{value}</span>
        <span
          className={`ml-0.5 ${
            isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
          }`}
        >
          {target.includes('+') ? '+' : ''}
          {suffix}
        </span>
      </div>
      <div
        className={`text-xs font-heading font-medium tracking-wider uppercase ${
          isCream ? 'text-neutral-500' : 'text-[#A1A1AA]'
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const { isCream } = useTheme();

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

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

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
      className="relative py-20 sm:py-32 px-4 sm:px-8 md:px-12 bg-[var(--bg)] overflow-hidden transition-colors duration-500"
    >
      {/* Background Accent Spotlight */}
      <div
        className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/5'
        }`}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-6 border-b ${
            isCream ? 'border-black/10' : 'border-white/[0.08]'
          }`}
        >
          <div>
            <div
              className={`inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-2 ${
                isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>01 // ABOUT THE ENGINEER</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase ${
                isCream ? 'text-neutral-900' : 'text-white'
              }`}
            >
              ARCHITECTING ROBUST <br className="hidden sm:inline" />
              DIGITAL EXPERIENCES
            </h2>
          </div>
          <p
            className={`text-xs sm:text-sm font-heading uppercase tracking-wider mt-4 sm:mt-0 ${
              isCream ? 'text-neutral-500' : 'text-[#71717A]'
            }`}
          >
            {personalData.location} // REMOTE WORLDWIDE
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: 3D Tilt Card with Animated Rotating Gradient Border */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1000 }}
              className="relative w-full max-w-sm sm:max-w-md group"
            >
              {/* Rotating Border Glow */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-75 blur-md group-hover:opacity-100 transition duration-700 pointer-events-none"
                style={{
                  background: isCream
                    ? 'conic-gradient(from 180deg at 50% 50%, #15803D 0deg, rgba(22,163,74,0.1) 120deg, transparent 240deg, #15803D 360deg)'
                    : 'conic-gradient(from 180deg at 50% 50%, #C6FF3D 0deg, rgba(198,255,61,0.1) 120deg, transparent 240deg, #C6FF3D 360deg)',
                  animation: 'spin 8s linear infinite',
                }}
              />

              {/* Tilted Inner Card */}
              <motion.div
                animate={{ rotateX, rotateY }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`relative rounded-2xl border p-3 sm:p-4 overflow-hidden shadow-2xl transition-colors duration-300 ${
                  isCream ? 'bg-white border-black/10' : 'bg-[#0D0D0D] border-white/[0.1]'
                }`}
              >
                {/* Photo Frame */}
                <div
                  className={`relative rounded-xl overflow-hidden aspect-[4/5] ${
                    isCream ? 'bg-neutral-100' : 'bg-[#121212]'
                  }`}
                >
                  <img
                    src={personalData.avatar || "/my_photo.png"}
                    alt={personalData.name}
                    className="w-full h-full object-cover object-top contrast-[1.06] group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isCream
                        ? 'from-black/60 via-transparent to-transparent'
                        : 'from-[#050505] via-transparent to-transparent opacity-80'
                    }`}
                  />

                  {/* Top Badge */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md border flex items-center gap-2 ${
                      isCream
                        ? 'bg-white/80 border-black/10 text-neutral-900'
                        : 'bg-[#050505]/80 border-white/[0.1] text-white'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
                      }`}
                    />
                    <span className="text-[11px] font-heading font-medium tracking-wider uppercase">
                      {personalData.name}
                    </span>
                  </div>

                  {/* Bottom Role Overlay */}
                  <div
                    className={`absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md border ${
                      isCream
                        ? 'bg-white/90 border-white/60 text-neutral-900'
                        : 'bg-[#0D0D0D]/85 border-white/[0.08] text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-display font-bold uppercase">
                          BLG Full Stack Developer
                        </p>
                        <p
                          className={`text-[11px] font-heading font-semibold ${
                            isCream ? 'text-sky-700' : 'text-blue-400'
                          }`}
                        >
                          3.5+ Yrs Exp &bull; 10+ Products Delivered
                        </p>
                      </div>
                      <Code2
                        className={`w-5 h-5 ${
                          isCream ? 'text-sky-700' : 'text-blue-400'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div
                  className={`mt-3 flex items-center justify-between px-2 text-[11px] font-heading uppercase ${
                    isCream ? 'text-neutral-500' : 'text-[#71717A]'
                  }`}
                >
                  <span>SPECIALIZATION: FULL-STACK</span>
                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Recruiter Highlights + Word Bio + Features + Stats */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Instant Recruiter Highlights Box */}
            <div className={`p-5 rounded-2xl border mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isCream
                ? 'bg-sky-50/70 border-sky-200/80 text-slate-800'
                : 'bg-blue-950/20 border-blue-500/20 text-slate-200'
            }`}>
              <div>
                <span className={`text-[11px] font-heading font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                  isCream ? 'bg-sky-200/60 text-sky-900' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  QUICK CREDENTIALS
                </span>
                <h3 className="text-base sm:text-lg font-heading font-bold mt-1.5 leading-snug">
                  3.5+ Years Experience &bull; 10+ Full Stack Products Delivered &bull; BLG Full Stack Dev
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${
                  isCream ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Specialized in enterprise web portals, high-concurrency systems, role-based security, and zero-compromise product engineering.
                </p>
              </div>
            </div>

            {/* Word-by-word reveal text */}
            <div className="mb-10 text-lg sm:text-2xl leading-relaxed font-heading select-none">
              {words.map((word, index) => {
                const start = index / words.length;
                const end = start + 1 / words.length;
                return (
                  <WordHighlight
                    key={index}
                    range={[start, end]}
                    progress={scrollYProgress}
                    isCream={isCream}
                  >
                    {word}
                  </WordHighlight>
                );
              })}
            </div>

            {/* Core Values Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                  isCream
                    ? 'bg-white/80 border-black/5 shadow-sm'
                    : 'bg-[#0D0D0D]/60 border-white/[0.06]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    isCream
                      ? 'bg-emerald-600 shadow-[0_0_8px_rgba(22,163,74,0.6)]'
                      : 'bg-[#C6FF3D] shadow-[0_0_8px_#C6FF3D]'
                  }`}
                />
                <div>
                  <h4
                    className={`font-heading font-bold text-sm uppercase tracking-wider mb-1 ${
                      isCream ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    Enterprise Reliability
                  </h4>
                  <p
                    className={`text-xs leading-normal ${
                      isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                    }`}
                  >
                    ACID transaction compliance, RBAC security & sub-second API speeds.
                  </p>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border flex items-start gap-3 transition-colors ${
                  isCream
                    ? 'bg-white/80 border-black/5 shadow-sm'
                    : 'bg-[#0D0D0D]/60 border-white/[0.06]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    isCream
                      ? 'bg-emerald-600 shadow-[0_0_8px_rgba(22,163,74,0.6)]'
                      : 'bg-[#C6FF3D] shadow-[0_0_8px_#C6FF3D]'
                  }`}
                />
                <div>
                  <h4
                    className={`font-heading font-bold text-sm uppercase tracking-wider mb-1 ${
                      isCream ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    Awwwards Aesthetics
                  </h4>
                  <p
                    className={`text-xs leading-normal ${
                      isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                    }`}
                  >
                    Fluid GSAP choreography, responsive micro-animations & high-contrast UI.
                  </p>
                </div>
              </div>
            </div>

            {/* Counter Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
              <StatCounter target="3.5" suffix="+" label="Years Craft" isCream={isCream} />
              <StatCounter target="15" suffix="+" label="Web Portals" isCream={isCream} />
              <StatCounter target="18" suffix="+" label="Core Tech" isCream={isCream} />
              <StatCounter target="100" suffix="%" label="Dedication" isCream={isCream} />
            </div>

            {/* Download Resume Button */}
            <div>
              <MagneticButton strength={0.35}>
                <a
                  href={personalData.resumeUrl}
                  download="Vasu_Goyal_Resume.pdf"
                  data-cursor="pointer"
                  className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md group ${
                    isCream
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20'
                      : 'bg-white text-[#050505] hover:bg-[#C6FF3D] hover:shadow-[0_0_30px_rgba(198,255,61,0.4)]'
                  }`}
                >
                  <span>DOWNLOAD COMPLETE CV / RESUME</span>
                  <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
