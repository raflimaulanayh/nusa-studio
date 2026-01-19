'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Bot } from 'lucide-react'
import { memo } from 'react'

export interface ChatTypingIndicatorProps {
  isLoading: boolean
}

const ChatTypingIndicatorComponent = ({ isLoading }: ChatTypingIndicatorProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-3 text-sm text-gray-500"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary/10 bg-white text-primary shadow-sm">
            <Bot size={16} />
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <div className="flex gap-1">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                className="h-2 w-2 rounded-full bg-primary"
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                className="h-2 w-2 rounded-full bg-primary"
              />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                className="h-2 w-2 rounded-full bg-primary"
              />
            </div>
            <span className="text-xs font-medium">AI is thinking...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ChatTypingIndicator = memo(ChatTypingIndicatorComponent)
