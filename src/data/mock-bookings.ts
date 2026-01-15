import { z } from 'zod'

export const BookingSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string(),
  budget: z.string(),
  message: z.string(),
  status: z.enum(['New', 'Contacted', 'In Progress', 'Completed', 'Cancelled']),
  createdAt: z.string() // ISO string
})

export type Booking = z.infer<typeof BookingSchema>

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '6281234567890',
    company: 'Tech Corp',
    service: 'Web Development',
    budget: 'Rp 15 Juta - Rp 30 Juta',
    message: 'We need a new landing page for our product launch.',
    status: 'New',
    createdAt: '2025-10-26T10:00:00Z'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@design.co',
    phone: '6289876543210',
    company: 'Design Studio',
    service: 'Brand Identity',
    budget: 'Rp 5 Juta - Rp 15 Juta',
    message: 'Rebranding our agency.',
    status: 'Contacted',
    createdAt: '2025-10-25T14:30:00Z'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@startup.io',
    phone: undefined,
    company: 'Startup Inc',
    service: 'Digital Marketing',
    budget: '> Rp 30 Juta',
    message: 'Full marketing campaign needed.',
    status: 'In Progress',
    createdAt: '2025-10-24T09:15:00Z'
  }
]
