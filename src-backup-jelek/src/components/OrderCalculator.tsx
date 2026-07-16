import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, MessageSquare, Sparkles, Clock, CheckSquare, RefreshCw } from 'lucide-react';
import { DesignEstimateRequest } from '../types';

export default function OrderCalculator() {
  const [formData, setFormData] = useState<DesignEstimateRequest>({
    designType: 'poster',
    style: 'minimalist',
    delivery: 'regular',
    notes: '',
    brandName: '',
    phone: ''
  });

  const [totalCost, setTotalCost] = useState(50000);

  // Dynamic cost calculation effect
  useEffect(() => {
    let basePrice = 50000;
    
    // 1. Design type base
    if (formData.designType === 'poster') basePrice = 50000;
    else if (formData.designType === 'custom') basePrice = 75000;
    else if (formData.designType === 'logo') basePrice = 150000;
    else if (formData.designType === 'website') basePrice = 450000;

    // 2. Add-ons based on style complexity
    let styleSurcharge = 0;
    if (formData.style === 'bold') styleSurcharge = 15000;
    else if (formData.style === 'classic') styleSurcharge = 25000;
    else if (formData.style === 'playful') styleSurcharge = 20000;

    // 3. Speed surcharge
    let deliverySurcharge = 0;
    if (formData.delivery === 'express') {
      deliverySurcharge = formData.designType === 'website' ? 100000 : 35000;
    }

    setTotalCost(basePrice + styleSurcharge + deliverySurcharge);
  }, [formData.designType, formData.style, formData.delivery]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const handleSubmitBrief = (e: FormEvent) => {
    e.preventDefault();
    
    const waBaseUrl = 'https://wa.me/628123456789';
    const clientBrand = formData.brandName ? formData.brandName : '[Nama Brand Belum Diisi]';
    const clientNotes = formData.notes ? formData.notes : 'Tidak ada catatan tambahan';
    
    const message = 
`Halo Rupaka Studio! Saya ingin memesan desain lewat Wizard Estimator:
===========================
*Nama Brand:* ${clientBrand}
*Layanan:* ${formData.designType.toUpperCase()}
*Gaya Desain:* ${formData.style.toUpperCase()}
*Waktu Pengerjaan:* ${formData.delivery === 'express' ? 'EXPRESS (24 Jam)' : 'REGULAR (1-2 Hari)'}
*Catatan Tambahan:* ${clientNotes}
===========================
*Estimasi Total:* ${formatCurrency(totalCost)}

Mohon info rekening pembayaran dan nomor antrean pengerjaan. Terima kasih!`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`${waBaseUrl}?text=${encodedMsg}`, '_blank', 'noreferrer');
  };

  const handleReset = () => {
    setFormData({
      designType: 'poster',
      style: 'minimalist',
      delivery: 'regular',
      notes: '',
      brandName: '',
      phone: ''
    });
  };

  return (
    <section id="estimator" className="py-24 sm:py-32 px-6 sm:px-10 max-w-[1440px] mx-auto bg-page-bg border-t border-line-grey/25">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center">
        
        {/* Left Column: Heading text & dynamic overview info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FF4B2B] mb-3">
            Wizard Brief & Budget
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-text-dark leading-tight mb-6">
            Rancang Kebutuhan Desain Anda Sendiri
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted-grey leading-relaxed mb-8">
            Gunakan kalkulator interaktif kami untuk merencanakan anggaran branding UMKM Anda secara transparan. Tidak ada biaya tersembunyi, semua penambahan detail dihitung seketika!
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5 p-4 bg-panel-bg rounded-2xl border border-line-grey/25">
              <Sparkles size={16} className="text-[#FF4B2B] mt-0.5 shrink-0" />
              <div>
                <h5 className="font-display font-bold text-xs text-text-dark uppercase tracking-wider">Tanpa Biaya Sembunyi</h5>
                <p className="font-body text-[11px] text-muted-grey mt-0.5">Semua detail biaya tertera jelas sebelum pengerjaan brief dimulai.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 bg-panel-bg rounded-2xl border border-line-grey/25">
              <Clock size={16} className="text-[#8A2387] mt-0.5 shrink-0" />
              <div>
                <h5 className="font-display font-bold text-xs text-text-dark uppercase tracking-wider">Garansi Pengerjaan Tepat Waktu</h5>
                <p className="font-body text-[11px] text-muted-grey mt-0.5">Paket express kami jamin selesai dalam 24 jam atau potongan harga 50%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Estimator Area */}
        <div className="lg:col-span-7 bg-white-card rounded-[32px] border border-line-grey/30 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-gradient-to-bl from-[#FF4B2B]/5 to-transparent pointer-events-none rounded-full" />
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-line-grey/20">
            <div className="flex items-center gap-2">
              <Calculator size={16} className="text-black-dark" />
              <span className="font-display text-xs font-extrabold uppercase tracking-widest text-text-dark">Estimator Biaya Desain</span>
            </div>
            <button 
              onClick={handleReset}
              className="text-muted-grey hover:text-black-dark transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <RefreshCw size={10} />
              Reset Form
            </button>
          </div>

          <form onSubmit={handleSubmitBrief} className="space-y-6">
            {/* Row 1: Brand Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="input-brand-name" className="font-display text-[10px] font-extrabold uppercase tracking-widest text-text-dark">
                Nama Brand / Usaha Anda
              </label>
              <input
                id="input-brand-name"
                type="text"
                placeholder="Contoh: Kopi Janji Jogja, Keripik Tempe Enak"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full bg-panel-bg border border-line-grey/30 rounded-xl px-4 py-3 font-body text-xs focus:outline-none focus:border-black-dark focus:ring-1 focus:ring-black-dark transition-all text-text-dark placeholder-muted-grey/60"
              />
            </div>

            {/* Row 2: Select Service Type */}
            <div className="flex flex-col gap-2">
              <span className="font-display text-[10px] font-extrabold uppercase tracking-widest text-text-dark">
                Layanan Desain Yang Dibutuhkan
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'poster', label: 'Poster', sub: 'Mulai Rp50k' },
                  { id: 'logo', label: 'Logo / Box', sub: 'Mulai Rp150k' },
                  { id: 'website', label: 'Website', sub: 'Mulai Rp450k' },
                  { id: 'custom', label: 'Custom', sub: 'Mulai Rp75k' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    id={`btn-design-type-${item.id}`}
                    onClick={() => setFormData({ ...formData, designType: item.id as any })}
                    className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all border ${formData.designType === item.id 
                      ? 'bg-black border-black text-white shadow-md scale-[1.02]' 
                      : 'bg-panel-bg border-line-grey/20 text-text-dark hover:bg-soft-card-2'}`}
                  >
                    <span className="font-display text-xs font-bold leading-none">{item.label}</span>
                    <span className={`text-[9px] mt-1 font-medium ${formData.designType === item.id ? 'text-white/60' : 'text-muted-grey'}`}>{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Design Style Option */}
            <div className="flex flex-col gap-2">
              <span className="font-display text-[10px] font-extrabold uppercase tracking-widest text-text-dark">
                Pilih Karakter / Gaya Visual
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'minimalist', label: 'Minimalist', sub: 'Flat & Clean' },
                  { id: 'bold', label: 'Bold', sub: 'Vibrant Colors' },
                  { id: 'classic', label: 'Vintage', sub: 'Retro & Luxury' },
                  { id: 'playful', label: 'Playful', sub: 'Creative Illust' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    id={`btn-design-style-${item.id}`}
                    onClick={() => setFormData({ ...formData, style: item.id as any })}
                    className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all border ${formData.style === item.id 
                      ? 'bg-black border-black text-white shadow-md scale-[1.02]' 
                      : 'bg-panel-bg border-line-grey/20 text-text-dark hover:bg-soft-card-2'}`}
                  >
                    <span className="font-display text-xs font-bold leading-none">{item.label}</span>
                    <span className={`text-[8px] mt-1 font-medium ${formData.style === item.id ? 'text-white/60' : 'text-muted-grey'}`}>{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Speed options */}
            <div className="flex flex-col gap-2">
              <span className="font-display text-[10px] font-extrabold uppercase tracking-widest text-text-dark">
                Waktu Pengiriman (Delivery)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  id="btn-delivery-regular"
                  onClick={() => setFormData({ ...formData, delivery: 'regular' })}
                  className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all border text-left ${formData.delivery === 'regular' 
                    ? 'bg-black border-black text-white shadow-md' 
                    : 'bg-panel-bg border-line-grey/20 text-text-dark hover:bg-soft-card-2'}`}
                >
                  <div>
                    <h6 className="font-display text-xs font-bold leading-none">Pengiriman Regular (Standar)</h6>
                    <p className={`text-[9px] mt-1 font-medium ${formData.delivery === 'regular' ? 'text-white/60' : 'text-muted-grey'}`}>
                      Estimasi selesai 1-2 hari kerja.
                    </p>
                  </div>
                  <span className="font-display text-xs font-bold">Gratis</span>
                </button>

                <button
                  type="button"
                  id="btn-delivery-express"
                  onClick={() => setFormData({ ...formData, delivery: 'express' })}
                  className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all border text-left ${formData.delivery === 'express' 
                    ? 'bg-black border-black text-white shadow-md' 
                    : 'bg-panel-bg border-line-grey/20 text-text-dark hover:bg-soft-card-2'}`}
                >
                  <div>
                    <h6 className="font-display text-xs font-bold leading-none">Pengiriman Express (Kilat)</h6>
                    <p className={`text-[9px] mt-1 font-medium ${formData.delivery === 'express' ? 'text-white/60' : 'text-muted-grey'}`}>
                      Prioritas utama selesai maksimal 24 jam.
                    </p>
                  </div>
                  <span className="font-display text-xs font-extrabold text-[#FF4B2B]">
                    {formData.designType === 'website' ? '+Rp 100k' : '+Rp 35k'}
                  </span>
                </button>
              </div>
            </div>

            {/* Row 5: Notes/Brief */}
            <div className="flex flex-col gap-2">
              <label htmlFor="textarea-notes" className="font-display text-[10px] font-extrabold uppercase tracking-widest text-text-dark">
                Catatan Singkat Desain (Brief / Request Warna)
              </label>
              <textarea
                id="textarea-notes"
                rows={3}
                placeholder="Tuliskan di sini detail promo, warna yang disukai, tulisan teks utama, atau rujukan gaya desain (opsional)."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-panel-bg border border-line-grey/30 rounded-xl px-4 py-3 font-body text-xs focus:outline-none focus:border-black-dark focus:ring-1 focus:ring-black-dark transition-all text-text-dark placeholder-muted-grey/60 resize-none"
              />
            </div>

            {/* Final Cost Summary & CTA */}
            <div className="bg-panel-bg p-5 sm:p-6 rounded-[24px] border border-line-grey/30 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted-grey">Estimasi Anggaran Jasa</span>
                <p className="font-display text-2xl sm:text-3xl font-black text-black-dark tracking-tight leading-none mt-1">
                  {formatCurrency(totalCost)}
                </p>
              </div>

              <button
                type="submit"
                id="btn-submit-estimator"
                className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 font-display text-[11px] font-bold uppercase tracking-wider px-8 h-[52px] rounded-full flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer shrink-0"
              >
                <MessageSquare size={14} />
                <span>Kirim via WhatsApp</span>
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </section>
  );
}
