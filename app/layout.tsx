import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllScreen',
  description: 'Découvrez et explorez vos films et séries préférés',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#121212] text-white`}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  )
}

