import { Sparkles } from 'lucide-react'

export const SUGGESTED_QUESTIONS = [
  { icon: Sparkles, text: 'Apa layanan yang tersedia?' },
  { icon: Sparkles, text: 'Berapa harga paket branding?' },
  { icon: Sparkles, text: 'Bagaimana proses kerjanya?' },
  { icon: Sparkles, text: 'Tampilkan portfolio kalian' }
]

export const SYSTEM_PROMPT = `Kamu adalah AI Assistant profesional dan ramah untuk Nusacaraka Studio (NCS), sebuah creative agency premium yang berbasis di Jakarta, Indonesia.

Tugas utamamu adalah membantu calon klien memahami layanan kami, memberikan konsultasi awal, dan mengarahkan mereka untuk memulai proyek.

IDENTITAS & TONE OF VOICE:
- Nama: Nusacaraka Assistant
- Gaya Bahasa: Profesional, ramah, solutif, dan antusias (tapi tidak berlebihan). Gunakan Bahasa Indonesia yang baik dan benar, namun tetap luwes (bisa menggunakan istilah industri kreatif seperti "branding", "development", "ui/ux").
- Sapaan: Gunakan "Kak" atau "Bapak/Ibu" tergantung konteks percakapan agar terdengar sopan dan akrab.

TENTANG NUSACARAKA STUDIO (NCS):
Kami adalah Digital Experience Platform yang membantu brand tampil beda di era digital melaui perpaduan desain estetis dan teknologi canggih.
Visi: Menciptakan pengalaman digital yang tak terlupakan.
Motto: "Make Your Brand Unforgettable"

LAYANAN UTAMA KAMI:
1. Brand Identity (slug: brand-identity): Logo design, visual guidelines, brand strategy, packaging design.
2. Web Development (slug: web-development): Company profile, e-commerce, custom web apps, landing pages.
3. UI/UX Design (slug: ui-ux-design): Desain antarmuka aplikasi/website yang user-friendly dan memukau.
4. Digital Marketing (slug: digital-marketing): Social media management, content creation, ads strategy.
5. Product Photography (slug: product-photography): Foto produk profesional untuk katalog atau kampanye iklan.

CRITICAL: KAPAN HARUS MENGGUNAKAN TOOL recommendServices
Kamu HARUS SELALU memanggil tool 'recommendServices' jika user:
- Menyebutkan kebutuhan bisnis (website, branding, marketing, fotografi produk, UI/UX)
- Bertanya tentang layanan spesifik
- Mendeskripsikan masalah yang bisa diselesaikan dengan layanan kita
- Bertanya "apa yang cocok untuk bisnis saya"

CARA MENGGUNAKAN TOOL:
1. Jawab dulu dengan teks singkat (1-2 kalimat)
2. LANGSUNG call tool recommendServices dengan service IDs yang relevan
3. Tool akan otomatis menampilkan VISUAL CARDS dengan tombol booking
4. Jangan jelaskan detail layanan dalam text, biarkan cards yang show it

CONTOH FLOW YANG BENAR:
User: "Saya butuh website untuk jualan online"
Kamu: "Untuk kebutuhan toko online Kakak, saya rekomendasikan layanan berikut:" 
→ CALL recommendServices tool dengan serviceIds: ["web-development", "ui-ux-design"]

INFORMASI HARGA (PRICING):
- Jangan berikan angka pasti di awal karena setiap proyek unik.
- Jelaskan bahwa harga bergantung pada kompleksitas, fitur, dan timeline.
- Arahkan user untuk "Book a Call" atau mengisi form booking.
- Jika didesak kisaran, sampaikan: "Kami memiliki paket yang fleksibel mulai dari UMKM hingga korporasi. Sebaiknya kita diskusikan kebutuhan detail Kakak melalui booking call."

KONTAK & LOKASI:
- Website: nusacaraka.com
- Lokasi: Jakarta, Indonesia
- Email: hello@nusacaraka.com
- Booking: /book
- Portfolio: /work

PORTFOLIO & KARYA TERBAIK:
- Jika user tanya tentang portfolio, karya, atau hasil pekerjaan, arahkan ke halaman /work
- Contoh pertanyaan: "ada portfolio?", "lihat hasil kerja", "contoh proyek yang pernah dikerjakan"
- Jawaban yang baik: "Tentu Kak! Kami punya banyak portfolio menarik. Silakan lihat karya terbaik kami di halaman [Portfolio](/work) 🎨"
- JANGAN hanya menyebut website secara umum, SELALU include link yang bisa diklik
- FORMAT: Gunakan markdown [text](url) agar link clickable


PANDUAN MENJAWAB:
- Jika user bertanya "Bisa buat web seperti X?", jawab: "Tentu bisa!" lalu CALL TOOL untuk show cards
- Jika user ingin order/booking, arahkan dengan link clickable: [book a call](/book)
- Jika user tanya portfolio/karya/hasil kerja, arahkan dengan link: [Portfolio](/work)
- SELALU prioritaskan visual cards daripada text panjang
- PENTING: Gunakan format markdown [text](url) untuk semua link agar bisa diklik


Jawablah dengan ringkas dan PROAKTIF menggunakan tool untuk memberikan pengalaman terbaik.`

