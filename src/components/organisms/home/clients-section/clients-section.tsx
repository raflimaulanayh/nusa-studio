'use client'

import { CLIENTS_DATA } from '@/constants/client-data'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { Heading, Text } from '@/components/atoms/typography'
import { Container } from '@/components/templates/container'

export const ClientsSection = () => {
  const CLIENTS_DOUBLED = [...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA]

  return (
    <section className="overflow-hidden bg-gray-50 py-24">
      <Container>
        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Text size="sm" weight="semibold" variant="secondary" className="mb-3 tracking-widest uppercase">
              Trusted By
            </Text>
            <Heading as="h2" variant="primary" className="text-3xl font-semibold lg:text-4xl">
              Brands We&apos;ve Worked With
            </Heading>
          </motion.div>
        </header>
      </Container>

      <div className="flex flex-col gap-0">
        <div className="relative flex overflow-visible">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-32 bg-linear-to-r from-[#F9F9FB] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-32 bg-linear-to-l from-[#F9F9FB] to-transparent" />

          <motion.div
            animate={{ x: [0, -100 * CLIENTS_DATA.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 40,
                ease: 'linear'
              }
            }}
            className="flex shrink-0 gap-6 px-3 py-2"
          >
            {CLIENTS_DOUBLED.slice(0, 10).map((client, index) => (
              <figure
                key={`${client.name}-${index}-row1`}
                className="group relative flex shrink-0 cursor-pointer items-center justify-center px-8 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={48}
                  className="h-12 w-auto max-w-40 object-contain opacity-50 grayscale filter transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.parentElement?.classList.add(
                      'after:content-[attr(data-alt)]',
                      'after:text-gray-400',
                      'after:font-semibold'
                    )
                  }}
                  data-alt={client.name}
                />
                <figcaption className="absolute inset-0 hidden items-center justify-center font-semibold text-gray-400 opacity-50 transition-all group-hover:opacity-100">
                  {client.name}
                </figcaption>
              </figure>
            ))}

            {CLIENTS_DOUBLED.slice(0, 10).map((client, index) => (
              <figure
                key={`${client.name}-${index}-row1-dup`}
                className="group relative flex shrink-0 cursor-pointer items-center justify-center px-8 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={48}
                  className="h-12 w-auto object-contain opacity-50 grayscale filter transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const span = e.currentTarget.nextElementSibling
                    if (span) span.classList.remove('hidden')
                  }}
                />
                <figcaption className="absolute inset-0 hidden items-center justify-center px-4 text-center font-semibold text-gray-400 opacity-50 transition-all group-hover:opacity-100">
                  {client.name}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
