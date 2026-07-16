import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePublicFaqs, usePublicTestimonials } from '../hooks/usePublicData';
import { ChevronDown, MessageSquare, Star, Quote, ArrowLeft, ArrowRight, UserCircle } from 'lucide-react';

export default function TestimonialFaq() {
  const { items: faqItems } = usePublicFaqs();
  const { items: testimonialItems } = usePublicTestimonials();
  const [openFaq, setOpenFaq] = useState<string | null>(faqItems[0]?.id ?? null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const toggleFaq = (id: string) => {
    if (openFaq === id) {
      setOpenFaq(null);
    } else {
      setOpenFaq(id);
    }
  };

  const nextTestimonial = () => {
    if (!testimonialItems.length) return;
    setCurrentTestimonial((prev) => (prev + 1) % testimonialItems.length);
  };

  const prevTestimonial = () => {
    if (!testimonialItems.length) return;
    setCurrentTestimonial((prev) => (prev - 1 + testimonialItems.length) % testimonialItems.length);
  };

  const activeTestimonial = testimonialItems[currentTestimonial];

  if (!activeTestimonial) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1440px] mx-auto bg-page-bg border-t border-line-grey/25">
      
      {/* 1. TESTIMONIAL SLIDER */}
      <div className="flex flex-col items-center text-center mb-28 max-w-[1100px] mx-auto">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-[#E08E9B] mb-4">
          Testimoni & Suara Klien
        </span>
        
        {/* Testimonial Quote Canvas */}
        <div className="relative w-full py-10 px-4">
          <Quote className="absolute top-0 left-1/2 -translate-x-1/2 text-line-grey/20" size={100} strokeWidth={1} />
          
          <div className="relative z-10">
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
                className="font-display text-2xl sm:text-3xl md:text-[38px] leading-[1.3] text-balance tracking-tight text-text-dark font-light italic max-w-4xl text-center mx-auto"
              >
                "{activeTestimonial.content}"
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        {/* Client Profile Box */}
        <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#E9E8E4] flex items-center justify-center text-text-dark/40 shadow-sm shrink-0 border border-line-grey/30">
              <UserCircle size={28} strokeWidth={1.5} />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-display text-sm font-bold text-text-dark">{activeTestimonial.name}</p>
              <p className="font-display text-xs text-muted-grey font-medium mt-0.5">{activeTestimonial.role}</p>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel Navigation Controls */}
        <div className="flex items-center gap-3.5 mt-10">
          <button
            onClick={prevTestimonial}
            className="w-11 h-11 rounded-full border border-line-grey/40 hover:bg-black-dark hover:text-white-soft flex items-center justify-center text-text-dark transition-all duration-300 cursor-pointer"
            aria-label="Previous review"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {testimonialItems.map((_, index) => (
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

      {/* 2. FAQ ACCORDIONS */}
      <div className="max-w-[850px] mx-auto border-t border-line-grey/20 pt-24">
        <div className="text-center mb-16">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-text-dark">
            Pertanyaan Umum (FAQ)
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-text-dark mt-2">
            Masih Ragu? Berikut Penjelasannya
          </h3>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openFaq === item.id;
            return (
              <div 
                key={item.id}
                className="bg-panel-bg rounded-[20px] border border-line-grey/20 overflow-hidden transition-all duration-300 hover:border-line-grey/40"
              >
                <button
                  id={`btn-faq-${item.id}`}
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-display text-sm sm:text-base font-extrabold text-text-dark pr-6">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-text-dark shrink-0 w-6 h-6 rounded-full bg-white/40 flex items-center justify-center border border-white/20"
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-6 border-t border-line-grey/10 pt-4">
                        <p className="font-body text-xs sm:text-sm text-muted-grey leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Call to action card for custom queries */}
        <div className="mt-12 bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3] rounded-[24px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-line-grey/25 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-text-dark">
              <MessageSquare size={16} />
            </div>
            <div className="text-center sm:text-left">
              <h5 className="font-display font-bold text-xs sm:text-sm text-text-dark">Punya pertanyaan kustom yang belum terjawab?</h5>
              <p className="font-body text-[10px] sm:text-[11px] text-muted-grey">Jangan ragu, konsultasikan langsung secara gratis via chat.</p>
            </div>
          </div>
          <button
            onClick={() => window.open('https://wa.me/6285604323512?text=Halo%20Rupaka%20Studio%2C%20ada%20hal%20yang%20ingin%20saya%20tanyakan%20mengenai%20layanan%20desain.', '_blank', 'noreferrer')}
            className="bg-black text-white hover:bg-gray-800 font-display text-[9px] font-bold uppercase tracking-wider px-5 py-3 rounded-full cursor-pointer flex items-center gap-1 shadow-sm transition-colors"
          >
            <span>Tanya Admin</span>
            <ChevronDown size={11} className="-rotate-90" />
          </button>
        </div>
      </div>
      
    </section>
  );
}
