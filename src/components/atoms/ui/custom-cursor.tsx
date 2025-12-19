'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Check if device has touch capability (mobile/tablet)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Show cursor
    setIsVisible(true)

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out'
      })
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      })
    }

    // Hover handlers for interactive elements
    const onMouseEnter = () => setIsHovering(true)
    const onMouseLeave = () => setIsHovering(false)

    // Add hover listeners to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
    )

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    // Add mouse move listener
    window.addEventListener('mousemove', onMouseMove)

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
      document.body.style.cursor = 'auto'
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px'
        }}
      >
        <div
          className="h-full w-full rounded-full border-2 border-secondary/50 transition-all duration-300"
          style={{
            transform: isHovering ? 'scale(1.2)' : 'scale(1)',
            borderColor: isHovering ? 'var(--color-secondary)' : 'rgba(30, 152, 212, 0.5)'
          }}
        />
      </div>

      {/* Inner dot */}
      <div ref={cursorDotRef} className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2">
        <div
          className="rounded-full bg-secondary transition-all duration-200"
          style={{
            width: isHovering ? '8px' : '6px',
            height: isHovering ? '8px' : '6px',
            opacity: isHovering ? 1 : 0.8
          }}
        />
      </div>
    </>
  )
}
