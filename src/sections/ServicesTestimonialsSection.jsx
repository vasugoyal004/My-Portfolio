import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  CheckCircle2,
  Code2,
  Layers,
  Zap,
  ShieldCheck,
  Terminal,
  Activity,
  Cpu,
  MonitorCheck,
  Server,
  Palette,
  CloudCog,
  CheckCircle,
  Clock,
  Award,
  Globe,
  Database,
  Lock,
  Compass
} from 'lucide-react';
import { servicesData, testimonialsData } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from '../components/MagneticButton';

const SERVICE_ICONS = [
  MonitorCheck, // 01 Website Development
  Layers,       // 02 Web Portal Development
  CloudCog,     // 03 Website Management
  Server,       // 04 API Engineering
  Palette       // 05 UI/UX Design
];

// Rich interactive visual interface mockup for each service
function ServiceVisualPreview({ serviceIndex, isCream }) {
  if (serviceIndex === 1) {
    // 02 Web Portal Development Mockup
    return (
      <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 font-mono text-xs ${
        isCream
          ? 'bg-white/90 border-black/10 shadow-inner text-neutral-800'
          : 'bg-[#141414] border-white/[0.08] text-neutral-300'
      }`}>
        {/* Mockup Window Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-inherit">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="text-[11px] font-sans font-bold ml-2 opacity-60">
              admin-portal.internal // v2.4
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            isCream ? 'bg-emerald-100 text-emerald-800' : 'bg-[#C6FF3D]/10 text-[#C6FF3D]'
          }`}>
            RBAC: SUPER_ADMIN
          </span>
        </div>

        {/* Mock Portal Table Preview */}
        <div className="space-y-2 text-[11px]">
          <div className={`p-2 rounded-lg flex items-center justify-between ${
            isCream ? 'bg-neutral-100/70' : 'bg-white/[0.04]'
          }`}>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 opacity-60" />
              <span>Auth Session // JWT RS256</span>
            </div>
            <span className="text-emerald-600 font-bold">200 OK</span>
          </div>

          <div className={`p-2 rounded-lg flex items-center justify-between ${
            isCream ? 'bg-neutral-100/70' : 'bg-white/[0.04]'
          }`}>
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 opacity-60" />
              <span>PostgreSQL Cluster Query</span>
            </div>
            <span className="opacity-70">12ms Latency</span>
          </div>

          <div className={`p-2 rounded-lg flex items-center justify-between ${
            isCream ? 'bg-neutral-100/70' : 'bg-white/[0.04]'
          }`}>
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 opacity-60" />
              <span>Real-Time WebSocket Sync</span>
            </div>
            <span className="text-emerald-600 font-bold">LIVE STREAM</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between text-[10px] opacity-70">
          <span>THROUGHPUT: 15,000 REQ/SEC</span>
          <span>UPTIME: 99.98%</span>
        </div>
      </div>
    );
  }

  if (serviceIndex === 0) {
    // 01 Website Development Mockup
    return (
      <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 font-sans text-xs ${
        isCream
          ? 'bg-white/90 border-black/10 shadow-inner text-neutral-800'
          : 'bg-[#141414] border-white/[0.08] text-neutral-300'
      }`}>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-inherit font-mono text-[11px]">
          <div className="flex items-center gap-2 truncate">
            <Globe className="w-3.5 h-3.5 opacity-60" />
            <span className="truncate">https://modern-brand.com</span>
          </div>
          <span className="text-emerald-600 font-bold shrink-0">60 FPS</span>
        </div>

        {/* Animated Wireframe Hero Box */}
        <div className={`p-4 rounded-xl border mb-3 flex flex-col items-center justify-center text-center ${
          isCream ? 'bg-emerald-50/50 border-emerald-200/60' : 'bg-[#C6FF3D]/5 border-[#C6FF3D]/20'
        }`}>
          <div className={`w-8 h-8 rounded-full mb-2 flex items-center justify-center animate-spin-slow ${
            isCream ? 'bg-emerald-700 text-white' : 'bg-[#C6FF3D] text-[#050505]'
          }`}>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-display font-black text-sm uppercase tracking-tight">
            Next.js 14 + Three.js Canvas
          </span>
          <span className="text-[11px] opacity-70 mt-1">
            Sub-second First Contentful Paint
          </span>
        </div>

        {/* Lighthouse 100 Scores */}
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
          <div className={`p-1.5 rounded-lg border ${
            isCream ? 'bg-neutral-100/80 border-black/5' : 'bg-white/[0.03] border-white/[0.06]'
          }`}>
            <div className="text-emerald-600 font-bold text-xs">100</div>
            <div>PERF</div>
          </div>
          <div className={`p-1.5 rounded-lg border ${
            isCream ? 'bg-neutral-100/80 border-black/5' : 'bg-white/[0.03] border-white/[0.06]'
          }`}>
            <div className="text-emerald-600 font-bold text-xs">100</div>
            <div>SEO</div>
          </div>
          <div className={`p-1.5 rounded-lg border ${
            isCream ? 'bg-neutral-100/80 border-black/5' : 'bg-white/[0.03] border-white/[0.06]'
          }`}>
            <div className="text-emerald-600 font-bold text-xs">100</div>
            <div>A11Y</div>
          </div>
        </div>
      </div>
    );
  }

  if (serviceIndex === 3) {
    // 04 API Engineering Mockup
    return (
      <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 font-mono text-xs ${
        isCream
          ? 'bg-white/90 border-black/10 shadow-inner text-neutral-800'
          : 'bg-[#141414] border-white/[0.08] text-neutral-300'
      }`}>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-inherit text-[11px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 opacity-60" />
            <span className="font-bold">REST / WebSocket Server</span>
          </div>
          <span className="text-emerald-600 font-bold">ONLINE</span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          <div className="text-emerald-600">&gt; POST /api/v1/auth/verify 200 OK (18ms)</div>
          <div className="text-blue-500">&gt; CACHE_HIT: redis://cluster0 (1.4ms)</div>
          <div className="opacity-70">&gt; STRIPE_WEBHOOK: charge.succeeded [evt_9128]</div>
          <div className="text-yellow-600">&gt; WEBSOCKET_PUMP: 8,420 connected clients</div>
        </div>

        <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between text-[10px] opacity-70">
          <span>TLS 1.3 ENCRYPTION</span>
          <span>CORS HARDENED</span>
        </div>
      </div>
    );
  }

  if (serviceIndex === 4) {
    // 05 UI/UX Design Systems Mockup
    return (
      <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 font-sans text-xs ${
        isCream
          ? 'bg-white/90 border-black/10 shadow-inner text-neutral-800'
          : 'bg-[#141414] border-white/[0.08] text-neutral-300'
      }`}>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-inherit font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 opacity-60" />
            <span>Figma Tokens &rarr; Codebase</span>
          </div>
          <span className="text-emerald-600 font-bold">100% PARITY</span>
        </div>

        {/* Color Palette Tokens Preview */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 p-2 rounded-lg bg-emerald-700 text-white text-center font-mono text-[10px] font-bold">
            Emerald
          </div>
          <div className="flex-1 p-2 rounded-lg bg-[#C6FF3D] text-black text-center font-mono text-[10px] font-bold">
            Lime
          </div>
          <div className="flex-1 p-2 rounded-lg bg-[#050505] text-white text-center font-mono text-[10px] font-bold">
            Obsidian
          </div>
          <div className="flex-1 p-2 rounded-lg bg-[#FAF7F2] text-black border text-center font-mono text-[10px] font-bold">
            Cream
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
          isCream ? 'bg-neutral-50' : 'bg-white/[0.03]'
        }`}>
          <span className="font-heading font-medium">Kinetic Micro-Animations</span>
          <span className="font-mono text-[10px] text-emerald-600">GSAP + Spring</span>
        </div>
      </div>
    );
  }

  // 03 Website Management Mockup
  return (
    <div className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 font-mono text-xs ${
      isCream
        ? 'bg-white/90 border-black/10 shadow-inner text-neutral-800'
        : 'bg-[#141414] border-white/[0.08] text-neutral-300'
    }`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-inherit text-[11px]">
        <div className="flex items-center gap-2">
          <CloudCog className="w-3.5 h-3.5 opacity-60" />
          <span>Cloud Telemetry & Maintenance</span>
        </div>
        <span className="text-emerald-600 font-bold">ACTIVE 24/7</span>
      </div>

      <div className="space-y-2 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="opacity-70">Uptime Check:</span>
          <span className="text-emerald-600 font-bold">100.0% (Last 30 Days)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-70">Automated DB Backup:</span>
          <span className="text-emerald-600 font-bold">Encrypted Daily AWS S3</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-70">Security & Patching:</span>
          <span className="text-emerald-600 font-bold">Zero Known Vulnerabilities</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between text-[10px] opacity-70">
        <span>SSL: TLS 1.3 AUTO-RENEW</span>
        <span>EDGE CDN ACTIVE</span>
      </div>
    </div>
  );
}

export default function ServicesTestimonialsSection() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(1); // Default to Web Portal Development (Flagship)
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isCream } = useTheme();

  const currentService = servicesData[activeServiceIndex] || servicesData[1];
  const IconComponent = SERVICE_ICONS[activeServiceIndex] || Layers;

  // Auto-play testimonial carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const scrollToContact = (serviceTitle) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[var(--bg)] overflow-hidden transition-colors duration-500"
    >
      {/* Background Radial Glow */}
      <div
        className={`absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none ${
          isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/4'
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ================= SERVICES SUB-SECTION ================= */}
        <div className="mb-24 sm:mb-32">
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
                <Sparkles className="w-3.5 h-3.5" />
                <span>05 // WHAT I DELIVER</span>
              </div>
              <h2
                className={`text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase ${
                  isCream ? 'text-neutral-900' : 'text-white'
                }`}
              >
                SERVICES & <br className="hidden sm:inline" />
                OFFERINGS
              </h2>
            </div>
            <p
              className={`text-xs sm:text-sm font-heading uppercase tracking-wider mt-4 sm:mt-0 ${
                isCream ? 'text-neutral-500' : 'text-[#71717A]'
              }`}
            >
              CLICK ANY CAPABILITY TO INSPECT LIVE ARCHITECTURE BLUEPRINT
            </p>
          </div>

          {/* Interactive Capability Horizontal Selector Rail */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {servicesData.map((service, idx) => {
              const isActive = activeServiceIndex === idx;
              const ServiceIcon = SERVICE_ICONS[idx] || Layers;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveServiceIndex(idx)}
                  className={`relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? isCream
                        ? 'text-white shadow-md'
                        : 'text-[#050505] shadow-[0_0_20px_rgba(198,255,61,0.35)]'
                      : isCream
                      ? 'text-neutral-700 hover:text-black bg-black/5 hover:bg-black/10'
                      : 'text-[#A1A1AA] hover:text-white bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeServiceTabPill"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isCream ? 'bg-neutral-900' : 'bg-[#C6FF3D]'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <ServiceIcon className="w-3.5 h-3.5" />
                  <span>{service.title}</span>
                </button>
              );
            })}
          </div>

          {/* Master Capability Stage: Interactive 3D Glass Console */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-3xl p-6 sm:p-10 md:p-12 border relative overflow-hidden transition-all duration-500 ${
                isCream
                  ? 'bg-white/85 border-black/10 shadow-[0_20px_55px_rgba(0,0,0,0.06)] backdrop-blur-2xl'
                  : 'bg-[#0D0D0D]/95 border-white/[0.08] shadow-[0_20px_55px_rgba(0,0,0,0.85)] backdrop-blur-2xl'
              }`}
            >
              {/* Background Ambient Glow */}
              <div
                className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none ${
                  isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/5'
                }`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start relative z-10">
                {/* Left Area: Title, Scope, Deliverables & Inquiry CTA (7 Cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Top Service Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        isCream
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-[#C6FF3D]/10 border-[#C6FF3D]/30 text-[#C6FF3D]'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </span>

                      <div>
                        <span className={`text-[11px] font-mono font-bold uppercase tracking-wider block ${
                          isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
                        }`}>
                          SERVICE 0{currentService.number} // PRODUCTION CORE
                        </span>
                        <span className={`text-xs font-heading ${
                          isCream ? 'text-neutral-500' : 'text-[#71717A]'
                        }`}>
                          Full-Cycle Architecture & Delivery
                        </span>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className={`font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-4 ${
                      isCream ? 'text-neutral-900' : 'text-white'
                    }`}>
                      {currentService.title}
                    </h3>

                    {/* Detailed Description */}
                    <p className={`text-sm sm:text-base font-heading leading-relaxed mb-6 ${
                      isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                    }`}>
                      {currentService.description}
                    </p>

                    {/* What You Get / Deliverables Matrix */}
                    <div className="mb-8">
                      <span className={`text-xs font-heading font-semibold uppercase tracking-widest block mb-3.5 ${
                        isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
                      }`}>
                        GUARANTEED DELIVERABLES IN SCOPE
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentService.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                              isCream
                                ? 'bg-neutral-50/90 border-black/5 text-neutral-800'
                                : 'bg-white/[0.03] border-white/[0.06] text-neutral-200'
                            }`}
                          >
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                              isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                            }`} />
                            <span className="text-xs font-heading font-medium leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer with Direct Inquiry CTA */}
                  <div className={`pt-6 border-t flex flex-wrap items-center justify-between gap-4 ${
                    isCream ? 'border-black/5' : 'border-white/[0.06]'
                  }`}>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 opacity-60" />
                        <span className={isCream ? 'text-neutral-600' : 'text-neutral-400'}>
                          Turnaround: 1-3 Wks
                        </span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className={isCream ? 'text-neutral-600' : 'text-neutral-400'}>
                          30-Day Warranty
                        </span>
                      </div>
                    </div>

                    <MagneticButton strength={0.3}>
                      <button
                        onClick={() => scrollToContact(currentService.title)}
                        className={`px-7 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-md ${
                          isCream
                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                            : 'bg-[#C6FF3D] hover:bg-[#b5f22b] text-[#050505]'
                        }`}
                      >
                        <span>BOOK {currentService.title.toUpperCase()}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </MagneticButton>
                  </div>
                </div>

                {/* Right Area: Interactive Visual Graphical Mockup (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <span className={`text-[11px] font-mono font-bold tracking-widest uppercase block ${
                    isCream ? 'text-neutral-400' : 'text-[#71717A]'
                  }`}>
                    LIVE SYSTEM ARCHITECTURE SPEC
                  </span>

                  {/* Render Visual Graphical Mockup */}
                  <ServiceVisualPreview
                    serviceIndex={activeServiceIndex}
                    isCream={isCream}
                  />

                  {/* Technical Standards Card */}
                  <div className={`p-4 rounded-2xl border ${
                    isCream
                      ? 'bg-neutral-50/70 border-black/5'
                      : 'bg-white/[0.02] border-white/[0.06]'
                  }`}>
                    <div className="text-xs font-heading font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Zap className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                      <span>Production Standards</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                    }`}>
                      All codebases include complete Git version history, automated tests, environment secrets isolation, and full ownership transfer on delivery.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= TESTIMONIALS SUB-SECTION ================= */}
        <div>
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
                <Quote className="w-3.5 h-3.5" />
                <span>06 // SOCIAL PROOF</span>
              </div>
              <h2
                className={`text-3xl sm:text-5xl font-display font-extrabold tracking-tight uppercase ${
                  isCream ? 'text-neutral-900' : 'text-white'
                }`}
              >
                CLIENT & COLLABORATOR <br className="hidden sm:inline" />
                TESTIMONIALS
              </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={prevTestimonial}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all ${
                  isCream
                    ? 'border-black/10 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white text-neutral-800'
                    : 'border-white/[0.1] hover:border-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-[#050505] text-white'
                }`}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all ${
                  isCream
                    ? 'border-black/10 hover:border-emerald-700 hover:bg-emerald-700 hover:text-white text-neutral-800'
                    : 'border-white/[0.1] hover:border-[#C6FF3D] hover:bg-[#C6FF3D] hover:text-[#050505] text-white'
                }`}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Active Display Card */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={`relative rounded-3xl p-6 sm:p-12 md:p-14 overflow-hidden border shadow-2xl transition-all duration-300 ${
              isCream
                ? 'bg-white/85 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl'
                : 'bg-[#0D0D0D]/90 border-white/[0.08]'
            }`}
          >
            <div
              className={`absolute top-6 right-6 ${
                isCream ? 'text-black/5' : 'text-[#C6FF3D]/10'
              }`}
            >
              <Quote className="w-20 h-20 sm:w-32 sm:h-32" />
            </div>

            {/* Star ratings */}
            <div
              className={`flex items-center gap-1 mb-6 sm:mb-8 ${
                isCream ? 'text-emerald-600' : 'text-[#C6FF3D]'
              }`}
            >
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <p
                  className={`text-lg sm:text-2xl md:text-3xl font-heading leading-relaxed mb-8 sm:mb-10 max-w-4xl font-normal ${
                    isCream ? 'text-neutral-900' : 'text-white'
                  }`}
                >
                  "{testimonialsData[activeTestimonial].quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonialsData[activeTestimonial].avatar}
                    alt={testimonialsData[activeTestimonial].author}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 ${
                      isCream ? 'border-emerald-600' : 'border-[#C6FF3D]'
                    }`}
                  />
                  <div>
                    <h4
                      className={`font-display font-bold text-base sm:text-lg ${
                        isCream ? 'text-neutral-900' : 'text-white'
                      }`}
                    >
                      {testimonialsData[activeTestimonial].author}
                    </h4>
                    <p
                      className={`text-xs font-heading uppercase tracking-wider ${
                        isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                      }`}
                    >
                      {testimonialsData[activeTestimonial].role}
                    </p>
                    <p
                      className={`text-xs font-heading ${
                        isCream ? 'text-neutral-500' : 'text-[#71717A]'
                      }`}
                    >
                      {testimonialsData[activeTestimonial].organization}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 mt-8 sm:mt-10">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === i
                      ? isCream
                        ? 'w-8 bg-emerald-700'
                        : 'w-8 bg-[#C6FF3D]'
                      : isCream
                      ? 'w-2 bg-black/20 hover:bg-black/40'
                      : 'w-2 bg-white/20 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
