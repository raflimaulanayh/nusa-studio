export interface Project {
  id: number
  title: string
  category: string
  image: string
  slug: string
  description: string
  challenge: string
  solution: string
  client: string
  year: string
  tags: string[]
  gallery: string[]
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Nusa Coffee Rebrand',
    category: 'Visual Branding',
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1200&h=800&fit=crop',
    slug: 'nusa-coffee-rebrand',
    description: 'Complete visual identity overhaul for a premium local coffee chain, focusing on heritage and modernity.',
    challenge:
      'Nusa Coffee needed to transition from a traditional local warung image to a premium coffee lifestyle brand without alienating their loyal customer base. The key was to balance authentic Indonesian heritage with modern aesthetics.',
    solution:
      'We developed a visual identity centered around the "Batik Parang" motif intertwined with coffee bean elements. The color palette uses earthy tones (Terracotta and Espresso) combined with a modern minimalist typeface to create a sophisticated yet grounded look.',
    client: 'Nusa Coffee',
    year: '2024',
    tags: ['Branding', 'Packaging', 'Logo Design'],
    gallery: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop'
    ],
    featured: true
  },
  {
    id: 2,
    title: 'TechVision Corp Website',
    category: 'Website & SEO',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
    slug: 'techvision-corp-website',
    description: 'High-performance corporate website with advanced SEO optimization and custom animations.',
    challenge:
      'TechVision needed a website that could handle high traffic and communicate complex technical solutions simply. Their old site was slow and had poor SEO ranking.',
    solution:
      'We built a headless solution using Next.js for blazing fast performance. We implemented varied micro-interactions to explain their tech stack visually and structured the content for maximum SEO impact, resulting in a 200% traffic increase.',
    client: 'TechVision Corp',
    year: '2023',
    tags: ['Web Development', 'UI/UX', 'SEO'],
    gallery: [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    ],
    featured: true
  },
  {
    id: 3,
    title: 'EcoLife Product Launch',
    category: 'Content Production',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=800&fit=crop',
    slug: 'ecolife-product-launch',
    description: 'End-to-end commercial photography and video campaign for a new line of sustainable products.',
    challenge:
      'EcoLife was launching a new bamboo toothbrush line and needed assets that felt organic, premium, and clean, steering away from the typical "hippie" sustainability tropes.',
    solution:
      'We shot a series of high-key, minimalist product photos and a 30-second lifestyle commercial. The lighting was kept soft and natural, emphasizing the texture of the bamboo and the purity of the design.',
    client: 'EcoLife',
    year: '2023',
    tags: ['Photography', 'Videography', 'Creative Direction'],
    gallery: [
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=800&h=600&fit=crop'
    ],
    featured: true
  },
  {
    id: 4,
    title: 'Urban Bites Social Media',
    category: 'Social Media Management',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&h=800&fit=crop',
    slug: 'urban-bites-social',
    description: 'Monthly social media management focusing on engagement and community building.',
    challenge:
      'Urban Bites had delicious food but zero online presence. They struggled to reach the younger demographic in their area.',
    solution:
      'We executed a "Foodie Lifestyle" strategy, posting daily reels, hosting giveaways, and collaborating with local micro-influencers. Engagement rates skyrocketed by 400% in 3 months.',
    client: 'Urban Bites',
    year: '2024',
    tags: ['Content Strategy', 'Community Management', 'Reels'],
    gallery: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop'
    ],
    featured: false
  },
  {
    id: 5,
    title: 'Azure Bay Resorts',
    category: 'Content Production',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop',
    slug: 'azure-bay-resorts',
    description: 'High-end drone photography and video tour for a luxury resort property.',
    challenge:
      'The resort wanted to showcase their secluded location and luxury amenities. Traditional ground-level photography failed to capture the scale and exclusivity of the location.',
    solution:
      'We utilized 4K drone videography to create a breathtaking flyover tour, smoothly transitioning from the ocean view to the private villas. This immersive experience increased booking inquiries by 40%.',
    client: 'Azure Bay Resorts',
    year: '2023',
    tags: ['Drone', 'Real Estate', 'Video Production'],
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop'
    ],
    featured: false
  },
  {
    id: 6,
    title: 'Bloom & Wild SEO Strategy',
    category: 'Website & SEO',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=1200&h=800&fit=crop',
    slug: 'bloom-and-wild-seo',
    description: 'Comprehensive SEO audit and content strategy to improve organic search visibility.',
    challenge:
      'Bloom & Wild had a beautiful website but low organic traffic. They were ranking on page 3 or 4 for their target keywords.',
    solution:
      'We conducted a deep SEO audit, optimized on-page metadata, and developed a content pillars strategy. Within 6 months, they reached the #1 spot for 5 major keywords and organic traffic tripled.',
    client: 'Bloom & Wild',
    year: '2024',
    tags: ['SEO', 'Content Marketing', 'Analytics'],
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop'
    ],
    featured: false
  }
]
