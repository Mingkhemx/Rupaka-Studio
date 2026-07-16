import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { X, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogSection() {
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1440px] mx-auto bg-page-bg border-t border-line-grey/25">
      
      {/* Blog Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
        <div>
          <span className="font-display text-xs font-bold uppercase tracking-widest text-[#E08E9B] mb-3 block">
            Eksplorasi Wawasan
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-text-dark">
            Artikel & Update Terbaru
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-muted-grey max-w-sm">
          Wawasan branding, panduan praktis desain poster promosi, dan pemanfaatan AI cerdas khusus untuk pelaku usaha kecil.
        </p>
      </div>

      {/* Blog Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div 
            key={post.id}
            onClick={() => setReadingPost(post)}
            className="group cursor-pointer flex flex-col h-full bg-white-card border border-line-grey/15 rounded-[32px] overflow-hidden p-4 shadow-sm hover:shadow-md hover:border-line-grey/30 transition-all duration-300"
          >
            {/* Post Image Container */}
            <div className="relative w-full h-[240px] sm:h-[280px] rounded-[24px] overflow-hidden mb-6">
              <img
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
                src={post.image}
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-white/70 backdrop-blur-md text-[9px] font-bold text-text-dark uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-white/45 shadow-sm inline-block">
                {post.category}
              </span>
            </div>

            {/* Post Details */}
            <div className="px-2 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5 text-[10px] text-muted-grey mb-3 font-semibold uppercase tracking-wider font-display">
                  <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                </div>

                <h4 className="font-display text-lg sm:text-xl font-bold text-text-dark group-hover:text-[#E08E9B] transition-colors leading-snug">
                  {post.title}
                </h4>
              </div>

              {/* Read button link */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-dark hover:text-[#E08E9B] transition-colors uppercase tracking-wider mt-6 font-display pt-4 border-t border-line-grey/10">
                <span>Baca Selengkapnya</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL ARTICLE OVERLAY DIALOG READER */}
      <AnimatePresence>
        {readingPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex justify-end p-0 md:p-4"
            onClick={() => setReadingPost(null)}
          >
            <motion.div
              initial={{ x: '100%', opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.9 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-page-bg w-full max-w-[700px] h-full rounded-none md:rounded-[32px] overflow-hidden shadow-2xl border-l border-line-grey/30 flex flex-col justify-between"
            >
              {/* Header bar inside reader */}
              <div className="px-6 py-4 border-b border-line-grey/25 flex items-center justify-between bg-panel-bg shrink-0">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-[#E08E9B]" />
                  <span className="font-display text-[10px] font-extrabold uppercase tracking-widest text-text-dark">Rupaka Reader</span>
                </div>
                <button
                  onClick={() => setReadingPost(null)}
                  className="w-9 h-9 rounded-full bg-white hover:bg-soft-card flex items-center justify-center text-text-dark cursor-pointer shadow-sm transition-colors"
                  aria-label="Close reader"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Scrollable Article Content */}
              <div className="flex-grow overflow-y-auto p-6 sm:p-10">
                {/* Image */}
                <div className="w-full h-[220px] sm:h-[280px] rounded-[24px] overflow-hidden mb-8 shadow-sm">
                  <img
                    alt={readingPost.title}
                    className="w-full h-full object-cover select-none"
                    src={readingPost.image}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-grey mb-4 border-b border-line-grey/20 pb-4">
                  <span className="bg-[#E08E9B]/10 text-[#E08E9B] px-3 py-1 rounded-full text-[10px] font-bold uppercase font-display tracking-widest">
                    {readingPost.category}
                  </span>
                  <div className="flex items-center gap-1 font-medium"><Calendar size={13} /> {readingPost.date}</div>
                  <div className="flex items-center gap-1 font-medium"><User size={13} /> {readingPost.author}</div>
                  <div className="flex items-center gap-1 font-medium"><Clock size={13} /> {readingPost.readTime}</div>
                </div>

                {/* Main Heading */}
                <h1 className="font-display text-2xl sm:text-3xl font-black text-black-dark leading-snug mb-6 tracking-tight">
                  {readingPost.title}
                </h1>

                {/* Article Body Content Rendered beautifully with custom typographical elements */}
                <div className="prose prose-sm font-body text-xs sm:text-sm text-text-dark/95 leading-relaxed space-y-5">
                  {readingPost.content.split('\n\n').map((paragraph, index) => {
                    const trimmed = paragraph.trim();
                    if (trimmed.startsWith('###')) {
                      // Subheading
                      return (
                        <h3 key={index} className="font-display text-base sm:text-lg font-extrabold text-black-dark pt-4 tracking-tight">
                          {trimmed.replace('###', '').trim()}
                        </h3>
                      );
                    } else if (trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.')) {
                      // Numbered lists
                      const num = trimmed.substring(0, trimmed.indexOf('.')).trim();
                      const rest = trimmed.substring(trimmed.indexOf('.') + 1).trim();
                      return (
                        <div key={index} className="flex gap-3 pl-2 py-1">
                          <span className="font-display font-black text-black-dark text-sm leading-none">{num}.</span>
                          <p className="font-body text-xs sm:text-sm text-text-dark/90">{rest}</p>
                        </div>
                      );
                    } else {
                      // Normal Paragraphs
                      return <p key={index}>{trimmed}</p>;
                    }
                  })}
                </div>
              </div>

              {/* Slideover Footer Direct Consultation Action */}
              <div className="p-6 border-t border-line-grey/25 bg-panel-bg flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="text-center sm:text-left">
                  <h6 className="font-display text-xs font-bold text-text-dark">Tertarik membuat desain serupa?</h6>
                  <p className="font-body text-[10px] text-muted-grey">Diskusikan gratis dengan tim desainer kami.</p>
                </div>
                <button
                  onClick={() => {
                    const textParam = encodeURIComponent(`Halo Rupaka Studio! Saya telah membaca artikel "${readingPost.title}" dan tertarik berkonsultasi mengenai kebutuhan desain produk UMKM saya.`);
                    window.open(`https://wa.me/628123456789?text=${textParam}`, '_blank', 'noreferrer');
                  }}
                  className="w-full sm:w-auto text-center justify-center bg-black text-white hover:bg-gray-800 font-display text-[10px] font-bold uppercase tracking-wider px-6 py-3.5 rounded-full flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
                >
                  <Clock size={12} />
                  <span>Konsultasi Gratis</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
