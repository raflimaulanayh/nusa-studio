'use client'

import { gsap } from 'gsap'
import { useEffect, useState, useRef } from 'react'

import { useSplashStore } from '@/hooks/useSplashStore'

export const SplashScreen = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoSymbolRef = useRef<SVGPathElement>(null)
  const logoTextRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const finish = useSplashStore((s) => s.finish)

  // Hydration-safe mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const container = containerRef.current
    const symbol = logoSymbolRef.current
    const subtitle = subtitleRef.current
    const letters = lettersRef.current

    if (!container || !symbol || !subtitle) return

    const tl = gsap.timeline()

    // Animate Enter
    tl
      // Symbol (Star) pop in with rotation
      .fromTo(
        symbol,
        { opacity: 0, scale: 0, rotate: -45, transformOrigin: 'center center' },
        { opacity: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
      )
      // NCS Letters stagger in
      .fromTo(
        letters,
        { y: 40, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out'
        },
        '-=0.8'
      )
      // Subtitle fade up
      .fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      // Hold
      .to({}, { duration: 1.0 })
      // Exit - Fade Out
      .to(container, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsVisible(false)
          finish()
        }
      })

    return () => {
      tl.kill()
    }
  }, [isMounted, finish])

  // Don't render anything before hydration or after animation
  if (!isMounted || !isVisible) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <div className="mb-4 -ml-2 flex items-center">
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 md:h-20 md:w-20"
        >
          <path
            ref={logoSymbolRef}
            d="M54.4534 17.6962C54.4534 17.6962 39.0067 24.4169 30.5415 20.3414C22.0764 16.266 17.6963 1.54424e-05 17.6963 1.54424e-05C17.6963 1.54424e-05 22.1564 14.85 18.2731 22.916C14.3898 30.982 0.000117282 36.7571 0.000117282 36.7571C0.000117282 36.7571 14.4322 30.2674 22.8945 34.3415C31.3569 38.4156 36.7572 54.4533 36.7572 54.4533C36.7572 54.4533 31.0131 39.2561 35.0023 30.9701C38.9915 22.684 54.4534 17.6962 54.4534 17.6962Z"
            fill="#1E98D4"
          />
        </svg>

        <div
          ref={logoTextRef}
          className="perspectives-1000 flex gap-1 font-serif text-5xl font-semibold tracking-tight text-primary md:text-7xl"
        >
          {['N', 'C', 'S'].map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                lettersRef.current[i] = el
              }}
              className="transform-style-3d inline-block origin-bottom"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <p ref={subtitleRef} className="tracking-[0.3em] text-slate-400 uppercase opacity-0 max-sm:text-sm">
        Nusacaraka Studio
      </p>
    </div>
  )
}
