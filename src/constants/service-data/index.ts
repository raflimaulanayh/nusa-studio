import { BarChart, Camera, Globe, Layout, Megaphone, Package, Palette, PenTool, Search, Share2, Video } from 'lucide-react'

export const SERVICES_DATA = [
  {
    icon: Camera,
    title: 'Product Photography',
    description: 'Stunning product visuals that captivate your audience and drive conversions.',
    index: '01'
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Complete branding solutions from logo design to brand guidelines.',
    index: '02'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies.',
    index: '03'
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that amplify your brand reach and engage effectively.',
    index: '04'
  }
]

export const SERVICES_MORE_DATA: Service[] = [
  {
    id: '01',
    title: 'Product Photography',
    slug: 'product-photography',
    icon: Camera,
    shortDescription: 'Stunning product visuals that captivate your audience and drive conversions.',
    fullDescription:
      'In the digital age, your product image is your storefront. We create high-end, commercially viable photography that highlights the quality, texture, and unique selling points of your products. From e-commerce white background shots to stylized creative compositions, we ensure your products look their absolute best.',
    features: [
      {
        title: 'Creative Direction',
        description: 'Concept development and mood boarding to ensure visual consistency with your brand identity.',
        icon: PenTool
      },
      {
        title: 'High-End Retouching',
        description: 'Meticulous post-production to ensure flawless lighting, color accuracy, and texture detail.',
        icon: Layout
      },
      {
        title: 'Styling & Set Design',
        description: 'Propping and set construction to creating immersive environments for your products.',
        icon: Package
      },
      {
        title: '360° Photography',
        description: 'Interactive product views that increase engagement and reduce return rates.',
        icon: Video
      }
    ],
    process: [
      { title: 'Discovery', description: 'We analyze your brand guidelines and product unique selling points.' },
      { title: 'Pre-production', description: 'Concepting, shot listing, and prop sourcing.' },
      { title: 'The Shoot', description: 'High-resolution capture using industry-leading equipment.' },
      { title: 'Post-production', description: 'Retouching, color grading, and delivery.' }
    ],
    tags: ['Photography', 'Creative Direction']
  },
  {
    id: '02',
    title: 'Brand Identity',
    slug: 'brand-identity',
    icon: Palette,
    shortDescription: 'Complete branding solutions from logo design to brand guidelines.',
    fullDescription:
      'Your brand is more than just a logo; it is the emotional connection you build with your audience. We craft comprehensive brand identities that tell your unique story, resonate with your target market, and stand the test of time. We build design systems that scale.',
    features: [
      {
        title: 'Logo Design',
        description: 'Memorable and versatile marks that serve as the cornerstone of your brand.',
        icon: PenTool
      },
      {
        title: 'Visual Strategy',
        description: 'Defining color palettes, typography, and imagery styles that evoke the right emotions.',
        icon: Layout
      },
      {
        title: 'Brand Guidelines',
        description: 'Comprehensive manuals ensuring consistency across all touchpoints.',
        icon: Search
      },
      {
        title: 'Packaging Design',
        description: 'Tactile brand experiences that stand out on the shelf.',
        icon: Package
      }
    ],
    process: [
      { title: 'Brand Audit', description: 'Analyzing current positioning and competitor landscape.' },
      { title: 'Strategy', description: 'Defining brand archetypes, values, and visual direction.' },
      { title: 'Design', description: 'Iterative design process exploring multiple concepts.' },
      { title: 'Implementation', description: 'Delivering final assets and style guides.' }
    ],
    tags: ['Branding', 'Visual Identity', 'Packaging']
  },
  {
    id: '03',
    title: 'Web Development',
    slug: 'web-development',
    icon: Globe,
    shortDescription: 'Modern, responsive websites built with cutting-edge technologies.',
    fullDescription:
      'We build digital experiences that perform. Using modern frameworks like Next.js and React, we create websites that are lighting fast, SEO-optimized, and visually stunning. We prioritize user experience (UX) and accessibility to insure your site works for everyone.',
    features: [
      {
        title: 'Frontend Development',
        description: 'Pixel-perfect implementation of designs using modern CSS and animations.',
        icon: Layout
      },
      {
        title: 'CMS Integration',
        description: 'Headless CMS solutions allowing you to easily manage your content.',
        icon: Layout
      },
      {
        title: 'E-commerce',
        description: 'Custom shopping experiences that drive sales and retain customers.',
        icon: Package
      },
      {
        title: 'Performance Tuning',
        description: 'Optimization for Core Web Vitals to ensure top search rankings.',
        icon: BarChart
      }
    ],
    process: [
      { title: 'Architecture', description: 'Tech stack selection and database schema design.' },
      { title: 'Development', description: 'Agile sprints with regular preview deployments.' },
      { title: 'Testing', description: 'QA, cross-browser testing, and performance auditing.' },
      { title: 'Launch', description: 'Smooth deployment and CI/CD setup.' }
    ],
    tags: ['Web Development', 'UI/UX', 'SEO']
  },
  {
    id: '04',
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: Megaphone,
    shortDescription: 'Strategic campaigns that amplify your brand reach and engage effectively.',
    fullDescription:
      'Great products need to be seen. Our data-driven marketing strategies ensure your message reaches the right people at the right time. We combine creativity with analytics to maximize ROI and foster community around your brand.',
    features: [
      {
        title: 'Social Media Management',
        description: 'Content creation and community engagement across all platforms.',
        icon: Share2
      },
      {
        title: 'SEO',
        description: 'On-page and off-page optimization to dominate search results.',
        icon: Search
      },
      {
        title: 'Content Strategy',
        description: 'Planning and creation of valuable content that attracts leads.',
        icon: PenTool
      },
      {
        title: 'Paid Advertising',
        description: 'Targeted ad campaigns on Google, Meta, and LinkedIn.',
        icon: BarChart
      }
    ],
    process: [
      { title: 'Research', description: 'Audience analysis and keyword research.' },
      { title: 'Strategy', description: 'Channel selection and campaign planning.' },
      { title: 'Execution', description: 'Content production and ad management.' },
      { title: 'Optimization', description: 'A/B testing and performance reporting.' }
    ],
    tags: ['Marketing', 'Social Media', 'Content']
  },
  {
    id: '05',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: Layout,
    shortDescription: 'User-centric interfaces that are intuitive, engaging, and beautiful.',
    fullDescription:
      'We design digital products that people love to use. Connecting business goals with user needs, we create seamless interfaces for web and mobile applications. Our process is rooted in empathy and data.',
    features: [
      {
        title: 'User Research',
        description: 'Understanding your users through interviews, surveys, and persona building.',
        icon: Search
      },
      {
        title: 'Wireframing',
        description: 'Low-fidelity blueprints to establish structure and user flow.',
        icon: PenTool
      },
      {
        title: 'Prototyping',
        description: 'Interactive high-fidelity prototypes for testing and stakeholder validation.',
        icon: Layout
      },
      {
        title: 'Design Systems',
        description: 'Scalable component libraries for consistent UI across products.',
        icon: Package
      }
    ],
    process: [
      { title: 'Empathize', description: 'Deep dive into user needs and pain points.' },
      { title: 'Define', description: 'Establishing clear problem statements and goals.' },
      { title: 'Ideate', description: 'Brainstorming and sketching solutions.' },
      { title: 'Prototype', description: 'Creating testable artifacts.' },
      { title: 'Test', description: 'Validating with real users.' }
    ],
    tags: ['UI/UX', 'Product Design', 'Research']
  }
]

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
