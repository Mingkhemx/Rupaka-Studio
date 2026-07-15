import { PortfolioItem, BlogPost, FaqItem, TestimonialItem } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Poster Promosi Warung Kopi Estetik',
    category: 'poster',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKRPJn1gSFDrt1GQDzfiU4I3yCzTQVQeuNO8ytisTcKlK31yEv5K86cdWMKJBg3GC95w5q1ERJKHJLKU3w-6SojCl15IPwtoKItbHfym_OWSwde4Lc_X0Q39r2NUE_oZu-ti8_Zs_OibuoUCAcJYE-cSQuZwNsvFjQJC5rdU9maW6xzUq0FkX5WNlRsxq4L4CR7oinVYlFK6v9BDjMPShHM5UEvXrG_3JYGqBIWaiRdb9MTmRBmaZdMBZC44wnynC-oFH9TaZlB9Q',
    description: 'Poster promosi cetak dan digital beresolusi tinggi dengan gaya minimalis, cocok untuk menu baru atau kampanye spesial di Instagram.',
    price: 'Rp 50.000',
    features: ['Format file siap cetak (PDF, PNG)', 'Revisi maksimal 2 kali', 'Pengerjaan 1-2 hari kerja', 'Gaya desain custom modern']
  },
  {
    id: 'port-2',
    title: 'Redesain Logo & Kemasan Keripik Tempe Jogja',
    category: 'logo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABa0q5BJ_DreMgIZGB-8at3sYpuFks_tT431tznVrVWB2C49LzdUC651wzXTj9LD-7VYCWRRpo9bqyyAQ_b54KnjtoPjXSRfeIXbBgjwHXIr8Ojo51Y8MG8CC0mGtvupgQSf4RnLcvReiqPWlUs5L2KkemFlhV-MfAQAzfyxIvGWfFM2Orh3ChuU5A6sOS2VBQbJyPWAQcwMlr6YWpCbln_V8DC4Yo90e6mK4QAINc-FrScaJ_KPin-t6UJ12p4Dnl5CbWpvGS2GiO',
    description: 'Identitas visual baru yang berkarakter untuk memperkuat branding UMKM makanan tradisional agar tampil menarik di rak supermarket modern.',
    price: 'Rp 150.000',
    features: ['Master file vektor (AI, EPS, SVG)', 'Panduan warna & tipografi', 'Visualisasi mock-up produk 3D', 'Lisensi komersial penuh']
  },
  {
    id: 'port-3',
    title: 'Stiker Branding & Digital Planner Kuliner',
    category: 'custom',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAsZf4UPkmlE6_mXYyjLE0rRS6z3wyPwTyXyHBEx2fzb_1GTK9oiAbqHMYNp1BpaU32inyxnVzpmayXVCbCKB_1Vo5pWerZ__YxCtY56FNpcHMwYf9urWgXAJQyGfscYHxMbULHWIsDeg5XCImbVDEPCwNhnAFC1xNYFgDTRv4KBYk1lGhIhBi4Pez_FSe2stW1TrgJkEhZUjpZcpgdrnwOaIDJo-2fibASWue5TrVKAp0CiX5ahI1LePNwx8xkgPfEO5mMALLcQWo',
    description: 'Produk pelengkap branding berupa stiker segel kemasan dan planner digital untuk merencanakan konten promosi harian usaha.',
    price: 'Rp 75.000',
    features: ['Format stiker cutting die-cut', 'File resolusi tinggi siap cetak', 'Warna akurat CMYK', 'Termasuk elemen ilustrasi original']
  },
  {
    id: 'port-4',
    title: 'Landing Page Portfolio Produk Kerajinan Bambu',
    category: 'website',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5cY_8WSiYE8XLX9-TC1PN-9mihq_rEdAuIWhtvcYj7w3Jym37KSRruLnz0ZQY5zy1_DktUdT0RLTDQ4dIOGeKAvBWKyz6Fg4AS8M9VGl8uRkbhFz7qmqDNDpZ-CnVzYng1m39Wxi--hMoM4aMjONRhxBfdlgygDuhMZXzobuhZkCisfF6llXxrL9fOU48PhgyUNZx5V5gH-adc6HxffpgIWavNNpFCUnafc-d7HEDWlEQx3S8yVrTddmzqlMzQIOc0ib4Bxpxxe-W',
    description: 'Website satu halaman interaktif dan responsif untuk memamerkan katalog produk kerajinan bambu lokal Jogja ke pasar nasional.',
    price: 'Rp 450.000',
    features: ['Desain responsif HP & Desktop', 'Integrasi WhatsApp direct chat', 'SEO On-Page dasar', 'Hosting ringan & pemeliharaan mudah']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Tips Desain Poster yang Menjual untuk UMKM',
    category: 'Insights',
    date: '12 Jan 2026',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChKRPJn1gSFDrt1GQDzfiU4I3yCzTQVQeuNO8ytisTcKlK31yEv5K86cdWMKJBg3GC95w5q1ERJKHJLKU3w-6SojCl15IPwtoKItbHfym_OWSwde4Lc_X0Q39r2NUE_oZu-ti8_Zs_OibuoUCAcJYE-cSQuZwNsvFjQJC5rdU9maW6xzUq0FkX5WNlRsxq4L4CR7oinVYlFK6v9BDjMPShHM5UEvXrG_3JYGqBIWaiRdb9MTmRBmaZdMBZC44wnynC-oFH9TaZlB9Q',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAsZf4UPkmlE6_mXYyjLE0rRS6z3wyPwTyXyHBEx2fzb_1GTK9oiAbqHMYNp1BpaU32inyxnVzpmayXVCbCKB_1Vo5pWerZ__YxCtY56FNpcHMwYf9urWgXAJQyGfscYHxMbULHWIsDeg5XCImbVDEPCwNhnAFC1xNYFgDTRv4KBYk1lGhIhBi4Pez_FSe2stW1TrgJkEhZUjpZcpgdrnwOaIDJo-2fibASWue5TrVKAp0CiX5ahI1LePNwx8xkgPfEO5mMALLcQWo',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5cY_8WSiYE8XLX9-TC1PN-9mihq_rEdAuIWhtvcYj7w3Jym37KSRruLnz0ZQY5zy1_DktUdT0RLTDQ4dIOGeKAvBWKyz6Fg4AS8M9VGl8uRkbhFz7qmqDNDpZ-CnVzYng1m39Wxi--hMoM4aMjONRhxBfdlgygDuhMZXzobuhZkCisfF6llXxrL9fOU48PhgyUNZx5V5gH-adc6HxffpgIWavNNpFCUnafc-d7HEDWlEQx3S8yVrTddmzqlMzQIOc0ib4Bxpxxe-W',
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
  },
  {
    id: 'test-3',
    name: 'Budi Hartono',
    role: 'Pemilik "Kopi Janji Jogja"',
    content: 'Puas sekali dengan poster promosi Rupaka Studio! Harganya ramah kantong buat kami yang baru merintis usaha kopi, tapi desainnya terlihat sangat elegan seperti buatan agensi ternama.',
    rating: 5
  }
];
