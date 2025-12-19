import { google } from '@ai-sdk/google'
import { streamText } from 'ai'

export const maxDuration = 30

// Helper function to extract text content from various message formats
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMessageContent(msg: any): string {
  // If content is directly a string
  if (msg.content && typeof msg.content === 'string') {
    return msg.content
  }
  // If parts array exists (AI SDK v2 format)
  if (msg.parts && Array.isArray(msg.parts)) {
    const textPart = msg.parts.find((p: { type: string; text?: string }) => p.type === 'text')
    if (textPart && textPart.text) {
      return textPart.text
    }
  }
  // If text is directly on the message (from sendMessage({ text }))
  if (msg.text && typeof msg.text === 'string') {
    return msg.text
  }

  return ''
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const rawMessages = body.messages || []

    // Validate and transform messages to expected format
    if (!Array.isArray(rawMessages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Transform messages to the format expected by streamText
    const messages = rawMessages
      .map((msg: { role: string; content?: string; parts?: Array<{ type: string; text?: string }>; text?: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: getMessageContent(msg)
      }))
      .filter((msg: { role: string; content: string }) => msg.content) // Filter out empty messages

    const result = streamText({
      model: google('gemini-2.0-flash'),
      system: `You are the friendly and professional Customer Service AI for Nusacaraka Studio, a premium creative agency based in Jakarta, Indonesia.

Your role is to:
- Answer questions about our services: Branding, Web Development, Digital Marketing, and UI/UX Design
- Help potential clients understand how we can help transform their digital presence
- Provide information about our process, pricing inquiry, and how to start a project
- Be warm, helpful, and professional in Indonesian or English (match the user's language)

About Nusacaraka Studio:
- We are a Digital Experience Platform that helps brands stand out in the digital era
- Our services include: Brand Identity, Website Development, Digital Marketing Campaigns, and UI/UX Design
- We focus on creating unforgettable brand experiences that captivate, engage, and convert

If asked about specific pricing, politely explain that pricing varies based on project scope, and encourage them to contact us for a custom quote.

Keep responses concise, friendly, and helpful. Use emojis sparingly to add warmth.`,
      messages: messages
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
