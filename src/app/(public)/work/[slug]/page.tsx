import { PROJECTS } from '@/data/projects'
import { notFound } from 'next/navigation'
import React from 'react'

import { ProjectDetailView } from '@/components/templates/project-detail-view'

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id)
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length]

  return <ProjectDetailView project={project} nextProject={nextProject} />
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug
  }))
}
