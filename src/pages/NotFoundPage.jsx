import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, AlertTriangle, Home } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { useTheme } from '../context/ThemeContext';

export default function NotFoundPage() {
  const { isCream } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none transition-colors duration-500 ${
      isCream ? 'bg-[#FAF7F2] text-[#0F172A]' : 'bg-[#050505] text-white'
    }`}>
      {/* Background Accent Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        isCream ? 'bg-emerald-500/10' : 'bg-[#C6FF3D]/5'
      }`} />

      {/* Terminal Alert Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider mb-8 ${
          isCream
            ? 'bg-white/80 border border-emerald-950/10 text-[#15803D] shadow-sm'
            : 'bg-[#0D0D0D] border border-white/[0.08] text-[#C6FF3D]'
        }`}
      >
        <AlertTriangle className={`w-4 h-4 ${isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'}`} />
        <span>HTTP 404 // ROUTE DISCONNECTED</span>
      </motion.div>

      {/* Giant Glitch 404 Heading */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`font-display font-black text-8xl sm:text-9xl md:text-[14rem] leading-none tracking-tighter mb-4 select-none ${
          isCream ? 'text-[#0F172A]' : 'text-white'
        }`}
      >
        4<span className={isCream ? 'text-[#15803D]' : 'text-[#C6FF3D]'}>0</span>4
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`font-heading text-lg sm:text-xl max-w-md mb-8 leading-relaxed ${
          isCream ? 'text-[#475569]' : 'text-[#A1A1AA]'
        }`}
      >
        The coordinates you requested do not exist in this sector. The link may be broken or the route has been decommissioned.
      </motion.p>

      {/* Interactive Back Home CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <MagneticButton strength={0.35}>
          <Link
            to="/"
            className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
              isCream
                ? 'bg-[#15803D] hover:bg-[#166534] text-white shadow-[0_10px_25px_rgba(21,128,61,0.25)]'
                : 'bg-[#C6FF3D] hover:bg-[#B5F22B] text-[#050505] shadow-[0_0_25px_rgba(198,255,61,0.35)]'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO SAFESPACE</span>
          </Link>
        </MagneticButton>
      </motion.div>
    </div>
  );
}
