import { CtaSection } from '@/components/organisms/home'
import { WorkSection } from '@/components/organisms/work'
import { GeneralLayout } from '@/components/templates/general-layout'

export const metadata = {
  title: 'Our Work'
}

export default function WorkPage() {
  return (
    <GeneralLayout>
      <WorkSection />
      <CtaSection />
    </GeneralLayout>
  )
}
