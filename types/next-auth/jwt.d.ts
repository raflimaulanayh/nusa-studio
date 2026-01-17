import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
    role: string
    jwt: string
  }
}
