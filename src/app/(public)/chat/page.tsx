'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Home, Loader2, Send, Sparkles, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { Button } from '@/components/atoms/ui/button'
import { MarkdownComponents } from '@/components/atoms/ui/markdown'
import { ServiceRecommendationCards } from '@/components/molecules/service-recommendation-cards'
import { Container } from '@/components/templates/container'

import { cn } from '@/utils/cn'

const SUGGESTED_QUESTIONS = [
  { icon: Sparkles, text: 'Apa layanan yang tersedia?' },
  { icon: Sparkles, text: 'Berapa harga paket branding?' },
  { icon: Sparkles, text: 'Bagaimana proses kerjanya?' },
  { icon: Sparkles, text: 'Lihat portfolio terbaik' }
]

export default function ChatPage() {
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    setErrorMessage(null)
    sendMessage({ text: inputValue })
    setInputValue('')
  }

  const handleSuggestedClick = (question: string) => {
    sendMessage({ text: question })
  }

  const displayMessages = [
    {
      id: 'welcome',
      role: 'assistant' as const,
      content:
        'Halo! 👋 Saya **Nusacaraka AI Assistant**. Siap membantu Anda dengan pertanyaan seputar:\n\n- 🎨 Layanan & Portfolio\n- 💰 Paket & Harga\n- 🚀 Proses Kerja\n\nAda yang bisa saya bantu?',
      parts: [{ type: 'text', text: 'Halo! 👋 Saya **Nusacaraka AI Assistant**...' }]
    },
    ...messages
  ]

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      {/* Header with glassmorphism */}
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

      {/* Chat Area with custom scrollbar */}
      <div
        data-lenis-prevent
        className="scrollbar-custom flex-1 overflow-y-auto py-8"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(203 213 225) transparent'
        }}
      >
        <Container className="max-w-5xl! space-y-6">
          <AnimatePresence mode="popLayout">
            {displayMessages.map((message, idx) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={cn('flex w-full gap-3 md:gap-4', message.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
              >
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow transition-shadow hover:shadow-lg md:h-10 md:w-10',
                    message.role === 'user' ? 'bg-primary text-white!' : 'border border-primary/10 bg-white text-primary'
                  )}
                >
                  {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </motion.div>

                {/* Message Bubble */}
                <div
                  className={cn('flex max-w-[85%] flex-col gap-1', message.role === 'user' ? 'items-end' : 'items-start')}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow md:px-5 md:py-3.5',
                      message.role === 'user'
                        ? 'rounded-tr-sm bg-primary text-white'
                        : 'rounded-tl-sm border border-slate-100 bg-white/90 backdrop-blur-sm'
                    )}
                  >
                    {/* Message Content with Parts */}
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {message.parts?.map((part: any, partIdx: number) => {
                        if (part.type === 'text') {
                          return (
                            <div
                              key={partIdx}
                              className={cn(
                                'prose prose-sm md:prose-base max-w-none',
                                message.role === 'user'
                                  ? 'text-white *:text-white [&_li]:text-white [&_p]:text-white [&_strong]:text-white'
                                  : 'prose-slate prose-p:text-slate-700 prose-strong:text-slate-900'
                              )}
                            >
                              {part.text ? (
                                <ReactMarkdown components={MarkdownComponents}>{part.text}</ReactMarkdown>
                              ) : (
                                <span className="flex items-center gap-2 text-slate-400">
                                  <Loader2 className="size-4 animate-spin" />
                                </span>
                              )}
                            </div>
                          )
                        }

                        // Handle tool calls - recommendServices
                        if (part.type === 'tool-recommendServices') {
                          if (part.state === 'output-available' && part.output) {
                            return (
                              <ServiceRecommendationCards
                                key={partIdx}
                                serviceIds={part.output.serviceIds}
                                reasoning={part.output.reasoning}
                              />
                            )
                          }

                          return (
                            <div key={partIdx} className="text-sm text-gray-500 italic">
                              🔍 Mencari layanan yang tepat...
                            </div>
                          )
                        }

                        return null
                      })}
                    </div>
                  </motion.div>

                  {/* Timestamp */}
                  <span className="mt-1 px-2 text-xs text-gray-400">{message.role === 'user' ? 'You' : 'AI Assistant'}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
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

          {/* Error Banner */}
          {errorMessage && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-200 bg-red-50/80 p-4 text-center text-sm text-red-600 shadow-sm backdrop-blur-sm"
            >
              {errorMessage}
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </Container>
      </div>

      {/* Input Area with glassmorphism */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 border-t border-white/50 bg-white/50 shadow-lg backdrop-blur-sm"
      >
        <Container className="max-w-5xl! py-4 md:py-6">
          {/* Suggested Questions */}
          <AnimatePresence>
            {messages.length === 0 && (
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
                    onClick={() => handleSuggestedClick(q.text)}
                    className="group flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all hover:border-primary/40 hover:shadow"
                  >
                    <q.icon className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
                    {q.text}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Form */}
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

          {/* Footer Note */}
          <p className="mt-3 text-center text-xs text-gray-500">
            AI can make mistakes. Consider checking important information.
          </p>
        </Container>
      </motion.div>
    </div>
  )
}
