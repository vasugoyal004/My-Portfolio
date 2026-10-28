import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, AlertTriangle, Home } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Terminal Alert Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D0D0D] border border-white/[0.08] text-xs font-heading text-[#C6FF3D] uppercase tracking-wider mb-8"
      >
        <AlertTriangle className="w-4 h-4 text-[#C6FF3D]" />
        <span>HTTP 404 // ROUTE DISCONNECTED</span>
      </motion.div>

      {/* Giant Glitch 404 Heading */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-black text-8xl sm:text-9xl md:text-[14rem] leading-none text-white tracking-tighter mb-4 text-glow-accent select-none"
      >
        4<span className="text-[#C6FF3D]">0</span>4
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-heading text-lg sm:text-xl text-[#A1A1AA] max-w-md mb-8 leading-relaxed"
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
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C6FF3D] hover:bg-[#B5F22B] text-[#050505] font-heading font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(198,255,61,0.35)]"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO SAFESPACE</span>
          </Link>
        </MagneticButton>
      </motion.div>
    </div>
  );
}
