interface Service {
  id: string
  title: string
  description?: string
  slug: string
  icon: LucideIcon
  shortDescription: string
  fullDescription: string
  features: { title: string; description: string; icon: LucideIcon }[]
  process: {
    title: string
    description: string
  }[]
  tags: string[]
}

interface PricingTier {
  name: string
  price: string
  features: string[]
  highlight?: boolean
}

interface ServicePackage {
  id: string
  title: string
  description: string
  icon: string
  tiers: {
    name: string
    price: string
    features: string[]
    highlight?: boolean
  }[]
}
