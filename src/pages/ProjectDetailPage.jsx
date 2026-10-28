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

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);

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
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display font-extrabold text-4xl text-white mb-4">
          PROJECT NOT FOUND
        </h1>
        <p className="text-[#A1A1AA] text-sm mb-8 font-heading">
          The requested case study does not exist or has been relocated.
        </p>
        <Link
          to="/#projects"
          className="px-6 py-3 rounded-full bg-[#C6FF3D] text-[#050505] font-heading font-bold text-xs uppercase tracking-widest"
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
    <article className="min-h-screen bg-[#050505] text-white pt-24 pb-20 overflow-x-hidden selection:bg-[#C6FF3D] selection:text-[#050505]">
      {/* Back Button Floating Pill */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 mb-8">
        <MagneticButton strength={0.3}>
          <button
            onClick={() => navigate('/#projects')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-[#C6FF3D] border border-white/[0.1] hover:border-[#C6FF3D] text-xs font-heading font-semibold uppercase tracking-wider text-white hover:text-[#050505] transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL PROJECTS</span>
          </button>
        </MagneticButton>
      </div>

      {/* Hero Header */}
      <header className="max-w-6xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        <div className="flex items-center gap-3 text-xs font-heading uppercase tracking-widest text-[#C6FF3D] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#C6FF3D] animate-ping" />
          <span>CASE STUDY // {project.categoryLabel}</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white mb-6 leading-[1.05]">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl font-heading text-[#A1A1AA] max-w-3xl leading-relaxed mb-8">
          {project.subtitle}
        </p>

        {/* Project Meta Details Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#0D0D0D] border border-white/[0.08]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#71717A] mb-1">
              <User className="w-3.5 h-3.5 text-[#C6FF3D]" />
              <span>CLIENT</span>
            </div>
            <div className="font-heading font-bold text-sm text-white">{project.client}</div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#71717A] mb-1">
              <Layers className="w-3.5 h-3.5 text-[#C6FF3D]" />
              <span>MY ROLE</span>
            </div>
            <div className="font-heading font-bold text-sm text-white">{project.role}</div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#71717A] mb-1">
              <Calendar className="w-3.5 h-3.5 text-[#C6FF3D]" />
              <span>TIMELINE</span>
            </div>
            <div className="font-heading font-bold text-sm text-white">
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
                  className="px-4 py-2 rounded-full bg-[#C6FF3D] text-[#050505] text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 hover:shadow-[0_0_20px_rgba(198,255,61,0.4)] transition-all"
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
                  className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
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
          className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#121212] border border-white/[0.08]"
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>

      {/* Metrics Banner */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="p-6 rounded-2xl glass-card border border-white/[0.08] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#C6FF3D]/5 rounded-bl-full pointer-events-none" />
                <div className="font-display font-black text-3xl sm:text-4xl text-white mb-2">
                  <span className="text-[#C6FF3D]">{metric.value}</span>
                </div>
                <div className="text-xs font-heading uppercase tracking-wider text-[#A1A1AA]">
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
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] block mb-2">
              01 // THE CHALLENGE
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase">
              BACKGROUND & PROBLEM STATEMENT
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-[#A1A1AA] text-base leading-relaxed font-heading">
            <p className="text-lg text-white font-medium">
              {project.overview}
            </p>
            <p>
              {project.problem}
            </p>
          </div>
        </section>

        {/* The Solution & System Architecture */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-white/[0.08]">
          <div className="lg:col-span-4">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] block mb-2">
              02 // THE SOLUTION
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase">
              ENGINEERING & ARCHITECTURE
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-[#A1A1AA] text-base leading-relaxed font-heading">
              {project.solution}
            </p>

            {/* Architecture Highlights List */}
            {project.architecture && (
              <div className="space-y-3 mt-6">
                {project.architecture.map((item, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-4 rounded-xl bg-[#0D0D0D] border border-white/[0.06] flex items-start gap-3.5"
                  >
                    <CheckCircle className="w-5 h-5 text-[#C6FF3D] shrink-0 mt-0.5" />
                    <span className="text-sm font-heading text-white">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Key Features */}
        <section className="pt-12 border-t border-white/[0.08]">
          <div className="mb-10">
            <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] block mb-2">
              03 // CAPABILITIES
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase">
              KEY DELIVERABLES & FEATURES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.keyFeatures.map((feature, fIdx) => (
              <div
                key={fIdx}
                className="p-6 rounded-2xl glass-card border border-white/[0.08] relative group hover:border-[#C6FF3D]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-[#C6FF3D]/40 flex items-center justify-center text-[#C6FF3D] mb-4 text-xs font-bold font-heading">
                  0{fIdx + 1}
                </div>
                <p className="text-sm font-heading font-medium text-white leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0D0D0D] border border-white/[0.08]">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C6FF3D]" />
            <span>TECHNOLOGY STACK USED</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech, tIdx) => (
              <div
                key={tIdx}
                className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-heading font-semibold tracking-wider text-white uppercase hover:border-[#C6FF3D] transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* Screenshot Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="pt-12 border-t border-white/[0.08]">
            <div className="mb-10">
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] block mb-2">
                04 // VISUAL PREVIEWS
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase">
                INTERFACE GALLERY
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((imgUrl, gIdx) => (
                <div
                  key={gIdx}
                  className="rounded-2xl overflow-hidden bg-[#141414] border border-white/[0.08] aspect-[16/10] group"
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
      <section className="border-t border-white/[0.08] bg-[#0A0A0A] py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#71717A] block mb-4">
            NEXT CASE STUDY
          </span>

          <Link
            to={`/projects/${nextProject.slug}`}
            data-cursor="view"
            className="group block relative"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-white/[0.08] group-hover:border-[#C6FF3D] transition-colors duration-300">
              <div>
                <span className="font-display text-xs text-[#C6FF3D] uppercase tracking-widest block mb-2">
                  PROJECT 0{nextProjectIndex + 1} // {nextProject.categoryLabel}
                </span>
                <h3 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white group-hover:text-[#C6FF3D] transition-colors duration-300">
                  {nextProject.title}
                </h3>
              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/[0.05] group-hover:bg-[#C6FF3D] border border-white/[0.1] group-hover:border-[#C6FF3D] flex items-center justify-center text-white group-hover:text-[#050505] transition-all duration-300 transform group-hover:scale-110 shrink-0">
                <ArrowUpRight className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
