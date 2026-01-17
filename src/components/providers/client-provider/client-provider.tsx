'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { useNetworkState, useUpdateEffect } from 'react-use'
import { toast } from 'sonner'
import { SWRConfig } from 'swr'

import api from '@/services/api'
import { fetcher } from '@/services/fetcher'

import { useIsHydrated } from '@/hooks/useIsHydrated'

interface ClientProviderProps {
  children: React.ReactNode
}

function SWRWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  // Inject AppScript JWT token into axios headers
  useEffect(() => {
    if (session?.jwt) {
      api.defaults.headers.Authorization = `Bearer ${session.jwt}`
    } else {
      delete api.defaults.headers.Authorization
    }
  }, [session])

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        dedupingInterval: 5000
      }}
    >
      {children}
    </SWRConfig>
  )
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const network = useNetworkState()
  const hydrated = useIsHydrated()
  const pathname = usePathname()

  useUpdateEffect(() => {
    if (network.previous && !network.online) {
      toast.warning('Your internet connection is lost')
    }
    if (!network.previous && network.online) {
      toast.success('Your internet connection is back')
    }
  }, [network])

  useEffect(() => {
    NProgress.done()
  }, [pathname])

  if (!hydrated) return null

  return (
    <SessionProvider>
      <SWRWrapper>{children}</SWRWrapper>
    </SessionProvider>
  )
}
