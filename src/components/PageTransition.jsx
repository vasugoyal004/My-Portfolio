import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <>
      {/* Full-screen Curtain Wipe In/Out */}
      <motion.div
        className="fixed inset-0 bg-[#050505] z-[9995] origin-bottom pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="fixed inset-0 bg-[#C6FF3D] z-[9994] origin-bottom pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  );
}
