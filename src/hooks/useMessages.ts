import useSWR from 'swr'

import { fetcher } from '@/services/fetcher'

export interface Message {
  rowIndex: number
  ticketNumber?: string
  timestamp: string
  name: string
  email: string
  service: string
  message: string
  status?: string
}

export interface MessagesResponse {
  messages: Message[]
  total: number
}

export interface MessageStats {
  total: number
  new: number
  read: number
  replied: number
  thisWeek: number
  thisMonth: number
}

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR<MessagesResponse>('/api/messages', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 5000
  })

  const updateStatus = async (rowIndex: number, status: string) => {
    const optimisticData: MessagesResponse = {
      messages: data?.messages.map((msg) => (msg.rowIndex === rowIndex ? { ...msg, status } : msg)) || [],
      total: data?.total || 0
    }

    mutate(optimisticData, false)

    try {
      const response = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rowIndex, status })
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      mutate()
    } catch (error) {
      mutate(data)
      throw error
    }
  }

  return {
    messages: data?.messages,
    total: data?.total,
    isLoading,
    isError: error,
    mutate,
    updateStatus
  }
}

export function useMessageStatistics() {
  const { data, error, isLoading } = useSWR<MessageStats>('/api/messages/stats', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 30000
  })

  return {
    stats: data,
    isLoading,
    isError: error
  }
}
