import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call internal Next.js API route (better for server-side)
          const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
          const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          if (!response.ok) {
            console.error('Login API error:', response.status)

            return null
          }

          const data = await response.json()

          if (data.success && data.user) {
            return {
              id: data.user.id.toString(),
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
              token: data.token
            }
          }

          console.error('Login failed:', data.error || 'Unknown error')

          return null
        } catch (error) {
          console.error('Auth error:', error)

          return null
        }
      }
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login'
  },

  callbacks: {
    async signIn({ user }) {
      return !!user
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
        token.jwt = user.token
      }

      return token
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        session.jwt = token.jwt as string
      }

      return session
    }
  },

  debug: process.env.NODE_ENV === 'development'
}
