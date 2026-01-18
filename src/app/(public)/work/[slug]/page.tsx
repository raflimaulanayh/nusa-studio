import { PROJECTS_DATA } from '@/constants/project-data'
import { notFound } from 'next/navigation'

import { WorkDetail } from '@/components/organisms/work'

export const metadata = {
  title: 'Detail Work'
}

const PROJECTS = PROJECTS_DATA

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id)
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return <WorkDetail project={project} nextProject={nextProject} />
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug
  }))
}
