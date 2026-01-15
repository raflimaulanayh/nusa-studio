'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/atoms/ui/button'

import { cn } from '@/utils/cn'

// Helper function to extract text from message parts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getMessageContent = (msg: any): string => {
  // Direct content string
  if (msg.content && typeof msg.content === 'string') {
    return msg.content
  }
  // AI SDK v5 parts format
  if (msg.parts && Array.isArray(msg.parts)) {
    return msg.parts
      .filter((p: { type: string }) => p.type === 'text')
      .map((p: { text: string }) => p.text)
      .join('')
  }
  // Text field
  if (msg.text && typeof msg.text === 'string') {
    return msg.text
  }

  return ''
}

export const StickyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // useChat hook with DefaultChatTransport
  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      credentials: 'include'
    }),
    onError: (error) => {
      console.error('Chat error:', error)
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        setErrorMessage('Maaf, API sedang sibuk. Coba lagi dalam beberapa saat.')
      } else {
        setErrorMessage('Maaf, terjadi kesalahan. Silakan coba lagi.')
      }
    }
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  // Show button on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      const footerElement = document.querySelector('footer')
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight

      if (footerElement) {
        const footerOffset = footerElement.offsetTop
        const scrollPosition = offset + windowHeight
        setShowButton(scrollPosition < documentHeight - 100 && offset > 1 && scrollPosition < footerOffset)
      } else {
        setShowButton(offset > 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    setErrorMessage(null)
    sendMessage({ text: inputValue })
    setInputValue('')
  }

  // Build display messages with welcome message
  const displayMessages = [
    {
      id: 'welcome',
      role: 'assistant' as const,
      content: 'Halo! 👋 Saya asisten virtual Nusacaraka Studio. Ada yang bisa saya bantu?'
    },
    ...messages.map((msg) => ({
      id: msg.id,
      role: msg.role as 'user' | 'assistant',
      content: getMessageContent(msg)
    }))
  ]

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed right-4 bottom-24 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl lg:right-9"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Nusacaraka Assistant</h3>
                  <p className="text-xs text-white/60">Online • Siap membantu</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-1 text-white/70 transition-colors hover:text-white"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div data-lenis-prevent className="h-80 space-y-4 overflow-y-auto bg-slate-50 p-4">
              {displayMessages
                .filter((msg) => msg.role === 'user' || msg.role === 'assistant')
                .map((message) => (
                  <div
                    key={message.id}
                    className={cn('flex gap-2', message.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                  >
                    <div
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                        message.role === 'user' ? 'bg-secondary' : 'bg-primary'
                      )}
                    >
                      {message.role === 'user' ? (
                        <User size={14} className="text-white" />
                      ) : (
                        <Bot size={14} className="text-white" />
                      )}
                    </div>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm',
                        message.role === 'user'
                          ? 'rounded-br-md bg-secondary text-white'
                          : 'rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm'
                      )}
                    >
                      {message.content || (
                        <span className="flex items-center gap-2 text-slate-400">
                          <Loader2 className="h-3 w-3 animate-spin" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: '150ms' }}
                      />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {errorMessage && !isLoading && (
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-600 shadow-sm">
                    {errorMessage}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-slate-100 bg-white p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  rounded="full"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="shrink-0"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: showButton || isOpen ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={toggleChat}
        className={cn(
          'fixed right-4 bottom-4 z-50 lg:right-9 lg:bottom-7',
          'flex items-center gap-2 transition-all duration-300'
        )}
        aria-label="Toggle chatbot"
      >
        {/* Label - Desktop only */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden rounded-full bg-white px-3 py-1.5 text-sm font-medium text-primary shadow-lg lg:block"
          >
            Ada pertanyaan?
          </motion.div>
        )}

        {/* Button */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-secondary/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary shadow-lg transition-shadow hover:shadow-xl">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={24} className="text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <MessageCircle size={24} className="text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.button>
    </>
  )
}
