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
  title: 'Nusacaraka Studio | Digital Experience Platform',
  description:
    'Transform your digital presence with creative solutions that captivate, engage, and convert. We craft experiences that leave lasting impressions.',
  keywords: ['creative agency', 'digital marketing', 'branding', 'web development', 'UI/UX design'],
  openGraph: {
    title: 'Nusacaraka Studio | Digital Experience Platform',
    description: 'Transform your digital presence with creative solutions that captivate, engage, and convert.',
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
