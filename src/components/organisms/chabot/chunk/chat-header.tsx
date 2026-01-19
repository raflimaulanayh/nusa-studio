'use client'

import { motion } from 'framer-motion'
import { Bot, Home } from 'lucide-react'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

export const ChatHeader = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-10 border-b border-white/50 bg-white/80 shadow-sm backdrop-blur-xl"
    >
      <Container className="mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-lg"
          >
            <Bot size={24} />
            <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-green-500 ring-2 ring-white" />
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 md:text-xl">Nusacaraka AI</h1>
            <p className="flex items-center gap-1.5 text-xs text-green-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Online • Fast Response
            </p>
          </div>
        </div>
        <Button url="/" variant="outline" className="text-sm">
          <Home size={18} />
          <span>Back</span>
        </Button>
      </Container>
    </motion.div>
  )
}
