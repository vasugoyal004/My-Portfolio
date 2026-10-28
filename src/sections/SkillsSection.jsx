import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Server,
  Database,
  Wrench,
  Sparkles,
  Cpu,
  CheckCircle2,
  Zap,
  Shield,
  Layers,
  Code2,
  Terminal,
  Activity
} from 'lucide-react';
import { skillsData } from '../data/content';
import { useTheme } from '../context/ThemeContext';

const CATEGORY_ICONS = {
  frontend: Layout,
  backend: Server,
  database: Database,
  tools: Wrench,
};

export default function SkillsSection() {
  const { isCream } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSkillHover, setActiveSkillHover] = useState(null);
  const containerRef = useRef(null);

  // Categories list for filter tabs
  const categories = [
    { id: 'all', label: 'All Capabilities', icon: Layers },
    ...skillsData.categories.map((c) => ({
      id: c.id,
      label: c.title,
      icon: CATEGORY_ICONS[c.id] || Cpu,
    })),
  ];

  // Curate skills to display: show top vital technologies without clutter
  const displayedCategories =
    selectedCategory === 'all'
      ? skillsData.categories
      : skillsData.categories.filter((c) => c.id === selectedCategory);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[var(--bg)] overflow-hidden transition-colors duration-500"
    >
      {/* Background Radial Glow */}
      <div
        className={`absolute top-1/3 right-0 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none ${
          isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/4'
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b ${
            isCream ? 'border-black/10' : 'border-white/[0.08]'
          }`}
        >
          <div>
            <div
              className={`inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] mb-2 ${
                isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>02 // TECHNICAL ARSENAL</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight uppercase ${
                isCream ? 'text-neutral-900' : 'text-white'
              }`}
            >
              ENGINEERING <br className="hidden sm:inline" />
              CAPABILITIES
            </h2>
          </div>

          <p
            className={`text-xs sm:text-sm font-heading uppercase tracking-wider mt-4 md:mt-0 max-w-xs md:text-right ${
              isCream ? 'text-neutral-500' : 'text-[#71717A]'
            }`}
          >
            CURATED PRODUCTION STACK // ZERO FLUFF
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider transition-all duration-300 ${
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
                    layoutId="skillsTabActive"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isCream ? 'bg-neutral-900' : 'bg-[#C6FF3D]'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modern Interactive Bento Grid of Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {displayedCategories.map((category, catIdx) => {
            const IconComponent = CATEGORY_ICONS[category.id] || Cpu;

            return (
              <motion.div
                layout
                key={category.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className={`relative rounded-3xl p-6 sm:p-8 border transition-all duration-500 overflow-hidden group ${
                  isCream
                    ? 'bg-white/80 border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:border-emerald-600 backdrop-blur-xl'
                    : 'bg-[#0D0D0D]/90 border-white/[0.08] shadow-2xl hover:border-[#C6FF3D]/40 backdrop-blur-xl'
                }`}
              >
                {/* Header of Domain Card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors duration-300 border ${
                        isCream
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white'
                          : 'bg-white/[0.04] border-white/[0.08] text-white group-hover:text-[#C6FF3D] group-hover:border-[#C6FF3D]/50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`font-display font-bold text-lg sm:text-xl transition-colors duration-300 ${
                          isCream
                            ? 'text-neutral-900 group-hover:text-emerald-700'
                            : 'text-white group-hover:text-[#C6FF3D]'
                        }`}
                      >
                        {category.title}
                      </h3>
                      <span
                        className={`text-[11px] font-heading uppercase tracking-wider ${
                          isCream ? 'text-neutral-500' : 'text-[#71717A]'
                        }`}
                      >
                        {category.description}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isCream ? 'text-neutral-400' : 'text-[#71717A]'
                    }`}
                  >
                    0{catIdx + 1}
                  </span>
                </div>

                {/* Curated Interactive Skill Badges (Not boring endless bars!) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
                  {category.skills.slice(0, 6).map((skill, sIdx) => {
                    const isHovered = activeSkillHover === `${category.id}-${skill.name}`;
                    const isHighExpert = skill.level >= 90;

                    return (
                      <div
                        key={sIdx}
                        onMouseEnter={() => setActiveSkillHover(`${category.id}-${skill.name}`)}
                        onMouseLeave={() => setActiveSkillHover(null)}
                        className={`p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 group/chip cursor-default ${
                          isCream
                            ? 'bg-neutral-50/90 hover:bg-white border-black/5 hover:border-emerald-500 hover:shadow-md'
                            : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.05] hover:border-[#C6FF3D]/50 hover:shadow-[0_0_15px_rgba(198,255,61,0.15)]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300 group-hover/chip:scale-150 ${
                              isHighExpert
                                ? isCream
                                  ? 'bg-emerald-600'
                                  : 'bg-[#C6FF3D]'
                                : isCream
                                ? 'bg-neutral-400'
                                : 'bg-[#71717A]'
                            }`}
                          />
                          <span
                            className={`text-xs font-heading font-semibold truncate transition-colors ${
                              isCream
                                ? 'text-neutral-800 group-hover/chip:text-emerald-700'
                                : 'text-white group-hover/chip:text-[#C6FF3D]'
                            }`}
                          >
                            {skill.name}
                          </span>
                        </div>

                        {/* Subtle Badge Tag */}
                        <div
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 transition-colors ${
                            isHighExpert
                              ? isCream
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold'
                                : 'bg-[#C6FF3D]/10 border-[#C6FF3D]/30 text-[#C6FF3D] font-bold'
                              : isCream
                              ? 'bg-neutral-100 border-neutral-200 text-neutral-600'
                              : 'bg-white/[0.03] border-white/[0.08] text-[#A1A1AA]'
                          }`}
                        >
                          {skill.level}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* High-Impact Architecture Philosophy Bar (Advance Summary Deck) */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
            isCream
              ? 'bg-white/80 border-black/10 shadow-[0_15px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl'
              : 'bg-[#0D0D0D]/90 border-white/[0.08] shadow-2xl backdrop-blur-xl'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#71717A]">
                <Zap className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>EXPERIENCE</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-display font-extrabold ${isCream ? 'text-neutral-900' : 'text-white'}`}>
                3.5<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>+</span> YRS
              </div>
              <div className={`text-xs font-heading ${isCream ? 'text-neutral-500' : 'text-[#A1A1AA]'}`}>
                Full-Stack Production
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#71717A]">
                <Activity className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>PERFORMANCE</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-display font-extrabold ${isCream ? 'text-neutral-900' : 'text-white'}`}>
                100<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>%</span>
              </div>
              <div className={`text-xs font-heading ${isCream ? 'text-neutral-500' : 'text-[#A1A1AA]'}`}>
                Core Web Vitals
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#71717A]">
                <Shield className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>SECURITY</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-display font-extrabold ${isCream ? 'text-neutral-900' : 'text-white'}`}>
                RBAC<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>+</span>
              </div>
              <div className={`text-xs font-heading ${isCream ? 'text-neutral-500' : 'text-[#A1A1AA]'}`}>
                OAuth & JWT Auth
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider text-[#71717A]">
                <Terminal className={`w-3.5 h-3.5 ${isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}`} />
                <span>QUALITY</span>
              </div>
              <div className={`text-2xl sm:text-3xl font-display font-extrabold ${isCream ? 'text-neutral-900' : 'text-white'}`}>
                ZERO<span className={isCream ? 'text-emerald-700' : 'text-[#C6FF3D]'}>.</span>
              </div>
              <div className={`text-xs font-heading ${isCream ? 'text-neutral-500' : 'text-[#A1A1AA]'}`}>
                Tech Debt Mentality
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
