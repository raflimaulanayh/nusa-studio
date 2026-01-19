'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import { MarkdownComponents } from '@/components/atoms/ui/markdown'
import { RecommendationCard } from '@/components/molecules/card/recommendation-card'

import { cn } from '@/utils/cn'

import type { MessagePart, RecommendServiceOutput } from './types'

export interface ChatMessageBubbleProps {
  role: 'user' | 'assistant'
  parts?: MessagePart[]
}

function isRecommendServiceOutput(output: unknown): output is RecommendServiceOutput {
  return (
    typeof output === 'object' &&
    output !== null &&
    'services' in output &&
    'reasoning' in output &&
    Array.isArray((output as RecommendServiceOutput).services) &&
    typeof (output as RecommendServiceOutput).reasoning === 'string'
  )
}

export const ChatMessageBubble = ({ role, parts }: ChatMessageBubbleProps) => {
  return (
    <div className={cn('flex max-w-[85%] flex-col gap-1', role === 'user' ? 'items-end' : 'items-start')}>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className={cn(
          'group relative overflow-hidden rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow md:px-5 md:py-3.5',
          role === 'user'
            ? 'rounded-tr-sm bg-primary text-white'
            : 'rounded-tl-sm border border-slate-100 bg-white/90 backdrop-blur-sm'
        )}
      >
        <div className="space-y-3">
          {parts?.map((part, partIdx: number) => {
            if (part.type === 'text') {
              return (
                <div
                  key={partIdx}
                  className={cn(
                    'prose prose-sm md:prose-base max-w-none max-sm:text-sm',
                    role === 'user'
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

            if (part.type === 'tool-recommendServices') {
              if (part.state === 'output-available' && isRecommendServiceOutput(part.output)) {
                return <RecommendationCard key={partIdx} services={part.output.services} reasoning={part.output.reasoning} />
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

      <span className="mt-1 px-2 text-xs text-gray-400">{role === 'user' ? 'You' : 'AI Assistant'}</span>
    </div>
  )
}
