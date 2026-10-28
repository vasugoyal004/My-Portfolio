import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { experienceData } from '../data/content';

export default function ExperienceSection() {
  const containerRef = useRef(null);

  // Center line self-drawing as user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#C6FF3D]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>04 // CAREER TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
              WORK EXPERIENCE & <br className="hidden sm:inline" />
              TIMELINE
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-heading text-[#71717A] uppercase tracking-wider mt-4 sm:mt-0">
            3.5+ YEARS DELIVERING PRODUCTION SOFTWARE
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Static Background Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.08] -translate-x-1/2" />

          {/* Dynamic Self-Drawing Accent Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#C6FF3D] via-[#C6FF3D] to-transparent -translate-x-1/2 shadow-[0_0_12px_#C6FF3D] origin-top z-10"
          />

          {/* Timeline Cards */}
          <div className="space-y-12 sm:space-y-20">
            {experienceData.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node Dot on Center Line */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-[#050505] border-2 border-[#C6FF3D] flex items-center justify-center shadow-[0_0_12px_#C6FF3D]">
                      <div className="w-2 h-2 rounded-full bg-[#C6FF3D]" />
                    </div>
                  </div>

                  {/* Empty Spacer on opposite side for desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Glass Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0D0D]/90 backdrop-blur-xl border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all duration-300 group shadow-xl">
                      {/* Period Badge & Location */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6FF3D]/10 text-[#C6FF3D] border border-[#C6FF3D]/20 text-xs font-heading font-semibold uppercase tracking-wider">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-heading text-[#71717A] uppercase tracking-wider">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#C6FF3D] transition-colors mb-1">
                        {exp.role}
                      </h3>
                      <div className="font-heading font-semibold text-xs sm:text-sm text-[#A1A1AA] uppercase tracking-wider mb-4">
                        {exp.company}
                      </div>

                      <p className="text-xs sm:text-sm text-[#A1A1AA] mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Responsibilities list */}
                      <div className="space-y-2.5 mb-6">
                        {exp.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2.5 text-xs text-white/90">
                            <CheckCircle2 className="w-4 h-4 text-[#C6FF3D] shrink-0 mt-0.5" />
                            <span className="leading-relaxed font-heading">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Used Chips */}
                      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                        {exp.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-1 rounded-md bg-white/[0.03] text-[11px] font-heading text-[#A1A1AA] group-hover:text-white transition-colors border border-white/[0.04]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
