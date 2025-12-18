import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Raihan - Photography & Videography Portfolio",
  description:
    "Professional photography and videography portfolio featuring artwork, stage events, portraits, and commercial work",
  generator: "v0.app",
  icons: {
    // Mengarahkan icon utama ke file LOGOO.png di folder public/media/
    icon: "/media/LOGOO.png", 
    // Jika ingin tetap menggunakan format apple-touch-icon:
    shortcut: "/media/LOGOO.png", // Tambahkan ini
    apple: "/media/LOGOO.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}