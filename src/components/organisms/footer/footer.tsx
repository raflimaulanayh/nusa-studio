'use client'

import { MENU } from '@/constants/menu'
import { motion } from 'framer-motion'
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Text } from '@/components/atoms/typography'

const SERVICES = [
  { label: 'Branding', url: '/services/branding' },
  { label: 'Web Development', url: '/services/web-development' },
  { label: 'Digital Marketing', url: '/services/digital-marketing' },
  { label: 'UI/UX Design', url: '/services/ui-ux-design' }
]

const SOCIAL_LINKS = [
  { icon: Instagram, url: 'https://instagram.com/nusacaraka', label: 'Instagram' },
  { icon: Twitter, url: 'https://twitter.com/nusacaraka', label: 'Twitter' },
  { icon: Linkedin, url: 'https://linkedin.com/company/nusacaraka', label: 'LinkedIn' }
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-slate-50 text-primary">
      <div className="relative container mx-auto px-4 pt-16 pb-8 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <Image src="/logo.png" alt="Nusacaraka" width={160} height={40} className="w-40 object-contain" />
            </Link>
            <Text variant="default" size="sm" className="mb-6 leading-relaxed opacity-70">
              Digital Experience Platform yang membantu brand Anda berkembang di era digital.
            </Text>

            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary/70 transition-colors duration-300 hover:bg-secondary hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {MENU.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Services</h4>
            <ul className="space-y-3">
              {SERVICES.map((item) => (
                <li key={item.url}>
                  <Link
                    href={item.url}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">Contact Us</h4>
            <address className="not-italic">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-secondary" />
                  <Text size="sm" variant="default" className="opacity-70">
                    Jakarta, Indonesia
                  </Text>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="shrink-0 text-secondary" />
                  <a
                    href="mailto:hello@nusacaraka.com"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    hello@nusacaraka.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="shrink-0 text-secondary" />
                  <a
                    href="tel:+62812345678"
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    +62 812 345 678
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Text size="sm" variant="default" className="opacity-50">
              © {currentYear} Nusacaraka Studio. All rights reserved.
            </Text>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
