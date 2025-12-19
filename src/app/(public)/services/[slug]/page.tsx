import { SERVICES_DATA } from '@/data/services'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GeneralLayout } from '@/components/templates/general-layout'
import { ServiceDetailView } from '@/components/templates/service-detail-view'

// Force static generation for these paths
export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_DATA.find((s) => s.slug === slug)

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

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES_DATA.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <GeneralLayout>
      <ServiceDetailView slug={slug} />
    </GeneralLayout>
  )
}
