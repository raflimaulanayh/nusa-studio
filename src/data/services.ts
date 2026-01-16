import {
  BarChart,
  Camera,
  Globe,
  Layout,
  LucideIcon,
  Megaphone,
  Package,
  Palette,
  PenTool,
  Search,
  Share2,
  Video
} from 'lucide-react'

export interface ServiceProcess {
  title: string
  description: string
}

export interface Service {
  id: string
  title: string
  slug: string
  icon: LucideIcon
  shortDescription: string
  fullDescription: string
  features: { title: string; description: string; icon: LucideIcon }[]
  process: ServiceProcess[]
  tags: string[] // For project filtering
}

export const SERVICES_DATA: Service[] = [
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
