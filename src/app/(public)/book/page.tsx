'use client'

import { SERVICE_PACKAGES } from '@/data/pricing'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Heading, Text } from '@/components/atoms/typography'
import { Button } from '@/components/atoms/ui/button'
import { Container } from '@/components/templates/container'
import { GeneralLayout } from '@/components/templates/general-layout'

const SERVICES = [
  'Product Photography',
  'Brand Identity',
  'Web Development',
  'Digital Marketing',
  'Content Creation',
  'Other'
]

const BUDGETS = ['< Rp 5 Juta', 'Rp 5 Juta - Rp 15 Juta', 'Rp 15 Juta - Rp 30 Juta', '> Rp 30 Juta']

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Start with country code (e.g. 62).' }),
  company: z.string().optional(),
  service: z.string().min(1, { message: 'Please select a service.' }),
  budget: z.string().min(1, { message: 'Please select a budget range.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
})

type FormData = z.infer<typeof formSchema>

// ... existing imports

function BookForm() {
  const searchParams = useSearchParams()
  const initialService = searchParams.get('service')
  const initialPlan = searchParams.get('plan')

  // Find the specific plan details if they exist
  const selectedPackageInfo =
    initialService && initialPlan
      ? SERVICE_PACKAGES.find((s) => s.title === initialService)?.tiers.find((t) => t.name === initialPlan)
      : null

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
      service: '',
      budget: '',
      // Pre-fill message if a plan is selected
      message: initialPlan ? `I'm interested in the ${initialPlan} package. ` : ''
    }
  })

  // Check if we should hide budget (Fixed price plan selected)
  const isFixedPricePlan = initialPlan && selectedPackageInfo && selectedPackageInfo.price !== 'Hubungi Kami'
  const shouldShowBudget = !isFixedPricePlan

  // Pre-select service logic (existing + enhanced)
  useEffect(() => {
    if (initialService) {
      const matched =
        SERVICES.find((s) => s.toLowerCase().replace(' ', '-') === initialService.toLowerCase()) ||
        SERVICES.find((s) => s.toLowerCase() === initialService.toLowerCase()) ||
        SERVICES.find((s) => s.includes(initialService.split(' ')[0])) // Fallback partial match

      if (matched) {
        setValue('service', matched)
      }
    }

    // Auto-fill budget if fixed price plan to satisfy validation
    if (isFixedPricePlan) {
      setValue('budget', 'Fixed Price Plan')
    }
  }, [initialService, setValue, isFixedPricePlan])

  const selectedService = watch('service')
  const selectedBudget = watch('budget')

  // Replace with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbzCypNeJMPm_RFXB6Gs49qbjaj9f_RI_aq_JcnxfzYWwm_eDcbh-vh7qQHZs7bAAlgZlQ/exec'

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // Create FormData object for Google Apps Script
      const formData = new FormData()
      formData.append('timestamp', new Date().toISOString())
      Object.entries(data).forEach(([key, value]) => {
        // Handle undefined/null values safely
        formData.append(key, value || '')
      })

      // Send to Google Apps Script
      // mode: 'no-cors' is crucial because Google Scripts don't send CORS headers by default for simple web apps
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })

      setIsSubmitting(false)
      setIsSuccess(true)

      setTimeout(() => {
        reset()
        setIsSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      // Optionally show error state
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white p-12 text-center shadow-xl shadow-slate-200/50 md:p-16"
      >
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <Heading as="h3" variant="primary" className="mb-6 text-3xl md:text-4xl">
          Project Inquiry Sent!
        </Heading>
        <Text variant="muted" className="mb-8 text-lg leading-relaxed">
          Thanks for starting your journey with us, <span className="font-semibold text-primary">{watch('name')}</span>.
          We&apos;ve received your details and will get back to you with a proposal within 24 hours.
        </Text>
        <Button onClick={() => setIsSuccess(false)} variant="outline" rounded="full">
          Send Another Request
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mx-auto max-w-4xl rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-12"
    >
      {/* Selected Plan Summary Card */}
      {initialPlan && selectedPackageInfo && (
        <div className="mb-10 flex items-center justify-between rounded-2xl border border-secondary/20 bg-slate-50 p-6">
          <div>
            <div className="mb-1 text-sm text-muted-foreground">Selected Plan</div>
            <div className="text-xl font-semibold text-primary">{initialPlan}</div>
            <div className="font-semibold text-secondary">{selectedPackageInfo.price}</div>
          </div>
          <div className="hidden sm:block">
            <CheckCircle2 className="h-8 w-8 text-secondary" />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* ... existing form ... */}

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

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="pl-1 text-sm font-semibold text-primary">
              Phone / WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="w-full rounded-sm border bg-slate-50 px-4 py-3 text-primary transition-all duration-300 placeholder:text-muted-foreground/40 focus:bg-white focus:ring-2 focus:ring-secondary/20"
              placeholder="628123456789"
            />
            {errors.phone && <p className="pl-1 text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="pl-1 text-sm font-semibold text-primary">
              Company (Optional)
            </label>
            <input
              id="company"
              {...register('company')}
              className="w-full rounded-sm border bg-slate-50 px-4 py-3 text-primary transition-all duration-300 placeholder:text-muted-foreground/40 focus:bg-white focus:ring-2 focus:ring-secondary/20"
              placeholder="Your company name"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="pl-1 text-sm font-semibold text-primary">I need help with...</label>
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

        {shouldShowBudget && (
          <div className="flex flex-col gap-2">
            <label className="pl-1 text-sm font-semibold text-primary">My budget is...</label>
            <div className="flex flex-wrap gap-3">
              {BUDGETS.map((budget) => (
                <Button
                  key={budget}
                  type="button"
                  onClick={() => setValue('budget', budget, { shouldValidate: true })}
                  variant={selectedBudget === budget ? 'default' : 'outline'}
                >
                  {budget}
                </Button>
              ))}
            </div>
            {errors.budget && <p className="pl-1 text-xs text-red-500">{errors.budget.message}</p>}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="pl-1 text-sm font-semibold text-primary">
            Project Details
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            className="w-full resize-none rounded-sm border bg-slate-50 px-4 py-3 text-primary transition-all duration-300 placeholder:text-muted-foreground/40 focus:bg-white focus:ring-2 focus:ring-secondary/20"
            placeholder="Tell us about your goals, timeline, and what you're looking to achieve..."
          />
          {errors.message && <p className="pl-1 text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            rightIcon={!isSubmitting ? <ArrowRight className="h-5 w-5" /> : undefined}
          >
            {isSubmitting ? 'Sending Request...' : 'Send Request'}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default function BookPage() {
  return (
    <GeneralLayout>
      <section className="relative min-h-screen overflow-hidden bg-background pt-32 pb-24">
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-secondary/5 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

        <Container className="relative z-10">
          <header className="mx-auto mb-16 max-w-4xl text-center lg:mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Text size="sm" weight="semibold" className="mb-6 tracking-widest text-secondary uppercase">
                Start a Project
              </Text>
              <h1 className="mb-6 font-serif text-5xl leading-[1.1] font-medium tracking-tight text-primary md:text-7xl lg:text-8xl">
                Let&apos;s build your <br />
                <span className="text-secondary italic">vision</span> together.
              </h1>
              <Text variant="muted" className="mx-auto max-w-2xl text-xl">
                Fill out the form below to tell us about your project, and we&apos;ll schedule a call to discuss how we can
                help.
              </Text>
            </motion.div>
          </header>

          <Suspense fallback={<div>Loading form...</div>}>
            <BookForm />
          </Suspense>
        </Container>
      </section>
    </GeneralLayout>
  )
}
