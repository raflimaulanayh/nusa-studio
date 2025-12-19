export interface PricingTier {
  name: string
  price: string
  features: string[]
  highlight?: boolean
}

export interface ServicePackage {
  id: string
  title: string
  description: string
  icon: string
  tiers: PricingTier[]
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'content-production',
    title: 'Content Production',
    description: 'Dokumentasi visual profesional untuk produk atau kegiatan. Foto, video, dan editing siap post.',
    icon: 'Camera',
    tiers: [
      {
        name: 'Product Catalog',
        price: 'Rp 1.500.000',
        features: ['10 Foto Produk (High-Res)', 'Editing & Retouching', 'Polos / Basic Props', 'File Mentah & Siap Post']
      },
      {
        name: 'Video Reels/TikTok',
        price: 'Rp 3.500.000',
        features: [
          'Shoot 1 Hari (Max 4 Jam)',
          'Editing Video Pendek (3 Reels)',
          'Script & Konsep Sederhana',
          'Musik Bebas Royalti'
        ],
        highlight: true
      },
      {
        name: 'Event Documentation',
        price: 'Rp 5.000.000',
        features: [
          '1 Videographer + 1 Photographer',
          'Video Highlight Acara (1-3 Menit)',
          'Foto Dokumentasi Lengkap',
          'Editing Cinematic'
        ]
      },
      {
        name: 'Custom / Enterprise',
        price: 'Hubungi Kami',
        features: [
          'Kebutuhan Spesifik Skala Besar',
          'Produksi Iklan TV (TVC)',
          'Kontrak Jangka Panjang',
          'Tim Produksi Lengkap (Sutradara, Art Director, dll)'
        ]
      }
    ]
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    description: 'Kami kelola akun sosmed Anda. Mulai dari ide konten, desain, caption, sampai posting.',
    icon: 'Smartphone',
    tiers: [
      {
        name: 'Starter',
        price: 'Rp 3.000.000/bln',
        features: ['12 Konten Feed (Gambar)', 'Caption & Hashtag', 'Admin Posting', 'Laporan Bulanan']
      },
      {
        name: 'Business',
        price: 'Rp 6.000.000/bln',
        features: [
          '15 Konten Feed (Gambar)',
          '4 Video Reels (Edit dari materi klien)',
          'Caption, Hashtag & Scheduling',
          'Admin Balas Komen/DM (Jam Kerja)',
          'Analisa & Laporan Bulanan'
        ],
        highlight: true
      },
      {
        name: 'Enterprise Partner',
        price: 'Hubungi Kami',
        features: [
          'Strategi Kampanye Viral',
          'Manajemen Multi-Platform (IG, TikTok, LinkedIn)',
          'Kolaborasi Influencer/KOL',
          'Dedicated Social Media Officer',
          'Budget Iklan (Ads) Managed'
        ]
      }
    ]
  },
  {
    id: 'branding-identity',
    title: 'Visual Branding',
    description: 'Bikin logo dan identitas visual biar bisnis atau kampanye kampus makin dikenal.',
    icon: 'PenTool',
    tiers: [
      {
        name: 'Logo Basic',
        price: 'Rp 2.500.000',
        features: ['2 Alternatif Desain Logo', 'Filosofi Logo', 'File Master (AI, EPS, PNG)', 'Panduan Warna']
      },
      {
        name: 'Full Identity',
        price: 'Rp 7.000.000',
        features: [
          'Desain Logo Lengkap',
          'Supergraphic / Pattern',
          'Kartu Nama & Kop Surat',
          'Template Presentasi (PPT)',
          'Social Media Template'
        ],
        highlight: true
      },
      {
        name: 'Corporate Rebranding',
        price: 'Hubungi Kami',
        features: [
          'Audit Brand Menyeluruh',
          'Strategi Brand Positioning',
          'Brand Guidelines Book (Cetak & Digital)',
          'Implementasi Aset di Berbagai Media',
          'Konsultasi Jangka Panjang'
        ]
      }
    ]
  },
  {
    id: 'web-development',
    title: 'Website & SEO',
    description: 'Bangun kehadiran digital yang profesional, cepat, dan mudah ditemukan di Google.',
    icon: 'Monitor',
    tiers: [
      {
        name: 'Landing Page',
        price: 'Rp 5.000.000',
        features: [
          'One-Page Website (Scrolling)',
          'Desain Responsif (HP & Laptop)',
          'Optimasi Kecepatan (Fast Loading)',
          'Integrasi WhatsApp & Sosmed',
          'Basic SEO Setup'
        ]
      },
      {
        name: 'Company Profile',
        price: 'Rp 10.000.000',
        features: [
          'Multi-page (Home, About, Services, Contact)',
          'CMS (Admin Panel untuk Update Konten)',
          'Blog / Artikel Section',
          'Advanced SEO (On-Page Optimization)',
          'Analytics & Google Search Console'
        ],
        highlight: true
      },
      {
        name: 'Custom Web App',
        price: 'Hubungi Kami',
        features: [
          'Fitur Khusus (E-commerce, Booking System, dll)',
          'Integrasi API Pihak Ketiga',
          'Desain UI/UX Eksklusif & Animasi',
          'Maintenance & Security Support',
          'Server & Database Setup'
        ]
      }
    ]
  }
]
