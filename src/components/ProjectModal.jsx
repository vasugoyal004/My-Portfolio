import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  User,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from './MagneticButton';

export default function ProjectModal({ project, isOpen, onClose, onNext, onPrev }) {
  const { isCream } = useTheme();

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 md:p-10 select-none overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-0"
        />

        {/* Modal Dialog Chamber */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className={`relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-10 transition-colors duration-300 ${
            isCream
              ? 'bg-[#FAF7F2] text-neutral-900 border-emerald-950/15 shadow-[0_25px_70px_rgba(0,0,0,0.15)]'
              : 'bg-[#0A0A0A] text-white border-white/[0.12] shadow-[0_25px_70px_rgba(0,0,0,0.95)]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Floating Control Bar */}
          <div className="sticky -top-6 sm:-top-10 -mx-6 sm:-mx-10 px-6 sm:px-10 py-4 mb-6 z-30 flex items-center justify-between border-b backdrop-blur-xl transition-colors ${
            isCream
              ? 'bg-[#FAF7F2]/90 border-black/10'
              : 'bg-[#0A0A0A]/90 border-white/[0.08]'
          }">
            {/* Category Tag */}
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full animate-ping ${
                isCream ? 'bg-emerald-600' : 'bg-[#C6FF3D]'
              }`} />
              <span className={`text-xs font-mono font-bold tracking-widest uppercase ${
                isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
              }`}>
                CASE STUDY // {project.categoryLabel}
              </span>
            </div>

            {/* Quick Switcher & Close Controls */}
            <div className="flex items-center gap-2">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className={`p-2 rounded-full border transition-all ${
                    isCream
                      ? 'bg-white/80 border-black/10 hover:bg-black/5 text-neutral-800'
                      : 'bg-white/[0.04] border-white/[0.1] hover:bg-white/[0.1] text-white'
                  }`}
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {onNext && (
                <button
                  onClick={onNext}
                  className={`p-2 rounded-full border transition-all ${
                    isCream
                      ? 'bg-white/80 border-black/10 hover:bg-black/5 text-neutral-800'
                      : 'bg-white/[0.04] border-white/[0.1] hover:bg-white/[0.1] text-white'
                  }`}
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <MagneticButton strength={0.3}>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full border transition-all ${
                    isCream
                      ? 'bg-white/90 border-black/10 hover:bg-emerald-700 hover:text-white hover:border-emerald-700 text-neutral-800'
                      : 'bg-white/[0.06] border-white/[0.12] hover:bg-[#C6FF3D] hover:text-[#050505] hover:border-[#C6FF3D] text-white'
                  }`}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Cinematic Hero Cover Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-8 bg-neutral-900 border border-inherit">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isCream
                ? 'from-[#FAF7F2] via-transparent to-transparent opacity-80'
                : 'from-[#0A0A0A] via-transparent to-transparent opacity-80'
            }`} />

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider backdrop-blur-md border ${
                isCream
                  ? 'bg-white/90 border-black/10 text-emerald-800'
                  : 'bg-black/80 border-white/20 text-[#C6FF3D]'
              }`}>
                PROJECT {project.index} // {project.year}
              </span>

              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 ${
                      isCream
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#C6FF3D] text-[#050505]'
                    }`}
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-full text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md border transition-colors ${
                      isCream
                        ? 'bg-white/90 border-black/10 text-neutral-900 hover:bg-white'
                        : 'bg-black/70 border-white/20 text-white hover:bg-black/90'
                    }`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>SOURCE</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Project Title & Overview */}
          <div className="mb-8">
            <h2 className={`font-display font-black text-3xl sm:text-5xl uppercase tracking-tight mb-3 leading-tight ${
              isCream ? 'text-neutral-900' : 'text-white'
            }`}>
              {project.title}
            </h2>

            <p className={`text-base sm:text-lg font-heading leading-relaxed ${
              isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
            }`}>
              {project.subtitle}
            </p>
          </div>

          {/* Meta Information Bar */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl mb-10 border ${
            isCream
              ? 'bg-white/80 border-black/5'
              : 'bg-white/[0.02] border-white/[0.06]'
          }`}>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-heading uppercase tracking-wider text-[#71717A] mb-1">
                <User className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>CLIENT</span>
              </div>
              <div className={`font-heading font-bold text-xs sm:text-sm ${isCream ? 'text-neutral-900' : 'text-white'}`}>
                {project.client}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-heading uppercase tracking-wider text-[#71717A] mb-1">
                <Layers className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>ROLE</span>
              </div>
              <div className={`font-heading font-bold text-xs sm:text-sm ${isCream ? 'text-neutral-900' : 'text-white'}`}>
                {project.role}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-heading uppercase tracking-wider text-[#71717A] mb-1">
                <Calendar className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>TIMELINE</span>
              </div>
              <div className={`font-heading font-bold text-xs sm:text-sm ${isCream ? 'text-neutral-900' : 'text-white'}`}>
                {project.year} ({project.duration})
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-heading uppercase tracking-wider text-[#71717A] mb-1">
                <Activity className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>STATUS</span>
              </div>
              <div className={`font-heading font-bold text-xs sm:text-sm ${
                isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
              }`}>
                PRODUCTION READY
              </div>
            </div>
          </div>

          {/* Metrics Spotlight Banner */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {project.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className={`p-4 rounded-2xl border ${
                    isCream
                      ? 'bg-white border-black/5 shadow-sm'
                      : 'bg-white/[0.03] border-white/[0.06]'
                  }`}
                >
                  <div className={`font-display font-black text-2xl sm:text-3xl mb-1 ${
                    isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
                  }`}>
                    {metric.value}
                  </div>
                  <div className={`text-[11px] font-heading uppercase tracking-wider ${
                    isCream ? 'text-neutral-500' : 'text-[#71717A]'
                  }`}>
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Problem & Engineering Solution */}
          <div className="space-y-8 mb-10">
            {/* The Challenge */}
            <div className={`p-6 rounded-2xl border ${
              isCream
                ? 'bg-white/80 border-black/5'
                : 'bg-white/[0.02] border-white/[0.06]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
              }`}>
                <ShieldCheck className="w-4 h-4" />
                <span>01 // THE CHALLENGE</span>
              </div>
              <p className={`text-sm leading-relaxed font-heading ${
                isCream ? 'text-neutral-700' : 'text-[#A1A1AA]'
              }`}>
                {project.problem || project.overview}
              </p>
            </div>

            {/* The Solution & Architecture */}
            <div className={`p-6 rounded-2xl border ${
              isCream
                ? 'bg-white/80 border-black/5'
                : 'bg-white/[0.02] border-white/[0.06]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
                isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
              }`}>
                <Zap className="w-4 h-4" />
                <span>02 // ENGINEERING SOLUTION</span>
              </div>
              <p className={`text-sm leading-relaxed font-heading mb-4 ${
                isCream ? 'text-neutral-700' : 'text-[#A1A1AA]'
              }`}>
                {project.solution}
              </p>

              {project.architecture && (
                <div className="space-y-2 mt-4 pt-4 border-t border-inherit">
                  {project.architecture.map((item, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs font-heading">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                        isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                      }`} />
                      <span className={isCream ? 'text-neutral-800' : 'text-neutral-200'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Key Deliverables & Features */}
          {project.keyFeatures && (
            <div className="mb-10">
              <span className={`text-xs font-mono font-bold uppercase tracking-widest block mb-4 ${
                isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
              }`}>
                03 // DELIVERED CAPABILITIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                      isCream
                        ? 'bg-white border-black/5'
                        : 'bg-white/[0.02] border-white/[0.06]'
                    }`}
                  >
                    <span className={`font-mono text-xs font-bold ${
                      isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                    }`}>
                      0{fIdx + 1}
                    </span>
                    <span className={`text-xs font-heading font-medium ${
                      isCream ? 'text-neutral-800' : 'text-white'
                    }`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="mb-8">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest block mb-3 ${
              isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
            }`}>
              04 // TECHNOLOGY ARSENAL
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border ${
                    isCream
                      ? 'bg-white border-neutral-200 text-neutral-800'
                      : 'bg-white/[0.04] border-white/[0.08] text-white'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Gallery Preview */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-6">
              <span className={`text-xs font-mono font-bold uppercase tracking-widest block mb-3 ${
                isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
              }`}>
                05 // INTERFACE PREVIEWS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((imgUrl, gIdx) => (
                  <div
                    key={gIdx}
                    className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-900 border border-inherit group"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} interface preview ${gIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-inherit flex items-center justify-between">
            <button
              onClick={onClose}
              className={`px-6 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider border transition-colors ${
                isCream
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-300'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/[0.1]'
              }`}
            >
              CLOSE CASE STUDY
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  isCream
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                    : 'bg-[#C6FF3D] hover:bg-[#b5f22b] text-[#050505] shadow-[0_0_20px_rgba(198,255,61,0.35)]'
                }`}
              >
                <span>OPEN LIVE SITE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
