import { motion } from 'motion/react';
import { MessageCircle, Image as ImageIcon, Sparkles } from 'lucide-react';
import mascotImage from '../assets/mascot website rupaka.png';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const handleWhatsAppChat = () => {
    const waUrl = `https://wa.me/62856043235?text=Halo%20Rupaka%20Studio%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20desain%20untuk%20UMKM%20saya.`;
    window.open(waUrl, '_blank', 'noreferrer');
  };

  const marqueeTexts = [
    'Karya Terpercaya',
    'Cepat & Tepat',
    'Kualitas Agensi',
    'Harga UMKM',
    'Yogyakarta',
  ];

  return (
    <section id="hero" className="relative bg-page-bg overflow-hidden pt-[180px] pb-[80px] md:pt-[220px]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-soft-card/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[200px] right-[-100px] w-[400px] h-[400px] rounded-full bg-panel-bg/60 blur-[150px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-dark/10 border border-primary-dark/30 mb-8"
        >
          <Sparkles size={11} className="text-accent-coral animate-pulse" />
          <span className="font-display text-[10px] font-bold uppercase tracking-wider text-primary-dark">
            Partner Digital Kreatif UMKM
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.08] text-balance max-w-5xl mb-6 text-text-dark tracking-tighter font-bold"
        >
          Desain Digital <span className="bg-gradient-to-r from-primary-dark via-primary-blue to-accent-coral bg-clip-text text-transparent">Low-Cost, High-Impact</span> untuk UMKM Indonesia
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-base sm:text-lg md:text-xl text-muted-grey max-w-2xl mb-10 leading-relaxed"
        >
          Poster promosi, desain logo, kemasan produk, dan custom website berkualitas agensi professional - <span className="text-text-dark font-semibold">mulai dari Rp 50.000/desain</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 relative z-20 w-full justify-center sm:w-auto"
        >
          <button
            onClick={handleWhatsAppChat}
            className="bg-primary-dark text-white font-display rounded-full hover:bg-primary-blue transition-all duration-300 shrink-0 flex items-center justify-center gap-2 px-8 text-xs h-[52px] font-bold uppercase tracking-wider shadow-xl cursor-pointer"
          >
            <MessageCircle size={15} />
            Chat via WhatsApp
          </button>
          <button
            onClick={() => onScrollToSection('portofolio')}
            className="bg-transparent border border-text-dark/20 text-text-dark font-display rounded-full hover:bg-black-dark hover:text-white transition-all duration-300 shrink-0 flex items-center justify-center gap-2 px-8 text-xs h-[52px] font-bold uppercase tracking-wider cursor-pointer"
          >
            <ImageIcon size={15} />
            Lihat Portofolio
          </button>
        </motion.div>

        {/* Immersive Mockup Image */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="w-full max-w-[1280px] bg-white overflow-hidden rounded-[24px] md:rounded-[40px] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center"
        >
          <img
            alt="Rupaka Studio Mascot"
            className="w-full h-full object-cover select-none"
            src={mascotImage}
          />
        </motion.div>
      </div>

      {/* Trust Strip Marquee */}
      <div className="w-full py-12 border-t border-b border-line-grey/30 mt-20 overflow-hidden bg-page-bg">
        <p className="font-display text-[10px] text-muted-grey mb-6 uppercase tracking-widest text-center font-bold">
          Melayani UMKM di Yogyakarta & seluruh Indonesia secara digital
        </p>
        <div className="marquee-container relative flex items-center">
          <div className="animate-marquee flex gap-12 sm:gap-24 items-center">
            {/* Double the list for seamless marquee scroll */}
            {[...marqueeTexts, ...marqueeTexts, ...marqueeTexts].map((text, idx) => (
              <span
                key={idx}
                className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-text-dark/80 select-none whitespace-nowrap cursor-default hover:text-[#FF4B2B] transition-colors"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
