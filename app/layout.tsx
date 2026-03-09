import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BlueSky Residences — Puerto Vallarta',
  description: 'Luxury residences in Puerto Vallarta, Mexico. 3 available units.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
