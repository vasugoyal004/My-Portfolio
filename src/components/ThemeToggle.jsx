import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from './MagneticButton';

export default function ThemeToggle({ showLabel = false, className = '' }) {
  const { theme, toggleTheme, isCream } = useTheme();

  return (
    <MagneticButton strength={0.35}>
      <button
        onClick={toggleTheme}
        data-cursor="pointer"
        aria-label={`Switch to ${isCream ? 'Obsidian Dark' : 'Liquid Cream'} theme`}
        className={`relative group flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full liquid-glass border transition-all duration-300 ${
          isCream
            ? 'bg-white/80 border-black/10 text-neutral-800 hover:border-emerald-500 shadow-sm'
            : 'bg-[#121212]/80 border-white/10 text-white hover:border-[#C6FF3D]/50 shadow-md'
        } ${className}`}
      >
        <div className="relative w-4 h-4 sm:w-4 sm:h-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isCream ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-amber-600"
              >
                <Sun className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#C6FF3D]"
              >
                <Moon className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showLabel && (
          <span className="text-[11px] font-heading font-semibold uppercase tracking-wider hidden sm:inline">
            {isCream ? 'CREAM' : 'DARK'}
          </span>
        )}
      </button>
    </MagneticButton>
  );
}
