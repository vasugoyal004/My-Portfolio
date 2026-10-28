import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FolderGit2, ExternalLink, Sparkles } from 'lucide-react';
import { projectsData } from '../data/content';
import MagneticButton from '../components/MagneticButton';

const CATEGORIES = ['All', 'Portals', 'Websites', 'Management Systems'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* Background Accent Radial Spotlight */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#C6FF3D]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 // SELECTED PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white uppercase">
              CASE STUDIES & <br className="hidden sm:inline" />
              FEATURED CRAFT
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-heading text-[#71717A] uppercase tracking-wider mt-4 md:mt-0 max-w-xs md:text-right">
            HIGH-THROUGHPUT WEB PORTALS & BESPOKE PLATFORMS
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-14">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-[#050505]' : 'text-[#A1A1AA] hover:text-white bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterActive"
                    className="absolute inset-0 bg-[#C6FF3D] rounded-full -z-10 shadow-[0_0_20px_rgba(198,255,61,0.35)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Editorial Layout */}
        <motion.div layout className="space-y-12 sm:space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              // Alternate between full-width editorial hero card and split editorial
              const isFullWidth = idx % 3 === 0;

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id}
                  className="group relative"
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    data-cursor="view"
                    className="block rounded-3xl bg-[#0D0D0D]/90 border border-white/[0.08] group-hover:border-[#C6FF3D]/40 p-6 sm:p-10 transition-all duration-500 overflow-hidden shadow-2xl relative"
                  >
                    {/* Background Subtle Spotlight on Card Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C6FF3D]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div
                      className={`grid gap-8 items-center ${
                        isFullWidth
                          ? 'grid-cols-1 lg:grid-cols-12'
                          : 'grid-cols-1 lg:grid-cols-12'
                      }`}
                    >
                      {/* Image Preview Container */}
                      <div
                        className={`relative rounded-2xl overflow-hidden bg-[#141414] aspect-[16/10] ${
                          isFullWidth ? 'lg:col-span-7' : 'lg:col-span-6'
                        }`}
                      >
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-60" />

                        {/* Floating Category Pill */}
                        <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/[0.1] text-[11px] font-heading font-medium tracking-wider text-white uppercase flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF3D]" />
                          {project.categoryLabel}
                        </div>

                        {/* View Case Study Pill on Mobile */}
                        <div className="lg:hidden absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#C6FF3D] text-[#050505] font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <span>EXPLORE</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Content Container */}
                      <div
                        className={`flex flex-col justify-between ${
                          isFullWidth ? 'lg:col-span-5' : 'lg:col-span-6'
                        }`}
                      >
                        <div>
                          {/* Big Index Number & Year */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-display font-black text-4xl sm:text-5xl text-white/20 group-hover:text-[#C6FF3D] transition-colors duration-300">
                              {project.index}
                            </span>
                            <span className="text-xs font-heading font-semibold text-[#71717A] uppercase tracking-widest border border-white/[0.08] px-3 py-1 rounded-full">
                              {project.year}
                            </span>
                          </div>

                          {/* Title & Subtitle */}
                          <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight mb-2 group-hover:text-[#C6FF3D] transition-colors duration-300">
                            {project.title}
                          </h3>

                          <p className="text-xs sm:text-sm font-heading font-medium text-[#C6FF3D]/90 uppercase tracking-wider mb-4">
                            {project.subtitle}
                          </p>

                          <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-3 mb-6">
                            {project.overview}
                          </p>

                          {/* Metric Pill Highlight */}
                          {project.metrics && project.metrics[0] && (
                            <div className="mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                              <span className="text-xs font-heading uppercase tracking-wider text-[#71717A]">
                                {project.metrics[0].label}
                              </span>
                              <span className="font-display font-bold text-base text-[#C6FF3D]">
                                {project.metrics[0].value}
                              </span>
                            </div>
                          )}

                          {/* Tech Stack Chips */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {project.techStack.slice(0, 5).map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-3 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] font-heading font-medium text-[#A1A1AA] group-hover:text-white group-hover:border-white/[0.12] transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Action Link */}
                        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-xs font-heading font-semibold uppercase tracking-widest text-white group-hover:text-[#C6FF3D] transition-colors flex items-center gap-2">
                            READ FULL CASE STUDY
                          </span>
                          <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] group-hover:bg-[#C6FF3D] group-hover:border-[#C6FF3D] flex items-center justify-center text-white group-hover:text-[#050505] transition-all duration-300 transform group-hover:scale-110">
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
