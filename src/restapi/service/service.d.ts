interface Service {
  id: string
  title: string
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
