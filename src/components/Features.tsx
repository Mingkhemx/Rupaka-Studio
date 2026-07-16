import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BadgeDollarSign, 
  Sparkles, 
  Layers, 
  HelpCircle, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2, 
  Gift, 
  Flame, 
  Send 
} from 'lucide-react';

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Interactive Chat State
  const [chatPreset, setChatPreset] = useState<string>('kopi');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'rupaka'; text: string; time: string }>>([
    { 
      sender: 'user', 
      text: 'Halo Rupaka! Saya butuh desain poster promosi untuk menu baru warung kopi saya dengan gaya yang estetik dan minimalis.', 
      time: '14:20' 
    },
    { 
      sender: 'rupaka', 
      text: 'Halo! Tentu bisa sekali Kak. Untuk warung kopi, kami sangat merekomendasikan layanan Project-Based Poster Promosi seharga Rp 50.000 saja. Kakak sudah dapat file resolusi tinggi siap cetak & posting di Instagram, serta gratis 2x revisi. Tertarik melanjutkan diskusi brief-nya?', 
      time: '14:21' 
    }
  ]);

  const handlePresetChange = (presetId: 'kopi' | 'kripik' | 'butik' | 'web') => {
    setChatPreset(presetId);
    
    let userMsg = '';
    let rupakaMsg = '';

    if (presetId === 'kopi') {
      userMsg = 'Halo Rupaka! Saya butuh desain poster promosi untuk menu baru warung kopi saya dengan gaya yang estetik dan minimalis.';
      rupakaMsg = 'Halo! Tentu bisa sekali Kak. Untuk warung kopi, kami sangat merekomendasikan layanan Project-Based Poster Promosi seharga Rp 50.000 saja. Kakak sudah dapat file resolusi tinggi siap cetak & posting di Instagram, serta gratis 2x revisi. Tertarik melanjutkan diskusi?';
    } else if (presetId === 'kripik') {
      userMsg = 'Sore admin, saya punya produk keripik singkong khas daerah tapi bungkusnya masih polosan. Ada paket untuk buat logo + desain kemasannya?';
      rupakaMsg = 'Selamat sore! Untuk kebutuhan ini, kami punya paket Bundling Logo & Kemasan seharga Rp 150.000. Kakak akan mendapatkan file master vektor (bisa diperbesar tanpa pecah) dan visualisasi 3D mock-up agar terbayang hasil cetaknya.';
    } else if (presetId === 'butik') {
      userMsg = 'Kak, saya butuh konten promo harian untuk butik pakaian muslim saya di Instagram secara rutin tiap bulan. Lebih baik pilih paket yang mana ya?';
      rupakaMsg = 'Halo Kak! Sangat disarankan mengambil paket Subscription (Bulanan) kami. Mulai dari Rp 350.000/bulan, kakak akan mendapatkan 8 materi desain konten promosi terjadwal lengkap dengan copywriting menarik. Usaha jalan terus, feed rapi!';
    } else if (presetId === 'web') {
      userMsg = 'Mas, saya mau buat website katalog online sederhana untuk toko oleh-oleh saya agar pembeli tinggal klik & pesan via WhatsApp. Berapa biayanya?';
      rupakaMsg = 'Halo! Kami menyediakan Custom Website satu halaman seharga Rp 450.000. Desain responsif (rapi di HP), sudah termasuk integrasi direct WhatsApp chat, dan SEO dasar agar toko oleh-oleh kakak mudah ditemukan di Google!';
    }

    setMessages([
      { sender: 'user', text: userMsg, time: '14:20' },
      { sender: 'rupaka', text: rupakaMsg, time: '14:21' }
    ]);
  };

  const featureList = [
    {
      title: '1. Terjangkau',
      desc: 'Harga mulai dari Rp 50.000/desain - jauh di bawah rata-rata harga agensi besar, sengaja dirancang agar ramah bagi perputaran modal usaha kecil.',
      accent: 'from-[#FF416C] to-[#FF4B2B]'
    },
    {
      title: '2. Fleksibel',
      desc: 'Sistem pemesanan per-proyek (project-based) yang memudahkan Anda. Tidak ada komitmen jangka panjang, pesan hanya saat bisnis Anda membutuhkannya.',
      accent: 'from-[#8A2387] to-[#E94057]'
    },
    {
      title: '3. Praktis',
      desc: 'One-stop visual partner. Mulai dari poster Instagram harian, perancangan logo, kemasan produk, stiker segel dus, hingga pembuatan custom landing page katalog produk.',
      accent: 'from-[#F27121] to-[#E94057]'
    },
    {
      title: '4. Personal',
      desc: 'Kami mendengarkan karakter bisnis Anda. Diskusi yang komunikatif dan bersahabat memastikan hasil desain merepresentasikan nilai unik produk lokal Anda.',
      accent: 'from-[#11998e] to-[#38ef7d]'
    },
    {
      title: '5. Efisien dengan AI',
      desc: 'Kami menggunakan alur kerja hibrida berbasis asisten cerdas AI untuk pengerjaan teknis secara kilat, sehingga desainer kami bisa fokus pada konsep kreatif murni.',
      accent: 'from-[#00c6ff] to-[#0072ff]'
    }
  ];

  return (
    <section id="layanan" className="py-24 px-6 sm:px-10 max-w-[1440px] mx-auto bg-page-bg">
      
      {/* SECTION 1: Brand OS (Kenapa Pilih Kami) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-36">
        
        {/* Left Interactive Services Card */}
        <div className="bg-gradient-to-br from-soft-card-2 to-soft-card rounded-[32px] md:rounded-[40px] p-6 sm:p-10 min-h-[550px] flex flex-col justify-between relative overflow-hidden border border-line-grey/30 shadow-sm group">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white-card/20 rounded-full blur-3xl pointer-events-none transition-all group-hover:bg-white-card/30" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF4B2B] animate-pulse" />
              <span className="font-display font-extrabold text-[10px] text-text-dark uppercase tracking-widest">
                Layanan Utama Kami
              </span>
            </div>
            <Layers size={16} className="text-muted-grey" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-4 p-4 bg-white-card/80 hover:bg-white-card rounded-2xl transition-all duration-300 border border-line-grey/20 cursor-pointer group/item hover:translate-x-1 hover:shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#FF4B2B]/10 flex items-center justify-center text-[#FF4B2B]">
                <BadgeDollarSign size={18} />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-text-dark group-hover/item:text-[#FF4B2B] transition-colors">Poster Promosi</h5>
                <p className="text-[11px] text-muted-grey mt-0.5">Sosial media feed, flyer, baliho, menu resto.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white-card/80 hover:bg-white-card rounded-2xl transition-all duration-300 border border-line-grey/20 cursor-pointer group/item hover:translate-x-1 hover:shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#8A2387]/10 flex items-center justify-center text-[#8A2387]">
                <Layers size={18} />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-text-dark group-hover/item:text-[#8A2387] transition-colors">Logo & Kemasan Produk</h5>
                <p className="text-[11px] text-muted-grey mt-0.5">Identitas merek, stiker box, segel label.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white-card/80 hover:bg-white-card rounded-2xl transition-all duration-300 border border-line-grey/20 cursor-pointer group/item hover:translate-x-1 hover:shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#F27121]/10 flex items-center justify-center text-[#F27121]">
                <Sparkles size={18} />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-text-dark group-hover/item:text-[#F27121] transition-colors">Digital Product Accents</h5>
                <p className="text-[11px] text-muted-grey mt-0.5">Stiker cutting, kartu ucapan, digital planner.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white-card/80 hover:bg-white-card rounded-2xl transition-all duration-300 border border-line-grey/20 cursor-pointer group/item hover:translate-x-1 hover:shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#11998e]/10 flex items-center justify-center text-[#11998e]">
                <Layers size={18} />
              </div>
              <div>
                <h5 className="font-display font-bold text-sm text-text-dark group-hover/item:text-[#11998e] transition-colors">Custom Landing Page</h5>
                <p className="text-[11px] text-muted-grey mt-0.5">Website katalog, portofolio profil UMKM.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-line-grey/30 flex items-center justify-between text-muted-grey text-[10px] uppercase font-bold tracking-wider relative z-10">
            <span>Yogyakarta, ID</span>
            <span>Bebas Konsultasi</span>
          </div>
        </div>

        {/* Right Info List */}
        <div className="flex flex-col justify-center h-full">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FF4B2B] mb-3">
            Kelebihan Kami
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-10 leading-tight">
            Kenapa UMKM Memilih Rupaka Studio?
          </h3>
          
          <div className="relative pl-8 border-l-[3px] border-line-grey/60 space-y-10">
            {featureList.map((item, index) => (
              <div 
                key={index} 
                className="cursor-pointer group relative"
                onClick={() => setActiveFeature(index)}
              >
                {/* Active highlight bar indicator */}
                {activeFeature === index && (
                  <motion.div 
                    layoutId="activeFeatureBar"
                    className={`absolute left-[-35px] top-0 w-[3px] h-full bg-gradient-to-b ${item.accent}`}
                  />
                )}
                
                <h4 className={`font-display text-lg font-bold mb-2 transition-colors duration-300 ${activeFeature === index ? 'text-black-dark' : 'text-text-dark/70 group-hover:text-black'}`}>
                  {item.title}
                </h4>
                <p className={`font-body text-xs md:text-sm leading-relaxed transition-all duration-300 ${activeFeature === index ? 'text-muted-grey font-medium' : 'text-muted-grey/60'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Pricing Options & Interactive Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        
        {/* Left: Pricing details */}
        <div className="flex flex-col justify-center h-full order-2 lg:order-1">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FF4B2B] mb-3">
            Pilihan Paket
          </span>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text-dark mb-8 leading-tight">
            Pilih Skema Sesuai Anggaran Bisnis Anda
          </h3>
          
          <div className="space-y-8 pl-1 border-l border-line-grey/40">
            <div className="hover:pl-4 transition-all duration-300 py-1">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={14} className="text-[#FF4B2B]" />
                <h4 className="font-display text-base sm:text-lg font-extrabold text-text-dark">
                  Skema Project-Based (Eceran)
                </h4>
              </div>
              <p className="font-body text-xs sm:text-sm text-muted-grey leading-relaxed">
                Mulai dari <span className="font-bold text-black-dark">Rp 50.000 / desain</span>. Pembayaran sekali per urusan visual yang selesai. Sangat cocok untuk promo menu dadakan, perbaikan logo, atau kebutuhan spanduk darurat.
              </p>
            </div>

            <div className="hover:pl-4 transition-all duration-300 py-1">
              <div className="flex items-center gap-2 mb-2">
                <Layers size={14} className="text-purple-600" />
                <h4 className="font-display text-base sm:text-lg font-extrabold text-text-dark">
                  Skema Subscription (Bulanan)
                </h4>
              </div>
              <p className="font-body text-xs sm:text-sm text-muted-grey leading-relaxed">
                Mulai dari <span className="font-bold text-black-dark">Rp 350.000 / bulan</span>. Dapatkan pasokan konten visual terjadwal secara berkala untuk feed Instagram dan materi story. Solusi hemat tanpa bayar gaji desainer bulanan.
              </p>
            </div>

            <div className="hover:pl-4 transition-all duration-300 py-1">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={14} className="text-orange-500" />
                <h4 className="font-display text-base sm:text-lg font-extrabold text-text-dark">
                  Skema Bundling Paket (Branding Total)
                </h4>
              </div>
              <p className="font-body text-xs sm:text-sm text-muted-grey leading-relaxed">
                Gabungkan paket logo, stiker kemasan, kartu nama, dan spanduk toko dalam sekali order dengan harga diskon khusus. Siap luncurkan brand baru dalam waktu kurang dari 5 hari.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Awesome Interactive Chat Mockup */}
        <div className="bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3] rounded-[32px] md:rounded-[40px] p-4 sm:p-8 min-h-[600px] flex flex-col justify-between border border-line-grey/30 shadow-inner order-1 lg:order-2">
          
          {/* Chat Simulator Top Options */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-3.5 mb-6 border border-white/50 flex flex-col gap-2 shadow-sm">
            <span className="font-display text-[9px] font-extrabold uppercase tracking-wider text-muted-grey text-center">
              Pilih contoh bisnis untuk memulai simulasi konsultasi:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
              <button
                onClick={() => handlePresetChange('kopi')}
                className={`py-2 px-2.5 rounded-xl font-display text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${chatPreset === 'kopi' ? 'bg-black text-white shadow-md' : 'bg-white/70 text-text-dark hover:bg-white'}`}
              >
                ☕ Kopi
              </button>
              <button
                onClick={() => handlePresetChange('kripik')}
                className={`py-2 px-2.5 rounded-xl font-display text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${chatPreset === 'kripik' ? 'bg-black text-white shadow-md' : 'bg-white/70 text-text-dark hover:bg-white'}`}
              >
                🍌 Keripik
              </button>
              <button
                onClick={() => handlePresetChange('butik')}
                className={`py-2 px-2.5 rounded-xl font-display text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${chatPreset === 'butik' ? 'bg-black text-white shadow-md' : 'bg-white/70 text-text-dark hover:bg-white'}`}
              >
                👗 Butik
              </button>
              <button
                onClick={() => handlePresetChange('web')}
                className={`py-2 px-2.5 rounded-xl font-display text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${chatPreset === 'web' ? 'bg-black text-white shadow-md' : 'bg-white/70 text-text-dark hover:bg-white'}`}
              >
                🌐 Web Katalog
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-grow flex flex-col gap-4 overflow-y-auto px-1 max-h-[300px] min-h-[250px] justify-center">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`max-w-[85%] flex flex-col p-3.5 rounded-2xl border text-xs leading-relaxed shadow-sm ${msg.sender === 'user' 
                  ? 'bg-white/90 text-text-dark border-white/50 self-start rounded-tl-none' 
                  : 'bg-black/95 text-white-soft border-white/10 self-end rounded-tr-none'}`}
              >
                <div className="flex items-center gap-1.5 mb-1.5 justify-between">
                  <span className="font-display text-[9px] font-bold tracking-widest uppercase opacity-60">
                    {msg.sender === 'user' ? 'Pertanyaan Klien' : 'Respon Rupaka Studio'}
                  </span>
                  <span className="text-[8px] opacity-40">{msg.time}</span>
                </div>
                <p className="font-body text-xs">{msg.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Chat Footer Accent */}
          <div className="mt-6 pt-4 border-t border-white/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] flex items-center justify-center text-white shadow-md animate-pulse">
                <Sparkles size={12} />
              </div>
              <span className="font-display text-[10px] font-bold tracking-widest uppercase text-text-dark/70">
                Pengerjaan Cepat & Hemat
              </span>
            </div>
            
            <button 
              onClick={() => {
                const textParam = encodeURIComponent(`Halo Rupaka Studio, saya tertarik melanjutkan diskusi mengenai paket ${chatPreset === 'kopi' ? 'Poster Promosi Warung Kopi' : chatPreset === 'kripik' ? 'Logo dan Kemasan Produk Makanan' : chatPreset === 'butik' ? 'Subscription Konten Feed IG Bulanan' : 'Pembuatan Custom Website Landing Page'}.`);
                window.open(`https://wa.me/628123456789?text=${textParam}`, '_blank', 'noreferrer');
              }}
              className="px-4 py-2 bg-black text-white font-display text-[9px] font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Lanjut WhatsApp</span>
              <ChevronRight size={10} />
            </button>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
