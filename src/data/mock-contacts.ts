export type ContactMessage = {
  id: string
  name: string
  email: string
  service: string
  message: string
  status: 'New' | 'Read' | 'Replied'
  createdAt: string
}

export const MOCK_CONTACTS: ContactMessage[] = [
  {
    id: '1',
    name: 'Sarah Connor',
    email: 'sarah@skynet.com',
    service: 'Web Development',
    message: 'I need a secure website to protect my resistance data. Can you help?',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
  },
  {
    id: '2',
    name: 'Tony Stark',
    email: 'tony@stark.com',
    service: 'UI/UX Design',
    message: 'Looking for a fresh detail interface design for my new suit HUD.',
    status: 'Read',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    id: '3',
    name: 'Bruce Wayne',
    email: 'bruce@waynetech.com',
    service: 'Branding',
    message: 'We need a rebranding for Wayne Enterprises. Subtle but powerful.',
    status: 'Replied',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // 2 days ago
  },
  {
    id: '4',
    name: 'Peter Parker',
    email: 'peter@dailybugle.com',
    service: 'Other',
    message: 'Do you guys do photography portfolio websites? I have a lot of Spider-Man pics.',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
  }
]
