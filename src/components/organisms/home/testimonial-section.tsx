'use client'

import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from '@/components/atoms/ui/carousel'
import { Container } from '@/components/templates/container'

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Working with Nusacaraka Studio was a game-changer for our brand. They translated our vision into a digital experience that truly resonates with our audience. The attention to detail and creative direction were exceptional.',
    author: 'Sarah Jenkins',
    role: 'CEO, TechFlow Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 2,
    quote:
      "The team's ability to balance aesthetics with performance is unmatched. Our new website isn't just beautiful; it's a powerful tool that has significantly increased our conversion rates since launch.",
    author: 'David Chen',
    role: 'Marketing Director, Aura',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: 3,
    quote:
      'Professional, innovative, and incredibly talented. They pushed our boundaries to create something unique in our industry. The process was smooth, and the result exceeded all expectations.',
    author: 'Elena Rodriguez',
    role: 'Founder, Zenith Design',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
  }
]

export const TestimonialSection = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="overflow-hidden bg-transparent py-24">
      <Container>
        <div className="relative px-4 md:px-0">
          <Carousel
            setApi={setApi}
            plugins={[
              Autoplay({
                delay: 5000
              })
            ]}
            opts={{
              align: 'center',
              loop: true
            }}
            className="mx-auto w-full max-w-7xl"
          >
            <CarouselContent>
              {TESTIMONIALS.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <figure className="flex flex-col items-center px-4 py-8 text-center md:px-10">
                    <blockquote className="mx-auto mb-12 text-xl leading-relaxed font-medium tracking-tight text-primary md:text-2xl lg:text-3xl">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>

                    <motion.figcaption
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-4 rounded-full border border-primary/5 bg-white p-2 pr-6 shadow-sm"
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <cite className="block text-sm font-semibold text-primary not-italic">{testimonial.author}</cite>
                        <span className="block text-xs text-muted-foreground">{testimonial.role}</span>
                      </div>
                    </motion.figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="absolute top-1/2 -left-0 hidden size-10 -translate-y-1/2 border-primary/10 bg-primary/5 text-primary transition-colors hover:-translate-y-1/2 hover:bg-primary/10 hover:text-primary md:flex lg:-left-10"
              customArrow={<ChevronLeft className="h-8 w-8" />}
            />
            <CarouselNext
              className="absolute top-1/2 -right-0 hidden size-10 -translate-y-1/2 border-primary/10 bg-primary/5 text-primary transition-colors hover:-translate-y-1/2 hover:bg-primary/10 hover:text-primary md:flex lg:-right-10"
              customArrow={<ChevronRight className="h-8 w-8" />}
            />
          </Carousel>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === current ? 'w-4 bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
