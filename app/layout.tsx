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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { url: '/favicon-192x192.png', sizes: '192x192' },
      { url: '/favicon-512x512.png', sizes: '512x512' },
    ],
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
