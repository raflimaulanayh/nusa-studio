import { SERVICES_MORE_DATA } from '@/constants/service-data'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CtaSection, PricingSection } from '@/components/organisms/home'
import { ServiceDetail } from '@/components/organisms/service'
import { GeneralLayout } from '@/components/templates/general-layout'

export async function generateStaticParams() {
  return SERVICES_MORE_DATA.map((service) => ({
    slug: service.slug
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_MORE_DATA.find((s) => s.slug === slug)

  if (!service) {
    return {
      title: 'Service Not Found'
    }
  }

  return {
    title: `${service.title} | Nusacaraka Studio`,
    description: service.shortDescription
  }
}

const PRICING_MAP: Record<string, string> = {
  'product-photography': 'content-production',
  'brand-identity': 'branding-identity',
  'web-development': 'web-development',
  'digital-marketing': 'social-media'
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES_MORE_DATA.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }
  const pricingId = PRICING_MAP[slug]

  return (
    <GeneralLayout className="min-h-screen bg-background pt-32 pb-20">
      <ServiceDetail slug={slug} />
      {pricingId && (
        <PricingSection
          filterId={pricingId}
          title="Service Packages"
          subtitle="Transparent pricing options tailored for this service."
        />
      )}
      <CtaSection />
    </GeneralLayout>
  )
}
