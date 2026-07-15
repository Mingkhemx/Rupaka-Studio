import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem } from '../types';
import { X, Check, MessageSquare, ArrowUpRight, Award } from 'lucide-react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'poster' | 'logo' | 'website' | 'custom'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'poster', name: 'Poster Promosi' },
    { id: 'logo', name: 'Logo & Kemasan' },
    { id: 'website', name: 'Custom Website' },
    { id: 'custom', name: 'Custom Request' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);

  const handleOrderWhatsApp = (project: PortfolioItem) => {
    const textParam = encodeURIComponent(`Halo Rupaka Studio! Saya tertarik memesan jasa pembuatan "${project.title}" seharga ${project.price}. Mohon informasi petunjuk brief-nya.`);
    window.open(`https://wa.me/628123456789?text=${textParam}`, '_blank', 'noreferrer');
  };

  return (
    <section id="portofolio" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1440px] mx-auto bg-page-bg border-t border-line-grey/25">
      <div className="flex flex-col items-center text-center mb-16">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-accent-coral mb-3">
          Karya & Portofolio
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-dark max-w-2xl leading-tight">
          Solusi Visual Terpadu Untuk UMKM Indonesia
        </h2>
        <p className="font-body text-xs sm:text-sm text-muted-grey max-w-xl mt-4 leading-relaxed">
          Lihat ragam contoh hasil kreasi kami. Desain berkualitas tinggi dengan lisensi komersial penuh, dikerjakan langsung oleh tim desainer berpengalaman.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 p-1.5 bg-panel-bg rounded-full border border-line-grey/30 max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full font-display text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedCategory === cat.id 
                ? 'bg-black text-white shadow-md' 
                : 'text-text-dark/70 hover:text-text-dark hover:bg-white/40'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Responsive Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => setSelectedProject(item)}
              className="relative h-[320px] sm:h-[400px] rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-end group overflow-hidden shadow-sm border border-line-grey/20 cursor-pointer"
            >
              <img
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={item.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-dark/85 via-black-dark/40 to-transparent transition-opacity duration-300" />
              
              <div className="relative z-10 flex justify-between items-end">
                <div className="max-w-[75%]">
                  <span className="font-display text-[9px] font-bold text-accent-coral bg-white px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm inline-block mb-3.5">
                    {item.category === 'custom' ? 'Custom Accent' : item.category}
                  </span>
                  <h4 className="font-display text-lg sm:text-xl font-bold mb-1.5 text-white group-hover:text-accent-coral transition-colors leading-tight">
                    {item.title}
                  </h4>
                  <p className="font-body text-[11px] text-white/70 line-clamp-1">
                    {item.description}
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent-coral hover:scale-110 transition-all flex items-center justify-center text-white border border-white/25">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* PORTFOLIO DETAIL DIALOG MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-page-bg w-full max-w-[850px] rounded-[32px] overflow-hidden shadow-2xl border border-line-grey/30 max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Left Column: Image Area */}
              <div className="md:w-1/2 relative h-[250px] md:h-auto min-h-[250px] bg-panel-bg">
                <img
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  src={selectedProject.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white flex items-center gap-1.5 shadow-md">
                  <Award size={12} className="text-accent-coral" />
                  <span className="font-display text-[9px] font-bold uppercase tracking-widest leading-none">Best Seller</span>
                </div>
              </div>

              {/* Right Column: Information & Order Action */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <span className="font-display text-[10px] font-bold text-accent-coral uppercase tracking-widest">
                        Katalog Rupaka • {selectedProject.category}
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-text-dark tracking-tight mt-1 leading-tight">
                        {selectedProject.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-8 h-8 rounded-full bg-panel-bg hover:bg-soft-card flex items-center justify-center text-text-dark/60 cursor-pointer shrink-0 transition-colors"
                      aria-label="Close dialog"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-muted-grey leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Included Deliverables checklist */}
                  <div className="space-y-3 mb-8">
                    <h5 className="font-display text-[10px] font-bold uppercase tracking-widest text-text-dark">What's Included:</h5>
                    <div className="grid grid-cols-1 gap-2.5">
                      {selectedProject.features.map((feat, index) => (
                        <div key={index} className="flex items-center gap-2.5 text-xs text-text-dark">
                          <div className="w-4.5 h-4.5 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                            <Check size={11} />
                          </div>
                          <span className="font-body text-[11px] font-medium leading-none">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer price & purchase bar */}
                <div className="pt-6 border-t border-line-grey/30 flex items-center justify-between gap-4 mt-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-grey">Mulai Dari</span>
                    <p className="font-display text-2xl font-black text-black-dark tracking-tight leading-none mt-1">
                      {selectedProject.price}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOrderWhatsApp(selectedProject)}
                    className="bg-black text-white hover:bg-gray-800 font-display text-[11px] font-bold uppercase tracking-wider px-6 h-[48px] rounded-full flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
                  >
                    <MessageSquare size={13} />
                    <span>Pesan via WA</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
