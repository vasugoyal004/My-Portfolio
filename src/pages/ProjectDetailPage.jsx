import { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Calendar,
  User,
  Clock,
  Layers,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { projectsData } from '../data/content';
import MagneticButton from '../components/MagneticButton';
import { useTheme } from '../context/ThemeContext';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { isCream } = useTheme();

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [slug]);

  // Find project
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[projectIndex];

  // Parallax on hero image
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  if (!project) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center px-4 text-center transition-colors duration-500 ${
        isCream ? 'bg-[#FAF7F2] text-[#0F172A]' : 'bg-[#050505] text-white'
      }`}>
        <h1 className="font-display font-extrabold text-4xl mb-4">
          PROJECT NOT FOUND
        </h1>
        <p className={`text-sm mb-8 font-heading ${isCream ? 'text-[#475569]' : 'text-[#A1A1AA]'}`}>
          The requested case study does not exist or has been relocated.
        </p>
        <Link
          to="/#projects"
          className={`px-6 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-widest ${
            isCream ? 'bg-[#15803D] text-white' : 'bg-[#C6FF3D] text-[#050505]'
          }`}
        >
          BACK TO PORTFOLIO
        </Link>
      </div>
    );
  }

  // Next Project computation
  const nextProjectIndex = (projectIndex + 1) % projectsData.length;
  const nextProject = projectsData[nextProjectIndex];

  return (
    <article className={`min-h-screen pt-24 pb-20 overflow-x-hidden transition-colors duration-500 ${
      isCream
        ? 'bg-[#FAF7F2] text-[#0F172A] selection:bg-[#15803D] selection:text-white'
        : 'bg-[#050505] text-white selection:bg-[#C6FF3D] selection:text-[#050505]'
    }`}>
      {/* Back Button Floating Pill */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
        <MagneticButton strength={0.3}>
          <button
            onClick={() => navigate('/#projects')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 group ${
              isCream
                ? 'bg-white/80 hover:bg-[#15803D] border border-emerald-950/10 hover:border-[#15803D] text-[#0F172A] hover:text-white shadow-sm'
                : 'bg-white/[0.05] hover:bg-[#C6FF3D] border border-white/[0.1] hover:border-[#C6FF3D] text-white hover:text-[#050505]'
            }`}
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL PROJECTS</span>
          </button>
        </MagneticButton>
      </div>

      {/* Hero Header */}
      <header className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <div className={`flex items-center gap-3 text-xs font-heading uppercase tracking-widest mb-4 font-bold ${
          isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
        }`}>
          <span className={`w-2 h-2 rounded-full animate-ping ${isCream ? 'bg-[#15803D]' : 'bg-[#C6FF3D]'}`} />
          <span>CASE STUDY // {project.categoryLabel}</span>
        </div>

        <h1 className={`font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight mb-6 leading-[1.05] ${
          isCream ? 'text-[#0F172A]' : 'text-white'
        }`}>
          {project.title}
        </h1>

        <p className={`text-base sm:text-xl font-heading max-w-3xl leading-relaxed mb-8 ${
          isCream ? 'text-[#475569]' : 'text-[#A1A1AA]'
        }`}>
          {project.subtitle}
        </p>

        {/* Project Meta Details Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl ${
          isCream
            ? 'liquid-glass-card border border-emerald-950/10'
            : 'bg-[#0D0D0D] border border-white/[0.08]'
        }`}>
          <div>
            <div className={`flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider mb-1 ${
              isCream ? 'text-[#64748B]' : 'text-[#71717A]'
            }`}>
              <User className={`w-3.5 h-3.5 ${isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'}`} />
              <span>CLIENT</span>
            </div>
            <div className={`font-heading font-bold text-sm ${isCream ? 'text-[#0F172A]' : 'text-white'}`}>
              {project.client}
            </div>
          </div>

          <div>
            <div className={`flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider mb-1 ${
              isCream ? 'text-[#64748B]' : 'text-[#71717A]'
            }`}>
              <Layers className={`w-3.5 h-3.5 ${isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'}`} />
              <span>MY ROLE</span>
            </div>
            <div className={`font-heading font-bold text-sm ${isCream ? 'text-[#0F172A]' : 'text-white'}`}>
              {project.role}
            </div>
          </div>

          <div>
            <div className={`flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider mb-1 ${
              isCream ? 'text-[#64748B]' : 'text-[#71717A]'
            }`}>
              <Calendar className={`w-3.5 h-3.5 ${isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'}`} />
              <span>TIMELINE</span>
            </div>
            <div className={`font-heading font-bold text-sm ${isCream ? 'text-[#0F172A]' : 'text-white'}`}>
              {project.year} ({project.duration})
            </div>
          </div>

          <div className="flex items-center gap-3 justify-start md:justify-end">
            {project.liveUrl && (
              <MagneticButton strength={0.3}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    isCream
                      ? 'bg-[#15803D] text-white hover:bg-[#166534] shadow-[0_4px_14px_rgba(21,128,61,0.25)]'
                      : 'bg-[#C6FF3D] text-[#050505] hover:shadow-[0_0_20px_rgba(198,255,61,0.4)]'
                  }`}
                >
                  <span>LIVE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </MagneticButton>
            )}

            {project.githubUrl && (
              <MagneticButton strength={0.3}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-full border text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    isCream
                      ? 'bg-white/80 hover:bg-white text-[#0F172A] border-emerald-950/10'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/[0.1]'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>CODE</span>
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </header>

      {/* Hero Parallax Banner */}
      <div
        ref={heroRef}
        className="max-w-6xl mx-auto px-4 sm:px-8 mb-20 overflow-hidden"
      >
        <motion.div
          style={{ y: heroImageY, opacity: heroOpacity }}
          className={`relative rounded-3xl overflow-hidden aspect-[16/9] border ${
            isCream
              ? 'bg-[#EFE9DF] border-emerald-950/10 shadow-lg'
              : 'bg-[#121212] border-white/[0.08]'
          }`}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60 ${
            isCream ? 'from-[#FAF7F2]' : 'from-[#050505]'
          }`} />
        </motion.div>
      </div>

      {/* Metrics Banner */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className={`p-6 rounded-2xl relative overflow-hidden ${
                  isCream
                    ? 'liquid-glass-card border border-emerald-950/10'
                    : 'glass-card border border-white/[0.08]'
                }`}
              >
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full pointer-events-none ${
                  isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/5'
                }`} />
                <div className={`font-display font-black text-3xl sm:text-4xl mb-2 ${
                  isCream ? 'text-[#0F172A]' : 'text-white'
                }`}>
                  <span className={isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'}>{metric.value}</span>
                </div>
                <div className={`text-xs font-heading uppercase tracking-wider ${
                  isCream ? 'text-[#64748B]' : 'text-[#A1A1AA]'
                }`}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Deep-Dive Case Study Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-16 sm:space-y-24 mb-24">
        {/* Overview & Problem / Solution Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className={`text-xs font-heading font-semibold uppercase tracking-[0.2em] block mb-2 ${
              isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
            }`}>
              01 // THE CHALLENGE
            </span>
            <h2 className={`font-display font-bold text-2xl sm:text-3xl uppercase ${
              isCream ? 'text-[#0F172A]' : 'text-white'
            }`}>
              BACKGROUND & PROBLEM STATEMENT
            </h2>
          </div>
          <div className={`lg:col-span-8 space-y-6 text-base leading-relaxed font-heading ${
            isCream ? 'text-[#475569]' : 'text-[#A1A1AA]'
          }`}>
            <p className={`text-lg font-medium ${isCream ? 'text-[#0F172A]' : 'text-white'}`}>
              {project.overview}
            </p>
            <p>
              {project.problem}
            </p>
          </div>
        </section>

        {/* The Solution & System Architecture */}
        <section className={`grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t ${
          isCream ? 'border-black/[0.08]' : 'border-white/[0.08]'
        }`}>
          <div className="lg:col-span-4">
            <span className={`text-xs font-heading font-semibold uppercase tracking-[0.2em] block mb-2 ${
              isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
            }`}>
              02 // THE SOLUTION
            </span>
            <h2 className={`font-display font-bold text-2xl sm:text-3xl uppercase ${
              isCream ? 'text-[#0F172A]' : 'text-white'
            }`}>
              ENGINEERING & ARCHITECTURE
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className={`text-base leading-relaxed font-heading ${
              isCream ? 'text-[#475569]' : 'text-[#A1A1AA]'
            }`}>
              {project.solution}
            </p>

            {/* Architecture Highlights List */}
            {project.architecture && (
              <div className="space-y-3 mt-6">
                {project.architecture.map((item, aIdx) => (
                  <div
                    key={aIdx}
                    className={`p-4 rounded-xl flex items-start gap-3.5 border ${
                      isCream
                        ? 'liquid-glass-card border-emerald-950/10'
                        : 'bg-[#0D0D0D] border-white/[0.06]'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                      isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
                    }`} />
                    <span className={`text-sm font-heading ${isCream ? 'text-[#0F172A]' : 'text-white'}`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Key Features */}
        <section className={`pt-12 border-t ${isCream ? 'border-black/[0.08]' : 'border-white/[0.08]'}`}>
          <div className="mb-10">
            <span className={`text-xs font-heading font-semibold uppercase tracking-[0.2em] block mb-2 ${
              isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
            }`}>
              03 // CAPABILITIES
            </span>
            <h2 className={`font-display font-bold text-2xl sm:text-3xl uppercase ${
              isCream ? 'text-[#0F172A]' : 'text-white'
            }`}>
              KEY DELIVERABLES & FEATURES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.keyFeatures.map((feature, fIdx) => (
              <div
                key={fIdx}
                className={`p-6 rounded-2xl relative group transition-all duration-300 ${
                  isCream
                    ? 'liquid-glass-card border border-emerald-950/10 hover:border-[#15803D]/40'
                    : 'glass-card border border-white/[0.08] hover:border-[#C6FF3D]/40'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 text-xs font-bold font-heading border ${
                  isCream
                    ? 'bg-emerald-50 text-[#15803D] border-emerald-200'
                    : 'bg-white/[0.04] text-[#C6FF3D] border-white/[0.08]'
                }`}>
                  0{fIdx + 1}
                </div>
                <p className={`text-sm font-heading font-medium leading-relaxed ${
                  isCream ? 'text-[#0F172A]' : 'text-white'
                }`}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className={`p-8 sm:p-10 rounded-3xl border ${
          isCream
            ? 'liquid-glass-card border-emerald-950/10'
            : 'bg-[#0D0D0D] border-white/[0.08]'
        }`}>
          <h3 className={`font-display font-bold text-xl sm:text-2xl uppercase mb-6 flex items-center gap-2 ${
            isCream ? 'text-[#0F172A]' : 'text-white'
          }`}>
            <Sparkles className={`w-5 h-5 ${isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'}`} />
            <span>TECHNOLOGY STACK USED</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, tIdx) => (
              <div
                key={tIdx}
                className={`px-5 py-2.5 rounded-xl text-xs font-heading font-semibold tracking-wider uppercase border transition-colors ${
                  isCream
                    ? 'bg-white/90 border-emerald-950/10 text-[#0F172A] hover:border-[#15803D]'
                    : 'bg-white/[0.03] border-white/[0.08] text-white hover:border-[#C6FF3D]'
                }`}
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Screenshot Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className={`pt-12 border-t ${isCream ? 'border-black/[0.08]' : 'border-white/[0.08]'}`}>
            <div className="mb-10">
              <span className={`text-xs font-heading font-semibold uppercase tracking-[0.2em] block mb-2 ${
                isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
              }`}>
                04 // VISUAL PREVIEWS
              </span>
              <h2 className={`font-display font-bold text-2xl sm:text-3xl uppercase ${
                isCream ? 'text-[#0F172A]' : 'text-white'
              }`}>
                INTERFACE GALLERY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((imgUrl, gIdx) => (
                <div
                  key={gIdx}
                  className={`rounded-2xl overflow-hidden border aspect-[16/10] group ${
                    isCream
                      ? 'bg-[#EFE9DF] border-emerald-950/10 shadow-sm'
                      : 'bg-[#141414] border-white/[0.08]'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} preview ${gIdx + 1}`}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Full-width "Next Project" CTA Section */}
      <section className={`border-t py-20 px-4 sm:px-8 transition-colors duration-500 ${
        isCream
          ? 'bg-[#EFE9DF]/60 border-black/[0.08]'
          : 'bg-[#0A0A0A] border-white/[0.08]'
      }`}>
        <div className="max-w-6xl mx-auto">
          <span className={`text-xs font-heading font-semibold uppercase tracking-[0.25em] block mb-4 ${
            isCream ? 'text-[#64748B]' : 'text-[#71717A]'
          }`}>
            NEXT CASE STUDY
          </span>

          <Link
            to={`/projects/${nextProject.slug}`}
            data-cursor="view"
            className="group block relative"
          >
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b transition-colors duration-300 ${
              isCream
                ? 'border-black/[0.08] group-hover:border-[#15803D]'
                : 'border-white/[0.08] group-hover:border-[#C6FF3D]'
            }`}>
              <div>
                <span className={`font-display text-xs uppercase tracking-widest block mb-2 font-bold ${
                  isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'
                }`}>
                  PROJECT 0{nextProjectIndex + 1} // {nextProject.categoryLabel}
                </span>
                <h3 className={`font-display font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight transition-colors duration-300 ${
                  isCream
                    ? 'text-[#0F172A] group-hover:text-[#15803D]'
                    : 'text-white group-hover:text-[#C6FF3D]'
                }`}>
                  {nextProject.title}
                </h3>
              </div>

              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shrink-0 ${
                isCream
                  ? 'bg-black/[0.05] group-hover:bg-[#15803D] border border-black/10 group-hover:border-[#15803D] text-[#0F172A] group-hover:text-white'
                  : 'bg-white/[0.05] group-hover:bg-[#C6FF3D] border border-white/[0.1] group-hover:border-[#C6FF3D] text-white group-hover:text-[#050505]'
              }`}>
                <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
