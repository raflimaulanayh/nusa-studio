'use client'

import { SUGGESTED_QUESTIONS } from '@/constants/chatbot-data'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'
import { memo, useState } from 'react'

import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'

import { cn } from '@/utils/cn'

export interface ChatInputFormProps {
  isLoading: boolean
  messageCount: number
  onSubmit: (message: string) => void
  onSuggestedClick: (question: string) => void
}

const ChatInputFormComponent = ({ isLoading, messageCount, onSubmit, onSuggestedClick }: ChatInputFormProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    onSubmit(inputValue)
    setInputValue('')
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-10 border-t border-white/50 bg-white/50 shadow-lg backdrop-blur-sm"
    >
      <Container className="max-w-5xl! py-4 md:py-6">
        <AnimatePresence>
          {messageCount === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 flex flex-wrap gap-2"
            >
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <motion.button
                  key={q.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSuggestedClick(q.text)}
                  className="group flex h-10 items-center gap-2 rounded-full border border-primary/20 bg-blue-50 px-5 py-2 text-sm text-primary shadow-sm backdrop-blur-sm hover:border-primary/80 hover:shadow has-[>svg]:px-3"
                >
                  <q.icon className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
                  {q.text}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="block w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-14 pl-5 text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none disabled:opacity-50 md:py-4 md:pl-6"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <Button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  rounded="full"
                  size="icon"
                  className={cn(
                    'size-9 shadow transition-all duration-300 hover:shadow-lg',
                    inputValue.trim() ? 'bg-primary text-white hover:scale-105' : 'bg-gray-200 text-gray-400'
                  )}
                >
                  {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                </Button>
              </div>
            </div>
          </div>
        </form>

        <p className="mt-3 text-center text-xs text-gray-500">
          AI can make mistakes. Consider checking important information.
        </p>
      </Container>
    </motion.div>
  )
}

export const ChatInputForm = memo(ChatInputFormComponent)
