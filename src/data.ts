import { PortfolioItem, BlogPost, FaqItem, TestimonialItem } from './types';
import posterRumahPanggang1 from './assets/Poster Rumah panggang 1.png';
import posterRumahPanggang2 from './assets/Poster Rumah panggang 2.png';
import basrengPackaging from './assets/BASRENG_Rhadika_Snack_packaging_…_202607151429.jpeg';
import logoSaky from './assets/Logo saky.png';
import logoAurra from './assets/logo aurra.jpeg';
import logoLynix from './assets/logo lynix.jpeg';
import logoRupaka from './assets/logo.png';
import mockupLogoJpeg from './assets/Mockup logo.jpeg';
import mockupLogoPng from './assets/Mockup logo.png';
import banner1 from './assets/Banner 1.png';
import banner2 from './assets/Banner 2.png';
import banner3 from './assets/Banner3.png';
import mascotSaky from './assets/mascot saky.png';
import mascotRupaka from './assets/mascot website rupaka.png';
import maskot from './assets/maskot.png';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Poster Promosi Rumah Panggang',
    category: 'poster',
    image: posterRumahPanggang1,
    description: 'Poster promosi cetak dan digital beresolusi tinggi dengan desain menarik untuk rumah panggang dengan gaya modern minimalis.',
    price: 'Rp 50.000',
    features: ['Format file siap cetak (PDF, PNG)', 'Revisi maksimal 2 kali', 'Pengerjaan 1-2 hari kerja', 'Gaya desain custom modern']
  },
  {
    id: 'port-2',
    title: 'Poster Series Rumah Panggang Vol. 2',
    category: 'poster',
    image: posterRumahPanggang2,
    description: 'Koleksi poster promosi kedua untuk kampanye berkelanjutan dengan tema dan style yang konsisten dengan brand identity.',
    price: 'Rp 120.000',
    features: ['Paket 4-6 desain poster', 'Tema customizable', 'Revisi unlimited', 'Format cetak dan digital']
  },
  {
    id: 'port-3',
    title: 'Kemasan Produk BASRENG Rhadika',
    category: 'logo',
    image: basrengPackaging,
    description: 'Desain kemasan produk snack yang eye-catching dengan branding yang kuat untuk meningkatkan penjualan di retail.',
    price: 'Rp 180.000',
    features: ['Master file vektor (AI, EPS, SVG)', 'Panduan warna & tipografi', 'Visualisasi mock-up produk 3D', 'Lisensi komersial penuh']
  },
  {
    id: 'port-4',
    title: 'Logo Saky - Identitas Visual Unik',
    category: 'logo',
    image: logoSaky,
    description: 'Desain logo berkarakter yang kuat dan mudah diingat untuk branding UMKM makanan tradisional yang berkualitas.',
    price: 'Rp 150.000',
    features: ['Logo master file vektor', 'Aplikasi di berbagai media', 'Brand guideline lengkap', 'Black-white & color version']
  },
  {
    id: 'port-5',
    title: 'Logo Aurra - Brand Modern',
    category: 'logo',
    image: logoAurra,
    description: 'Identitas visual modern dengan logo minimalis yang cocok untuk brand fashion dan lifestyle contemporary.',
    price: 'Rp 200.000',
    features: ['Logo dalam berbagai format', 'Favicon & app icon', 'Social media template', 'Aplikasi logo di media cetak']
  },
  {
    id: 'port-6',
    title: 'Logo Lynix - Tech Brand Identity',
    category: 'logo',
    image: logoLynix,
    description: 'Desain logo futuristik untuk startup teknologi dengan karakter yang strong dan memorable di berbagai platform.',
    price: 'Rp 200.000',
    features: ['Logo dalam berbagai format', 'Favicon & app icon', 'Vertical & horizontal layout', 'Warna & black-white version']
  },
  {
    id: 'port-7',
    title: 'Logo Rupaka Studio - Brand Mark',
    category: 'logo',
    image: logoRupaka,
    description: 'Logo brand Rupaka Studio sendiri yang mencerminkan identitas sebagai studio desain terpercaya untuk UMKM Indonesia.',
    price: 'Rp 250.000',
    features: ['Logo master file vektor', 'Brand guidelines lengkap', 'Aplikasi lintas media', 'Lisensi komersial penuh']
  },
  {
    id: 'port-8',
    title: 'Mockup Logo - Presentasi Klien',
    category: 'custom',
    image: mockupLogoPng,
    description: 'Visualisasi mockup 3D profesional untuk menampilkan hasil desain logo kepada klien dengan perspektif yang menarik.',
    price: 'Rp 100.000',
    features: ['Mockup 3D realistis', 'Multiple angle views', 'Background customizable', 'High resolution export']
  },
  {
    id: 'port-9',
    title: 'Campaign Banner Series 1',
    category: 'poster',
    image: banner1,
    description: 'Serangkaian banner promosi untuk kampanye media sosial yang eye-catching dan sesuai brand guidelines klien.',
    price: 'Rp 120.000',
    features: ['3-5 variasi banner', 'Ukuran untuk Instagram, TikTok, Facebook', 'HD resolution 1080px', 'Source file PSD tersedia']
  },
  {
    id: 'port-10',
    title: 'Campaign Banner Series 2',
    category: 'poster',
    image: banner2,
    description: 'Banner promosi dengan desain berani untuk meningkatkan engagement di berbagai platform media sosial.',
    price: 'Rp 120.000',
    features: ['3-5 variasi banner', 'Animasi-ready design', 'Brand color palette', 'Multiple format export']
  },
  {
    id: 'port-11',
    title: 'Campaign Banner Series 3',
    category: 'poster',
    image: banner3,
    description: 'Banner kampanye ketiga dengan konsep visual yang fresh dan menarik perhatian target audience dengan cepat.',
    price: 'Rp 120.000',
    features: ['Desain responsif semua ukuran', 'Copy writing optimization', 'CTA button design', 'A/B test version']
  },
  {
    id: 'port-12',
    title: 'Mascot Saky - Character Design',
    category: 'custom',
    image: mascotSaky,
    description: 'Desain karakter mascot yang cute dan memorable untuk branding produk makanan dan merchandise tambahan.',
    price: 'Rp 300.000',
    features: ['Character design sheet', 'Multiple pose & expression', 'Merchandise mockup', 'Animation-ready format']
  },
  {
    id: 'port-13',
    title: 'Mascot Rupaka Website - Brand Character',
    category: 'custom',
    image: mascotRupaka,
    description: 'Karakter mascot khusus untuk website dan marketing material Rupaka Studio sebagai brand ambassador yang friendly.',
    price: 'Rp 350.000',
    features: ['Detailed character design', 'Multiple poses available', 'Website integration ready', 'Social media format']
  },
  {
    id: 'port-14',
    title: 'Maskot General - Versatile Character',
    category: 'custom',
    image: maskot,
    description: 'Desain karakter yang versatile dan bisa digunakan untuk berbagai kebutuhan branding dan marketing campaign.',
    price: 'Rp 280.000',
    features: ['Flexible character design', 'Multiple variations', 'Merchandise-ready', 'Animation compatible']
  },
  {
    id: 'port-15',
    title: 'Mockup Logo Alternatif - JPEG Version',
    category: 'custom',
    image: mockupLogoJpeg,
    description: 'Presentasi mockup alternatif dalam format JPEG untuk fleksibilitas lebih dalam menampilkan hasil desain kepada klien.',
    price: 'Rp 100.000',
    features: ['High quality mockup', 'Realistic presentation', 'Easy file sharing', 'Quick preview format']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Tips Desain Poster yang Menjual untuk UMKM',
    category: 'Insights',
    date: '12 Jan 2026',
    image: banner1,
    readTime: '4 Menit Baca',
    author: 'Adi Setyo',
    content: `
Desain poster yang baik bukan hanya tentang warna yang menarik, tapi tentang bagaimana ia menyampaikan pesan dan mendorong tindakan pembelian (call to action). Bagi pelaku UMKM, poster promosi adalah senjata utama untuk menarik perhatian pelanggan potensial dalam hitungan detik. Berikut adalah 5 tips penting yang dapat Anda terapkan:

### 1. Fokus Pada Satu Pesan Utama (Single Core Message)
Jangan masukkan terlalu banyak informasi dalam satu poster. Jika tujuannya mempromosikan "Menu Baru Kopi", biarkan elemen visual dan teks terbesar mengarah ke sana. Hindari menumpuk promo diskon lain, jam buka, dan peta lokasi yang terlalu besar secara bersamaan.

### 2. Gunakan Aturan Kontras (Contrast Rule)
Teks harus mudah dibaca. Jika warna background Anda terang, gunakan warna teks yang gelap (dan sebaliknya). Teks hitam di atas background off-white (seperti gaya warna Rupaka Studio) memberikan kejelasan baca yang maksimal.

### 3. Buat Hirarki Visual yang Jelas
Mata manusia membaca secara alami dari atas ke bawah atau dalam pola 'F'. Taruh judul (Headline) yang besar di bagian atas, sub-informasi di tengah, dan instruksi penutup (Call to Action seperti nomor WhatsApp atau Username Instagram) di bagian paling bawah dengan kontras tinggi.

### 4. Batasi Kombinasi Font (Maksimal 2 Font)
Menggunakan 4 atau 5 font berbeda dalam satu desain akan membuat poster terlihat berantakan dan tidak profesional. Gunakan satu font berkarakter tegas untuk judul (Display font) dan satu font sans-serif bersih untuk isi teks (Body font).

### 5. Tambahkan Panggilan Aksi (Call To Action - CTA) yang Jelas
Setelah pelanggan melihat poster Anda, apa yang harus mereka lakukan? Berikan instruksi langsung! Misalnya, "Pesan Sekarang via WhatsApp: 0812-xxxx-xxxx" atau "Kunjungi outlet terdekat untuk diskon 20%".
    `
  },
  {
    id: 'blog-2',
    title: 'Kenapa Branding Penting untuk Usaha Kecil?',
    category: 'Branding',
    date: '08 Jan 2026',
    image: logoSaky,
    readTime: '5 Menit Baca',
    author: 'Rina Kartika',
    content: `
Banyak pelaku usaha kecil menganggap branding hanyalah untuk perusahaan multinasional bermodal besar seperti Coca-Cola atau Apple. Padahal, bagi UMKM, branding adalah pembeda utama antara bertahan di persaingan ketat atau tenggelam begitu saja.

### Apa Itu Branding Sebenarnya?
Branding bukan sekadar logo yang indah. Branding adalah seluruh persepsi, emosi, dan penilaian yang ada di benak pelanggan ketika mendengar nama bisnis Anda. Logo, kemasan, keramahan layanan pelanggan, dan konsistensi warna visual adalah alat untuk menyampaikan identitas branding tersebut.

### Alasan Kenapa UMKM Butuh Branding yang Kuat:

1. **Membangun Kepercayaan (Trust Building)**
   Pelanggan lebih cenderung membeli produk dari bisnis yang terlihat profesional dan terpercaya. Kemasan yang didesain secara rapi, memiliki logo yang jelas, dan warna yang konsisten menunjukkan bahwa Anda serius dalam mengelola produk tersebut.

2. **Menghindari Perang Harga**
   Tanpa branding, produk Anda akan dipandang sebagai komoditas biasa yang sama dengan milik kompetitor. Akibatnya, Anda terpaksa menurunkan harga demi bersaing. Dengan branding yang kuat, pelanggan rela membayar lebih karena ada nilai tambah berupa prestise, estetika, dan reputasi merek.

3. **Membantu Promosi Mulut ke Mulut (Word of Mouth)**
   Branding yang unik membuat bisnis Anda mudah diingat. Ketika pelanggan merasa puas, mereka akan lebih mudah merekomendasikan produk Anda dengan nama merek yang spesifik, bukan sekadar "itu lho, warung kripik yang di pojok jalan".

Di Rupaka Studio, kami memahami tantangan budget UMKM. Itulah mengapa kami menyediakan layanan branding seperti paket logo dan kemasan dengan biaya terjangkau namun memiliki kualitas desain yang setara dengan agensi profesional.
    `
  },
  {
    id: 'blog-3',
    title: 'Bagaimana AI Membantu Produksi Desain Lebih Cepat',
    category: 'Teknologi',
    date: '24 Des 2025',
    image: banner3,
    readTime: '6 Menit Baca',
    author: 'Yusuf Nur',
    content: `
Kehadiran Kecerdasan Buatan (AI) telah mengubah lanskap industri kreatif secara revolusioner. Alih-alih menggantikan peran desainer manusia, AI justru menjadi asisten super yang membantu memangkas waktu pengerjaan desain dari berhari-hari menjadi beberapa jam saja.

### Memotong Hambatan "Writer's Block" Kreatif
Salah satu fase terlama dalam desain adalah mencari ide dasar atau konsep awal. Dengan generator AI, desainer dapat dengan cepat membuat beberapa variasi moodboard dan eksplorasi warna untuk ditunjukkan kepada klien. Ini membantu menyelaraskan visi klien dan desainer sebelum masuk ke proses detail.

### Restorasi Gambar dan Upscaling Otomatis
Banyak pelaku UMKM hanya memiliki foto produk berkualitas rendah yang diambil dari kamera HP jadul. Dulu, memperbaiki kualitas foto ini memerlukan teknik retouching manual yang memakan waktu berjam-jam. Kini, dengan bantuan teknologi AI Upscaler, foto produk dapat ditingkatkan resolusinya menjadi sangat tajam dalam hitungan detik, siap dipasang di poster promosi berukuran besar.

### Rupaka Studio Engine
Di Rupaka Studio, kami memanfaatkan alur kerja hibrida (Hybrid Workflow). Desainer profesional kami berkolaborasi dengan kecerdasan AI untuk menangani tugas-tugas teknis yang berulang (seperti seleksi objek, penghapusan background, dan ekspor variasi ukuran konten sosial media). Hal ini memungkinkan kami memberikan harga yang sangat bersahabat bagi UMKM Jogja (mulai dari Rp50.000) dengan kecepatan pengiriman yang luar biasa cepat, namun tetap menjaga kualitas artistik manusia yang berkarakter kuat.
    `
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Berapa lama proses pengerjaan satu desain?',
    answer: 'Untuk paket Project-Based standard (seperti poster promosi), pengerjaan biasanya membutuhkan waktu 1-2 hari kerja setelah kami menerima kelengkapan materi (foto produk, nama menu, harga, dll).'
  },
  {
    id: 'faq-2',
    question: 'Format file apa saja yang akan saya dapatkan?',
    answer: 'Untuk desain poster dan sosial media, Anda mendapatkan file PNG resolusi tinggi siap posting serta file PDF siap cetak. Untuk paket Logo, Anda akan menerima file master vektor asli format AI/EPS/SVG yang bisa diperbesar tanpa pecah.'
  },
  {
    id: 'faq-3',
    question: 'Bagaimana jika saya kurang cocok dengan hasil desain pertamanya?',
    answer: 'Setiap pesanan di Rupaka Studio sudah termasuk fasilitas revisi (2 kali revisi untuk paket reguler). Anda dapat memberikan catatan perubahan warna, penggantian tata letak teks, atau penyesuaian gambar agar sesuai dengan selera Anda.'
  },
  {
    id: 'faq-4',
    question: 'Bagaimana sistem pembayaran di Rupaka Studio?',
    answer: 'Pembayaran dilakukan di awal via transfer Bank lokal (BCA/Mandiri) atau melalui e-wallet (GoPay/OVO/Dana) sebelum pengerjaan dimulai. Kami akan memberikan kuitansi digital resmi sebagai tanda bukti pembayaran.'
  },
  {
    id: 'faq-5',
    question: 'Apakah melayani pemesanan untuk luar Yogyakarta?',
    answer: 'Tentu saja! Meskipun studio fisik kami berada di Yogyakarta, kami melayani pemesanan desain secara online dari seluruh wilayah di Indonesia. Proses diskusi brief dan pengiriman file hasil akhir sepenuhnya dilakukan secara digital via WhatsApp.'
  }
];

export const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Tiara',
    role: 'Owner Dapoer Kyutier',
    content: 'Hai rupaka terima kasih yaa sdh dibuatin daftar menu ini...seneng sekali dg model menu gini..simple but beautiful 😍😍next we LL order again for new design ❤️',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Lanjar',
    role: 'Owner Roemah Panggang',
    content: 'Suka sekali dengan desain ini...paduan warnanya cantik,susunan bahasanya bagus dan paduan antara gmbar dan tulisan terlihat rapi sekali...terima kasih untuk rupaka studio',
    rating: 5
  }
];
