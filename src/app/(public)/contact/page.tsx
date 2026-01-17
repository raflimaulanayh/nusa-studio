'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone, Instagram, Linkedin, Twitter, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Heading, Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

const SERVICES = ['Branding', 'Web Development', 'UI/UX Design', 'Digital Marketing', 'Other']

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
})

type FormData = z.infer<typeof formSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [ticketNumber, setTicketNumber] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: ''
    }
  })

  const selectedService = watch('service')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send message')
      }

      const result = await response.json()
      setTicketNumber(result.ticketNumber || '')
      setIsSuccess(true)
    } catch (error) {
      console.error('Submit error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <GeneralLayout>
      <section className="relative min-h-screen overflow-hidden bg-background pt-32 pb-24">
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

        <Container className="relative z-10">
          <header className="mx-auto mb-20 max-w-5xl text-center lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <Text size="sm" weight="semibold" className="mb-6 tracking-widest text-secondary uppercase">
                Contact Us
              </Text>
              <h1 className="font-serif text-3xl leading-[1.1] font-medium tracking-tight text-primary md:text-5xl lg:text-6xl">
                Let&apos;s create something <br />
                <span className="text-secondary italic">meaningful</span> together.
              </h1>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
            <aside className="space-y-8 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Heading as="h2" variant="secondary" className="mb-6">
                  Get in Touch
                </Heading>
                <Text variant="muted" className="mb-8 leading-relaxed">
                  Have a project in mind or just want to chat about your ideas? Send us a message and we&apos;ll respond as
                  soon as possible.
                </Text>

                <div className="space-y-6 border-b border-slate-200 pb-10">
                  <a
                    href="mailto:hello@nusacreativestudio.com"
                    className="group flex items-start gap-4 rounded-xl border border-transparent transition-all duration-300 hover:border-slate-100 hover:bg-slate-50/50"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <Text weight="semibold" className="mb-1 text-primary">
                        Email
                      </Text>
                      <Text variant="muted" size="sm">
                        hello@nusacreativestudio.com
                      </Text>
                    </div>
                  </a>

                  <div className="group flex items-start gap-4 rounded-xl border border-transparent transition-all duration-300 hover:border-slate-100 hover:bg-slate-50/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <Text weight="semibold" className="mb-1 text-primary">
                        Phone
                      </Text>
                      <Text variant="muted" size="sm">
                        +62 812-3456-7890
                      </Text>
                    </div>
                  </div>

                  <div className="group flex items-start gap-4 rounded-xl border border-transparent transition-all duration-300 hover:border-slate-100 hover:bg-slate-50/50">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <Text weight="semibold" className="mb-1 text-primary">
                        Office
                      </Text>
                      <Text variant="muted" size="sm">
                        Jakarta, Indonesia
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <Text weight="semibold" className="mb-4 text-primary">
                    Follow Us
                  </Text>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-muted-foreground transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-muted-foreground transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-muted-foreground transition-all duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </aside>

            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="rounded-lg border border-slate-100 bg-white px-5 py-8 shadow-xl shadow-slate-200/50 sm:p-12 lg:p-16"
              >
                {isSuccess ? (
                  <div className="flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <Heading as="h3" variant="primary" className="mb-4">
                      Message Sent!
                    </Heading>

                    {ticketNumber && (
                      <div className="mb-6 w-full max-w-md rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                        <Text variant="muted" className="mb-2 text-sm font-medium tracking-wide uppercase">
                          Your Ticket Number
                        </Text>
                        <div className="text-3xl font-bold text-primary md:text-4xl">{ticketNumber}</div>
                        <Text variant="muted" className="mt-2 text-sm">
                          Save this for future reference
                        </Text>
                      </div>
                    )}

                    <Text variant="muted" className="mx-auto mb-4 max-w-sm">
                      Thank you for contacting us, <span className="font-semibold text-primary">{watch('name')}</span>!
                    </Text>
                    <Text variant="muted" className="mx-auto max-w-sm">
                      We&apos;ve received your message and will get back to you within 24 hours.
                    </Text>

                    <Button
                      onClick={() => {
                        reset()
                        setIsSuccess(false)
                        setTicketNumber('')
                      }}
                      variant="outline"
                      className="mt-8"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="pl-1 text-sm font-semibold text-primary">
                          Name
                        </label>
                        <input
                          id="name"
                          {...register('name')}
                          className="w-full rounded-sm border bg-slate-50 px-4 py-3 text-primary transition-all duration-300 placeholder:text-muted-foreground/40 focus:bg-white focus:ring-2 focus:ring-secondary/20"
                          placeholder="Your name"
                        />
                        {errors.name && <p className="pl-1 text-xs text-red-500">{errors.name.message}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="pl-1 text-sm font-semibold text-primary">
                          Email
                        </label>
                        <input
                          id="email"
                          {...register('email')}
                          className="w-full rounded-sm border bg-slate-50 px-4 py-3 text-primary transition-all duration-300 placeholder:text-muted-foreground/40 focus:bg-white focus:ring-2 focus:ring-secondary/20"
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="pl-1 text-xs text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="pl-1 text-sm font-semibold text-primary">I&apos;m interested in...</label>
                      <div className="flex flex-wrap gap-3">
                        {SERVICES.map((service) => (
                          <Button
                            key={service}
                            type="button"
                            onClick={() => setValue('service', service, { shouldValidate: true })}
                            variant={selectedService === service ? 'default' : 'outline'}
                          >
                            {service}
                          </Button>
                        ))}
                      </div>
                      {errors.service && <p className="pl-1 text-xs text-red-500">{errors.service.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="pl-1 text-sm font-semibold text-primary">
                        Message
                      </label>
                      <textarea
                        id="message"
                        {...register('message')}
                        rows={5}
                        className="w-full resize-none rounded-sm border bg-slate-50 px-4 py-3 text-primary transition-all duration-300 placeholder:text-muted-foreground/40 focus:bg-white focus:ring-2 focus:ring-secondary/20"
                        placeholder="Tell us about your project goals, timeline, and budget..."
                      />
                      {errors.message && <p className="pl-1 text-xs text-red-500">{errors.message.message}</p>}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={isSubmitting} rounded="full" size="lg">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                      </Button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </Container>
      </section>
    </GeneralLayout>
  )
}
