import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Manifesto() {
  return (
    <section className="relative py-32 md:py-48 px-6 sm:px-10 overflow-hidden bg-page-bg flex items-center justify-center border-t border-line-grey/25">
      {/* Background abstract vector illustration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] opacity-[0.14] pointer-events-none z-0">
        <svg 
          className="w-full h-full text-black-dark" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="48" strokeDasharray="2 2" />
          <ellipse cx="50" cy="50" rx="24" ry="48" />
          <ellipse cx="50" cy="50" rx="48" ry="24" />
          <line x1="2" x2="98" y1="50" y2="50" />
          <line x1="50" x2="50" y1="2" y2="98" />
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Subtle icon container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="w-12 h-12 rounded-full bg-soft-card flex items-center justify-center mb-8 border border-line-grey/35 text-text-dark/40"
        >
          <Quote size={20} />
        </motion.div>

        {/* Manifesto text with staggered word animation */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[46px] leading-[1.25] text-balance tracking-tight text-text-dark font-light max-w-[960px] text-center"
        >
          Perkembangan era digital telah mengubah cara UMKM bersaing. <span className="font-bold text-black-dark font-display bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] bg-clip-text text-transparent">Rupaka Studio</span> hadir sebagai mitra strategis solusi jasa desain digital yang dirancang khusus untuk pertumbuhan bisnis Anda.
        </motion.h2>

        {/* Small footer accent */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-display text-[9px] uppercase tracking-[0.25em] text-muted-grey mt-10 font-bold"
        >
          Rupaka Studio Manifesto • Est. 2026
        </motion.p>
      </div>
    </section>
  );
}
