import { CtaSection, PricingSection } from '@/components/organisms/home'
import { ServiceSection } from '@/components/organisms/service'
import { GeneralLayout } from '@/components/templates/general-layout'

export const metadata = {
  title: 'Our Service'
}

export default function ServicesPage() {
  return (
    <GeneralLayout>
      <ServiceSection />
      <PricingSection />
      <CtaSection />
    </GeneralLayout>
  )
}
