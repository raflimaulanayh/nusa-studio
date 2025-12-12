'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useSplashStore } from '@/hooks/useSplashStore'

export const SplashScreen = () => {
  const MIN_DURATION = 2500
  const [show, setShow] = useState(true)
  const [minimumTimePassed, setMinimumTimePassed] = useState(false)

  const finish = useSplashStore((s) => s.finish)

  useEffect(() => {
    const timer = setTimeout(() => setMinimumTimePassed(true), MIN_DURATION)

    const handleLoaded = () => {
      if (minimumTimePassed) setShow(false)
    }

    window.addEventListener('load', handleLoaded)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoaded)
    }
  }, [minimumTimePassed])

  useEffect(() => {
    if (minimumTimePassed && document.readyState === 'complete') {
      setShow(false)
    }
  }, [minimumTimePassed])

  return (
    <AnimatePresence
      onExitComplete={() => {
        finish()
      }}
    >
      {show && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-white via-blue-50/30 to-white font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.5, ease: 'easeInOut' }
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-400 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-400 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, -30, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -20,
              transition: { duration: 0.5, ease: 'easeInOut' }
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            <svg width="300" height="160" viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
              <motion.text
                x="50%"
                y="45%"
                textAnchor="middle"
                fontSize="42"
                fontWeight="700"
                fill="#113561"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.4, ease: 'easeOut' }
                }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              >
                Nusa <tspan fill="#1E98D4">Studio</tspan>
              </motion.text>

              <motion.path
                d="M20 90 C 70 130, 150 130, 200 90"
                stroke="url(#nusaGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{
                  opacity: 0,
                  pathLength: 0,
                  transition: { duration: 0.4, ease: 'easeInOut' }
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.4
                }}
              />

              <motion.path
                d="M30 95 C 75 125, 145 125, 190 95"
                stroke="url(#nusaGradientSecondary)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                exit={{
                  opacity: 0,
                  pathLength: 0,
                  transition: { duration: 0.4, ease: 'easeInOut' }
                }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              />

              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx={50 + i * 60}
                  cy={110 - i * 15 + (i === 1 ? 15 : 0)}
                  r="4"
                  fill="#1E98D4"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    transition: { duration: 0.3 }
                  }}
                  transition={{
                    delay: 0.7 + i * 0.1,
                    duration: 0.4,
                    ease: 'easeOut'
                  }}
                />
              ))}

              <defs>
                <linearGradient id="nusaGradient" x1="20" y1="90" x2="200" y2="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#113561" />
                  <stop offset="0.5" stopColor="#1E98D4" />
                  <stop offset="1" stopColor="#1E98D4" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="nusaGradientSecondary" x1="30" y1="95" x2="190" y2="95" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1E98D4" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#113561" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
