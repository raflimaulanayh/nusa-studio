import { SYSTEM_PROMPT } from '@/constants/chatbot-data'
import { google } from '@ai-sdk/google'
import { streamText, convertToCoreMessages } from 'ai'
import { z } from 'zod'

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const coreMessages = convertToCoreMessages(messages)

    const result = streamText({
      model: google('gemini-2.5-flash-lite'),
      system: SYSTEM_PROMPT,
      messages: coreMessages,
      tools: {
        recommendServices: {
          description:
            'Recommend relevant Nusacaraka Studio services with specific pricing plans based on user needs. Use this when user describes their business challenges, asks about specific services, or expresses interest in digital solutions like websites, branding, marketing, etc.',
          inputSchema: z.object({
            services: z
              .array(
                z.object({
                  serviceId: z
                    .enum(['brand-identity', 'web-development', 'ui-ux-design', 'digital-marketing', 'product-photography'])
                    .describe('Service ID'),
                  planName: z
                    .string()
                    .optional()
                    .describe(
                      'Recommended plan name (e.g., "Product Catalog", "Video Reels/TikTok", "Landing Page", "Company Profile", "Logo Basic", "Full Identity", etc.)'
                    )
                })
              )
              .max(3)
              .describe('Array of 1-3 recommended services with optional specific plans'),
            reasoning: z
              .string()
              .describe(
                'Brief 1-sentence explanation in Bahasa Indonesia of why these services are recommended for the user'
              )
          }),
          execute: async ({
            services,
            reasoning
          }: {
            services: Array<{ serviceId: string; planName?: string }>
            reasoning: string
          }) => {
            return {
              services,
              reasoning
            }
          }
        }
      }
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat API Error Full Details:', JSON.stringify(error, null, 2))
    console.error('Chat API Error Stack:', error)

    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
