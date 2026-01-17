'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Phone, Instagram, Linkedin, Twitter, Check } from 'lucide-react'
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

      setIsSuccess(true)
      toast.success("Message sent successfully! We'll get back to you soon.")

      setTimeout(() => {
        reset()
        setIsSuccess(false)
      }, 5000)
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
              <h1 className="font-serif text-4xl leading-[1.1] font-medium tracking-tight text-primary md:text-5xl lg:text-6xl">
                Let&apos;s create something <br />
                <span className="text-secondary italic">meaningful</span> together.
              </h1>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
            <aside className="space-y-12 lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Text variant="muted" className="mb-10 text-lg leading-relaxed">
                  Have a project in mind or just want to explore what&apos;s possible? We&apos;re here to listen,
                  collaborate, and bring your vision to life.
                </Text>

                <address className="space-y-8 not-italic">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-full border border-slate-100 bg-white p-3 text-secondary shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-primary">Email Us</h3>
                      <a
                        href="mailto:hello@nusa-studio.com"
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        hello@nusa-studio.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-full border border-slate-100 bg-white p-3 text-secondary shadow-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-primary">Call Us</h3>
                      <a href="tel:+6281234567890" className="text-muted-foreground transition-colors hover:text-primary">
                        +62 812 3456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-full border border-slate-100 bg-white p-3 text-secondary shadow-sm">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-primary">Visit Us</h3>
                      <p className="text-muted-foreground">
                        Jl. Dago No. 88
                        <br />
                        Bandung, West Java, Indonesia
                      </p>
                    </div>
                  </div>
                </address>

                <div className="mt-12 border-t border-slate-200 pt-12">
                  <h3 className="mb-6 font-semibold text-primary">Follow Us</h3>
                  <div className="flex gap-4">
                    {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-muted-foreground shadow-sm transition-all duration-300 hover:bg-secondary hover:text-white"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </aside>

            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-12"
              >
                {isSuccess ? (
                  <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <Check className="h-10 w-10" />
                    </div>
                    <Heading as="h3" variant="primary" className="mb-4">
                      Message Sent!
                    </Heading>
                    <Text variant="muted" className="mx-auto max-w-sm">
                      Thank you for contacting us. We&apos;ve received your message and will get back to you within 24 hours.
                    </Text>
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

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        rightIcon={!isSubmitting ? <ArrowRight className="h-5 w-5" /> : undefined}
                      >
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
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
