import { siteMetadata } from '@/constants/site-metadata'
import { Metadata } from 'next'

import {
  HeroSection,
  FeaturedWorks,
  AboutSection,
  ServicesSection,
  ClientsSection,
  CtaSection,
  TestimonialSection,
  PricingSection
} from '@/components/organisms/home'
import { GeneralLayout } from '@/components/templates/general-layout'

export const metadata: Metadata = {
  title: siteMetadata.name,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.name,
    description: siteMetadata.description,
    type: 'website'
  }
}

export default function LandingPage() {
  return (
    <GeneralLayout>
      <HeroSection />
      <ClientsSection />
      <AboutSection />
      <FeaturedWorks />
      <ServicesSection />
      <PricingSection />
      <TestimonialSection />
      <CtaSection />
    </GeneralLayout>
  )
}
