import type { Metadata, Viewport } from 'next'
import './globals.css'

const title = 'BlueSky Residences — Puerto Vallarta'
const description =
  '11 boutique residences in Puerto Vallarta. 3 available. Private pools, rooftop terrace, ocean views.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://www.blueskypv.com',
    siteName: 'BlueSky Residences',
    images: [{ url: '/sketch.png', width: 1200, height: 900, alt: 'BlueSky Residences Puerto Vallarta' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/sketch.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
