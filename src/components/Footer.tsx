import { MessageCircle, Share2, Globe, Sparkles, Command } from 'lucide-react';
import logoImage from '../assets/logo.png';
import mascotWatermark from '../assets/mascot website rupaka.png';

export default function Footer() {
  const handleWhatsAppChat = () => {
    const waUrl = `https://wa.me/628123456789?text=Halo%20Rupaka%20Studio%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20desain%20untuk%20UMKM%20saya.`;
    window.open(waUrl, '_blank', 'noreferrer');
  };

  return (
    <>
      {/* 1. BOTTOM FINAL CALL TO ACTION */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 bg-page-bg border-t border-line-grey/20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-dark tracking-tighter leading-[1.08] mb-8 max-w-3xl text-balance">
              Siap Bikin Bisnis Anda Terlihat Lebih Profesional?
            </h2>

            <p className="font-body text-sm sm:text-base text-muted-grey max-w-xl mb-10 leading-relaxed">
              Konsultasi gratis, tanpa komitmen apapun. Ceritakan impian, produk, dan kebutuhan promosi bisnis Anda, kami bantu carikan solusi desain terbaiknya!
            </p>

            <button
              onClick={handleWhatsAppChat}
              className="bg-accent-coral text-white hover:bg-accent-coral/90 font-display rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 px-10 text-xs h-[54px] font-bold uppercase tracking-wider shadow-xl cursor-pointer"
            >
              <MessageCircle size={15} />
              Chat Sekarang via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN FOOTER */}
      <footer className="bg-primary-dark text-white-soft pt-24 pb-12 px-6 sm:px-10 rounded-t-[40px] md:rounded-t-[60px] relative z-20 border-t border-accent-coral/20">
        <div className="max-w-[1440px] mx-auto">
          
          {/* Background watermark mascot image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-8 overflow-hidden">
            <img 
              src={mascotWatermark}
              alt="Rupaka Studio Mascot Watermark"
              className="w-[700px] h-auto object-contain"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20">
            {/* Logo and Brand column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center bg-white/10 p-2 border-2 border-white">
                  <img 
                    src={logoImage}
                    alt="Rupaka Studio Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold tracking-tight text-white leading-none">Rupaka Studio</h4>
                  <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">Mitra Visual UMKM</p>
                </div>
              </div>

              <p className="font-body text-xs text-white-soft/50 max-w-xs leading-relaxed">
                Rupaka Studio - Solusi jasa desain digital berkualitas agensi profesional dengan penawaran harga paling terjangkau untuk memajukan perekonomian UMKM Indonesia.
              </p>

              {/* Social links */}
              <div className="flex gap-3 mt-2">
                <button 
                  onClick={() => window.open('https://instagram.com', '_blank', 'noreferrer')}
                  className="w-9 h-9 rounded-full border border-accent-coral/30 flex items-center justify-center hover:bg-accent-coral/20 transition-colors text-accent-coral/60 hover:text-accent-coral cursor-pointer"
                  aria-label="Instagram Link"
                >
                  <Share2 size={14} />
                </button>
                <button 
                  onClick={() => window.open('https://behance.net', '_blank', 'noreferrer')}
                  className="w-9 h-9 rounded-full border border-accent-coral/30 flex items-center justify-center hover:bg-accent-coral/20 transition-colors text-accent-coral/60 hover:text-accent-coral cursor-pointer"
                  aria-label="Behance Link"
                >
                  <Globe size={14} />
                </button>
                <button 
                  onClick={() => window.open('https://github.com', '_blank', 'noreferrer')}
                  className="w-9 h-9 rounded-full border border-accent-coral/30 flex items-center justify-center hover:bg-accent-coral/20 transition-colors text-accent-coral/60 hover:text-accent-coral cursor-pointer"
                  aria-label="Github Link"
                >
                  <Command size={14} />
                </button>
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h5 className="font-display text-[10px] text-white font-black mb-6 uppercase tracking-widest">
                Layanan Utama
              </h5>
              <ul className="flex flex-col gap-3.5 text-xs text-white-soft/60">
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Poster Promosi</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Logo & Kemasan</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Custom Website</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Digital Planner</button></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h5 className="font-display text-[10px] text-white font-black mb-6 uppercase tracking-widest">
                Perusahaan
              </h5>
              <ul className="flex flex-col gap-3.5 text-xs text-white-soft/60">
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Tentang Kami</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Karir Kreatif</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Katalog Karya</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Hubungi Kami</button></li>
              </ul>
            </div>

            {/* Links Column 3 */}
            <div>
              <h5 className="font-display text-[10px] text-white font-black mb-6 uppercase tracking-widest">
                Sumber Daya
              </h5>
              <ul className="flex flex-col gap-3.5 text-xs text-white-soft/60">
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Wawasan Blog</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Pertanyaan (FAQ)</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Komunitas UMKM</button></li>
                <li><button className="hover:text-white transition-colors cursor-pointer text-left">Syarat Lisensi</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom license and credits */}
          <div className="pt-8 border-t border-accent-coral/20 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left relative z-10">
            <p className="font-display text-[10px] text-white/40 font-medium">
              © 2026 Rupaka Studio. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] text-white/40 font-medium font-display uppercase tracking-wider">
              <button className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</button>
              <button className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan</button>
              <button className="hover:text-white transition-colors cursor-pointer">Aturan Lisensi Karya</button>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
