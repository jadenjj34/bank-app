import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Metro Bank',
  description: 'Manage your finances with Metro Bank',
  keywords: ['banking', 'finance', 'money management'],
  openGraph: {
    title: 'Metro Bank',
    description: 'Manage your finances with Metro Bank',
    type: 'website',
    url: 'https://metrobank.com',
    siteName: 'Metro Bank',
  },
  twitter: {
    title: 'Metro Bank',
    description: 'Manage your finances with Metro Bank',
    card: 'summary_large_image',
    site: '@metrobank',
    creator: '@metrobank',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
