import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Plus,
  Minus,
  Sparkles,
  Quote,
  ChevronLeft,
  ChevronRight,
  Check,
  Star
} from 'lucide-react';
import { servicesData, testimonialsData } from '../data/content';

export default function ServicesTestimonialsSection() {
  const [activeService, setActiveService] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play testimonial carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
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

  return (
    <section
      id="services"
      className="relative py-24 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#C6FF3D]/4 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* ================= SERVICES SUB-SECTION ================= */}
        <div className="mb-28 sm:mb-36">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>05 // WHAT I DELIVER</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
                SERVICES & <br className="hidden sm:inline" />
                OFFERINGS
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-heading text-[#71717A] uppercase tracking-wider mt-4 sm:mt-0">
              END-TO-END DEVELOPMENT CAPABILITIES
            </p>
          </div>

          {/* Interactive Accordion / Hover-Expand List */}
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {servicesData.map((service, index) => {
              const isOpen = activeService === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveService(index)}
                  className={`group transition-colors duration-300 ${
                    isOpen ? 'bg-[#0D0D0D]/60' : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <button
                    onClick={() => setActiveService(isOpen ? -1 : index)}
                    className="w-full py-8 sm:py-10 text-left flex items-start justify-between gap-6 px-4 sm:px-8 focus:outline-none"
                  >
                    <div className="flex items-start gap-6 sm:gap-12">
                      <span className="font-display font-bold text-lg sm:text-xl text-[#71717A] group-hover:text-[#C6FF3D] transition-colors pt-1">
                        {service.number}
                      </span>
                      <div>
                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white group-hover:text-[#C6FF3D] transition-colors uppercase tracking-tight">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-heading text-[#A1A1AA] mt-2 max-w-xl">
                          {service.short}
                        </p>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-full border border-white/[0.1] group-hover:border-[#C6FF3D] group-hover:bg-[#C6FF3D] flex items-center justify-center text-white group-hover:text-[#050505] transition-all duration-300 shrink-0 transform group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 sm:pb-10 px-4 sm:px-8 pl-14 sm:pl-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          <div className="md:col-span-7">
                            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed font-heading">
                              {service.description}
                            </p>
                          </div>

                          <div className="md:col-span-5">
                            <span className="text-[11px] font-heading font-semibold uppercase tracking-widest text-[#C6FF3D] block mb-3">
                              WHAT YOU GET
                            </span>
                            <div className="space-y-2">
                              {service.deliverables.map((item, dIdx) => (
                                <div
                                  key={dIdx}
                                  className="flex items-center gap-2.5 text-xs text-white/90 font-heading"
                                >
                                  <span className="w-4 h-4 rounded-full bg-[#C6FF3D]/10 flex items-center justify-center text-[#C6FF3D] shrink-0">
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= TESTIMONIALS SUB-SECTION ================= */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-[0.2em] text-[#C6FF3D] mb-2">
                <Quote className="w-3.5 h-3.5" />
                <span>06 // SOCIAL PROOF</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white uppercase">
                CLIENT & COLLABORATOR <br className="hidden sm:inline" />
                TESTIMONIALS
              </h2>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-white/[0.1] hover:border-[#C6FF3D] hover:bg-[#C6FF3D] flex items-center justify-center text-white hover:text-[#050505] transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-white/[0.1] hover:border-[#C6FF3D] hover:bg-[#C6FF3D] flex items-center justify-center text-white hover:text-[#050505] transition-all"
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
            className="relative rounded-3xl bg-[#0D0D0D] border border-white/[0.08] p-8 sm:p-14 overflow-hidden shadow-2xl"
          >
            <div className="absolute top-8 right-8 text-[#C6FF3D]/10">
              <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
            </div>

            {/* Star ratings */}
            <div className="flex items-center gap-1 text-[#C6FF3D] mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <p className="text-xl sm:text-3xl font-heading text-white leading-relaxed mb-10 max-w-4xl font-normal">
                  "{testimonialsData[activeTestimonial].quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonialsData[activeTestimonial].avatar}
                    alt={testimonialsData[activeTestimonial].author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C6FF3D]"
                  />
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      {testimonialsData[activeTestimonial].author}
                    </h4>
                    <p className="text-xs font-heading text-[#C6FF3D] uppercase tracking-wider">
                      {testimonialsData[activeTestimonial].role}
                    </p>
                    <p className="text-xs font-heading text-[#71717A]">
                      {testimonialsData[activeTestimonial].organization}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2 mt-10">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === i
                      ? 'w-8 bg-[#C6FF3D]'
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
