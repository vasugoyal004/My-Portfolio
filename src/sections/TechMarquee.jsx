import { useRef, useEffect } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiFirebase,
  SiFigma,
  SiDocker,
  SiRedis,
  SiPostman
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { useTheme } from '../context/ThemeContext';

const row1 = [
  { name: 'React', icon: SiReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express.js', icon: SiExpress },
  { name: 'REST APIs', icon: TbApi },
  { name: 'Figma', icon: SiFigma },
];

const row2 = [
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Redis', icon: SiRedis },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Docker', icon: SiDocker },
  { name: 'Postman', icon: SiPostman },
];

export default function TechMarquee() {
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const { isCream } = useTheme();

  // Dynamic scroll velocity reaction
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = Math.abs(window.scrollY - lastScrollY);
          lastScrollY = window.scrollY;

          // Temporarily boost animation rate proportional to scroll speed
          if (marquee1Ref.current && marquee2Ref.current) {
            const speedMultiplier = Math.min(3, 1 + delta * 0.05);
            marquee1Ref.current.style.animationDuration = `${30 / speedMultiplier}s`;
            marquee2Ref.current.style.animationDuration = `${32 / speedMultiplier}s`;

            clearTimeout(marquee1Ref.current._timer);
            marquee1Ref.current._timer = setTimeout(() => {
              if (marquee1Ref.current && marquee2Ref.current) {
                marquee1Ref.current.style.animationDuration = '30s';
                marquee2Ref.current.style.animationDuration = '32s';
              }
            }, 300);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-14 sm:py-20 bg-[var(--bg)] overflow-hidden border-y border-[var(--border)] select-none transition-colors duration-500">
      {/* Background Subtle Gradient Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-28 rounded-full blur-[100px] pointer-events-none ${
        isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/5'
      }`} />

      {/* Section Sub-label */}
      <div className="text-center mb-8">
        <span className={`text-[11px] font-heading font-semibold uppercase tracking-[0.25em] ${
          isCream ? 'text-neutral-500' : 'text-[#71717A]'
        }`}>
          ENGINEERING TOOLKIT & ECOSYSTEM
        </span>
      </div>

      {/* Edge Gradient Masks */}
      <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {/* ROW 1: Moves Left */}
        <div className="flex overflow-hidden py-2 sm:py-3">
          <div
            ref={marquee1Ref}
            className="flex gap-6 sm:gap-10 shrink-0 animate-marquee hover:[animation-play-state:paused]"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {[...row1, ...row1, ...row1].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`r1-${index}`}
                  className={`flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                    isCream
                      ? 'bg-white/80 border-black/5 hover:border-emerald-600 shadow-sm hover:shadow-md'
                      : 'bg-[#0D0D0D]/60 border-white/[0.06] hover:border-[#C6FF3D]/40 hover:bg-[#121212]'
                  }`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 ${
                    isCream
                      ? 'text-neutral-500 group-hover:text-emerald-700'
                      : 'text-[#71717A] group-hover:text-[#C6FF3D] group-hover:drop-shadow-[0_0_8px_rgba(198,255,61,0.6)]'
                  }`} />
                  <span className={`font-heading text-xs sm:text-sm font-semibold transition-colors ${
                    isCream
                      ? 'text-neutral-700 group-hover:text-black'
                      : 'text-[#A1A1AA] group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ROW 2: Moves Right */}
        <div className="flex overflow-hidden py-2 sm:py-3">
          <div
            ref={marquee2Ref}
            className="flex gap-6 sm:gap-10 shrink-0 hover:[animation-play-state:paused]"
            style={{ animation: 'marquee-reverse 32s linear infinite' }}
          >
            {[...row2, ...row2, ...row2].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`r2-${index}`}
                  className={`flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                    isCream
                      ? 'bg-white/80 border-black/5 hover:border-emerald-600 shadow-sm hover:shadow-md'
                      : 'bg-[#0D0D0D]/60 border-white/[0.06] hover:border-[#C6FF3D]/40 hover:bg-[#121212]'
                  }`}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110 ${
                    isCream
                      ? 'text-neutral-500 group-hover:text-emerald-700'
                      : 'text-[#71717A] group-hover:text-[#C6FF3D] group-hover:drop-shadow-[0_0_8px_rgba(198,255,61,0.6)]'
                  }`} />
                  <span className={`font-heading text-xs sm:text-sm font-semibold transition-colors ${
                    isCream
                      ? 'text-neutral-700 group-hover:text-black'
                      : 'text-[#A1A1AA] group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
    </section>
  );
}
