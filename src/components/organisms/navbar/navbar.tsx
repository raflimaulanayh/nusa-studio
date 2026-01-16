'use client'

import { MENU } from '@/constants/menu'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useScrolling } from '@/hooks/useScrolling'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

import { cn } from '@/utils/cn'

const menuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const
    }
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const
    }
  }
}

const menuItemVariants = {
  closed: { opacity: 0, y: 20 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut' as const
    }
  })
}

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const scrolled = useScrolling()
  const pathname = usePathname()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
          scrolled ? 'border-b border-primary/5 bg-white/80 shadow-sm backdrop-blur-xl' : 'bg-transparent'
        )}
      >
        <Container>
          <nav className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-3"
              >
                <Image src="/logo.png" alt="Nusacaraka" width={128} height={32} className="w-32 object-contain" />
              </motion.div>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {MENU.map((item) => {
                const isActive = pathname === item.url

                return (
                  <Link
                    key={item.url}
                    href={item.url}
                    className={cn(
                      'relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-300',
                      isActive ? 'text-secondary' : 'text-primary/70 hover:text-primary'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute right-4 bottom-0 left-4 h-0.5 bg-secondary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="hidden lg:block">
              <Button url="/book" variant="outline" rounded="full">
                Start Project
              </Button>
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="relative z-50 p-2 text-primary lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-primary"
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-6">
                {MENU.map((item, i) => {
                  const isActive = pathname === item.url

                  return (
                    <motion.div key={item.url} custom={i} variants={menuItemVariants} initial="closed" animate="open">
                      <Link
                        href={item.url}
                        onClick={closeMobileMenu}
                        className={cn(
                          'font-serif text-3xl font-semibold transition-colors duration-300',
                          isActive ? 'text-secondary' : 'text-primary hover:text-secondary'
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div
                  custom={MENU.length}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  className="mt-8"
                >
                  <Button url="/book" variant="default" size="lg" rounded="full" onClick={closeMobileMenu}>
                    Start Project
                  </Button>
                </motion.div>
              </nav>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary blur-3xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
