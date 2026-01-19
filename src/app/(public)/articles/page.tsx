import { ArticleSection } from '@/components/organisms/article'
import { CtaSection } from '@/components/organisms/home'
import { GeneralLayout } from '@/components/templates/general-layout'

export const metadata = {
  title: 'Article'
}

export default function ArticlesPage() {
  return (
    <GeneralLayout className="min-h-screen bg-background pt-32 pb-20">
      <ArticleSection />
      <CtaSection />
    </GeneralLayout>
  )
}
