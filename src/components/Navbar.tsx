import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageSquare, ExternalLink } from 'lucide-react';
import logoImg from '../assets/logo.png';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Navbar({ onScrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Layanan', target: 'layanan' },
    { name: 'Portofolio', target: 'portofolio' },
    { name: 'Tentang Kami', target: 'tentang' },
    { name: 'Hitung Biaya', target: 'estimator' },
    { name: 'Blog & Update', target: 'blog' },
  ];

  const handleWhatsAppChat = () => {
    const waUrl = `https://wa.me/628123456789?text=Halo%20Rupaka%20Studio%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20desain%20untuk%20UMKM%20saya.`;
    window.open(waUrl, '_blank', 'noreferrer');
  };

  return (
    <>
      <header className="fixed top-[24px] left-0 right-0 z-50 flex items-center justify-center px-4 w-full pointer-events-none">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pointer-events-auto w-full max-w-[800px] flex items-center justify-between bg-white/40 backdrop-blur-xl rounded-full px-3 py-2.5 shadow-lg border border-white/50 h-[64px]"
        >
          {/* Logo */}
          <div className="flex items-center gap-4 pl-2">
            <button 
              onClick={() => onScrollToSection('hero')}
              className="flex items-center justify-center shrink-0 cursor-pointer"
            >
              <img src={logoImg} alt="Rupaka Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
            </button>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => onScrollToSection(link.target)}
                  className="font-body text-[11px] text-text-dark/80 hover:text-text-dark transition-colors duration-300 font-bold uppercase tracking-wider cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleWhatsAppChat}
              className="font-display rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-md transition-all duration-300 shrink-0 flex items-center gap-1.5 px-5 text-[10px] h-[42px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <MessageSquare size={14} />
              <span>Chat WhatsApp</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-[42px] h-[42px] rounded-full bg-white/50 hover:bg-white/70 border border-white/50 shadow-sm flex items-center justify-center text-text-dark cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[280px] bg-black-dark h-full p-8 flex flex-col justify-between border-l border-white/10 shadow-2xl"
            >
              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                    <span className="text-white font-display font-bold text-lg">R</span>
                  </div>
                  <div>
                    <h3 className="text-white font-display font-bold leading-none">Rupaka</h3>
                    <p className="text-white/40 text-[10px] font-medium tracking-widest uppercase">Studio</p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  {navLinks.map((link) => (
                    <button
                      key={link.target}
                      onClick={() => {
                        onScrollToSection(link.target);
                        setIsMobileMenuOpen(false);
                      }}
                      className="font-display text-sm text-white/75 hover:text-white text-left font-medium uppercase tracking-widest border-b border-white/5 pb-2 cursor-pointer transition-colors"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    handleWhatsAppChat();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-center bg-white text-black font-display rounded-full py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>Hubungi Kami</span>
                </button>
                <p className="text-[10px] text-white/30 text-center">
                  Melayani UMKM Indonesia
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
