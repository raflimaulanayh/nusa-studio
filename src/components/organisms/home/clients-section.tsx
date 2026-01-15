'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Heading, Text } from '@/components/atoms/typography'
import { Container } from '@/components/templates/container'

const CLIENTS = [
  {
    name: 'Gojek',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Gojek_logo_2022.svg/330px-Gojek_logo_2022.svg.png'
  },
  { name: 'Tokopedia', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Tokopedia.svg' },
  {
    name: 'Traveloka',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/a/a2/Traveloka_logo.svg/500px-Traveloka_logo.svg.png'
  },
  { name: 'Nestle', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Nestl%C3%A9_textlogo.svg' },
  { name: 'Unilever', logo: 'https://upload.wikimedia.org/wikipedia/id/3/37/Unilever.png' },
  {
    name: 'Bukalapak',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bukalapak_%282020%29.svg/500px-Bukalapak_%282020%29.svg.png'
  },
  { name: 'BCA', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg' },
  {
    name: 'Telkomsel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Telkomsel_%282021%29.svg/500px-Telkomsel_%282021%29.svg.png'
  },
  {
    name: 'Indosat',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Indosat_Ooredoo_Hutchison.svg/500px-Indosat_Ooredoo_Hutchison.svg.png'
  },
  {
    name: 'Pertamina',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pertamina_Logo.svg/330px-Pertamina_Logo.svg.png'
  },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg' },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Samsung_Black_icon.svg/960px-Samsung_Black_icon.svg.png'
  }
]

const CLIENTS_DOUBLED = [...CLIENTS, ...CLIENTS, ...CLIENTS]

export const ClientsSection = () => {
  return (
    <section className="overflow-hidden bg-[#F9F9FB] py-24">
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
            <Heading as="h3" variant="primary" className="text-3xl font-semibold lg:text-4xl">
              Brands We&apos;ve Worked With
            </Heading>
          </motion.div>
        </header>
      </Container>

      <div className="flex flex-col gap-0">
        <div className="relative flex overflow-visible">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-32 bg-gradient-to-r from-[#F9F9FB] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-32 bg-gradient-to-l from-[#F9F9FB] to-transparent" />

          <motion.div
            animate={{ x: [0, -100 * CLIENTS.length] }}
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
              <div
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
                <span className="absolute inset-0 flex hidden items-center justify-center font-semibold text-gray-400 opacity-50 transition-all group-hover:opacity-100">
                  {client.name}
                </span>
              </div>
            ))}
            {CLIENTS_DOUBLED.slice(0, 10).map((client, index) => (
              <div
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
                <span className="absolute inset-0 hidden items-center justify-center px-4 text-center font-semibold text-gray-400 opacity-50 transition-all group-hover:opacity-100">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
