import Link from 'next/link'
import { Components } from 'react-markdown'

export const MarkdownComponents: Components = {
  p: ({ children }) => <p className="mb-2 leading-relaxed text-slate-700 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-4 marker:text-primary">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-3 list-decimal space-y-1 pl-4 marker:font-semibold marker:text-primary">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1 text-slate-700">{children}</li>,
  strong: ({ children }) => <span className="font-semibold text-slate-900">{children}</span>,
  a: ({ href, children }) => {
    // Handle missing href
    if (!href) {
      return <span className="font-semibold text-slate-900">{children}</span>
    }

    // Check if it's an internal link (starts with /)
    const isInternal = href.startsWith('/')

    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
        >
          {children}
        </Link>
      )
    }

    // External link
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent-orange underline decoration-accent-orange/30 underline-offset-2 transition-colors hover:decoration-accent-orange"
      >
        {children}
      </a>
    )
  }
}
