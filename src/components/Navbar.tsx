import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageSquare, ExternalLink } from 'lucide-react';
import logoImage from '../assets/logo.png';

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
    { name: 'Home', target: 'hero' },
    { name: 'Layanan', target: 'layanan' },
    { name: 'Portofolio', target: 'portofolio' },
    { name: 'Tentang Kami', target: 'tentang' },
    { name: 'Blog & Update', target: 'blog' },
  ];

  const handleWhatsAppChat = () => {
    const waUrl = `https://wa.me/628214360971?text=Halo%20Rupaka%20Studio%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20desain%20untuk%20UMKM%20saya.`;
    window.open(waUrl, '_blank', 'noreferrer');
  };

  return (
    <>
      <header className="fixed top-[16px] left-0 right-0 z-50 flex items-center justify-center px-4 w-full pointer-events-none">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pointer-events-auto w-full max-w-[950px] flex items-center justify-center bg-black/30 backdrop-blur-3xl rounded-[28px] px-7 py-2 shadow-2xl border border-white/15 h-[88px] hover:bg-black/40 transition-all duration-300"
        >
          {/* Logo - Left */}
          <div className="absolute left-6 flex items-center gap-8 pl-1">
            <button 
              onClick={() => onScrollToSection('hero')}
              className="shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
              title="Rupaka Studio - Home"
            >
              <img 
                src={logoImage} 
                alt="Rupaka Studio Logo" 
                className="h-[72px] w-auto"
              />
            </button>
          </div>

          {/* Menu - Center */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => onScrollToSection(link.target)}
                className="font-body text-[11px] text-white hover:text-accent-coral transition-colors duration-300 font-medium uppercase tracking-wider cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="absolute right-6 flex items-center gap-2">
            <button 
              onClick={handleWhatsAppChat}
              className="font-display rounded-full bg-accent-coral hover:bg-accent-coral/90 text-white transition-all duration-300 shrink-0 flex items-center gap-2 px-6 text-[11px] h-[40px] font-bold uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-2xl"
            >
              <MessageSquare size={12} />
              <span>Chat WhatsApp</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-[36px] h-[36px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
              className="w-full max-w-[280px] bg-gradient-to-b from-primary-dark to-primary-dark/90 h-full p-8 flex flex-col justify-between border-l border-accent-coral/30 shadow-2xl"
            >
              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 shrink-0">
                    <img 
                      src={logoImage} 
                      alt="Rupaka Studio Logo" 
                      className="h-full w-full object-contain"
                    />
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
                      className="font-display text-sm text-white/75 hover:text-white text-left font-medium uppercase tracking-widest border-b border-accent-coral/20 pb-2 cursor-pointer transition-colors"
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
                  className="w-full justify-center bg-accent-coral text-white font-display rounded-full py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl hover:bg-accent-coral/90 transition-colors"
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
