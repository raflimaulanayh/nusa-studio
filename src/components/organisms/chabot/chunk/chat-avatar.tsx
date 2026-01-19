'use client'

import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'
import { memo } from 'react'

import { cn } from '@/utils/cn'

export interface ChatAvatarProps {
  role: 'user' | 'assistant'
}

const ChatAvatarComponent = ({ role }: ChatAvatarProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow transition-shadow hover:shadow-lg md:h-10 md:w-10',
        role === 'user' ? 'bg-primary text-white!' : 'border border-primary/10 bg-white text-primary'
      )}
    >
      {role === 'user' ? <User size={18} /> : <Bot size={18} />}
    </motion.div>
  )
}

export const ChatAvatar = memo(ChatAvatarComponent)
