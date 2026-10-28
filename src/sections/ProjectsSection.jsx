import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  FolderGit2,
  ExternalLink,
  Sparkles,
  Layers,
  Calendar,
  User,
  CheckCircle,
  Eye
} from 'lucide-react';
import { projectsData } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from '../components/MagneticButton';
import ProjectModal from '../components/ProjectModal';

const CATEGORIES = ['All', 'Portals', 'Websites', 'Management Systems'];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalProject, setModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isCream } = useTheme();

  const filteredProjects =
    activeCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  // Divide into Featured Flagship Project (index 0) and Remaining Showcase Grid
  const featuredProject = filteredProjects[0];
  const gridProjects = filteredProjects.slice(1);

  const openProjectModal = (project) => {
    setModalProject(project);
    setIsModalOpen(true);
  };

  const handleNextModal = () => {
    if (!modalProject) return;
    const currentIndex = projectsData.findIndex((p) => p.id === modalProject.id);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    setModalProject(projectsData[nextIndex]);
  };

  const handlePrevModal = () => {
    if (!modalProject) return;
    const currentIndex = projectsData.findIndex((p) => p.id === modalProject.id);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setModalProject(projectsData[prevIndex]);
  };

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[var(--bg)] overflow-hidden transition-colors duration-500"
    >
      {/* Background Accent Radial Spotlight */}
      <div
        className={`absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none ${
          isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/4'
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 border-b ${
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
              <span>03 // SELECTED PORTFOLIO</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight uppercase ${
                isCream ? 'text-neutral-900' : 'text-white'
              }`}
            >
              CASE STUDIES & <br className="hidden sm:inline" />
              FEATURED CRAFT
            </h2>
          </div>

          <p
            className={`text-xs sm:text-sm font-heading uppercase tracking-wider mt-4 md:mt-0 max-w-xs md:text-right ${
              isCream ? 'text-neutral-500' : 'text-[#71717A]'
            }`}
          >
            CLICK ANY CARD TO VIEW IN-DEPTH ARCHITECTURE
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? isCream
                      ? 'text-white shadow-md'
                      : 'text-[#050505] shadow-[0_0_20px_rgba(198,255,61,0.35)]'
                    : isCream
                    ? 'text-neutral-600 hover:text-black bg-black/5 hover:bg-black/10'
                    : 'text-[#A1A1AA] hover:text-white bg-white/[0.03] hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectFilterActive"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isCream ? 'bg-neutral-900' : 'bg-[#C6FF3D]'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45 }}
            className="space-y-12 sm:space-y-16"
          >
            {/* 1. HERO SPOTLIGHT FLAGSHIP PROJECT (Click to open rich modal) */}
            {featuredProject && (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative cursor-pointer"
                onClick={() => openProjectModal(featuredProject)}
              >
                <div
                  data-cursor="view"
                  className={`block rounded-3xl p-6 sm:p-10 md:p-12 transition-all duration-500 overflow-hidden relative border ${
                    isCream
                      ? 'bg-white/85 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-emerald-600 backdrop-blur-2xl'
                      : 'bg-[#0D0D0D]/95 border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#C6FF3D]/50 backdrop-blur-2xl'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                    {/* Visual Media Box */}
                    <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-900">
                      <img
                        src={featuredProject.coverImage}
                        alt={featuredProject.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t opacity-40 group-hover:opacity-20 transition-opacity ${
                        isCream ? 'from-black/40 to-transparent' : 'from-[#050505] to-transparent'
                      }`} />

                      {/* Floating Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-heading font-bold uppercase tracking-wider backdrop-blur-md border ${
                          isCream
                            ? 'bg-white/90 border-black/10 text-emerald-800'
                            : 'bg-black/80 border-white/20 text-[#C6FF3D]'
                        }`}>
                          FLAGSHIP CASE STUDY // {featuredProject.categoryLabel}
                        </span>
                      </div>

                      {/* Interactive View Prompt */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${
                          isCream ? 'bg-neutral-900 text-white' : 'bg-[#C6FF3D] text-[#050505]'
                        }`}>
                          <Eye className="w-3.5 h-3.5" />
                          <span>CLICK FOR FULL STUDY</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Description Box */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      <div>
                        <div className={`flex items-center gap-2 text-xs font-mono font-bold mb-3 ${
                          isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
                        }`}>
                          <span>PROJECT {featuredProject.index}</span>
                          <span>•</span>
                          <span>{featuredProject.year}</span>
                        </div>

                        <h3 className={`font-display font-black text-2xl sm:text-4xl uppercase tracking-tight mb-4 group-hover:translate-x-1 transition-transform ${
                          isCream ? 'text-neutral-900 group-hover:text-emerald-700' : 'text-white group-hover:text-[#C6FF3D]'
                        }`}>
                          {featuredProject.title}
                        </h3>

                        <p className={`text-xs sm:text-sm font-heading leading-relaxed mb-6 ${
                          isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                        }`}>
                          {featuredProject.subtitle}
                        </p>

                        {/* Metrics Pills */}
                        {featuredProject.metrics && featuredProject.metrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {featuredProject.metrics.slice(0, 2).map((metric, mIdx) => (
                              <div
                                key={mIdx}
                                className={`p-3 rounded-xl border ${
                                  isCream
                                    ? 'bg-neutral-50/80 border-black/5'
                                    : 'bg-white/[0.03] border-white/[0.06]'
                                }`}
                              >
                                <div className={`font-display font-extrabold text-lg sm:text-xl ${
                                  isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
                                }`}>
                                  {metric.value}
                                </div>
                                <div className={`text-[10px] font-heading uppercase tracking-wider ${
                                  isCream ? 'text-neutral-500' : 'text-[#71717A]'
                                }`}>
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2">
                          {featuredProject.techStack.map((tech) => (
                            <span
                              key={tech}
                              className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
                                isCream
                                  ? 'bg-neutral-100 border-neutral-200 text-neutral-800'
                                  : 'bg-white/[0.04] border-white/[0.08] text-neutral-300'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Prompt */}
                      <div className={`flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider pt-2 ${
                        isCream ? 'text-emerald-800' : 'text-[#C6FF3D]'
                      }`}>
                        <span>VIEW ARCHITECTURE & METRICS MODAL</span>
                        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* 2. DYNAMIC 2-COLUMN RESPONSIVE GRID FOR REMAINING PROJECTS */}
            {gridProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                {gridProjects.map((project, idx) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="group relative flex flex-col cursor-pointer"
                    onClick={() => openProjectModal(project)}
                  >
                    <div
                      data-cursor="view"
                      className={`flex flex-col h-full rounded-3xl p-6 sm:p-8 transition-all duration-500 overflow-hidden relative border ${
                        isCream
                          ? 'bg-white/80 border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-emerald-600 hover:shadow-xl backdrop-blur-xl'
                          : 'bg-[#0D0D0D]/90 border-white/[0.08] shadow-2xl hover:border-[#C6FF3D]/40 backdrop-blur-xl'
                      }`}
                    >
                      {/* Image Frame */}
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6 bg-neutral-900">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t opacity-40 group-hover:opacity-20 transition-opacity ${
                          isCream ? 'from-black/40 to-transparent' : 'from-[#050505] to-transparent'
                        }`} />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider backdrop-blur-md border ${
                            isCream
                              ? 'bg-white/90 border-black/10 text-emerald-800'
                              : 'bg-black/80 border-white/20 text-[#C6FF3D]'
                          }`}>
                            {project.categoryLabel}
                          </span>
                        </div>

                        {/* Top Right Project Number */}
                        <div className="absolute top-3 right-3">
                          <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md">
                            {project.index}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <div className={`text-xs font-heading font-semibold uppercase tracking-wider mb-2 ${
                            isCream ? 'text-neutral-500' : 'text-[#71717A]'
                          }`}>
                            {project.client} // {project.year}
                          </div>

                          <h4 className={`font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight mb-3 transition-colors ${
                            isCream ? 'text-neutral-900 group-hover:text-emerald-700' : 'text-white group-hover:text-[#C6FF3D]'
                          }`}>
                            {project.title}
                          </h4>

                          <p className={`text-xs sm:text-sm font-heading leading-relaxed mb-6 line-clamp-2 ${
                            isCream ? 'text-neutral-600' : 'text-[#A1A1AA]'
                          }`}>
                            {project.subtitle}
                          </p>
                        </div>

                        <div>
                          {/* Tech stack row */}
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.techStack.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                                  isCream
                                    ? 'bg-neutral-100 border-neutral-200 text-neutral-800'
                                    : 'bg-white/[0.04] border-white/[0.08] text-neutral-300'
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Bottom Card Action Footer */}
                          <div className={`pt-4 border-t flex items-center justify-between text-xs font-heading font-bold uppercase tracking-wider ${
                            isCream ? 'border-black/5 text-neutral-900' : 'border-white/[0.06] text-white'
                          }`}>
                            <span className={`group-hover:translate-x-1 transition-transform ${
                              isCream ? 'group-hover:text-emerald-700' : 'group-hover:text-[#C6FF3D]'
                            }`}>
                              OPEN DETAILS MODAL
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                              isCream
                                ? 'bg-black/5 group-hover:bg-emerald-700 group-hover:text-white'
                                : 'bg-white/[0.06] group-hover:bg-[#C6FF3D] group-hover:text-[#050505]'
                            }`}>
                              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* In-Page Interactive Animated Project Detail Modal */}
      <ProjectModal
        project={modalProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNextModal}
        onPrev={handlePrevModal}
      />
    </section>
  );
}
