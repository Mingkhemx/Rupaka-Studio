import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS, TESTIMONIAL_ITEMS } from '../data';
import { ChevronDown, MessageSquare, Star, Quote, ArrowLeft, ArrowRight, UserCircle } from 'lucide-react';

export default function TestimonialFaq() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotation testimonial setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIAL_ITEMS.length);
    }, 5000); // 5 detik

    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (id: string) => {
    if (openFaq === id) {
      setOpenFaq(null);
    } else {
      setOpenFaq(id);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIAL_ITEMS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIAL_ITEMS.length) % TESTIMONIAL_ITEMS.length);
  };

  const activeTestimonial = TESTIMONIAL_ITEMS[currentTestimonial];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1440px] mx-auto bg-page-bg border-t border-line-grey/25">
      
      {/* 1. TESTIMONIAL SLIDER */}
      <div className="flex flex-col items-center justify-center text-center mb-28 w-full">
        <div className="max-w-[1100px] w-full px-4">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-accent-coral mb-4 inline-block w-full">
            Testimoni & Suara Klien
          </span>
        
        {/* Testimonial Quote Canvas */}
        <div className="relative w-full py-10 px-4 flex justify-center">
          <Quote className="absolute top-0 left-1/2 -translate-x-1/2 text-line-grey/20" size={100} strokeWidth={1} />
          
          <div className="relative z-10 max-w-4xl">
            {/* Rating Stars */}
            <div className="flex items-center justify-center gap-1 mb-8">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} size={15} className="fill-black-dark text-black-dark" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.h3
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="font-display text-2xl sm:text-3xl md:text-[38px] leading-[1.3] text-balance tracking-tight text-text-dark font-light italic"
              >
                "{activeTestimonial.content}"
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* Client Profile Box */}
        <div className="flex flex-col items-center gap-4 mt-8 mx-auto w-full justify-center">
          <div className="w-14 h-14 rounded-full bg-[#E9E8E4] flex items-center justify-center text-text-dark/40 shadow-sm shrink-0 border border-line-grey/30">
            <UserCircle size={28} strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="font-display text-sm font-bold text-text-dark">{activeTestimonial.name}</p>
            <p className="font-display text-xs text-muted-grey font-medium mt-0.5">{activeTestimonial.role}</p>
          </div>
        </div>

        {/* Testimonial Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-3.5 mt-10 w-full">
          <button
            onClick={prevTestimonial}
            className="w-11 h-11 rounded-full border border-line-grey/40 hover:bg-black-dark hover:text-white-soft flex items-center justify-center text-text-dark transition-all duration-300 cursor-pointer"
            aria-label="Previous review"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {TESTIMONIAL_ITEMS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${currentTestimonial === index ? 'w-6 bg-black-dark' : 'bg-line-grey/80'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="w-11 h-11 rounded-full border border-line-grey/40 hover:bg-black-dark hover:text-white-soft flex items-center justify-center text-text-dark transition-all duration-300 cursor-pointer"
            aria-label="Next review"
          >
            <ArrowRight size={16} />
          </button>
        </div>
        </div>
      </div>

      {/* 2. FAQ ACCORDIONS */}
      <div className="max-w-[900px] mx-auto border-t border-line-grey/20 pt-24">
        <div className="text-center mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-accent-coral mb-3 inline-block">
            Tanya Jawab
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-text-dark">
            Pertanyaan yang Sering Diajukan
          </h3>
          <p className="font-body text-sm text-muted-grey mt-3 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan umum tentang layanan desain dan paket kami
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaq === item.id;
            return (
              <motion.div 
                key={item.id}
                layout
                className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-accent-coral/40 shadow-md' 
                    : 'bg-white border-line-grey/20 hover:border-line-grey/50 shadow-sm'
                }`}
              >
                <button
                  id={`btn-faq-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <span className={`font-body text-sm sm:text-base font-semibold pr-6 transition-colors ${
                    isOpen ? 'text-text-dark' : 'text-text-dark group-hover:text-accent-coral'
                  }`}>
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-accent-coral shrink-0 w-5 h-5 flex items-center justify-center transition-colors ${
                      isOpen ? 'text-accent-coral' : 'text-muted-grey group-hover:text-accent-coral'
                    }`}
                  >
                    <ChevronDown size={16} strokeWidth={2.5} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 sm:px-7 pb-5 border-t border-line-grey/20 pt-4">
                        <p className="font-body text-sm text-text-dark/85 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action card for custom queries */}
        <div className="mt-14 bg-white rounded-[20px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 border border-accent-coral/20 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-accent-coral/10 flex items-center justify-center text-accent-coral flex-shrink-0">
              <MessageSquare size={20} strokeWidth={2} />
            </div>
            <div className="text-left">
              <h5 className="font-display font-bold text-base text-text-dark">Pertanyaan lain?</h5>
              <p className="font-body text-sm text-muted-grey">Hubungi kami untuk konsultasi gratis</p>
            </div>
          </div>
          <button
            onClick={() => window.open('https://wa.me/628214360971?text=Halo%20Rupaka%20Studio%2C%20ada%20hal%20yang%20ingin%20saya%20tanyakan%20mengenai%20layanan%20desain.', '_blank', 'noreferrer')}
            className="bg-accent-coral text-white hover:bg-accent-coral/90 font-display text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full cursor-pointer flex items-center gap-2 shadow-sm transition-all duration-300 flex-shrink-0"
          >
            <MessageSquare size={14} />
            <span>Chat Sekarang</span>
          </button>
        </div>
      </div>
      
    </section>
  );
}
