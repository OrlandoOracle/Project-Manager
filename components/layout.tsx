import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationMenuDemo } from '@/components/NavigationMenuDemo'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Project Hub',
  description: 'Project Management Made Simple',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1">
              <NavigationMenuDemo />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
