interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: {
    name: string
    role: string
    image: string
  }
  image: string
  category: string
  readTime: string
}
