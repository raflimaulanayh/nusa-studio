'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Container } from '@/components/templates/container'

import { ChatErrorBanner, ChatHeader, ChatInputForm, ChatMessage, ChatTypingIndicator } from './chunk'
import type { ChatMessageType } from './chunk/types'

export const ChabotSection = () => {
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

  const handleSubmit = useCallback(
    (message: string) => {
      setErrorMessage(null)
      sendMessage({ text: message })
    },
    [sendMessage]
  )

  const handleSuggestedClick = useCallback(
    (question: string) => {
      sendMessage({ text: question })
    },
    [sendMessage]
  )

  const displayMessages: ChatMessageType[] = useMemo(
    () => [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Halo! 👋 Saya **Nusacaraka AI Assistant**. Siap membantu Anda dengan pertanyaan seputar:\n\n- 🎨 Layanan & Portfolio\n- 💰 Paket & Harga\n- 🚀 Proses Kerja\n\nAda yang bisa saya bantu?',
        parts: [
          {
            type: 'text',
            text: 'Halo! 👋 Saya **Nusacaraka AI Assistant**. Siap membantu Anda dengan pertanyaan seputar:\n\n- 🎨 Layanan & Portfolio\n- 💰 Paket & Harga\n- 🚀 Proses Kerja\n\nAda yang bisa saya bantu?'
          }
        ]
      },
      ...(messages as ChatMessageType[])
    ],
    [messages]
  )

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      <ChatHeader />

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
              <ChatMessage key={message.id} id={message.id} role={message.role} parts={message.parts} index={idx} />
            ))}
          </AnimatePresence>

          <ChatTypingIndicator isLoading={isLoading} />

          <ChatErrorBanner errorMessage={errorMessage} isLoading={isLoading} />

          <div ref={messagesEndRef} />
        </Container>
      </div>

      <ChatInputForm
        isLoading={isLoading}
        messageCount={messages.length}
        onSubmit={handleSubmit}
        onSuggestedClick={handleSuggestedClick}
      />
    </div>
  )
}
