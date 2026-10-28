import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Server, Database, Wrench, Sparkles, Cpu } from 'lucide-react';
import { skillsData } from '../data/content';

const CATEGORY_ICONS = {
  frontend: Layout,
  backend: Server,
  database: Database,
  tools: Wrench,
};

// Spotlight Card with mouse-tracking border glow
function SpotlightCard({ category, index, isInView }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = CATEGORY_ICONS[category.id] || Cpu;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl border border-white/[0.08] p-6 sm:p-8 overflow-hidden group hover:border-[#C6FF3D]/40 transition-colors duration-500 shadow-xl"
    >
      {/* Mouse-tracking Spotlight Border & Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(198, 255, 61, 0.15), transparent 70%)`,
        }}
      />

      {/* Header of Card */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-[#C6FF3D]/50 flex items-center justify-center text-white group-hover:text-[#C6FF3D] transition-colors duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-[#C6FF3D] transition-colors duration-300">
              {category.title}
            </h3>
            <span className="text-[11px] font-heading text-[#71717A] uppercase tracking-wider">
              {category.skills.length} TECHNOLOGIES
            </span>
          </div>
        </div>
        <span className="text-xs font-heading font-semibold text-[#71717A] group-hover:text-[#C6FF3D] transition-colors">
          0{index + 1}
        </span>
      </div>

      <p className="text-xs text-[#A1A1AA] mb-6 relative z-10 leading-relaxed">
        {category.description}
      </p>

      {/* Skills list with animated progress bars & chips */}
      <div className="space-y-4 relative z-10">
        {category.skills.map((skill, sIdx) => (
          <div
            key={sIdx}
            className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-[#C6FF3D]/30 transition-all duration-300 group/item hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(198,255,61,0.08)]"
          >
            <div className="flex justify-between items-center text-xs font-heading mb-1.5">
              <span className="font-medium text-white group-hover/item:text-[#C6FF3D] transition-colors">
                {skill.name}
              </span>
              <span className="text-[#71717A] group-hover/item:text-white transition-colors font-mono text-[11px]">
                {skill.level}%
              </span>
            </div>

            {/* Filling Skill Bar */}
            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 + sIdx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full bg-gradient-to-r from-white/40 via-[#C6FF3D]/70 to-[#C6FF3D] rounded-full shadow-[0_0_8px_rgba(198,255,61,0.5)]"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C6FF3D]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 // TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
              EXPERTISE & <br className="hidden sm:inline" />
              CAPABILITIES
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-heading text-[#71717A] uppercase tracking-wider mt-4 sm:mt-0 max-w-xs sm:text-right">
            MODERN ARCHITECTURES TESTED AT PRODUCTION SCALE
          </p>
        </div>

        {/* 4 Category Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillsData.categories.map((category, index) => (
            <SpotlightCard
              key={category.id}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
