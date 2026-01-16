'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const StickyChatbot = () => {
  const [showButton, setShowButton] = useState(false)

  // Show button logic (show after scrolling down a bit)
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const footerElement = document.querySelector('footer')
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight

      if (footerElement) {
        const footerOffset = footerElement.offsetTop
        const scrollPosition = offset + windowHeight
        // Hide if near footer
        setShowButton(scrollPosition < documentHeight - 100 && offset > 100 && scrollPosition < footerOffset + 100)
      } else {
        setShowButton(offset > 100)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed right-4 bottom-4 z-50 lg:right-8 lg:bottom-8"
        >
          <Link href="/chat" aria-label="Chat with AI Assistant">
            <div className="group relative flex items-center gap-2">
              {/* Tooltip Label */}
              <div className="hidden -translate-x-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-primary opacity-0 shadow-lg transition-all duration-300 group-hover:block group-hover:translate-x-0 group-hover:opacity-100 lg:block">
                Tanya AI Assistant
              </div>

              {/* Button */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-xl transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
                <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-secondary/30 opacity-75 duration-1000" />
                <MessageCircle size={28} />
              </div>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