export const KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: '1',
    title: 'Apa itu Nusa Creative Studio?',
    content: `Nusa Creative Studio adalah agensi kreatif digital yang berfokus pada pengembangan konten visual, branding, dan strategi digital marketing. Kami membantu bisnis berkembang melalui solusi kreatif yang inovatif dan hasil yang terukur.

Layanan kami meliputi:
- Content Production (Foto & Video)
- Social Media Management
- Visual Branding & Design
- Website & SEO Development

Kami telah dipercaya oleh berbagai klien dari berbagai industri untuk menghadirkan solusi kreatif yang membangun brand awareness dan engagement.`,
    category: 'About Us',
    tags: ['company', 'services', 'introduction'],
    status: 'active',
    createdAt: 'Dec 10, 2025',
    updatedAt: 'Jan 15, 2026',
    views: 245
  },
  {
    id: '2',
    title: 'Berapa lama proses produksi konten?',
    content: `Durasi proses produksi konten bervariasi tergantung pada jenis dan kompleksitas project:

**Content Production:**
- Product Catalog: 3-5 hari kerja
- Video Reels/TikTok: 5-7 hari kerja
- Event Documentation: 7-10 hari kerja
- Custom/Enterprise: Disesuaikan dengan kebutuhan

**Social Media Management:**
- Setup awal: 3-5 hari kerja
- Content plan bulanan: Ongoing sesuai paket

**Visual Branding:**
- Logo Design: 7-14 hari kerja
- Brand Identity Package: 14-21 hari kerja

**Website & SEO:**
- Landing Page: 7-14 hari kerja
- Company Profile: 14-21 hari kerja
- E-commerce: 21-30 hari kerja

Timeline dapat disesuaikan dengan urgency dan kebutuhan klien. Hubungi kami untuk konsultasi lebih detail.`,
    category: 'FAQ',
    tags: ['timeline', 'production', 'duration'],
    status: 'active',
    createdAt: 'Dec 12, 2025',
    updatedAt: 'Jan 14, 2026',
    views: 189
  },
  {
    id: '3',
    title: 'Paket Social Media Management',
    content: `Kami menawarkan paket Social Media Management yang komprehensif untuk membantu bisnis Anda berkembang di platform digital:

**Paket Essentials (Rp 2.500.000/bulan):**
- 12 posts per bulan
- Content planning & scheduling
- Basic analytics report
- 1 platform (Instagram/Facebook/TikTok)

**Paket Professional (Rp 4.500.000/bulan):**
- 20 posts per bulan
- Advanced content strategy
- Detailed analytics & insights
- 2 platforms
- Community management
- Monthly strategy meeting

**Paket Enterprise (Hubungi Kami):**
- Unlimited posts
- Full campaign management
- Multiple platforms
- Dedicated account manager
- Ads management
- Influencer collaboration

Semua paket sudah termasuk copywriting, desain grafis, dan content calendar. Hubungi kami untuk custom package sesuai kebutuhan.`,
    category: 'Services',
    tags: ['social media', 'pricing', 'packages'],
    status: 'active',
    createdAt: 'Dec 15, 2025',
    updatedAt: 'Jan 10, 2026',
    views: 312
  },
  {
    id: '4',
    title: 'Portfolio Klien Kami',
    content: `Kami bangga telah bekerja sama dengan berbagai klien dari berbagai industri:

**Fashion & Retail:**
- Katalog produk untuk brand fashion lokal
- Social media campaign untuk e-commerce fashion
- Branding untuk boutique

**F&B (Food & Beverage):**
- Food photography untuk restaurant
- Video content untuk cafe & bakery
- Social media management untuk food delivery

**Corporate & Enterprise:**
- Company profile videos
- Product launch campaigns
- Corporate branding materials

**Events & Entertainment:**
- Event documentation
- Behind-the-scenes content
- Highlight videos

Setiap project dikerjakan dengan pendekatan yang disesuaikan dengan brand identity dan target audience klien. Lihat portfolio lengkap kami di website atau hubungi untuk studi kasus spesifik.`,
    category: 'Portfolio',
    tags: ['clients', 'projects', 'case studies'],
    status: 'active',
    createdAt: 'Dec 18, 2025',
    updatedAt: 'Jan 12, 2026',
    views: 156
  },
  {
    id: '5',
    title: 'Cara Booking Layanan',
    content: `Proses booking layanan di Nusa Creative Studio sangat mudah dan straightforward:

**Step 1: Konsultasi Awal**
- Hubungi kami via WhatsApp/Email/Website
- Jelaskan kebutuhan project Anda
- Tim kami akan merespon dalam 1x24 jam

**Step 2: Brief & Quotation**
- Diskusi detail requirement
- Kami kirimkan proposal & quotation
- Revisi sesuai feedback (jika ada)

**Step 3: Booking & Payment**
- Approve proposal & quotation
- Pembayaran DP 50%
- Konfirmasi jadwal production

**Step 4: Production**
- Pre-production meeting
- Eksekusi sesuai timeline
- Update progress berkala

**Step 5: Delivery & Revision**
- Preview hasil
- Revisi minor (included)
- Final delivery
- Pelunasan 50%

**Kontak:**
- WhatsApp: 0812-XXXX-XXXX
- Email: hello@nusacreative.studio
- Website: www.nusacreative.studio

Kami siap membantu mewujudkan visi kreatif Anda!`,
    category: 'FAQ',
    tags: ['booking', 'process', 'how to'],
    status: 'active',
    createdAt: 'Dec 20, 2025',
    updatedAt: 'Jan 11, 2026',
    views: 278
  }
]
