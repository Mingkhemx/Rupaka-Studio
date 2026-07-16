import { useState } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sliders, ToggleLeft, ToggleRight, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import posterRumahPanggang from '../assets/Poster Rumah panggang 1.png';
import logoSaky from '../assets/Logo saky.png';
import mockupLogo from '../assets/Mockup logo.png';
import mascotRupaka from '../assets/mascot website rupaka.png';
import mascotSaky from '../assets/mascot saky.png';

export default function CollageSection() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [designProgress, setDesignProgress] = useState(95);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="tentang" className="relative min-h-[1100px] lg:min-h-[1400px] w-full max-w-[1728px] mx-auto overflow-hidden bg-page-bg py-24 flex flex-col justify-center">
      {/* Central Backdrop Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-[0.06] select-none pointer-events-none mt-20 z-0">
        <h2 className="font-display text-[110px] sm:text-[160px] md:text-[220px] font-extrabold text-text-dark tracking-tighter leading-[0.85] text-center uppercase">
          Rupaka<br />Studio
        </h2>
      </div>

      {/* Intro Text for Context */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 mb-16 lg:mb-0">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FF4B2B] mb-3 block">
          Proses & Efisiensi Kreatif
        </span>
        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-4">
          Ekosistem Desain Berbasis Kolaborasi
        </h3>
        <p className="font-body text-sm md:text-base text-muted-grey">
          Kami menggabungkan keahlian artistik desainer profesional dengan kecepatan teknologi pintar. Klik atau interaksikan elemen di bawah untuk melihat proses kami bekerja!
        </p>
      </div>

      {/* Desktop Layout: Absolute Floating Cards (lg and above) */}
      <div className="hidden lg:block relative w-full h-[850px] mt-12 z-10">
        {/* 1. Top-left Card: Progress Bar glassmorphism */}
        <motion.div
          animate={{ y: hoveredCard === 'top-left' ? -10 : 0 }}
          onMouseEnter={() => setHoveredCard('top-left')}
          onMouseLeave={() => setHoveredCard('top-left')}
          className="absolute rounded-[32px] overflow-hidden bg-white-card/40 backdrop-blur-xl border border-white/40 shadow-2xl transition-shadow duration-300 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-4 cursor-pointer"
          style={{ left: '12%', top: '8%', width: '360px', height: '280px', zIndex: 20 }}
        >
          <div className="relative w-full h-[180px] rounded-2xl overflow-hidden mb-4">
            <img
              alt="Poster Rumah Panggang"
              className="w-full h-full object-cover select-none"
              src={posterRumahPanggang}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-dark/40 to-transparent pointer-events-none" />
            <span className="absolute bottom-3 left-3 bg-white/25 backdrop-blur-md text-[9px] font-bold text-white uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
              Poster Rumah Panggang
            </span>
          </div>
          
          <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-3.5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display text-[10px] text-text-dark font-extrabold uppercase tracking-widest">
                Proses Sentuhan Akhir
              </span>
              <span className="font-display text-[10px] text-text-dark font-extrabold">{designProgress}%</span>
            </div>
            <div 
              className="w-full bg-black/5 rounded-full h-2 cursor-pointer relative"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = Math.max(10, Math.min(100, Math.round((clickX / rect.width) * 100)));
                setDesignProgress(percentage);
              }}
            >
              <div 
                className="bg-black-dark h-full rounded-full transition-all duration-300"
                style={{ width: `${designProgress}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-black rounded-full shadow-md transition-all duration-300"
                style={{ left: `calc(${designProgress}% - 7px)` }}
              />
            </div>
            <p className="text-[9px] text-muted-grey mt-2 text-right">Seret slider untuk sesuaikan kelengkapan</p>
          </div>
        </motion.div>

        {/* 2. Top-right Tall Card: Image & icon badge */}
        <motion.div
          animate={{ y: hoveredCard === 'top-right' ? -10 : 0 }}
          onMouseEnter={() => setHoveredCard('top-right')}
          onMouseLeave={() => setHoveredCard(null)}
          className="absolute rounded-[32px] overflow-hidden bg-white-card/40 backdrop-blur-xl border border-white/40 shadow-2xl cursor-pointer"
          style={{ right: '14%', top: '12%', width: '300px', height: '340px', zIndex: 10 }}
        >
          <img
            alt="Rupaka Studio Mascot"
            className="w-full h-full object-cover select-none"
            src={mascotRupaka}
          />
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/50 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Sparkles size={14} className="text-text-dark" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl text-white">
            <p className="font-display text-[10px] font-bold tracking-widest uppercase text-[#FF4B2B]">Mascot Rupaka</p>
            <p className="text-[11px] text-white/70 leading-normal mt-1">Karakter brand yang memorable dan eye-catching.</p>
          </div>
        </motion.div>

        {/* 3. Mid-left: Interactive Glass Toggle Card */}
        <motion.div
          className="absolute rounded-[28px] overflow-hidden bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.06)] flex flex-col p-6 cursor-pointer"
          style={{ left: '8%', top: '48%', width: '280px', zIndex: 30 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-xs font-bold text-text-dark uppercase tracking-widest">
              Akselerasi AI
            </span>
            <button 
              onClick={() => setAiEnabled(!aiEnabled)}
              className="text-text-dark hover:opacity-80 transition-opacity focus:outline-none cursor-pointer"
            >
              {aiEnabled ? <ToggleRight size={38} className="text-green-600" /> : <ToggleLeft size={38} className="text-muted-grey" />}
            </button>
          </div>
          
          <div className="flex items-center gap-3.5 bg-white/50 p-3 rounded-2xl border border-white/40">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors duration-500 ${aiEnabled ? 'bg-gradient-to-tr from-[#FF416C] to-[#FF4B2B] text-white' : 'bg-soft-card text-muted-grey'}`}>
              <Sparkles size={16} className={aiEnabled ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xs font-extrabold text-text-dark">
                {aiEnabled ? 'Rupaka AI Engine' : 'Manual Draft'}
              </span>
              <span className="font-body text-[11px] text-muted-grey leading-none mt-0.5">
                {aiEnabled ? 'Proses Optimasi Cepat' : 'Fokus Kreativitas penuh'}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-muted-grey leading-relaxed mt-4">
            {aiEnabled 
              ? 'Membantu proses restorasi & pengolahan layout super cepat untuk menekan biaya produksi.' 
              : 'Pengerjaan murni kerangka manual. Membutuhkan waktu lebih lama namun presisi tinggi.'}
          </p>
        </motion.div>

        {/* 4. Mid-right: Product Quality Image with real pulse tag */}
        <motion.div
          animate={{ y: hoveredCard === 'mid-right' ? -10 : 0 }}
          onMouseEnter={() => setHoveredCard('mid-right')}
          onMouseLeave={() => setHoveredCard(null)}
          className="absolute rounded-[32px] overflow-hidden bg-white-card/40 backdrop-blur-xl border border-white/40 shadow-2xl cursor-pointer"
          style={{ right: '10%', top: '56%', width: '350px', height: '240px', zIndex: 15 }}
        >
          <img
            alt="Mockup Logo Design"
            className="w-full h-full object-cover select-none"
            src={mockupLogo}
          />
          <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-xl px-4 py-2 rounded-full border border-white/50 shadow-md flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping absolute" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 relative" />
            <span className="font-display text-[9px] font-bold text-text-dark uppercase tracking-wider">
              Mockup Profesional
            </span>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout: Responsive Bento Cards Grid (medium screens and below) */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 px-6 relative z-10 w-full mt-8">
        {/* Bento Card 1: Design Progress */}
        <div className="bg-white-card border border-line-grey/40 p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B2B]" />
              <span className="font-display text-xs font-bold uppercase tracking-widest text-text-dark">
                Alur Pengerjaan
              </span>
            </div>
            <h4 className="font-display text-lg font-bold text-text-dark mb-2">Desain Presisi</h4>
            <p className="font-body text-xs text-muted-grey mb-4">
              Kami memastikan setiap elemen didesain dengan keselarasan pixel-perfect.
            </p>
          </div>
          <div className="bg-panel-bg p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-text-dark uppercase">Selesai</span>
              <span className="text-xs font-bold text-text-dark">{designProgress}%</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="100" 
              value={designProgress} 
              onChange={(e) => setDesignProgress(parseInt(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
          </div>
        </div>

        {/* Bento Card 2: AI Tech Integration */}
        <div className="bg-white-card border border-line-grey/40 p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-display text-xs font-bold uppercase tracking-widest text-text-dark">
                Kolaborasi Teknologi
              </span>
            </div>
            <h4 className="font-display text-lg font-bold text-text-dark mb-2">Rupaka Smart Engine</h4>
            <p className="font-body text-xs text-muted-grey mb-4">
              Menekan biaya produksi untuk memberikan harga terjangkau bagi para pelaku UMKM.
            </p>
          </div>
          <button 
            onClick={() => setAiEnabled(!aiEnabled)}
            className="flex items-center justify-between bg-panel-bg p-3.5 rounded-xl border border-line-grey/20"
          >
            <div className="flex items-center gap-2 text-left">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${aiEnabled ? 'bg-[#FF4B2B]' : 'bg-muted-light'}`}>
                <Sparkles size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-text-dark">{aiEnabled ? 'AI Diaktifkan' : 'AI Dinonaktifkan'}</p>
                <p className="text-[10px] text-muted-grey">{aiEnabled ? 'Hemat waktu & biaya' : 'Proses manual intensif'}</p>
              </div>
            </div>
            {aiEnabled ? <ToggleRight size={32} className="text-green-600" /> : <ToggleLeft size={32} className="text-muted-grey" />}
          </button>
        </div>

        {/* Bento Card 3: Quality Standard */}
        <div className="bg-white-card border border-line-grey/40 p-5 rounded-[24px] shadow-sm flex flex-col gap-4">
          <div className="relative h-[200px] rounded-2xl overflow-hidden">
            <img
              alt="Mascot Website Rupaka"
              className="w-full h-full object-cover"
              src={mascotRupaka}
            />
            <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-[9px] font-bold text-text-dark uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              Karya Rupaka
            </span>
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-text-dark">Standar Hasil Premium</h4>
            <p className="font-body text-xs text-muted-grey mt-1">
              Setiap berkas diekspor dalam format ultra tajam, bebas pecah, dan siap dicetak langsung.
            </p>
          </div>
        </div>

        {/* Bento Card 4: Modern Identity */}
        <div className="bg-white-card border border-line-grey/40 p-5 rounded-[24px] shadow-sm flex flex-col justify-between">
          <div className="relative h-[200px] rounded-2xl overflow-hidden">
            <img
              alt="Mascot Saky Design"
              className="w-full h-full object-cover"
              src={mascotSaky}
            />
          </div>
          <div className="mt-4">
            <h4 className="font-display text-base font-bold text-text-dark">Karakter Unik Brand</h4>
            <p className="font-body text-xs text-muted-grey mt-1">
              Desain karakter yang memorable dan sesuai identitas brand Anda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
