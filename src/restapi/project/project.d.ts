interface Project {
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
